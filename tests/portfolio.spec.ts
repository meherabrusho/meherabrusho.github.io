import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Mohtasin Meherab Sikder — Lead Engineer | iOS, IoT & Agentic AI/);
});

test('check for broken or placeholder links on home page', async ({ page }) => {
  await page.goto('/');
  
  // Find all links on the page
  const links = page.locator('a');
  const count = await links.count();
  
  const brokenLinks = [];
  for (let i = 0; i < count; i++) {
    const href = await links.nth(i).getAttribute('href');
    if (href === '#' || href === 'https://github.com/yourusername' || href === 'https://linkedin.com/in/yourusername' || href === 'https://x.com/yourusername') {
      brokenLinks.push(href);
    }
  }
  
  expect(brokenLinks, 'Found placeholder or broken links').toEqual([]);
});

test('check if mermaid diagrams are rendering', async ({ page }) => {
  await page.goto('/projects/agentic-ai-orchestration-layer');
  
  // Wait a little for possible client-side rendering or animations
  await page.waitForTimeout(2000);
  
  // The diagrams shouldn't render as <code class="language-mermaid"> blocks.
  // We want to test that they are actual rendered svgs from mermaid, or at least they aren't unrendered code blocks.
  const rawMermaidBlocks = page.locator('code.language-mermaid');
  const count = await rawMermaidBlocks.count();
  
  expect(count, 'Found raw unrendered mermaid code blocks').toBe(0);
});
