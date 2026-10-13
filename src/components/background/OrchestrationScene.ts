import { Layout, Palette, RGB, Scene, mulberry32, rgba } from './core';

/**
 * Agent mesh: several small orchestrator hubs sit in the side gutters, each
 * dispatching packets to its own satellite agents. Hubs are linked into a mesh
 * whose long diagonal links cross the content column (visible between cards).
 * There is deliberately no single central node.
 */

interface Point {
  x: number;
  y: number;
}

interface Satellite extends Point {
  angle: number;
  radius: number;
  spin: number;
}

interface Hub extends Point {
  baseX: number;
  baseY: number;
  phase: number;
  flash: number;
  sats: Satellite[];
}

type PacketColor = 'accent' | 'violet' | 'secondary';

interface Packet {
  from: Point;
  to: Point;
  t: number;
  speed: number;
  color: PacketColor;
  /** When the outbound packet lands, send a reply back to this hub. */
  replyTo?: Hub;
  /** Hub to flash on arrival. */
  flashHub?: Hub;
}

const MAX_PACKETS = 70;

export class OrchestrationScene implements Scene {
  private hubs: Hub[] = [];
  private meshEdges: [number, number, number][] = []; // [a, b, weight]
  private packets: Packet[] = [];
  private dispatchTimer = 0;
  private meshTimer = 0;
  private rand = mulberry32(7);

  resize(layout: Layout) {
    const rand = mulberry32(42);
    const { width, height, leftX, rightX, focalRadius, compact } = layout;
    const count = compact ? 4 : Math.max(4, Math.min(7, Math.round(height / 150)));
    const satCount = compact ? 4 : 5;

    this.hubs = [];
    for (let i = 0; i < count; i++) {
      const left = i % 2 === 0;
      const x = (left ? leftX : rightX) + (rand() - 0.5) * focalRadius * 0.4;
      const y = height * (0.1 + (0.8 * i) / Math.max(1, count - 1)) + (rand() - 0.5) * 30;
      const sats: Satellite[] = [];
      for (let s = 0; s < satCount; s++) {
        sats.push({
          x,
          y,
          angle: (s / satCount) * Math.PI * 2 + rand() * 0.6,
          radius: focalRadius * (0.7 + rand() * 0.45),
          spin: (rand() > 0.5 ? 1 : -1) * (0.04 + rand() * 0.05),
        });
      }
      this.hubs.push({ x, y, baseX: x, baseY: y, phase: rand() * Math.PI * 2, flash: 0, sats });
    }

    // Mesh: zig-zag across the column (i -> i+1) plus same-side vertical links (i -> i+2)
    this.meshEdges = [];
    for (let i = 0; i < count; i++) {
      if (i + 1 < count) this.meshEdges.push([i, i + 1, 1]);
      if (i + 2 < count) this.meshEdges.push([i, i + 2, 0.5]);
    }

    this.packets = [];
    // Keep the satellites positioned even before the first update.
    this.update(0);
    void width;
  }

