'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import BackgroundEngine from './background/BackgroundEngine';
import { SceneId } from './background/core';

export default function SiteBackground() {
  const pathname = usePathname();

  // Route-based scene resolution
  let forcedScene: SceneId | undefined = undefined;

  if (pathname.startsWith('/projects')) {
    // Projects catalog & individual project case studies
    forcedScene = 'diffusion';
  } else if (pathname.startsWith('/blog')) {
    // Blog articles & technical notes
    forcedScene = 'embeddings';
  } else if (pathname === '/') {
    // Home page: dynamic section-driven transitions (orchestration -> embeddings -> diffusion)
    forcedScene = undefined;
  } else {
    forcedScene = 'orchestration';
  }

  // Check if viewing a detailed long-form reading page
  const isReadingDetail =
    (pathname.startsWith('/blog/') && pathname !== '/blog') ||
    (pathname.startsWith('/projects/') && pathname !== '/projects');

  return (
    <BackgroundEngine
      forcedScene={forcedScene}
      showDock={false}
      dimOpacity={isReadingDetail}
    />
  );
}
