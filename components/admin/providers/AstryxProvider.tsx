'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Theme, LayerProvider } from '@astryxdesign/core';
import { LinkProvider } from '@astryxdesign/core/Link';
import { themes, defaultThemeSlug } from '@/components/admin/providers/astryx-themes';

export function AstryxProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const hadDark = html.classList.contains('dark');
    const prevDataTheme = html.getAttribute('data-theme');
    const prevAstryxTheme = html.getAttribute('data-astryx-theme');
    const prevColorScheme = html.style.colorScheme;
    const prevBodyBg = body.style.backgroundColor;
    const prevBodyColor = body.style.color;

    // Apply light mode with Astryx theme for admin
    html.classList.remove('dark');
    html.setAttribute('data-theme', 'light');
    html.setAttribute('data-astryx-theme', defaultThemeSlug);
    html.style.colorScheme = 'light';
    body.style.backgroundColor = '#F8FAFC';
    body.style.color = '#0F172A';

    return () => {
      // Restore on unmount when navigating back to public site
      if (hadDark) html.classList.add('dark');
      if (prevDataTheme) html.setAttribute('data-theme', prevDataTheme);
      else html.removeAttribute('data-theme');
      if (prevAstryxTheme) html.setAttribute('data-astryx-theme', prevAstryxTheme);
      else html.removeAttribute('data-astryx-theme');
      html.style.colorScheme = prevColorScheme;
      body.style.backgroundColor = prevBodyBg;
      body.style.color = prevBodyColor;
    };
  }, []);

  return (
    <Theme theme={themes[defaultThemeSlug]} mode="light">
      <LayerProvider toast={{ position: 'topEnd' }}>
        <LinkProvider component={Link}>{children}</LinkProvider>
      </LayerProvider>
    </Theme>
  );
}