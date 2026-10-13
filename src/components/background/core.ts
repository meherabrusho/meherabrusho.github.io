/**
 * Shared primitives for the section-driven AI background.
 *
 * Design rules every scene follows (see review notes):
 *  - No text is ever drawn on the canvas.
 *  - Focal elements live in the side gutters outside the 1024px content column;
 *    only ambient detail (mesh links, drifting points) crosses the center, where
 *    it shows through the gaps between cards.
 *  - Brand palette only (purple / indigo / sky).
 *  - No shadowBlur — glows are cheap translucent halos.
 */

export type RGB = readonly [number, number, number];

export interface Palette {
  dark: boolean;
  primary: RGB; // purple
  secondary: RGB; // indigo
  accent: RGB; // sky
  violet: RGB; // light purple
  neutral: RGB; // white in dark mode, slate in light mode
  /** Global alpha multiplier so light mode isn't heavier than dark mode */
  strength: number;
}

const DARK: Palette = {
  dark: true,
  primary: [168, 85, 247],
  secondary: [99, 102, 241],
  accent: [56, 189, 248],
  violet: [192, 132, 252],
  neutral: [255, 255, 255],
  strength: 1,
};

const LIGHT: Palette = {
  dark: false,
  primary: [126, 34, 206],
  secondary: [79, 70, 229],
  accent: [2, 132, 199],
  violet: [147, 51, 234],
  neutral: [15, 23, 42],
  strength: 0.45,
};

export const getPalette = (dark: boolean): Palette => (dark ? DARK : LIGHT);

export const rgba = (c: RGB, a: number) =>
  `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;

export const mixRGB = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

/** Deterministic PRNG so layouts don't reshuffle between renders/resizes. */
export function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Mirrors the site's `max-w-5xl` main column. */
const CONTENT_WIDTH = 1024;

export interface Layout {
  width: number;
  height: number;
  /** Width of each empty side gutter beside the content column (0 on small screens) */
  gutter: number;
  /** x positions where gutter-anchored focal elements should sit */
  leftX: number;
  rightX: number;
  /** Radius budget for a focal element so it mostly stays inside its gutter */
  focalRadius: number;
  compact: boolean;
}

export function computeLayout(width: number, height: number): Layout {
  const gutter = Math.max(0, (width - CONTENT_WIDTH) / 2);
  const compact = width < 768;
  // With a real gutter, center focal elements in it; otherwise hug the screen edges.
  const leftX = gutter >= 110 ? gutter / 2 : Math.max(28, width * 0.07);
  return {
    width,
    height,
    gutter,
    leftX,
    rightX: width - leftX,
    focalRadius: compact ? 38 : clamp(gutter * 0.45, 46, 110),
    compact,
  };
}

export interface Scene {
  /** (Re)build geometry for a new viewport. Must be safe to call repeatedly. */
  resize(layout: Layout): void;
  /** Advance the simulation. dt is in seconds and already clamped by the engine. */
  update(dt: number): void;
  /** Render with an overall alpha (used for cross-fades). */
  draw(g: CanvasRenderingContext2D, alpha: number, p: Palette): void;
  /** Jump to a representative still state (used for prefers-reduced-motion). */
  settle(): void;
}

export type SceneId = 'orchestration' | 'embeddings' | 'diffusion';
