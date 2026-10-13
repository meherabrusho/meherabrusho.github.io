'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { Scene, SceneId, computeLayout, getPalette, smoothstep } from './core';
import { OrchestrationScene } from './OrchestrationScene';
import { EmbeddingsScene } from './EmbeddingsScene';
import { DiffusionScene } from './DiffusionScene';

export interface SectionDef {
  id: string;
  name: string;
  scene: SceneId;
  label: string;
  description: string;
}

export const REFINED_SECTIONS: SectionDef[] = [
  {
    id: 'hero',
    name: 'Hero Section',
    scene: 'orchestration',
    label: 'Agent Orchestration',
    description: 'Autonomous multi-agent dispatch & MCP protocol',
  },
  {
    id: 'about',
    name: 'About & Expertise',
    scene: 'orchestration',
    label: 'Agent Orchestration',
    description: 'Multi-agent orchestration & systems architecture',
  },
  {
    id: 'experience',
    name: 'Experience & Stack',
    scene: 'embeddings',
    label: 'Embedding Space',
    description: 'High-dimensional semantic manifolds & vector clustering',
  },
  {
    id: 'projects',
    name: 'Featured Projects',
    scene: 'diffusion',
    label: 'Diffusion Denoising',
    description: 'Silicon neural core crystallization across margins',
  },
  {
    id: 'contact',
    name: 'Contact & Connect',
    scene: 'diffusion',
    label: 'Diffusion Denoising',
    description: 'Silicon neural core crystallization across margins',
  },
];

interface BackgroundEngineProps {
  forcedScene?: SceneId;
  showDock?: boolean;
  dimOpacity?: boolean;
}

