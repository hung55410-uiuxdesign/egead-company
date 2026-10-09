import { defineTheme } from '@astryxdesign/core/theme';

export const astryxTheme = defineTheme({
  name: 'astryx',
  color: {
    accent: '#111827',
    neutralStyle: 'cool',
    contrast: 'standard',
  },
  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: {
      family: 'Inter, system-ui, -apple-system, sans-serif',
      fallbacks: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    heading: {
      weight: 'semibold',
      weights: { 1: 'bold', 2: 'bold', 3: 'semibold', 4: 'semibold', 5: 'medium', 6: 'medium' },
    },
  },
  radius: { base: 6, multiplier: 1 },
  tokens: {
    '--color-accent': ['#111827', '#F9FAFB'],
    '--color-on-accent': ['#FFFFFF', '#111827'],
    '--color-text-accent': ['#111827', '#F9FAFB'],
    '--color-icon-accent': ['#111827', '#F9FAFB'],
    '--color-border-emphasized': ['#CBD5E1', '#475569'],
    '--text-label-size': '0.8125rem',
  },
});
