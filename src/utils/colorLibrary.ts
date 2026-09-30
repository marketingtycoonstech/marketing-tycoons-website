export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  category: string;
  tags: string[];
}

// Generate 1000+ professional, distinct, and useful design colors programmatically and via curated palettes
export const generateProfessionalColorLibrary = (): ColorOption[] => {
  const colors: ColorOption[] = [];
  let idCounter = 1;

  // 1. Curated Master Brand & Luxury Colors
  const curatedMaster: { name: string; hex: string; category: string; tags: string[] }[] = [
    { name: 'Marketing Tycoons Gold', hex: '#d4af37', category: 'Gold & Amber', tags: ['gold', 'brand', 'luxury', 'accent'] },
    { name: 'Imperial Gold', hex: '#DFAB40', category: 'Gold & Amber', tags: ['gold', 'luxury', 'yellow'] },
    { name: 'Deep Obsidian', hex: '#000000', category: 'Premium Dark', tags: ['dark', 'black', 'background'] },
    { name: 'Midnight Void', hex: '#050505', category: 'Premium Dark', tags: ['dark', 'black', 'surface'] },
    { name: 'Carbon Studio', hex: '#0A0A0A', category: 'Premium Dark', tags: ['dark', 'card', 'tile'] },
    { name: 'Graphite Elite', hex: '#121319', category: 'Premium Dark', tags: ['dark', 'slate', 'modern'] },
    { name: 'Titanium Slate', hex: '#1A1D24', category: 'Premium Dark', tags: ['dark', 'slate', 'gray'] },
    { name: 'Pure White', hex: '#FFFFFF', category: 'Neutrals', tags: ['white', 'light', 'text'] },
    { name: 'Alabaster Canvas', hex: '#F8F7F3', category: 'Neutrals', tags: ['light', 'background', 'cream'] },
    { name: 'Ivory Surface', hex: '#FFFFFF', category: 'Neutrals', tags: ['light', 'surface', 'card'] },
  ];

  curatedMaster.forEach(c => {
    colors.push({ id: `col-${idCounter++}`, ...c });
  });

  // 2. Categories with shade generators to reach 1000+ professional distinct colors
  const categories: { category: string; baseHexes: { name: string; hex: string }[]; tags: string[] }[] = [
    {
      category: 'Professional Blues',
      tags: ['blue', 'corporate', 'tech'],
      baseHexes: [
        { name: 'Azure Deep', hex: '#1E40AF' }, { name: 'Royal Blue Pro', hex: '#2563EB' },
        { name: 'Cobalt Shield', hex: '#1D4ED8' }, { name: 'Skyline Blue', hex: '#3B82F6' },
        { name: 'Electric Azure', hex: '#60A5FA' }, { name: 'Ice Blue Horizon', hex: '#93C5FD' },
        { name: 'Midnight Blue', hex: '#0F172A' }, { name: 'Navy Corporate', hex: '#1E293B' },
        { name: 'Slate Blue', hex: '#334155' }, { name: 'Steel Blue', hex: '#475569' }
      ]
    },
    {
      category: 'Cyan & Teal',
      tags: ['cyan', 'teal', 'modern', 'tech'],
      baseHexes: [
        { name: 'Cyber Cyan', hex: '#06B6D4' }, { name: 'Deep Teal', hex: '#0F766E' },
        { name: 'Emerald Teal', hex: '#14B8A6' }, { name: 'Aquamarine Glow', hex: '#2DD4BF' },
        { name: 'Ocean Aqua', hex: '#0EA5E9' }, { name: 'Neon Aqua', hex: '#38BDF8' },
        { name: 'Turquoise Spark', hex: '#0D9488' }, { name: 'Mint Breeze', hex: '#5EEAD4' },
        { name: 'Deep Cyan', hex: '#155E75' }, { name: 'Frost Aqua', hex: '#7DD3FC' }
      ]
    },
    {
      category: 'Emerald & Green',
      tags: ['green', 'emerald', 'finance', 'success'],
      baseHexes: [
        { name: 'Emerald Elite', hex: '#059669' }, { name: 'Forest Green', hex: '#166534' },
        { name: 'Mint Green', hex: '#22C55E' }, { name: 'Lime Glow', hex: '#84CC16' },
        { name: 'Sage Green', hex: '#4ADE80' }, { name: 'Pine Green', hex: '#065F46' },
        { name: 'Verdant Leaf', hex: '#10B981' }, { name: 'Olive Corporate', hex: '#3F6212' },
        { name: 'Spring Meadow', hex: '#A3E635' }, { name: 'Deep Emerald', hex: '#047857' }
      ]
    },
    {
      category: 'Gold & Amber',
      tags: ['gold', 'amber', 'luxury', 'yellow'],
      baseHexes: [
        { name: 'Luxury Gold', hex: '#D4AF37' }, { name: 'Amber Glow', hex: '#F59E0B' },
        { name: 'Sunburst Yellow', hex: '#EAB308' }, { name: 'Honey Gold', hex: '#CA8A04' },
        { name: 'Warm Amber', hex: '#D97706' }, { name: 'Goldenrod', hex: '#FBBF24' },
        { name: 'Lemon Zest', hex: '#FACC15' }, { name: 'Dark Amber', hex: '#B45309' },
        { name: 'Buttercream', hex: '#FEF08A' }, { name: 'Champagne Gold', hex: '#FDE047' }
      ]
    },
    {
      category: 'Orange & Red',
      tags: ['orange', 'red', 'crimson', 'energy'],
      baseHexes: [
        { name: 'Vibrant Orange', hex: '#F97316' }, { name: 'Sunset Amber', hex: '#EA580C' },
        { name: 'Flame Red', hex: '#EF4444' }, { name: 'Crimson Power', hex: '#DC2626' },
        { name: 'Ruby Red', hex: '#991B1B' }, { name: 'Coral Punch', hex: '#FB923C' },
        { name: 'Burnt Orange', hex: '#C2410C' }, { name: 'Scarlet Fire', hex: '#B91C1C' },
        { name: 'Cherry Blossom', hex: '#F87171' }, { name: 'Blood Orange', hex: '#9A3412' }
      ]
    },
    {
      category: 'Purple, Violet & Indigo',
      tags: ['purple', 'violet', 'indigo', 'creative', 'luxury'],
      baseHexes: [
        { name: 'Royal Purple', hex: '#7C3AED' }, { name: 'Deep Violet', hex: '#6D28D9' },
        { name: 'Electric Indigo', hex: '#4F46E5' }, { name: 'Neon Purple', hex: '#8B5CF6' },
        { name: 'Amethyst Glow', hex: '#A78BFA' }, { name: 'Plum Luxe', hex: '#581C87' },
        { name: 'Lavender Mist', hex: '#C4B5FD' }, { name: 'Indigo Night', hex: '#312E81' },
        { name: 'Orchid Dream', hex: '#9333EA' }, { name: 'Grape Velvet', hex: '#7E22CE' }
      ]
    },
    {
      category: 'Pink & Magenta',
      tags: ['pink', 'magenta', 'rose', 'creative'],
      baseHexes: [
        { name: 'Hot Pink', hex: '#EC4899' }, { name: 'Magenta Pulse', hex: '#DB2777' },
        { name: 'Rose Gold', hex: '#F43F5E' }, { name: 'Blush Pink', hex: '#FB7185' },
        { name: 'Deep Magenta', hex: '#9D174D' }, { name: 'Fuchsia Glow', hex: '#E879F9' },
        { name: 'Orchid Pink', hex: '#F472B6' }, { name: 'Berry Neon', hex: '#BE185D' },
        { name: 'Soft Rose', hex: '#FDA4AF' }, { name: 'Neon Magenta', hex: '#C026D3' }
      ]
    },
    {
      category: 'Neutrals & Grays',
      tags: ['neutral', 'gray', 'slate', 'monochrome'],
      baseHexes: [
        { name: 'Slate 900', hex: '#0F172A' }, { name: 'Slate 800', hex: '#1E293B' },
        { name: 'Slate 700', hex: '#334155' }, { name: 'Slate 600', hex: '#475569' },
        { name: 'Slate 500', hex: '#64748B' }, { name: 'Slate 400', hex: '#94A3B8' },
        { name: 'Slate 300', hex: '#CBD5E1' }, { name: 'Slate 200', hex: '#E2E8F0' },
        { name: 'Charcoal Dark', hex: '#111827' }, { name: 'Zinc 900', hex: '#18181B' }
      ]
    },
    {
      category: 'Metallic & Luxury',
      tags: ['metallic', 'luxury', 'platinum', 'bronze'],
      baseHexes: [
        { name: 'Metallic Gold', hex: '#C5A059' }, { name: 'Rose Gold Metallic', hex: '#B76E79' },
        { name: 'Platinum Shield', hex: '#E5E4E2' }, { name: 'Bronze Antique', hex: '#CD7F32' },
        { name: 'Copper Gleam', hex: '#B87333' }, { name: 'Sterling Silver', hex: '#C0C0C0' },
        { name: 'Titanium Dark', hex: '#2A2E3D' }, { name: 'Champagne Shine', hex: '#F7E7CE' },
        { name: 'Brass Polish', hex: '#B5A642' }, { name: 'Gunmetal Gray', hex: '#2A3439' }
      ]
    },
    {
      category: 'Corporate & Tech',
      tags: ['corporate', 'tech', 'saas', 'modern'],
      baseHexes: [
        { name: 'SaaS Blue', hex: '#0284C7' }, { name: 'Cloud Indigo', hex: '#6366F1' },
        { name: 'Enterprise Navy', hex: '#0A192F' }, { name: 'Silicon Gray', hex: '#F1F5F9' },
        { name: 'Fintech Green', hex: '#059669' }, { name: 'Startup Purple', hex: '#7C3AED' },
        { name: 'AI Cyan', hex: '#06B6D4' }, { name: 'Growth Amber', hex: '#D97706' },
        { name: 'Venture Red', hex: '#E11D48' }, { name: 'Data Slate', hex: '#334155' }
      ]
    }
  ];

  // Algorithmic shade and tint generator to produce 1000+ distinct professional colors
  categories.forEach(cat => {
    cat.baseHexes.forEach(base => {
      colors.push({
        id: `col-${idCounter++}`,
        name: base.name,
        hex: base.hex,
        category: cat.category,
        tags: cat.tags
      });

      const rgb = hexToRgb(base.hex);
      if (!rgb) return;

      const multipliers = [0.4, 0.55, 0.7, 0.85, 1.15, 1.3, 1.45, 1.6, 1.75];
      multipliers.forEach((m, idx) => {
        const newR = Math.min(255, Math.max(0, Math.round(rgb.r * m)));
        const newG = Math.min(255, Math.max(0, Math.round(rgb.g * m)));
        const newB = Math.min(255, Math.max(0, Math.round(rgb.b * m)));
        const newHex = rgbToHex(newR, newG, newB);

        if (colors.some(c => c.hex.toLowerCase() === newHex.toLowerCase())) return;

        const modifier = m < 1 ? 'Deep ' : (m > 1.4 ? 'Light ' : 'Bright ');
        colors.push({
          id: `col-${idCounter++}`,
          name: `${modifier}${base.name} ${idx + 1}`,
          hex: newHex,
          category: cat.category,
          tags: [...cat.tags, m < 1 ? 'dark shade' : 'light tint']
        });
      });
    });
  });

  if (colors.length < 1000) {
    const hues = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    const saturations = [40, 65, 85];
    const lightnesses = [20, 35, 50, 65, 80];

    hues.forEach(h => {
      saturations.forEach(s => {
        lightnesses.forEach(l => {
          if (colors.length >= 1200) return;
          const hex = hslToHex(h, s, l);
          if (colors.some(c => c.hex.toLowerCase() === hex.toLowerCase())) return;
          colors.push({
            id: `col-${idCounter++}`,
            name: `Studio Palette H${h} S${s} L${l}`,
            hex,
            category: 'Creative Studio',
            tags: ['creative', 'studio', 'palette']
          });
        });
      });
    });
  }

  return colors;
};

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  if (isNaN(bigint)) return null;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function hexToRgbaString(hex: string, alpha = 1): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export function hexToHslString(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return 'hsl(0, 0%, 100%)';
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));
  return rgbToHex(r, g, b);
}

export function calculateContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0.5;
  const a = [rgb.r, rgb.g, rgb.b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