export default function BackgroundEngine({
  forcedScene,
  showDock = true,
  dimOpacity = false,
}: BackgroundEngineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  const [activeSceneId, setActiveSceneId] = useState<SceneId>(forcedScene || 'orchestration');
  const [activeSectionName, setActiveSectionName] = useState<string>('Hero Section');

  const currentSceneRef = useRef<SceneId>(forcedScene || 'orchestration');
  const targetSceneRef = useRef<SceneId>(forcedScene || 'orchestration');
  const fadeProgressRef = useRef(1); // 1 = fully transitioned to targetSceneRef

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  // Keep target in sync if controlled via prop
  useEffect(() => {
    if (forcedScene && forcedScene !== targetSceneRef.current) {
      currentSceneRef.current = targetSceneRef.current;
      targetSceneRef.current = forcedScene;
      fadeProgressRef.current = 0;
      setActiveSceneId(forcedScene);
    }
  }, [forcedScene]);

  // Scroll tracking to update target scene
  const handleScroll = useCallback(() => {
    if (forcedScene) return;

    const scrollY = window.scrollY;

    // At top of page, guarantee Hero
    if (scrollY <= 60) {
      if (targetSceneRef.current !== 'orchestration') {
        currentSceneRef.current = targetSceneRef.current;
        targetSceneRef.current = 'orchestration';
        fadeProgressRef.current = 0;
        setActiveSceneId('orchestration');
        setActiveSectionName('Hero Section');
      }
      return;
    }

    const midY = window.innerHeight * 0.45;
    let closestSection: SectionDef | null = null;
    let minDistance = Infinity;

    for (const sec of REFINED_SECTIONS) {
      const el = document.getElementById(sec.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // Distance from element top to viewport mid
      const dist = Math.abs(rect.top - midY);
      if (rect.top <= midY + 120 && dist < minDistance) {
        minDistance = dist;
        closestSection = sec;
      }
    }

    if (closestSection && closestSection.scene !== targetSceneRef.current) {
      currentSceneRef.current = targetSceneRef.current;
      targetSceneRef.current = closestSection.scene;
      fadeProgressRef.current = 0;
      setActiveSceneId(closestSection.scene);
      setActiveSectionName(closestSection.name);
    } else if (closestSection && closestSection.name !== activeSectionName) {
      setActiveSectionName(closestSection.name);
    }
  }, [forcedScene, activeSectionName]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    const rafId = requestAnimationFrame(() => handleScroll());
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Instantiate the 3 scenes
    const scenes: Record<SceneId, Scene> = {
      orchestration: new OrchestrationScene(),
      embeddings: new EmbeddingsScene(),
      diffusion: new DiffusionScene(),
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeAll = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const layout = computeLayout(width, height);
      scenes.orchestration.resize(layout);
      scenes.embeddings.resize(layout);
      scenes.diffusion.resize(layout);

      if (prefersReducedMotion) {
        scenes.orchestration.settle();
        scenes.embeddings.settle();
        scenes.diffusion.settle();
      }
    };

    window.addEventListener('resize', resizeAll);
    resizeAll();

    if (prefersReducedMotion) {
      // Draw single frame
      const palette = getPalette(themeRef.current === 'dark');
      ctx.clearRect(0, 0, width, height);
      scenes[targetSceneRef.current].draw(ctx, 1, palette);
      return () => window.removeEventListener('resize', resizeAll);
    }

    let animId: number = 0;
    let lastTime = performance.now();
    let isHidden = typeof document !== 'undefined' ? document.hidden : false;

    const loop = (time: number) => {
      if (isHidden) return;

      const dt = Math.min(0.1, (time - lastTime) / 1000);
      lastTime = time;

      // Update fade progress
      if (fadeProgressRef.current < 1) {
        fadeProgressRef.current = Math.min(1, fadeProgressRef.current + dt / 0.7); // 700ms cross-fade
      }

      const pNorm = smoothstep(fadeProgressRef.current);
      const fromScene = scenes[currentSceneRef.current];
      const toScene = scenes[targetSceneRef.current];

      // Update ONLY the active scenes
      if (fadeProgressRef.current < 1) {
        fromScene.update(dt);
        toScene.update(dt);
      } else {
        toScene.update(dt);
      }

      ctx.clearRect(0, 0, width, height);
      const palette = getPalette(themeRef.current === 'dark');

      if (fadeProgressRef.current < 1) {
        fromScene.draw(ctx, 1 - pNorm, palette);
        toScene.draw(ctx, pNorm, palette);
      } else {
        toScene.draw(ctx, 1, palette);
      }

      animId = requestAnimationFrame(loop);
    };

    const handleVisibilityChange = () => {
      if (typeof document === 'undefined') return;
      isHidden = document.hidden;
      if (!isHidden) {
        lastTime = performance.now();
        animId = requestAnimationFrame(loop);
      } else {
        if (animId) cancelAnimationFrame(animId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resizeAll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const currentDef =
    REFINED_SECTIONS.find((s) => s.scene === activeSceneId) || REFINED_SECTIONS[0];

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-500 ${
          dimOpacity
            ? 'opacity-20 sm:opacity-30'
            : 'opacity-40 sm:opacity-90 dark:opacity-40 dark:sm:opacity-100'
        }`}
      />

      {showDock && (
        <aside
          aria-label="Background animation controls"
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-auto"
        >
          <div className="glass-card rounded-2xl px-4 py-3 shadow-xl flex items-center space-x-3 border border-gray-200/80 dark:border-gray-800 backdrop-blur-md">
            <span
              className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"
              aria-hidden="true"
            />
            <div className="text-left">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {activeSectionName}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                  {currentDef.label}
                </span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                {currentDef.description}
              </p>
            </div>

            {/* Quick manual scene switcher buttons */}
            <div className="flex items-center space-x-1 pl-2 border-l border-gray-200 dark:border-gray-800">
              {(['orchestration', 'embeddings', 'diffusion'] as SceneId[]).map((sceneId) => {
                const isActive = activeSceneId === sceneId;
                const letter =
                  sceneId === 'orchestration' ? 'O' : sceneId === 'embeddings' ? 'E' : 'D';
                const label =
                  sceneId === 'orchestration'
                    ? 'Agent Orchestration'
                    : sceneId === 'embeddings'
                    ? 'Embedding Space'
                    : 'Diffusion Denoising';
                return (
                  <button
                    key={sceneId}
                    type="button"
                    onClick={() => {
                      if (targetSceneRef.current !== sceneId) {
                        currentSceneRef.current = targetSceneRef.current;
                        targetSceneRef.current = sceneId;
                        fadeProgressRef.current = 0;
                        setActiveSceneId(sceneId);
                        setActiveSectionName(
                          sceneId === 'orchestration'
                            ? 'Hero / About'
                            : sceneId === 'embeddings'
                            ? 'Career & Stack'
                            : 'Projects & Case Studies'
                        );
                      }
                    }}
                    title={label}
                    aria-label={`Switch background to ${label}`}
                    aria-pressed={isActive}
                    className={`w-6 h-6 rounded-lg text-[10px] font-mono flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-purple-600 text-white font-bold shadow-sm'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