  update(dt: number) {
    for (const hub of this.hubs) {
      hub.phase += dt * 0.6;
      hub.x = hub.baseX + Math.sin(hub.phase * 0.5) * 4;
      hub.y = hub.baseY + Math.cos(hub.phase * 0.4) * 5;
      hub.flash = Math.max(0, hub.flash - dt * 2.2);
      for (const s of hub.sats) {
        s.angle += s.spin * dt;
        s.x = hub.x + Math.cos(s.angle) * s.radius;
        s.y = hub.y + Math.sin(s.angle) * s.radius * 0.85;
      }
    }

    if (this.hubs.length === 0) return;

    // Hub -> satellite dispatch (reply comes back on arrival)
    this.dispatchTimer -= dt;
    if (this.dispatchTimer <= 0 && this.packets.length < MAX_PACKETS) {
      this.dispatchTimer = 0.22 + this.rand() * 0.25;
      const hub = this.hubs[Math.floor(this.rand() * this.hubs.length)];
      const sat = hub.sats[Math.floor(this.rand() * hub.sats.length)];
      this.packets.push({ from: hub, to: sat, t: 0, speed: 1 / (0.8 + this.rand() * 0.4), color: 'accent', replyTo: hub });
    }

    // Hub <-> hub coordination along the mesh
    this.meshTimer -= dt;
    if (this.meshTimer <= 0 && this.meshEdges.length && this.packets.length < MAX_PACKETS) {
      this.meshTimer = 0.9 + this.rand() * 0.9;
      const [a, b] = this.meshEdges[Math.floor(this.rand() * this.meshEdges.length)];
      const forward = this.rand() > 0.5;
      const from = this.hubs[forward ? a : b];
      const to = this.hubs[forward ? b : a];
      this.packets.push({ from, to, t: 0, speed: 1 / (2.4 + this.rand()), color: 'secondary', flashHub: to });
    }

    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.t += p.speed * dt;
      if (p.t >= 1) {
        if (p.replyTo) {
          this.packets.push({ from: p.to, to: p.replyTo, t: 0, speed: 1 / (0.8 + this.rand() * 0.3), color: 'violet', flashHub: p.replyTo });
        }
        if (p.flashHub) p.flashHub.flash = 1;
        this.packets.splice(i, 1);
      }
    }
  }

  settle() {
    for (let i = 0; i < 120; i++) this.update(1 / 30);
  }

  draw(g: CanvasRenderingContext2D, alpha: number, p: Palette) {
    const a = alpha * p.strength;
    if (a <= 0.001) return;

    // 1. Mesh links between hubs
    g.lineWidth = 1;
    g.beginPath();
    for (const [i, j, w] of this.meshEdges) {
      if (w < 1) continue;
      g.moveTo(this.hubs[i].x, this.hubs[i].y);
      g.lineTo(this.hubs[j].x, this.hubs[j].y);
    }
    g.strokeStyle = rgba(p.primary, 0.2 * a);
    g.stroke();

    g.beginPath();
    for (const [i, j, w] of this.meshEdges) {
      if (w >= 1) continue;
      g.moveTo(this.hubs[i].x, this.hubs[i].y);
      g.lineTo(this.hubs[j].x, this.hubs[j].y);
    }
    g.strokeStyle = rgba(p.neutral, 0.07 * a);
    g.stroke();

    // 2. Spokes + satellite rings
    g.beginPath();
    for (const hub of this.hubs) {
      for (const s of hub.sats) {
        g.moveTo(hub.x, hub.y);
        g.lineTo(s.x, s.y);
      }
    }
    g.strokeStyle = rgba(p.secondary, 0.26 * a);
    g.stroke();

    g.beginPath();
    for (const hub of this.hubs) {
      hub.sats.forEach((s, idx) => {
        const n = hub.sats[(idx + 1) % hub.sats.length];
        g.moveTo(s.x, s.y);
        g.lineTo(n.x, n.y);
      });
    }
    g.strokeStyle = rgba(p.neutral, 0.08 * a);
    g.stroke();

    // 3. Packets (halo + core + short trail)
    const colorOf = (c: PacketColor): RGB => (c === 'accent' ? p.accent : c === 'violet' ? p.violet : p.secondary);
    for (const pk of this.packets) {
      const c = colorOf(pk.color);
      const t = pk.t;
      const x = pk.from.x + (pk.to.x - pk.from.x) * t;
      const y = pk.from.y + (pk.to.y - pk.from.y) * t;
      const tt = Math.max(0, t - 0.14);
      const tx = pk.from.x + (pk.to.x - pk.from.x) * tt;
      const ty = pk.from.y + (pk.to.y - pk.from.y) * tt;

      g.beginPath();
      g.moveTo(tx, ty);
      g.lineTo(x, y);
      g.strokeStyle = rgba(c, 0.45 * a);
      g.lineWidth = 1.6;
      g.stroke();

      g.beginPath();
      g.arc(x, y, 6, 0, Math.PI * 2);
      g.fillStyle = rgba(c, 0.16 * a);
      g.fill();

      g.beginPath();
      g.arc(x, y, 2.3, 0, Math.PI * 2);
      g.fillStyle = rgba(c, 0.95 * a);
      g.fill();
    }
    g.lineWidth = 1;

    // 4. Satellites
    for (const hub of this.hubs) {
      for (const s of hub.sats) {
        g.beginPath();
        g.arc(s.x, s.y, 5.5, 0, Math.PI * 2);
        g.strokeStyle = rgba(p.accent, 0.35 * a);
        g.stroke();
        g.beginPath();
        g.arc(s.x, s.y, 2.6, 0, Math.PI * 2);
        g.fillStyle = rgba(p.accent, 0.85 * a);
        g.fill();
      }
    }

    // 5. Hubs: halo, ring, rotating arc, core
    for (const hub of this.hubs) {
      const r = 11 + hub.flash * 4;

      g.beginPath();
      g.arc(hub.x, hub.y, r + 14, 0, Math.PI * 2);
      g.fillStyle = rgba(p.primary, (0.08 + hub.flash * 0.12) * a);
      g.fill();

      g.beginPath();
      g.arc(hub.x, hub.y, r, 0, Math.PI * 2);
      g.strokeStyle = rgba(p.primary, 0.8 * a);
      g.lineWidth = 1.6;
      g.stroke();

      g.beginPath();
      g.arc(hub.x, hub.y, r + 6, hub.phase, hub.phase + 1.7);
      g.strokeStyle = rgba(p.violet, 0.55 * a);
      g.lineWidth = 1.4;
      g.stroke();

      g.beginPath();
      g.arc(hub.x, hub.y, 3.6, 0, Math.PI * 2);
      g.fillStyle = rgba(p.primary, 0.95 * a);
      g.fill();
    }
    g.lineWidth = 1;
  }
}
