import { SiteThemeConfig, ModeThemePalette } from '../types';

export function applyThemeToDocument(themeConfig: SiteThemeConfig, mode: 'dark' | 'light') {
  const palette: ModeThemePalette = mode === 'dark' ? themeConfig.dark : themeConfig.light;
  const root = document.documentElement;

  // Set CSS variables
  root.style.setProperty('--theme-bg-primary', palette.bgPrimary);
  root.style.setProperty('--theme-bg-secondary', palette.bgSecondary);
  root.style.setProperty('--theme-bg-section', palette.bgSection);
  root.style.setProperty('--theme-bg-card', palette.bgCard);
  root.style.setProperty('--theme-bg-tile', palette.bgTile);
  root.style.setProperty('--theme-bg-header', palette.bgHeader);
  root.style.setProperty('--theme-bg-footer', palette.bgFooter);
  root.style.setProperty('--theme-bg-nav', palette.bgNav);

  root.style.setProperty('--theme-heading', palette.headingColor);
  root.style.setProperty('--theme-text-primary', palette.textMain);
  root.style.setProperty('--theme-text-secondary', palette.textSecondary);
  root.style.setProperty('--theme-text-muted', palette.textMuted);

  root.style.setProperty('--theme-button-bg', palette.buttonBg);
  root.style.setProperty('--theme-button-text', palette.buttonText);
  root.style.setProperty('--theme-button-hover', palette.buttonHover);

  root.style.setProperty('--theme-border', palette.borderColor);
  root.style.setProperty('--theme-icon', palette.iconColor);
  root.style.setProperty('--theme-link', palette.linkColor);
  root.style.setProperty('--theme-link-hover', palette.linkHoverColor);
  root.style.setProperty('--theme-accent', palette.accentColor);
  root.style.setProperty('--theme-highlight', palette.highlightColor);

  root.style.setProperty('--theme-input-bg', palette.inputBg);
  root.style.setProperty('--theme-input-border', palette.inputBorder);
  root.style.setProperty('--theme-input-text', palette.inputText);
  root.style.setProperty('--theme-input-placeholder', palette.inputPlaceholder);
  root.style.setProperty('--theme-modal-bg', palette.modalBg);

  // Cards
  root.style.setProperty('--theme-card-bg', palette.cardBg);
  root.style.setProperty('--theme-card-border', palette.cardBorder);
  root.style.setProperty('--theme-card-hover-bg', palette.cardHoverBg);
  root.style.setProperty('--theme-card-hover-border', palette.cardHoverBorder);
  root.style.setProperty('--theme-card-shadow', palette.cardShadow);

  // Inject or update dynamic stylesheet tag for fine-grained heading & typography classes
  let styleEl = document.getElementById('marketing-tycoons-dynamic-theme');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'marketing-tycoons-dynamic-theme';
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = `
    body {
      background-color: ${palette.bgPrimary} !important;
      color: ${palette.textMain} !important;
    }
    header, nav {
      background-color: ${palette.bgHeader} !important;
    }
    footer {
      background-color: ${palette.bgFooter} !important;
    }
    h1 {
      color: ${palette.h1.textColor} !important;
      font-weight: ${palette.h1.fontWeight} !important;
      ${palette.h1.fontSize ? `font-size: ${palette.h1.fontSize} !important;` : ''}
      ${palette.h1.letterSpacing ? `letter-spacing: ${palette.h1.letterSpacing} !important;` : ''}
    }
    h2 {
      color: ${palette.h2.textColor} !important;
      font-weight: ${palette.h2.fontWeight} !important;
      ${palette.h2.fontSize ? `font-size: ${palette.h2.fontSize} !important;` : ''}
    }
    h3 {
      color: ${palette.h3.textColor} !important;
      font-weight: ${palette.h3.fontWeight} !important;
      ${palette.h3.fontSize ? `font-size: ${palette.h3.fontSize} !important;` : ''}
    }
    h4 {
      color: ${palette.h4.textColor} !important;
      font-weight: ${palette.h4.fontWeight} !important;
    }
    h5, h6 {
      color: ${palette.h5.textColor} !important;
    }
    .card-custom, .group\\/card, [class*="rounded-3xl bg-black"], [class*="rounded-2xl bg-black"] {
      background-color: ${palette.cardBg} !important;
      border-color: ${palette.cardBorder} !important;
    }
  `;
}
