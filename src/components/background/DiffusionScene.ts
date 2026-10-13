import { Layout, Palette, RGB, Scene, mulberry32, rgba } from './core';

/**
 * Generative diffusion denoising scene.
 * Reversible entropy cycle where particles coalesce into two silicon neural core
 * structures anchored in the left & right gutters (fully visible beside the content column).
 * Interconnecting bus lines span across the screen between them.
 * No text. Brand palette only.
 */

interface Particle {
  x: number;
  y: number;
  noiseX: number;
  noiseY: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: 'accent' | 'violet' | 'primary';
  driftPhase: number;
}

export class DiffusionScene implements Scene {
  private particles: Particle[] = [];
  private circuitLinks: [number, number][] = [];
  private crossBusLinks: [number, number][] = [];
  private cycleTime = 0;
  private crystallization = 0;

  resize(layout: Layout) {
    const { width, height, leftX, rightX, focalRadius, compact } = layout;
    const rand = mulberry32(404);

    this.particles = [];
    this.circuitLinks = [];
    this.crossBusLinks = [];

    // Left and right silicon neural core centers
    const coreCenters = [
      { x: leftX, y: height * 0.45 },
      { x: rightX, y: height * 0.48 },
    ];

    const particlesPerCore = compact ? 28 : 46;

    coreCenters.forEach((center) => {
      const startIndex = this.particles.length;
      const r = focalRadius * 0.9;

      // 1. Central square die: 9 points
      const dieSize = r * 0.4;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const tx = center.x - dieSize / 2 + (col / 2) * dieSize;
          const ty = center.y - dieSize / 2 + (row / 2) * dieSize;
          this.particles.push({
            x: tx,
            y: ty,
            noiseX: rand() * width,
            noiseY: rand() * height,
            targetX: tx,
            targetY: ty,
            radius: 2.2,
            color: 'accent',
            driftPhase: rand() * Math.PI * 2,
          });
        }
      }

      // 2. Concentric hexagonal circuit perimeter points
      const ringPoints = particlesPerCore - 9;
      for (let i = 0; i < ringPoints; i++) {
        const ringAngle = (i / ringPoints) * Math.PI * 2;
        const ringRadius = r * (0.65 + 0.35 * (i % 2));
        const tx = center.x + Math.cos(ringAngle) * ringRadius;
        const ty = center.y + Math.sin(ringAngle) * ringRadius * 0.9;

        this.particles.push({
          x: tx,
          y: ty,
          noiseX: rand() * width,
          noiseY: rand() * height,
          targetX: tx,
          targetY: ty,
          radius: 1.8 + rand() * 1.2,
          color: i % 2 === 0 ? 'primary' : 'violet',
          driftPhase: rand() * Math.PI * 2,
        });
      }

      const endIndex = this.particles.length;

      // Connect nearby target coordinates in the core lattice
      for (let i = startIndex; i < endIndex; i++) {
        for (let j = i + 1; j < endIndex; j++) {
          const dx = this.particles[i].targetX - this.particles[j].targetX;
          const dy = this.particles[i].targetY - this.particles[j].targetY;
          if (dx * dx + dy * dy < (r * 0.42) * (r * 0.42)) {
            this.circuitLinks.push([i, j]);
          }
        }
      }
    });

    // Ambient particles roaming the central expanse
    const ambientCount = compact ? 12 : 28;
    for (let i = 0; i < ambientCount; i++) {
      const tx = width * (0.15 + 0.7 * rand());
      const ty = height * (0.12 + 0.76 * rand());
      this.particles.push({
        x: tx,
        y: ty,
        noiseX: rand() * width,
        noiseY: rand() * height,
        targetX: tx,
        targetY: ty,
        radius: 1.6 + rand() * 1.4,
        color: rand() > 0.5 ? 'accent' : 'primary',
        driftPhase: rand() * Math.PI * 2,
      });
    }

    // Horizontal interconnect bus lines bridging across from left to right
    if (!compact && this.particles.length > 50) {
      for (let b = 0; b < 6; b++) {
        const leftP = Math.floor(rand() * 25);
        const rightP = 35 + Math.floor(rand() * 25);
        this.crossBusLinks.push([leftP, rightP]);
      }
    }
  }

  update(dt: number) {
    this.cycleTime += dt * 0.22; // ~9s full cycle

    const cycle = (this.cycleTime % (Math.PI * 2)) / (Math.PI * 2);

    // S-curve denoising factor:
    // 0 to 0.45: Denoise from noise (0 -> 1)
    // 0.45 to 0.75: Hold crystallized neural core (1)
    // 0.75 to 1.0: Forward diffuse into entropy (1 -> 0)
    if (cycle < 0.45) {
      const t = cycle / 0.45;
      this.crystallization = t * t * (3 - 2 * t);
    } else if (cycle < 0.75) {
      this.crystallization = 1;
    } else {
      const t = (cycle - 0.75) / 0.25;
      this.crystallization = 1 - t * t * (3 - 2 * t);
    }

    const c = this.crystallization;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.driftPhase += dt * 0.8;
      const driftX = Math.sin(p.driftPhase) * 6 * (1 - c);
      const driftY = Math.cos(p.driftPhase * 0.9) * 6 * (1 - c);

      p.x = p.noiseX * (1 - c) + p.targetX * c + driftX;
      p.y = p.noiseY * (1 - c) + p.targetY * c + driftY;
    }
  }

  settle() {
    this.cycleTime = Math.PI * 0.6; // Settled in crystallized state
    this.update(0);
  }

  draw(g: CanvasRenderingContext2D, alpha: number, p: Palette) {
    const a = alpha * p.strength;
    if (a <= 0.001) return;

    const colorOf = (c: 'accent' | 'violet' | 'primary'): RGB =>
      c === 'accent' ? p.accent : c === 'violet' ? p.violet : p.primary;

    const c = this.crystallization;

    // 1. Crystallized circuit interconnect lines in the side gutters
    if (c > 0.35) {
      const linkAlpha = ((c - 0.35) / 0.65) * a;

      g.lineWidth = 1.2;
      g.beginPath();
      for (const [i, j] of this.circuitLinks) {
        g.moveTo(this.particles[i].x, this.particles[i].y);
        g.lineTo(this.particles[j].x, this.particles[j].y);
      }
      g.strokeStyle = rgba(p.accent, 0.28 * linkAlpha);
      g.stroke();

      // Bus links crossing the screen
      g.beginPath();
      for (const [i, j] of this.crossBusLinks) {
        g.moveTo(this.particles[i].x, this.particles[i].y);
        g.lineTo(this.particles[j].x, this.particles[j].y);
      }
      g.strokeStyle = rgba(p.primary, 0.16 * linkAlpha);
      g.stroke();
    }

    // 2. Dual silicon core glow halos at high crystallization
    if (c > 0.6) {
      const glowAlpha = ((c - 0.6) / 0.4) * a;
      // Get positions from target centers
      const pLeft = this.particles[4]; // central die left
      const pRight = this.particles[38]; // central die right
      if (pLeft && pRight) {
        [pLeft, pRight].forEach((center) => {
          const grad = g.createRadialGradient(center.x, center.y, 8, center.x, center.y, 90);
          grad.addColorStop(0, rgba(p.violet, 0.16 * glowAlpha));
          grad.addColorStop(0.6, rgba(p.accent, 0.06 * glowAlpha));
          grad.addColorStop(1, 'transparent');

          g.beginPath();
          g.arc(center.x, center.y, 90, 0, Math.PI * 2);
          g.fillStyle = grad;
          g.fill();
        });
      }
    }

    // 3. Particles
    for (const pt of this.particles) {
      const col = colorOf(pt.color);
      const isCore = pt.targetX !== pt.noiseX;
      const ptAlpha = (isCore ? 0.4 + 0.55 * c : 0.6) * a;

      // Halo when crystallized
      if (c > 0.7) {
        g.beginPath();
        g.arc(pt.x, pt.y, pt.radius + 3, 0, Math.PI * 2);
        g.fillStyle = rgba(col, 0.16 * a);
        g.fill();
      }

      g.beginPath();
      g.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
      g.fillStyle = rgba(col, ptAlpha);
      g.fill();
    }
  }
}
