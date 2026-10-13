import { Layout, Palette, RGB, Scene, mulberry32, rgba } from './core';

/**
 * High-dimensional vector embedding space.
 * Centroids and dense cluster masses sit primarily in the gutters (left/right margins),
 * with ambient vector bridges crossing horizontally between clusters through the gaps between cards.
 * No text labels. Zero O(N^2) dynamic allocations.
 */

interface VectorNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  cluster: number;
  radius: number;
  phase: number;
}

interface Cluster {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  color: 'primary' | 'secondary' | 'accent' | 'violet';
  radius: number;
}

interface Edge {
  a: number;
  b: number;
  alpha: number;
}

export class EmbeddingsScene implements Scene {
  private clusters: Cluster[] = [];
  private nodes: VectorNode[] = [];
  private intraEdges: Edge[] = [];
  private bridgeEdges: Edge[] = [];
  private phase = 0;
  private rand = mulberry32(101);

  resize(layout: Layout) {
    const { width, height, leftX, rightX, focalRadius, compact } = layout;
    const rand = mulberry32(88);

    // 4 semantic clusters anchored in side margins
    // Top-left, top-right, bottom-left, bottom-right
    this.clusters = [
      {
        x: leftX,
        y: height * 0.28,
        baseX: leftX,
        baseY: height * 0.28,
        color: 'primary',
        radius: focalRadius * 1.1,
      },
      {
        x: rightX,
        y: height * 0.32,
        baseX: rightX,
        baseY: height * 0.32,
        color: 'accent',
        radius: focalRadius * 1.05,
      },
      {
        x: leftX + (compact ? 0 : 20),
        y: height * 0.72,
        baseX: leftX + (compact ? 0 : 20),
        baseY: height * 0.72,
        color: 'secondary',
        radius: focalRadius * 1.15,
      },
      {
        x: rightX - (compact ? 0 : 20),
        y: height * 0.68,
        baseX: rightX - (compact ? 0 : 20),
        baseY: height * 0.68,
        color: 'violet',
        radius: focalRadius * 1.1,
      },
    ];

    const nodesPerCluster = compact ? 16 : 24;
    this.nodes = [];

    this.clusters.forEach((cl, cIdx) => {
      for (let i = 0; i < nodesPerCluster; i++) {
        // Disperse within cluster radius
        const angle = rand() * Math.PI * 2;
        const dist = Math.sqrt(rand()) * cl.radius;
        const x = cl.x + Math.cos(angle) * dist;
        const y = cl.y + Math.sin(angle) * dist * 0.9;

        this.nodes.push({
          x,
          y,
          vx: (rand() - 0.5) * 6,
          vy: (rand() - 0.5) * 6,
          baseX: x,
          baseY: y,
          cluster: cIdx,
          radius: 1.8 + rand() * 1.6,
          phase: rand() * Math.PI * 2,
        });
      }
    });

    // Ambient floating particles crossing the center column
    const bridgeCount = compact ? 8 : 18;
    for (let i = 0; i < bridgeCount; i++) {
      const x = width * (0.2 + 0.6 * rand());
      const y = height * (0.15 + 0.7 * rand());
      this.nodes.push({
        x,
        y,
        vx: (rand() - 0.5) * 8,
        vy: (rand() - 0.5) * 8,
        baseX: x,
        baseY: y,
        cluster: Math.floor(rand() * this.clusters.length),
        radius: 1.6 + rand() * 1.2,
        phase: rand() * Math.PI * 2,
      });
    }

    // Pre-calculate stable static edges within clusters (no O(N^2) random flicker each frame)
    this.intraEdges = [];
    const nTotal = this.nodes.length;
    for (let i = 0; i < nTotal; i++) {
      for (let j = i + 1; j < nTotal; j++) {
        const ni = this.nodes[i];
        const nj = this.nodes[j];
        if (ni.cluster === nj.cluster) {
          const dx = ni.baseX - nj.baseX;
          const dy = ni.baseY - nj.baseY;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < focalRadius * 0.75) {
            this.intraEdges.push({
              a: i,
              b: j,
              alpha: Math.max(0.12, 1 - d / (focalRadius * 0.75)),
            });
          }
        }
      }
    }

    // Pre-calculate sparse inter-cluster bridge connections across the center
    this.bridgeEdges = [];
    for (let k = 0; k < (compact ? 6 : 14); k++) {
      const a = Math.floor(rand() * nTotal);
      const b = Math.floor(rand() * nTotal);
      if (this.nodes[a].cluster !== this.nodes[b].cluster) {
        this.bridgeEdges.push({ a, b, alpha: 0.15 + rand() * 0.2 });
      }
    }

    void width;
  }

  update(dt: number) {
    this.phase += dt * 0.35;

    // Organic drift
    for (let i = 0; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      n.phase += dt * 0.8;
      n.x = n.baseX + Math.sin(n.phase + i * 0.2) * 8;
      n.y = n.baseY + Math.cos(n.phase * 0.7 + i * 0.3) * 6;
    }
  }

  settle() {
    this.update(0.1);
  }

  draw(g: CanvasRenderingContext2D, alpha: number, p: Palette) {
    const a = alpha * p.strength;
    if (a <= 0.001) return;

    const colorOf = (c: 'primary' | 'secondary' | 'accent' | 'violet'): RGB =>
      c === 'primary' ? p.primary : c === 'secondary' ? p.secondary : c === 'accent' ? p.accent : p.violet;

    // 1. Cluster density glow auras
    for (const cl of this.clusters) {
      const col = colorOf(cl.color);
      const rad = cl.radius * 1.35;
      const grad = g.createRadialGradient(cl.x, cl.y, 10, cl.x, cl.y, rad);
      grad.addColorStop(0, rgba(col, 0.12 * a));
      grad.addColorStop(0.6, rgba(col, 0.04 * a));
      grad.addColorStop(1, 'transparent');

      g.beginPath();
      g.arc(cl.x, cl.y, rad, 0, Math.PI * 2);
      g.fillStyle = grad;
      g.fill();
    }

    // 2. Intra-cluster graph edges
    g.lineWidth = 1;
    for (const e of this.intraEdges) {
      const n1 = this.nodes[e.a];
      const n2 = this.nodes[e.b];
      const col = colorOf(this.clusters[n1.cluster].color);

      g.beginPath();
      g.moveTo(n1.x, n1.y);
      g.lineTo(n2.x, n2.y);
      g.strokeStyle = rgba(col, e.alpha * 0.25 * a);
      g.stroke();
    }

    // 3. Sparse bridge edges crossing the column
    for (const e of this.bridgeEdges) {
      const n1 = this.nodes[e.a];
      const n2 = this.nodes[e.b];
      const grad = g.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
      const c1 = colorOf(this.clusters[n1.cluster].color);
      const c2 = colorOf(this.clusters[n2.cluster].color);
      grad.addColorStop(0, rgba(c1, e.alpha * 0.18 * a));
      grad.addColorStop(1, rgba(c2, e.alpha * 0.18 * a));

      g.beginPath();
      g.moveTo(n1.x, n1.y);
      g.lineTo(n2.x, n2.y);
      g.strokeStyle = grad;
      g.stroke();
    }

    // 4. Vector nodes
    for (const n of this.nodes) {
      const col = colorOf(this.clusters[n.cluster].color);

      // Node halo
      g.beginPath();
      g.arc(n.x, n.y, n.radius + 3.5, 0, Math.PI * 2);
      g.fillStyle = rgba(col, 0.14 * a);
      g.fill();

      // Node core
      g.beginPath();
      g.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      g.fillStyle = rgba(col, 0.85 * a);
      g.fill();
    }
  }
}
