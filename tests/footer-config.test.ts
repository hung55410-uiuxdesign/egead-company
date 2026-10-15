import { describe, it, expect } from 'bun:test';
import {
  DEFAULT_FOOTER_CONFIG,
  normalizeFooterConfig,
  getFooterConfig,
  getFooterSection,
  FOOTER_SECTION_KEY,
} from '@/lib/services/footer-config.service';

describe('Footer Configuration Service Unit Tests', () => {
  it('DEFAULT_FOOTER_CONFIG has complete and authentic structure', () => {
    expect(DEFAULT_FOOTER_CONFIG).toBeDefined();
    expect(DEFAULT_FOOTER_CONFIG.topBar.logoUrl).toBe('/assets/logo/logo-color.png');
    expect(DEFAULT_FOOTER_CONFIG.topBar.networkTitle).toBe('JOIN OUR NETWORK');
    expect(DEFAULT_FOOTER_CONFIG.topBar.socialLinks.length).toBeGreaterThanOrEqual(4);

    expect(DEFAULT_FOOTER_CONFIG.navColumns.length).toBe(3);
    expect(DEFAULT_FOOTER_CONFIG.navColumns[0].title).toBe('What we do');
    expect(DEFAULT_FOOTER_CONFIG.navColumns[1].title).toBe('About');
    expect(DEFAULT_FOOTER_CONFIG.navColumns[2].title).toBe('Info');

    expect(DEFAULT_FOOTER_CONFIG.newsletter.title).toBe('Newsletter');
    expect(DEFAULT_FOOTER_CONFIG.newsletter.placeholder).toBe('name@youremail.com');

    expect(DEFAULT_FOOTER_CONFIG.timezones.length).toBeGreaterThanOrEqual(6);
    expect(DEFAULT_FOOTER_CONFIG.certification.badgeImage).toBe('/assets/Badges_SOC.svg');
    expect(DEFAULT_FOOTER_CONFIG.bottomBar.copyright).toContain('© 2026 E-Gead Company');
  });

  it('normalizeFooterConfig returns full defaults when null or empty object is passed', () => {
    const fromNull = normalizeFooterConfig(null);
    expect(fromNull).toEqual(DEFAULT_FOOTER_CONFIG);

    const fromEmpty = normalizeFooterConfig({});
    expect(fromEmpty.topBar.logoUrl).toBe(DEFAULT_FOOTER_CONFIG.topBar.logoUrl);
    expect(fromEmpty.navColumns.length).toBe(3);
    expect(fromEmpty.timezones.length).toBe(6);
  });

  it('normalizeFooterConfig preserves partial overrides and fills missing fields with defaults', () => {
    const custom = normalizeFooterConfig({
      topBar: {
        networkTitle: 'CONNECT WITH US',
      },
      bottomBar: {
        copyright: '© 2026 Custom Copyright Notice',
      },
    });

    expect(custom.topBar.networkTitle).toBe('CONNECT WITH US');
    expect(custom.topBar.logoUrl).toBe(DEFAULT_FOOTER_CONFIG.topBar.logoUrl);
    expect(custom.bottomBar.copyright).toBe('© 2026 Custom Copyright Notice');
    expect(custom.bottomBar.showLanguageSelector).toBe(true);
    expect(custom.navColumns.length).toBe(3);
  });

  it('getFooterConfig fetches from database and returns valid active config', async () => {
    const config = await getFooterConfig();
    expect(config).toBeDefined();
    expect(config.isActive).toBe(true);
    expect(config.topBar).toBeDefined();
    expect(config.navColumns.length).toBeGreaterThanOrEqual(1);
    expect(config.timezones.length).toBeGreaterThanOrEqual(1);
  });

  it('getFooterSection returns section model with key "footer-config"', async () => {
    const section = await getFooterSection();
    expect(section).toBeDefined();
    expect(section.key).toBe(FOOTER_SECTION_KEY);
    expect(section.name).toContain('Footer');
    expect(section.data).toBeDefined();
  });
});
