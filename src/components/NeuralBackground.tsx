'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  phase: number;
  layer: number;
}

interface Synapse {
  source: Node;
  target: Node;
  layer: number; // source layer index
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  // Keep themeRef in sync without re-running the animation/network setup
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let nodes: Node[] = [];
    let synapses: Synapse[] = [];
    let layerCount = 5;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setupNetwork = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      // HiDPI Retina scaling
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      synapses = [];

      // Dynamic layer counts responsive to screen width
      const layerCounts =
        width < 640
          ? [3, 5, 5, 3]
          : width < 1024
          ? [4, 7, 8, 7, 4]
          : [5, 8, 9, 8, 5];

      layerCount = layerCounts.length;
      const xMargin = width * 0.08;
      const xSpacing = (width - xMargin * 2) / (layerCount - 1);

      const layers: Node[][] = [];

      layerCounts.forEach((count, lIdx) => {
        const layerNodes: Node[] = [];
        const baseYMargin = height * 0.14;
        const ySpacing = (height - baseYMargin * 2) / (count + 1);

        for (let i = 0; i < count; i++) {
          // Slight organic jitter to avoid strict mechanical lattice
          const xJitter = (Math.sin(lIdx * 3.7 + i * 2.3) * 0.2) * (xSpacing * 0.25);
          const yJitter = (Math.cos(lIdx * 1.9 + i * 4.1) * 0.2) * (ySpacing * 0.3);

          const x = xMargin + lIdx * xSpacing + xJitter;
          const y = baseYMargin + (i + 1) * ySpacing + yJitter;

          const node: Node = {
            x,
            y,
            baseX: x,
            baseY: y,
            radius: 2.2,
            phase: Math.random() * Math.PI * 2,
            layer: lIdx,
          };
          layerNodes.push(node);
          nodes.push(node);
        }
        layers.push(layerNodes);
      });

      // Pre-connect adjacent layers
      for (let l = 0; l < layerCount - 1; l++) {
        const currentLayer = layers[l];
        const nextLayer = layers[l + 1];

        currentLayer.forEach((src) => {
          nextLayer.forEach((tgt) => {
            // High connection density
            synapses.push({
              source: src,
              target: tgt,
              layer: l,
            });
          });
        });
      }
    };

    const handleResize = () => {
      setupNetwork();
      if (prefersReducedMotion) {
        drawFrame(0);
      }
    };

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Scroll-depth dimming: full presence in hero, dimmed further down
    const handleScroll = () => {
      if (!canvas) return;
      const scrollY = window.scrollY;
      // Fade gently down to ~0.45 opacity as user scrolls deep into content
      const factor = Math.max(0.42, 1 - (scrollY / 900) * 0.58);
      canvas.style.opacity = factor.toString();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    setupNetwork();
    handleScroll();

    let animId: number;

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const isDark = themeRef.current === 'dark';
      const synapseColor = isDark
        ? 'rgba(255, 255, 255, 0.055)'
        : 'rgba(15, 23, 42, 0.05)';
      const forwardPulseColor = isDark
        ? 'rgba(56, 189, 248, 0.9)'
        : 'rgba(2, 132, 199, 0.9)';
      const backwardPulseColor = isDark
        ? 'rgba(192, 132, 252, 0.9)'
        : 'rgba(147, 51, 234, 0.9)';
      const nodeColor = isDark
        ? 'rgba(255, 255, 255, 0.28)'
        : 'rgba(15, 23, 42, 0.22)';
      const nodeHoverColor = isDark
        ? 'rgba(255, 255, 255, 0.95)'
        : 'rgba(15, 23, 42, 0.85)';

      // Micro floating drift
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.phase += 0.008;
        n.y = n.baseY + Math.sin(n.phase) * 2.5;
      }

      // 1. Batch draw all synapses in ONE single stroke call
      ctx.beginPath();
      for (let i = 0; i < synapses.length; i++) {
        const s = synapses[i];
        ctx.moveTo(s.source.x, s.source.y);
        ctx.lineTo(s.target.x, s.target.y);
      }
      ctx.strokeStyle = synapseColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (!prefersReducedMotion) {
        // 2. Training Wave Cycles (Forward pass -> Backward pass)
        // Cycle duration = 4.2 seconds (4200ms)
        const cycleDuration = 4200;
        const cycleProgress = (time % cycleDuration) / cycleDuration; // 0 to 1

        // Phase 1: Forward training wave (0.00 to 0.45)
        // Phase 2: Pause / Loss evaluation (0.45 to 0.52)
        // Phase 3: Backprop gradient wave (0.52 to 0.95)
        // Phase 4: Settle (0.95 to 1.00)
        const isForwardPhase = cycleProgress >= 0.02 && cycleProgress < 0.46;
        const isBackwardPhase = cycleProgress >= 0.52 && cycleProgress < 0.96;

        const totalIntervals = Math.max(1, layerCount - 1);

        for (let i = 0; i < synapses.length; i++) {
          const s = synapses[i];
          // Only animate a subset of lines per layer to keep it clean and non-chaotic
          if ((i + s.layer) % 3 !== 0) continue;

          let showPulse = false;
          let pulseProgress = 0;
          let isBackward = false;

          if (isForwardPhase) {
            // Forward wave window for this layer
            const waveNormalized = (cycleProgress - 0.02) / 0.44; // 0 to 1 across forward phase
            const layerStart = s.layer / totalIntervals;
            const layerEnd = (s.layer + 1.2) / totalIntervals;

            if (waveNormalized >= layerStart && waveNormalized <= layerEnd) {
              showPulse = true;
              pulseProgress = (waveNormalized - layerStart) / (layerEnd - layerStart);
              isBackward = false;
            }
          } else if (isBackwardPhase) {
            // Backward wave window for this layer (reversed)
            const waveNormalized = (cycleProgress - 0.52) / 0.44; // 0 to 1 across backward phase
            const layerRev = totalIntervals - 1 - s.layer;
            const layerStart = layerRev / totalIntervals;
            const layerEnd = (layerRev + 1.2) / totalIntervals;

            if (waveNormalized >= layerStart && waveNormalized <= layerEnd) {
              showPulse = true;
              pulseProgress = (waveNormalized - layerStart) / (layerEnd - layerStart);
              isBackward = true;
            }
          }

          if (showPulse) {
            const clampedP = Math.max(0, Math.min(1, pulseProgress));
            const t = isBackward ? 1 - clampedP : clampedP;
            const px = s.source.x + (s.target.x - s.source.x) * t;
            const py = s.source.y + (s.target.y - s.source.y) * t;

            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = isBackward ? backwardPulseColor : forwardPulseColor;
            ctx.fill();
          }
        }
      }

      // 3. Draw Nodes with subtle proximity hover
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const isHovered = dx * dx + dy * dy < 3600;

        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? 3.5 : n.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? nodeHoverColor : nodeColor;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(drawFrame);
      }
    };

    if (prefersReducedMotion) {
      drawFrame(0);
    } else {
      animId = requestAnimationFrame(drawFrame);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []); // Intentionally empty dependencies to keep network geometry persistent across theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-300"
      style={{
        // Radial mask: softens lines in the center where text sits, leaves crisp structure on sides & background
        maskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.88) 72%, rgba(0,0,0,1) 95%)',
        WebkitMaskImage:
          'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.88) 72%, rgba(0,0,0,1) 95%)',
      }}
    />
  );
}
