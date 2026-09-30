import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { SiteThemeConfig, ModeThemePalette, HeadingThemeConfig } from '../../types';
import { generateProfessionalColorLibrary, ColorOption, hexToRgbaString, hexToHslString, calculateContrastRatio } from '../../utils/colorLibrary';
import {
  Palette,
  Sun,
  Moon,
  Sparkles,
  Save,
  Send,
  RotateCcw,
  Search,
  Star,
  Clock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Sliders,
  Type,
  Layout,
  Maximize2,
  ShieldCheck,
  X
} from 'lucide-react';

export const ThemeCustomizer: React.FC = () => {
  const { theme, siteTheme, updateThemeDraft, publishTheme, resetThemeToDefault, showNotification } = useApp();

  // Local draft state for editing without instantly publishing
  const [draftTheme, setDraftTheme] = useState<SiteThemeConfig>(JSON.parse(JSON.stringify(siteTheme)));
  const [activeTabMode, setActiveTabMode] = useState<'dark' | 'light'>(theme);
  const [activeSectionTab, setActiveSectionTab] = useState<'surfaces' | 'typography' | 'headings' | 'cards' | 'buttons'>('surfaces');

  // Color picker modal state
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [activeColorTarget, setActiveColorTarget] = useState<{ path: string; label: string; currentHex: string } | null>(null);
  const [colorSearchQuery, setColorSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [copiedHex, setCopiedHex] = useState(false);

  // Favorites & Recently used
  const [favorites, setFavorites] = useState<string[]>(['#D4AF37', '#000000', '#050505', '#0A0A0A', '#FFFFFF', '#7C3AED', '#3B82F6']);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>(['#D4AF37', '#121319', '#FFFFFF', '#1E293B', '#06B6D4']);

  // Reset confirmation dialog
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [resetTargetMode, setResetTargetMode] = useState<'dark' | 'light' | 'all' | 'default'>('all');

  const professionalColors = useMemo(() => generateProfessionalColorLibrary(), []);

  const categoriesList = useMemo(() => {
    const cats = Array.from(new Set(professionalColors.map(c => c.category)));
    return ['All', 'Favorites', 'Recently Used', ...cats];
  }, [professionalColors]);

  const filteredColors = useMemo(() => {
    return professionalColors.filter(c => {
      const matchesSearch =
        c.name.toLowerCase().includes(colorSearchQuery.toLowerCase()) ||
        c.hex.toLowerCase().includes(colorSearchQuery.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(colorSearchQuery.toLowerCase()));

      if (selectedCategoryFilter === 'Favorites') {
        return matchesSearch && favorites.includes(c.hex);
      }
      if (selectedCategoryFilter === 'Recently Used') {
        return matchesSearch && recentlyUsed.includes(c.hex);
      }
      const matchesCategory = selectedCategoryFilter === 'All' || c.category === selectedCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [professionalColors, colorSearchQuery, selectedCategoryFilter, favorites, recentlyUsed]);

  // Current palette being edited
  const currentPalette: ModeThemePalette = draftTheme[activeTabMode];

  const handlePaletteChange = (field: keyof ModeThemePalette, value: any) => {
    setDraftTheme(prev => ({
      ...prev,
      [activeTabMode]: {
        ...prev[activeTabMode],
        [field]: value
      }
    }));
  };

  const handleHeadingChange = (headingKey: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6', field: keyof HeadingThemeConfig, value: any) => {
    setDraftTheme(prev => ({
      ...prev,
      [activeTabMode]: {
        ...prev[activeTabMode],
        [headingKey]: {
          ...prev[activeTabMode][headingKey],
          [field]: value
        }
      }
    }));
  };

  const openColorPicker = (path: string, label: string, currentHex: string) => {
    setActiveColorTarget({ path, label, currentHex });
    setIsColorPickerOpen(true);
  };

  const applyColorSelection = (hex: string) => {
    if (!activeColorTarget) return;

    // Add to recently used
    setRecentlyUsed(prev => [hex, ...prev.filter(h => h.toLowerCase() !== hex.toLowerCase())].slice(0, 16));

    const parts = activeColorTarget.path.split('.');
    if (parts.length === 1) {
      handlePaletteChange(parts[0] as keyof ModeThemePalette, hex);
    } else if (parts.length === 3 && (parts[0] === 'dark' || parts[0] === 'light')) {
      // e.g. dark.h1.textColor
      const headingKey = parts[1] as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const field = parts[2] as keyof HeadingThemeConfig;
      handleHeadingChange(headingKey, field, hex);
    }
    setIsColorPickerOpen(false);
    showNotification(`Applied ${hex} to ${activeColorTarget.label}`);
  };

  const toggleFavorite = (hex: string) => {
    setFavorites(prev =>
      prev.includes(hex) ? prev.filter(h => h !== hex) : [...prev, hex]
    );
  };

  // Contrast check
  const contrastInfo = useMemo(() => {
    if (!activeColorTarget) return null;
    const bg = currentPalette.bgPrimary;
    const fg = activeColorTarget.currentHex;
    const ratio = calculateContrastRatio(bg, fg);
    let rating = 'Excellent';
    if (ratio < 3) rating = 'Poor (Low Contrast)';
    else if (ratio < 4.5) rating = 'Moderate (Good for large text)';
    return { ratio: ratio.toFixed(1), rating };
  }, [activeColorTarget, currentPalette]);

  const handleSaveDraft = () => {
    updateThemeDraft(draftTheme);
    showNotification('Theme draft saved locally.');
  };

  const handlePublish = async () => {
    try {
      await publishTheme(draftTheme);
      showNotification('Theme published to Firebase and live worldwide!');
    } catch (err: any) {
      showNotification('Failed to publish theme: ' + err.message, 'error');
    }
  };

  const confirmReset = () => {
    resetThemeToDefault(resetTargetMode);
    setDraftTheme(JSON.parse(JSON.stringify(siteTheme)));
    setIsResetConfirmOpen(false);
    showNotification('Theme settings restored successfully.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Header & Actions Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#121319] border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-wider mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Firebase Visual CMS</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Theme & Design Customizer</h2>
          <p className="text-xs text-gray-400 mt-1">
            Customize 1000+ professional colors, typography, cards, and surfaces independently for Dark and Light mode. Changes sync instantly via Firebase across all devices worldwide.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border border-gray-700"
          >
            <Save className="w-4 h-4 text-[#d4af37]" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-black text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Publish Theme Live</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setResetTargetMode('all');
              setIsResetConfirmOpen(true);
            }}
            className="p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-300 transition-colors cursor-pointer"
            title="Reset to Default Brand"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Toggle (Dark Mode vs Light Mode) */}
      <div className="flex items-center justify-between p-2 bg-[#121319] border border-gray-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTabMode('dark')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTabMode === 'dark'
                ? 'bg-[#d4af37] text-black shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Dark Mode Palette</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTabMode('light')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTabMode === 'light'
                ? 'bg-[#d4af37] text-black shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Light Mode Palette</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-4 text-xs text-gray-400 font-mono">
          <span>Config Version: v{draftTheme.version}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 font-semibold">Live Sync Active</span>
        </div>
      </div>

      {/* Section Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-3">
        {[
          { id: 'surfaces', label: 'Surfaces & Backgrounds', icon: Layout },
          { id: 'typography', label: 'Typography & Text Colors', icon: Type },
          { id: 'headings', label: 'Headings (H1 - H6)', icon: Sliders },
          { id: 'cards', label: 'Cards & Tiles Styling', icon: Maximize2 },
          { id: 'buttons', label: 'Buttons & Inputs', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSectionTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSectionTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#d4af37]/20 border border-[#d4af37]/60 text-[#d4af37]'
                  : 'bg-black/40 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Customization Editor Grid & Live Preview Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: Color & Typography Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. SURFACES & BACKGROUNDS */}
          {activeSectionTab === 'surfaces' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl bg-[#121319] border border-gray-800 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layout className="w-4 h-4 text-[#d4af37]" />
                  <span>{activeTabMode === 'dark' ? 'Dark Mode' : 'Light Mode'} Surface Backgrounds</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'bgPrimary', label: 'Main Website Background' },
                    { key: 'bgSecondary', label: 'Secondary Surface Background' },
                    { key: 'bgSection', label: 'Section Background' },
                    { key: 'bgCard', label: 'Card Surface Background' },
                    { key: 'bgTile', label: 'Tile Surface Background' },
                    { key: 'bgHeader', label: 'Header Navigation Background' },
                    { key: 'bgFooter', label: 'Footer Background' },
                    { key: 'modalBg', label: 'Modal Dialog Background' }
                  ].map(item => (
                    <div key={item.key} className="p-3.5 rounded-2xl bg-black/60 border border-gray-800/80 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{(currentPalette as any)[item.key]}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openColorPicker(item.key, item.label, (currentPalette as any)[item.key])}
                        className="w-10 h-10 rounded-xl border border-white/20 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shrink-0"
                        style={{ backgroundColor: (currentPalette as any)[item.key] }}
                      >
                        <Palette className="w-3.5 h-3.5 text-white mix-blend-difference" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. TYPOGRAPHY & TEXT COLORS */}
          {activeSectionTab === 'typography' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl bg-[#121319] border border-gray-800 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4 text-[#d4af37]" />
                  <span>Granular Text & Title Colors</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'headingColor', label: 'Primary Headings' },
                    { key: 'textMain', label: 'Main Body Text' },
                    { key: 'textSecondary', label: 'Secondary Text' },
                    { key: 'textMuted', label: 'Muted / Subdued Text' },
                    { key: 'pageTitleColor', label: 'Page Titles' },
                    { key: 'sectionTitleColor', label: 'Section Titles' },
                    { key: 'cardTitleColor', label: 'Card Titles' },
                    { key: 'serviceTitleColor', label: 'Service Titles' },
                    { key: 'navTextColor', label: 'Navigation Text' },
                    { key: 'linkColor', label: 'Hyperlinks' },
                    { key: 'linkHoverColor', label: 'Link Hover Color' },
                    { key: 'captionColor', label: 'Captions & Badges' }
                  ].map(item => (
                    <div key={item.key} className="p-3.5 rounded-2xl bg-black/60 border border-gray-800/80 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{(currentPalette as any)[item.key]}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openColorPicker(item.key, item.label, (currentPalette as any)[item.key])}
                        className="w-10 h-10 rounded-xl border border-white/20 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shrink-0"
                        style={{ backgroundColor: (currentPalette as any)[item.key] }}
                      >
                        <Palette className="w-3.5 h-3.5 text-white mix-blend-difference" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. HEADINGS (H1 - H6) */}
          {activeSectionTab === 'headings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl bg-[#121319] border border-gray-800 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#d4af37]" />
                  <span>Advanced H1 - H6 Heading Customizer</span>
                </h3>

                <div className="space-y-4">
                  {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map(hKey => {
                    const heading = currentPalette[hKey];
                    return (
                      <div key={hKey} className="p-4 rounded-2xl bg-black/60 border border-gray-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase text-[#d4af37] font-mono">{hKey.toUpperCase()} Heading</span>
                          <button
                            type="button"
                            onClick={() => openColorPicker(`${activeTabMode}.${hKey}.textColor`, `${hKey.toUpperCase()} Text Color`, heading.textColor)}
                            className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs text-white flex items-center gap-2 cursor-pointer"
                          >
                            <span className="w-3.5 h-3.5 rounded-md border border-white/20" style={{ backgroundColor: heading.textColor }} />
                            <span>Pick Color</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase text-gray-400 mb-1">Font Weight</label>
                            <select
                              value={heading.fontWeight}
                              onChange={e => handleHeadingChange(hKey, 'fontWeight', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none"
                            >
                              <option value="400">400 (Regular)</option>
                              <option value="600">600 (Semibold)</option>
                              <option value="700">700 (Bold)</option>
                              <option value="800">800 (Extrabold)</option>
                              <option value="900">900 (Black)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase text-gray-400 mb-1">Font Size</label>
                            <input
                              type="text"
                              value={heading.fontSize || ''}
                              onChange={e => handleHeadingChange(hKey, 'fontSize', e.target.value)}
                              placeholder="e.g. 3rem"
                              className="w-full px-3 py-1.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase text-gray-400 mb-1">Letter Spacing</label>
                            <input
                              type="text"
                              value={heading.letterSpacing || ''}
                              onChange={e => handleHeadingChange(hKey, 'letterSpacing', e.target.value)}
                              placeholder="e.g. -0.02em"
                              className="w-full px-3 py-1.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 4. CARDS & TILES STYLING */}
          {activeSectionTab === 'cards' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl bg-[#121319] border border-gray-800 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#d4af37]" />
                  <span>Cards & Tiles Global Customizer</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'cardBg', label: 'Card & Tile Background' },
                    { key: 'cardBorder', label: 'Card Border Color' },
                    { key: 'cardHoverBg', label: 'Card Hover Background' },
                    { key: 'cardHoverBorder', label: 'Card Hover Border' },
                    { key: 'cardTitleColorToken', label: 'Card Title Color' },
                    { key: 'cardTextColorToken', label: 'Card Body Text Color' },
                    { key: 'cardIconColor', label: 'Card Icon Color' },
                    { key: 'cardHighlight', label: 'Card Accent Highlight' }
                  ].map(item => (
                    <div key={item.key} className="p-3.5 rounded-2xl bg-black/60 border border-gray-800/80 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{(currentPalette as any)[item.key]}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openColorPicker(item.key, item.label, (currentPalette as any)[item.key])}
                        className="w-10 h-10 rounded-xl border border-white/20 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shrink-0"
                        style={{ backgroundColor: (currentPalette as any)[item.key].includes('rgba') ? '#D4AF37' : (currentPalette as any)[item.key] }}
                      >
                        <Palette className="w-3.5 h-3.5 text-white mix-blend-difference" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. BUTTONS & INPUTS */}
          {activeSectionTab === 'buttons' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl bg-[#121319] border border-gray-800 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>Buttons, Form Inputs & Interactive Surfaces</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'buttonBg', label: 'Primary Button Background' },
                    { key: 'buttonText', label: 'Primary Button Text Color' },
                    { key: 'buttonHover', label: 'Primary Button Hover Color' },
                    { key: 'borderColor', label: 'Global Border Color' },
                    { key: 'inputBg', label: 'Form Input Background' },
                    { key: 'inputBorder', label: 'Form Input Border' },
                    { key: 'inputText', label: 'Form Input Text Color' },
                    { key: 'inputPlaceholder', label: 'Input Placeholder Color' }
                  ].map(item => (
                    <div key={item.key} className="p-3.5 rounded-2xl bg-black/60 border border-gray-800/80 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">{(currentPalette as any)[item.key]}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openColorPicker(item.key, item.label, (currentPalette as any)[item.key])}
                        className="w-10 h-10 rounded-xl border border-white/20 shadow-md flex items-center justify-center cursor-pointer transition-transform hover:scale-105 shrink-0"
                        style={{ backgroundColor: (currentPalette as any)[item.key].includes('rgba') ? '#D4AF37' : (currentPalette as any)[item.key] }}
                      >
                        <Palette className="w-3.5 h-3.5 text-white mix-blend-difference" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right 5 Columns: Live Interactive Preview Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-6 p-6 rounded-3xl bg-[#121319] border border-[#d4af37]/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#d4af37]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Live Preview ({activeTabMode.toUpperCase()})</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-bold">
                Instant Render
              </span>
            </div>

            {/* Interactive Preview Container */}
            <div
              className="p-6 rounded-2xl border transition-all space-y-6"
              style={{
                backgroundColor: currentPalette.bgPrimary,
                color: currentPalette.textMain,
                borderColor: currentPalette.borderColor
              }}
            >
              {/* Mini Header */}
              <div
                className="p-3 rounded-xl flex items-center justify-between border"
                style={{ backgroundColor: currentPalette.bgHeader, borderColor: currentPalette.borderColor }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#d4af37] flex items-center justify-center font-black text-black text-xs">MT</div>
                  <span className="text-xs font-bold" style={{ color: currentPalette.headingColor }}>Marketing Tycoons</span>
                </div>
                <span className="text-[10px]" style={{ color: currentPalette.accentColor }}>Active Theme</span>
              </div>

              {/* Hero Title & Text */}
              <div className="space-y-2">
                <h1 className="text-xl font-extrabold tracking-tight" style={{ color: currentPalette.h1.textColor }}>
                  Scale Your Brand With Elite Digital Authority
                </h1>
                <p className="text-xs leading-relaxed" style={{ color: currentPalette.textSecondary }}>
                  Experience high-converting digital engineering, cinematic content production, and relentless scaling strategies.
                </p>
              </div>

              {/* Sample Card */}
              <div
                className="p-4 rounded-xl border space-y-2 shadow-lg"
                style={{ backgroundColor: currentPalette.cardBg, borderColor: currentPalette.cardBorder }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: currentPalette.cardTitleColorToken }}>Enterprise Growth Package</span>
                  <Sparkles className="w-4 h-4" style={{ color: currentPalette.cardIconColor }} />
                </div>
                <p className="text-[11px]" style={{ color: currentPalette.cardTextColorToken }}>
                  Designed for category-defining brands seeking absolute market dominance.
                </p>
              </div>

              {/* Buttons & Inputs Sample */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                  style={{ backgroundColor: currentPalette.buttonBg, color: currentPalette.buttonText }}
                >
                  Book Executive Consultation
                </button>

                <input
                  type="text"
                  placeholder="Enter your work email..."
                  readOnly
                  className="w-full px-3 py-2 rounded-xl text-xs border outline-none"
                  style={{
                    backgroundColor: currentPalette.inputBg,
                    borderColor: currentPalette.inputBorder,
                    color: currentPalette.inputText
                  }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-gray-800 text-center space-y-2">
              <p className="text-xs text-gray-400">Happy with your design adjustments?</p>
              <button
                type="button"
                onClick={handlePublish}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                Publish Theme Live Worldwide
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 1000+ PROFESSIONAL COLOR LIBRARY & PICKER MODAL */}
      {isColorPickerOpen && activeColorTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#121319] border border-[#d4af37]/40 shadow-2xl p-6 sm:p-8 text-left space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block">1000+ Professional Color System</span>
                <h3 className="font-display text-xl font-bold text-white">Select Color for: {activeColorTarget.label}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsColorPickerOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active Color Preview & Code Input */}
            <div className="p-5 rounded-2xl bg-black/60 border border-gray-800 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-4 flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-2xl border-2 border-white/30 shadow-xl shrink-0"
                  style={{ backgroundColor: activeColorTarget.currentHex }}
                />
                <div>
                  <div className="text-xs font-bold text-white">Selected Color</div>
                  <div className="text-xs font-mono text-[#d4af37] mt-1">{activeColorTarget.currentHex}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-0.5">{hexToHslString(activeColorTarget.currentHex)}</div>
                </div>
              </div>

              <div className="sm:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activeColorTarget.currentHex}
                    onChange={(e) => {
                      const val = e.target.value;
                      setActiveColorTarget(prev => prev ? { ...prev, currentHex: val } : null);
                    }}
                    placeholder="#7C3AED"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white font-mono text-xs focus:border-[#d4af37] outline-none"
                  />
                  <input
                    type="color"
                    value={activeColorTarget.currentHex.startsWith('#') ? activeColorTarget.currentHex : '#D4AF37'}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setActiveColorTarget(prev => prev ? { ...prev, currentHex: val } : null);
                    }}
                    className="w-11 h-11 rounded-xl bg-transparent cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => applyColorSelection(activeColorTarget.currentHex)}
                    className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-black font-bold text-xs hover:bg-[#DFAB40] transition-colors cursor-pointer"
                  >
                    Apply Color
                  </button>
                </div>

                {/* Contrast warning */}
                {contrastInfo && (
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs ${
                    parseFloat(contrastInfo.ratio) >= 4.5 ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300' : 'bg-amber-950/50 border border-amber-800 text-amber-300'
                  }`}>
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Contrast Ratio: <strong>{contrastInfo.ratio}:1</strong> ({contrastInfo.rating})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Library Search & Category Filters */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={colorSearchQuery}
                    onChange={e => setColorSearchQuery(e.target.value)}
                    placeholder="Search 1000+ colors by name or HEX (e.g. 'Royal Blue' or '#3B82F6')..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090a0d] border border-gray-800 text-white text-xs focus:border-[#d4af37] outline-none"
                  />
                </div>

                <select
                  value={selectedCategoryFilter}
                  onChange={e => setSelectedCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-[#090a0d] border border-gray-800 text-white text-xs focus:border-[#d4af37] outline-none"
                >
                  {categoriesList.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Color Swatches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-72 overflow-y-auto p-2 bg-black/40 rounded-2xl border border-gray-800">
                {filteredColors.map(c => {
                  const isFavorite = favorites.includes(c.hex);
                  return (
                    <div
                      key={c.id}
                      onClick={() => applyColorSelection(c.hex)}
                      className="group relative p-2.5 rounded-xl bg-[#121319] hover:bg-white/5 border border-gray-800 hover:border-[#d4af37] transition-all cursor-pointer flex flex-col items-center text-center space-y-1.5"
                    >
                      <div
                        className="w-full h-12 rounded-lg border border-white/10 shadow-inner relative flex items-center justify-center"
                        style={{ backgroundColor: c.hex }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(c.hex);
                          }}
                          className={`absolute top-1 right-1 p-1 rounded-md transition-colors ${isFavorite ? 'text-amber-400 bg-black/60' : 'text-white/40 hover:text-white bg-black/40'}`}
                        >
                          <Star className="w-3 h-3 fill-current" />
                        </button>
                      </div>
                      <div className="w-full overflow-hidden">
                        <div className="text-[11px] font-bold text-white truncate">{c.name}</div>
                        <div className="text-[9px] text-gray-400 font-mono">{c.hex}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121319] border border-red-900/50 p-6 rounded-2xl w-full max-w-sm space-y-4">
            <h3 className="text-white font-bold text-lg">Restore Default Theme?</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              This will reset all custom theme settings back to the official Marketing Tycoons gold & obsidian brand defaults.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-800 text-white font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReset}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs cursor-pointer"
              >
                Reset Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
