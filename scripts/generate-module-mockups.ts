/**
 * Script to generate placeholder mockup images for Sanity module picker
 * Run with: bun scripts/generate-module-mockups.ts
 */

const modules = [
  // Hero modules
  { name: "heroDefault", title: "Hero Default", category: "Hero", icon: "◇" },
  { name: "heroCentered", title: "Hero Centered", category: "Hero", icon: "◈" },
  { name: "heroSplit", title: "Hero Split", category: "Hero", icon: "▧" },
  { name: "heroVideo", title: "Hero Video", category: "Hero", icon: "▶" },
  { name: "heroMinimal", title: "Hero Minimal", category: "Hero", icon: "─" },

  // Features modules
  { name: "featuresGrid", title: "Features Grid", category: "Features", icon: "▦" },
  { name: "featuresAlternating", title: "Features Alternating", category: "Features", icon: "≋" },
  { name: "featuresIconCards", title: "Features Icon Cards", category: "Features", icon: "❖" },

  // Pricing modules
  { name: "pricingCards", title: "Pricing Cards", category: "Pricing", icon: "$" },
  { name: "pricingComparison", title: "Pricing Comparison", category: "Pricing", icon: "⇆" },
  { name: "pricingSimple", title: "Pricing Simple", category: "Pricing", icon: "◻" },

  // Testimonials modules
  { name: "testimonialsGrid", title: "Testimonials Grid", category: "Testimonials", icon: "❝" },
  { name: "testimonialsCarousel", title: "Testimonials Carousel", category: "Testimonials", icon: "◀▶" },
  { name: "testimonialsFeatured", title: "Testimonials Featured", category: "Testimonials", icon: "★" },
  { name: "testimonialsCarouselLarge", title: "Testimonials Large", category: "Testimonials", icon: "◀━▶" },

  // Team modules
  { name: "teamGrid", title: "Team Grid", category: "Team", icon: "👤" },
  { name: "teamCards", title: "Team Cards", category: "Team", icon: "◰" },
  { name: "teamCompact", title: "Team Compact", category: "Team", icon: "⊡" },

  // CTA modules
  { name: "cta.default", title: "CTA Default", category: "CTA", icon: "→" },
  { name: "cta.newsletter", title: "CTA Newsletter", category: "CTA", icon: "✉" },
  { name: "cta.split", title: "CTA Split", category: "CTA", icon: "▤" },
  { name: "cta.banner", title: "CTA Banner", category: "CTA", icon: "▬" },
  { name: "cta.stats", title: "CTA Stats", category: "CTA", icon: "📊" },

  // Social Proof modules
  { name: "socialProof.logos", title: "Social Proof Logos", category: "Social Proof", icon: "◎" },
  { name: "socialProof.stats", title: "Social Proof Stats", category: "Social Proof", icon: "№" },

  // Logo Cloud modules
  { name: "logoCloudSimple", title: "Logo Cloud Simple", category: "Logo Cloud", icon: "○○○" },
  { name: "logoCloudMarquee", title: "Logo Cloud Marquee", category: "Logo Cloud", icon: "→○→" },
  { name: "logoCloudGrid", title: "Logo Cloud Grid", category: "Logo Cloud", icon: "▣" },

  // FAQ modules
  { name: "faqAccordion", title: "FAQ Accordion", category: "FAQ", icon: "▼" },
  { name: "faqTwoColumn", title: "FAQ Two Column", category: "FAQ", icon: "║║" },
  { name: "faqWithCategories", title: "FAQ Categories", category: "FAQ", icon: "☰" },
  { name: "faqSimple", title: "FAQ Simple", category: "FAQ", icon: "?" },

  // Gallery modules
  { name: "galleryGrid", title: "Gallery Grid", category: "Gallery", icon: "▦" },
  { name: "galleryMasonry", title: "Gallery Masonry", category: "Gallery", icon: "▥" },
  { name: "galleryCarousel", title: "Gallery Carousel", category: "Gallery", icon: "◀▶" },

  // Blog modules
  { name: "blogFeaturedPost", title: "Blog Featured", category: "Blog", icon: "◆" },
  { name: "blogGrid", title: "Blog Grid", category: "Blog", icon: "▦" },
  { name: "blogList", title: "Blog List", category: "Blog", icon: "≡" },
  { name: "blogCarousel", title: "Blog Carousel", category: "Blog", icon: "◀▶" },
  { name: "blogMinimal", title: "Blog Minimal", category: "Blog", icon: "─" },

  // Form modules
  { name: "formContact", title: "Contact Form", category: "Form", icon: "✎" },
  { name: "formNewsletter", title: "Newsletter Form", category: "Form", icon: "✉" },
  { name: "formWithImage", title: "Form with Image", category: "Form", icon: "▤" },
  { name: "formMultiStep", title: "Multi-Step Form", category: "Form", icon: "①②③" },
];

// Category colors (Aurora theme inspired)
const categoryColors: Record<string, { bg: string; accent: string; text: string }> = {
  "Hero": { bg: "#0f0f23", accent: "#6366f1", text: "#a5b4fc" },
  "Features": { bg: "#0f1419", accent: "#10b981", text: "#6ee7b7" },
  "Pricing": { bg: "#1a0f1f", accent: "#f472b6", text: "#f9a8d4" },
  "Testimonials": { bg: "#0f1a1a", accent: "#14b8a6", text: "#5eead4" },
  "Team": { bg: "#1a1a0f", accent: "#eab308", text: "#fde047" },
  "CTA": { bg: "#1f0f1a", accent: "#a855f7", text: "#d8b4fe" },
  "Social Proof": { bg: "#0f1419", accent: "#3b82f6", text: "#93c5fd" },
  "Logo Cloud": { bg: "#0f0f1a", accent: "#8b5cf6", text: "#c4b5fd" },
  "FAQ": { bg: "#1a0f0f", accent: "#ef4444", text: "#fca5a5" },
  "Gallery": { bg: "#0f1a14", accent: "#22c55e", text: "#86efac" },
  "Blog": { bg: "#140f1a", accent: "#ec4899", text: "#f9a8d4" },
  "Form": { bg: "#0f141a", accent: "#0ea5e9", text: "#7dd3fc" },
};

function generateSVG(module: typeof modules[0]): string {
  const colors = categoryColors[module.category] || categoryColors["Hero"];

  // Create a simple wireframe representation based on module type
  const wireframe = getWireframe(module.name, colors);

  return `<svg width="640" height="360" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${module.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${adjustColor(colors.bg, 20)};stop-opacity:1" />
    </linearGradient>
    <filter id="glow-${module.name}">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="640" height="360" fill="url(#grad-${module.name})"/>

  <!-- Grid pattern -->
  <pattern id="grid-${module.name}" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${colors.accent}" stroke-opacity="0.08" stroke-width="1"/>
  </pattern>
  <rect width="640" height="360" fill="url(#grid-${module.name})"/>

  <!-- Wireframe representation -->
  ${wireframe}

  <!-- Category badge -->
  <rect x="20" y="20" width="${module.category.length * 10 + 24}" height="28" rx="4" fill="${colors.accent}" fill-opacity="0.2"/>
  <text x="32" y="39" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="${colors.text}">${module.category}</text>

  <!-- Module title -->
  <text x="320" y="340" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="${colors.text}" text-anchor="middle" fill-opacity="0.7">${module.title}</text>
</svg>`;
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function getWireframe(moduleName: string, colors: { accent: string; text: string }): string {
  const { accent, text } = colors;

  // Hero layouts
  if (moduleName.includes("hero")) {
    if (moduleName === "heroDefault") {
      return `
        <rect x="60" y="80" width="280" height="24" rx="4" fill="${text}" fill-opacity="0.3"/>
        <rect x="60" y="116" width="200" height="16" rx="3" fill="${text}" fill-opacity="0.15"/>
        <rect x="60" y="144" width="240" height="16" rx="3" fill="${text}" fill-opacity="0.15"/>
        <rect x="60" y="180" width="120" height="40" rx="6" fill="${accent}"/>
        <rect x="380" y="70" width="200" height="180" rx="8" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-opacity="0.3"/>
      `;
    }
    if (moduleName === "heroCentered") {
      return `
        <rect x="170" y="100" width="300" height="28" rx="4" fill="${text}" fill-opacity="0.3"/>
        <rect x="200" y="145" width="240" height="14" rx="3" fill="${text}" fill-opacity="0.15"/>
        <rect x="220" y="170" width="200" height="14" rx="3" fill="${text}" fill-opacity="0.15"/>
        <rect x="240" y="210" width="80" height="36" rx="6" fill="${accent}"/>
        <rect x="330" y="210" width="80" height="36" rx="6" fill="${accent}" fill-opacity="0.3" stroke="${accent}"/>
      `;
    }
    if (moduleName === "heroSplit") {
      return `
        <rect x="40" y="60" width="260" height="240" rx="8" fill="${accent}" fill-opacity="0.15"/>
        <rect x="340" y="100" width="260" height="24" rx="4" fill="${text}" fill-opacity="0.3"/>
        <rect x="340" y="140" width="200" height="14" rx="3" fill="${text}" fill-opacity="0.15"/>
        <rect x="340" y="165" width="220" height="14" rx="3" fill="${text}" fill-opacity="0.15"/>
        <rect x="340" y="210" width="100" height="36" rx="6" fill="${accent}"/>
      `;
    }
    if (moduleName === "heroVideo") {
      return `
        <rect x="120" y="60" width="400" height="200" rx="8" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-opacity="0.3"/>
        <circle cx="320" cy="160" r="30" fill="${accent}" fill-opacity="0.5"/>
        <polygon points="312,145 312,175 340,160" fill="${text}"/>
        <rect x="220" y="280" width="200" height="14" rx="3" fill="${text}" fill-opacity="0.2"/>
      `;
    }
    if (moduleName === "heroMinimal") {
      return `
        <rect x="120" y="140" width="400" height="32" rx="4" fill="${text}" fill-opacity="0.25"/>
        <rect x="200" y="190" width="240" height="14" rx="3" fill="${text}" fill-opacity="0.1"/>
      `;
    }
  }

  // Features layouts
  if (moduleName.includes("features")) {
    if (moduleName === "featuresGrid") {
      return `
        <g transform="translate(80, 80)">
          ${[0, 1, 2].map(i => `
            <rect x="${i * 160}" y="0" width="140" height="100" rx="6" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-opacity="0.2"/>
            <circle cx="${i * 160 + 30}" cy="30" r="16" fill="${accent}" fill-opacity="0.3"/>
            <rect x="${i * 160 + 10}" y="60" width="80" height="10" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="${i * 160 + 10}" y="78" width="100" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          `).join("")}
        </g>
        <g transform="translate(80, 200)">
          ${[0, 1, 2].map(i => `
            <rect x="${i * 160}" y="0" width="140" height="100" rx="6" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.15"/>
          `).join("")}
        </g>
      `;
    }
    if (moduleName === "featuresAlternating") {
      return `
        <rect x="60" y="80" width="240" height="100" rx="6" fill="${accent}" fill-opacity="0.15"/>
        <rect x="340" y="90" width="180" height="16" rx="3" fill="${text}" fill-opacity="0.25"/>
        <rect x="340" y="120" width="220" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="340" y="140" width="200" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>

        <rect x="340" y="210" width="240" height="100" rx="6" fill="${accent}" fill-opacity="0.15"/>
        <rect x="60" y="220" width="180" height="16" rx="3" fill="${text}" fill-opacity="0.25"/>
        <rect x="60" y="250" width="220" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
      `;
    }
    if (moduleName === "featuresIconCards") {
      return `
        ${[0, 1, 2, 3].map(i => `
          <g transform="translate(${80 + (i % 4) * 130}, ${90 + Math.floor(i / 4) * 120})">
            <rect width="110" height="140" rx="8" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.2"/>
            <rect x="35" y="20" width="40" height="40" rx="8" fill="${accent}" fill-opacity="0.3"/>
            <rect x="20" y="75" width="70" height="12" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="15" y="95" width="80" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
            <rect x="20" y="110" width="70" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
      `;
    }
  }

  // Pricing layouts
  if (moduleName.includes("pricing")) {
    if (moduleName === "pricingCards") {
      return `
        ${[0, 1, 2].map(i => `
          <g transform="translate(${90 + i * 160}, 60)">
            <rect width="140" height="240" rx="8" fill="${accent}" fill-opacity="${i === 1 ? 0.2 : 0.1}" stroke="${accent}" stroke-opacity="${i === 1 ? 0.4 : 0.2}" stroke-width="${i === 1 ? 2 : 1}"/>
            <rect x="30" y="25" width="80" height="14" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="40" y="55" width="60" height="24" rx="2" fill="${text}" fill-opacity="0.3"/>
            ${[0, 1, 2, 3].map(j => `<rect x="25" y="${100 + j * 25}" width="90" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>`).join("")}
            <rect x="20" y="200" width="100" height="30" rx="4" fill="${accent}" fill-opacity="${i === 1 ? 0.8 : 0.3}"/>
          </g>
        `).join("")}
      `;
    }
    if (moduleName === "pricingComparison") {
      return `
        <rect x="60" y="60" width="520" height="240" rx="8" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.2"/>
        <line x1="200" y1="60" x2="200" y2="300" stroke="${accent}" stroke-opacity="0.2"/>
        <line x1="340" y1="60" x2="340" y2="300" stroke="${accent}" stroke-opacity="0.2"/>
        <line x1="480" y1="60" x2="480" y2="300" stroke="${accent}" stroke-opacity="0.2"/>
        ${[0, 1, 2, 3, 4].map(i => `<line x1="60" y1="${100 + i * 40}" x2="580" y2="${100 + i * 40}" stroke="${accent}" stroke-opacity="0.1"/>`).join("")}
      `;
    }
    if (moduleName === "pricingSimple") {
      return `
        <rect x="170" y="80" width="300" height="200" rx="8" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-opacity="0.25"/>
        <rect x="270" y="110" width="100" height="20" rx="3" fill="${text}" fill-opacity="0.25"/>
        <rect x="250" y="150" width="140" height="30" rx="4" fill="${text}" fill-opacity="0.3"/>
        <rect x="220" y="200" width="200" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="240" y="220" width="160" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="250" y="250" width="140" height="36" rx="6" fill="${accent}"/>
      `;
    }
  }

  // Testimonials layouts
  if (moduleName.includes("testimonials")) {
    if (moduleName === "testimonialsGrid") {
      return `
        ${[0, 1, 2].map(i => `
          <g transform="translate(${80 + i * 165}, 80)">
            <rect width="145" height="180" rx="8" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.2"/>
            <circle cx="40" cy="40" r="20" fill="${accent}" fill-opacity="0.3"/>
            <rect x="70" y="30" width="60" height="10" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="70" y="46" width="40" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
            <rect x="15" y="80" width="115" height="8" rx="2" fill="${text}" fill-opacity="0.15"/>
            <rect x="15" y="96" width="100" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
            <rect x="15" y="112" width="110" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
      `;
    }
    if (moduleName === "testimonialsCarousel" || moduleName === "testimonialsCarouselLarge") {
      const scale = moduleName === "testimonialsCarouselLarge" ? 1.2 : 1;
      return `
        <rect x="${160 / scale}" y="${80 / scale}" width="${320 * scale}" height="${180 * scale}" rx="8" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-opacity="0.25"/>
        <circle cx="320" cy="${130 * scale}" r="${30 * scale}" fill="${accent}" fill-opacity="0.3"/>
        <rect x="${220 / scale}" y="${180 * scale}" width="200" height="12" rx="2" fill="${text}" fill-opacity="0.2"/>
        <rect x="${240 / scale}" y="${200 * scale}" width="160" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <circle cx="80" cy="180" r="20" fill="${accent}" fill-opacity="0.2"/>
        <circle cx="560" cy="180" r="20" fill="${accent}" fill-opacity="0.2"/>
        <text x="80" y="186" font-family="system-ui" font-size="16" fill="${text}" text-anchor="middle">‹</text>
        <text x="560" y="186" font-family="system-ui" font-size="16" fill="${text}" text-anchor="middle">›</text>
      `;
    }
    if (moduleName === "testimonialsFeatured") {
      return `
        <rect x="100" y="60" width="440" height="220" rx="8" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.2"/>
        <circle cx="200" cy="170" r="50" fill="${accent}" fill-opacity="0.3"/>
        <rect x="280" y="100" width="220" height="16" rx="3" fill="${text}" fill-opacity="0.25"/>
        <rect x="280" y="130" width="200" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="280" y="150" width="180" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="280" y="170" width="190" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="280" y="210" width="120" height="12" rx="2" fill="${text}" fill-opacity="0.2"/>
        <rect x="280" y="230" width="80" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
      `;
    }
  }

  // Team layouts
  if (moduleName.includes("team")) {
    if (moduleName === "teamGrid") {
      return `
        ${[0, 1, 2, 3].map(i => `
          <g transform="translate(${90 + i * 125}, 100)">
            <circle cx="50" cy="50" r="40" fill="${accent}" fill-opacity="0.2"/>
            <rect x="15" y="110" width="70" height="12" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="25" y="130" width="50" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
      `;
    }
    if (moduleName === "teamCards") {
      return `
        ${[0, 1, 2].map(i => `
          <g transform="translate(${90 + i * 160}, 80)">
            <rect width="140" height="200" rx="8" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.2"/>
            <rect x="20" y="20" width="100" height="100" rx="6" fill="${accent}" fill-opacity="0.2"/>
            <rect x="25" y="135" width="90" height="12" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="35" y="155" width="70" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
            <rect x="40" y="175" width="60" height="8" rx="2" fill="${accent}" fill-opacity="0.3"/>
          </g>
        `).join("")}
      `;
    }
    if (moduleName === "teamCompact") {
      return `
        ${[0, 1, 2, 3, 4, 5].map(i => `
          <g transform="translate(${60 + (i % 3) * 180}, ${90 + Math.floor(i / 3) * 100})">
            <circle cx="30" cy="30" r="25" fill="${accent}" fill-opacity="0.2"/>
            <rect x="70" y="15" width="100" height="12" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="70" y="35" width="70" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
      `;
    }
  }

  // CTA layouts
  if (moduleName.startsWith("cta")) {
    if (moduleName === "cta.default") {
      return `
        <rect x="100" y="100" width="440" height="160" rx="12" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-opacity="0.25"/>
        <rect x="170" y="130" width="300" height="24" rx="4" fill="${text}" fill-opacity="0.3"/>
        <rect x="200" y="170" width="240" height="12" rx="2" fill="${text}" fill-opacity="0.15"/>
        <rect x="270" y="210" width="100" height="36" rx="6" fill="${accent}"/>
      `;
    }
    if (moduleName === "cta.newsletter") {
      return `
        <rect x="120" y="110" width="400" height="140" rx="12" fill="${accent}" fill-opacity="0.15"/>
        <rect x="180" y="135" width="280" height="20" rx="3" fill="${text}" fill-opacity="0.25"/>
        <rect x="200" y="170" width="240" height="12" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="160" y="200" width="240" height="36" rx="6" fill="${text}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.3"/>
        <rect x="410" y="200" width="80" height="36" rx="6" fill="${accent}"/>
      `;
    }
    if (moduleName === "cta.split") {
      return `
        <rect x="40" y="80" width="280" height="200" rx="8" fill="${accent}" fill-opacity="0.15"/>
        <rect x="360" y="120" width="220" height="20" rx="3" fill="${text}" fill-opacity="0.25"/>
        <rect x="360" y="155" width="200" height="12" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="360" y="180" width="180" height="12" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="360" y="220" width="100" height="36" rx="6" fill="${accent}"/>
      `;
    }
    if (moduleName === "cta.banner") {
      return `
        <rect x="40" y="140" width="560" height="80" rx="8" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-opacity="0.3"/>
        <rect x="80" y="165" width="200" height="16" rx="3" fill="${text}" fill-opacity="0.3"/>
        <rect x="80" y="190" width="280" height="10" rx="2" fill="${text}" fill-opacity="0.15"/>
        <rect x="480" y="160" width="90" height="36" rx="6" fill="${accent}"/>
      `;
    }
    if (moduleName === "cta.stats") {
      return `
        <rect x="80" y="80" width="480" height="200" rx="12" fill="${accent}" fill-opacity="0.1"/>
        <rect x="220" y="100" width="200" height="20" rx="3" fill="${text}" fill-opacity="0.25"/>
        ${[0, 1, 2, 3].map(i => `
          <g transform="translate(${120 + i * 110}, 150)">
            <rect x="0" y="0" width="80" height="30" rx="4" fill="${text}" fill-opacity="0.3"/>
            <rect x="10" y="40" width="60" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
        <rect x="250" y="230" width="140" height="36" rx="6" fill="${accent}"/>
      `;
    }
  }

  // Social Proof layouts
  if (moduleName.startsWith("socialProof")) {
    if (moduleName === "socialProof.logos") {
      return `
        <rect x="170" y="80" width="300" height="20" rx="3" fill="${text}" fill-opacity="0.2"/>
        ${[0, 1, 2, 3, 4].map(i => `
          <rect x="${80 + i * 105}" y="140" width="80" height="50" rx="4" fill="${accent}" fill-opacity="0.15"/>
        `).join("")}
        <rect x="220" y="220" width="200" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
      `;
    }
    if (moduleName === "socialProof.stats") {
      return `
        <rect x="150" y="60" width="340" height="20" rx="3" fill="${text}" fill-opacity="0.2"/>
        ${[0, 1, 2, 3].map(i => `
          <g transform="translate(${90 + i * 125}, 120)">
            <rect width="100" height="100" rx="8" fill="${accent}" fill-opacity="0.1"/>
            <rect x="20" y="25" width="60" height="24" rx="3" fill="${text}" fill-opacity="0.3"/>
            <rect x="25" y="60" width="50" height="10" rx="2" fill="${text}" fill-opacity="0.15"/>
          </g>
        `).join("")}
      `;
    }
  }

  // Logo Cloud layouts
  if (moduleName.includes("logoCloud")) {
    if (moduleName === "logoCloudSimple") {
      return `
        <rect x="220" y="60" width="200" height="16" rx="2" fill="${text}" fill-opacity="0.2"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `
          <rect x="${70 + i * 90}" y="120" width="70" height="45" rx="4" fill="${accent}" fill-opacity="0.15"/>
        `).join("")}
        ${[0, 1, 2, 3, 4, 5].map(i => `
          <rect x="${70 + i * 90}" y="190" width="70" height="45" rx="4" fill="${accent}" fill-opacity="0.1"/>
        `).join("")}
      `;
    }
    if (moduleName === "logoCloudMarquee") {
      return `
        <rect x="220" y="80" width="200" height="16" rx="2" fill="${text}" fill-opacity="0.2"/>
        <rect x="40" y="130" width="560" height="60" rx="4" fill="${accent}" fill-opacity="0.1"/>
        ${[0, 1, 2, 3, 4, 5, 6].map(i => `
          <rect x="${60 + i * 80}" y="145" width="60" height="30" rx="3" fill="${accent}" fill-opacity="0.2"/>
        `).join("")}
        <rect x="40" y="210" width="560" height="60" rx="4" fill="${accent}" fill-opacity="0.08"/>
        ${[0, 1, 2, 3, 4, 5, 6].map(i => `
          <rect x="${80 + i * 80}" y="225" width="60" height="30" rx="3" fill="${accent}" fill-opacity="0.15"/>
        `).join("")}
      `;
    }
    if (moduleName === "logoCloudGrid") {
      return `
        <rect x="200" y="50" width="240" height="20" rx="3" fill="${text}" fill-opacity="0.2"/>
        ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `
          <rect x="${100 + (i % 3) * 160}" y="${100 + Math.floor(i / 3) * 70}" width="120" height="50" rx="6" fill="${accent}" fill-opacity="${0.2 - Math.floor(i / 3) * 0.05}"/>
        `).join("")}
      `;
    }
  }

  // FAQ layouts
  if (moduleName.includes("faq")) {
    if (moduleName === "faqAccordion") {
      return `
        <rect x="200" y="50" width="240" height="24" rx="3" fill="${text}" fill-opacity="0.25"/>
        ${[0, 1, 2, 3, 4].map(i => `
          <g transform="translate(120, ${100 + i * 50})">
            <rect width="400" height="40" rx="4" fill="${accent}" fill-opacity="${i === 1 ? 0.2 : 0.1}"/>
            <rect x="15" y="15" width="200" height="10" rx="2" fill="${text}" fill-opacity="0.2"/>
            <text x="375" y="26" font-family="system-ui" font-size="14" fill="${text}" fill-opacity="0.3">${i === 1 ? "−" : "+"}</text>
          </g>
        `).join("")}
      `;
    }
    if (moduleName === "faqTwoColumn") {
      return `
        <rect x="200" y="50" width="240" height="24" rx="3" fill="${text}" fill-opacity="0.25"/>
        ${[0, 1, 2].map(i => `
          <g transform="translate(60, ${100 + i * 75})">
            <rect x="0" y="0" width="250" height="60" rx="4" fill="${accent}" fill-opacity="0.1"/>
            <rect x="15" y="15" width="150" height="10" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="15" y="35" width="200" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
        ${[0, 1, 2].map(i => `
          <g transform="translate(330, ${100 + i * 75})">
            <rect x="0" y="0" width="250" height="60" rx="4" fill="${accent}" fill-opacity="0.1"/>
            <rect x="15" y="15" width="150" height="10" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="15" y="35" width="200" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
      `;
    }
    if (moduleName === "faqWithCategories") {
      return `
        <rect x="60" y="60" width="120" height="240" rx="6" fill="${accent}" fill-opacity="0.1"/>
        ${[0, 1, 2, 3, 4].map(i => `
          <rect x="75" y="${80 + i * 40}" width="90" height="24" rx="3" fill="${accent}" fill-opacity="${i === 0 ? 0.3 : 0.1}"/>
        `).join("")}
        ${[0, 1, 2, 3].map(i => `
          <g transform="translate(200, ${80 + i * 60})">
            <rect width="380" height="45" rx="4" fill="${accent}" fill-opacity="0.1"/>
            <rect x="15" y="17" width="200" height="10" rx="2" fill="${text}" fill-opacity="0.2"/>
          </g>
        `).join("")}
      `;
    }
    if (moduleName === "faqSimple") {
      return `
        <rect x="200" y="60" width="240" height="24" rx="3" fill="${text}" fill-opacity="0.25"/>
        ${[0, 1, 2, 3].map(i => `
          <g transform="translate(140, ${110 + i * 55})">
            <rect x="0" y="0" width="360" height="40" rx="4" fill="${accent}" fill-opacity="0.08"/>
            <rect x="20" y="15" width="180" height="10" rx="2" fill="${text}" fill-opacity="0.2"/>
            <circle cx="330" cy="20" r="10" fill="${accent}" fill-opacity="0.2"/>
          </g>
        `).join("")}
      `;
    }
  }

  // Gallery layouts
  if (moduleName.includes("gallery")) {
    if (moduleName === "galleryGrid") {
      return `
        ${[0, 1, 2].map(row =>
          [0, 1, 2].map(col => `
            <rect x="${70 + col * 175}" y="${70 + row * 90}" width="155" height="75" rx="4" fill="${accent}" fill-opacity="${0.2 - row * 0.05}"/>
          `).join("")
        ).join("")}
      `;
    }
    if (moduleName === "galleryMasonry") {
      return `
        <rect x="60" y="60" width="175" height="120" rx="4" fill="${accent}" fill-opacity="0.2"/>
        <rect x="60" y="195" width="175" height="100" rx="4" fill="${accent}" fill-opacity="0.15"/>
        <rect x="250" y="60" width="175" height="80" rx="4" fill="${accent}" fill-opacity="0.18"/>
        <rect x="250" y="155" width="175" height="140" rx="4" fill="${accent}" fill-opacity="0.12"/>
        <rect x="440" y="60" width="140" height="140" rx="4" fill="${accent}" fill-opacity="0.15"/>
        <rect x="440" y="215" width="140" height="80" rx="4" fill="${accent}" fill-opacity="0.1"/>
      `;
    }
    if (moduleName === "galleryCarousel") {
      return `
        <rect x="100" y="80" width="440" height="200" rx="8" fill="${accent}" fill-opacity="0.15"/>
        <circle cx="60" cy="180" r="24" fill="${accent}" fill-opacity="0.2"/>
        <circle cx="580" cy="180" r="24" fill="${accent}" fill-opacity="0.2"/>
        <text x="60" y="186" font-family="system-ui" font-size="20" fill="${text}" text-anchor="middle">‹</text>
        <text x="580" y="186" font-family="system-ui" font-size="20" fill="${text}" text-anchor="middle">›</text>
        ${[0, 1, 2, 3, 4].map(i => `
          <circle cx="${260 + i * 30}" cy="305" r="${i === 2 ? 6 : 4}" fill="${accent}" fill-opacity="${i === 2 ? 0.8 : 0.3}"/>
        `).join("")}
      `;
    }
  }

  // Blog layouts
  if (moduleName.includes("blog")) {
    if (moduleName === "blogFeaturedPost") {
      return `
        <rect x="60" y="60" width="320" height="240" rx="8" fill="${accent}" fill-opacity="0.15"/>
        <rect x="400" y="70" width="180" height="14" rx="2" fill="${text}" fill-opacity="0.25"/>
        <rect x="400" y="100" width="160" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="400" y="120" width="175" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="400" y="140" width="140" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
        <rect x="400" y="180" width="100" height="12" rx="2" fill="${accent}" fill-opacity="0.3"/>
        <circle cx="420" cy="230" r="20" fill="${accent}" fill-opacity="0.2"/>
        <rect x="450" y="220" width="80" height="10" rx="2" fill="${text}" fill-opacity="0.15"/>
        <rect x="450" y="238" width="60" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
      `;
    }
    if (moduleName === "blogGrid") {
      return `
        ${[0, 1, 2].map(i => `
          <g transform="translate(${80 + i * 165}, 70)">
            <rect width="145" height="100" rx="6" fill="${accent}" fill-opacity="0.15"/>
            <rect x="10" y="115" width="100" height="12" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="10" y="135" width="125" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
            <rect x="10" y="150" width="110" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
            <circle cx="20" cy="180" r="12" fill="${accent}" fill-opacity="0.2"/>
            <rect x="40" y="175" width="60" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
      `;
    }
    if (moduleName === "blogList") {
      return `
        ${[0, 1, 2].map(i => `
          <g transform="translate(80, ${70 + i * 90})">
            <rect width="140" height="75" rx="6" fill="${accent}" fill-opacity="0.15"/>
            <rect x="160" y="10" width="280" height="14" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="160" y="35" width="320" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
            <rect x="160" y="52" width="260" height="10" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
      `;
    }
    if (moduleName === "blogCarousel") {
      return `
        ${[0, 1, 2].map(i => `
          <g transform="translate(${65 + i * 175}, 80)">
            <rect width="155" height="100" rx="6" fill="${accent}" fill-opacity="${0.2 - i * 0.03}"/>
            <rect x="10" y="115" width="100" height="12" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="10" y="135" width="130" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
        <circle cx="40" cy="180" r="20" fill="${accent}" fill-opacity="0.2"/>
        <circle cx="600" cy="180" r="20" fill="${accent}" fill-opacity="0.2"/>
      `;
    }
    if (moduleName === "blogMinimal") {
      return `
        ${[0, 1, 2, 3].map(i => `
          <g transform="translate(120, ${80 + i * 65})">
            <rect width="400" height="50" rx="4" fill="${accent}" fill-opacity="0.08"/>
            <rect x="15" y="12" width="200" height="12" rx="2" fill="${text}" fill-opacity="0.2"/>
            <rect x="15" y="32" width="300" height="8" rx="2" fill="${text}" fill-opacity="0.1"/>
            <rect x="340" y="18" width="50" height="14" rx="2" fill="${text}" fill-opacity="0.1"/>
          </g>
        `).join("")}
      `;
    }
  }

  // Form layouts
  if (moduleName.includes("form")) {
    if (moduleName === "formContact") {
      return `
        <rect x="140" y="60" width="360" height="240" rx="8" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.2"/>
        <rect x="180" y="85" width="280" height="20" rx="3" fill="${text}" fill-opacity="0.2"/>
        <rect x="180" y="120" width="280" height="35" rx="4" fill="${text}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.15"/>
        <rect x="180" y="165" width="280" height="35" rx="4" fill="${text}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.15"/>
        <rect x="180" y="210" width="280" height="60" rx="4" fill="${text}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.15"/>
        <rect x="340" y="280" width="120" height="36" rx="6" fill="${accent}"/>
      `;
    }
    if (moduleName === "formNewsletter") {
      return `
        <rect x="140" y="120" width="360" height="120" rx="8" fill="${accent}" fill-opacity="0.1"/>
        <rect x="200" y="145" width="240" height="20" rx="3" fill="${text}" fill-opacity="0.25"/>
        <rect x="180" y="185" width="200" height="36" rx="6" fill="${text}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.2"/>
        <rect x="390" y="185" width="80" height="36" rx="6" fill="${accent}"/>
      `;
    }
    if (moduleName === "formWithImage") {
      return `
        <rect x="60" y="60" width="260" height="240" rx="8" fill="${accent}" fill-opacity="0.15"/>
        <rect x="360" y="80" width="220" height="200" rx="6" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.2"/>
        <rect x="380" y="105" width="180" height="14" rx="2" fill="${text}" fill-opacity="0.2"/>
        <rect x="380" y="135" width="180" height="30" rx="4" fill="${text}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.15"/>
        <rect x="380" y="175" width="180" height="30" rx="4" fill="${text}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.15"/>
        <rect x="380" y="220" width="180" height="30" rx="6" fill="${accent}"/>
      `;
    }
    if (moduleName === "formMultiStep") {
      return `
        <rect x="100" y="60" width="440" height="240" rx="8" fill="${accent}" fill-opacity="0.1"/>
        ${[0, 1, 2].map(i => `
          <g transform="translate(${200 + i * 80}, 85)">
            <circle r="16" fill="${accent}" fill-opacity="${i === 0 ? 0.8 : 0.2}"/>
            <text y="5" font-family="system-ui" font-size="12" fill="${text}" text-anchor="middle">${i + 1}</text>
          </g>
        `).join("")}
        <line x1="216" y1="85" x2="280" y2="85" stroke="${accent}" stroke-opacity="0.3" stroke-width="2"/>
        <line x1="296" y1="85" x2="360" y2="85" stroke="${accent}" stroke-opacity="0.15" stroke-width="2"/>
        <rect x="160" y="130" width="320" height="35" rx="4" fill="${text}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.15"/>
        <rect x="160" y="180" width="320" height="35" rx="4" fill="${text}" fill-opacity="0.08" stroke="${accent}" stroke-opacity="0.15"/>
        <rect x="160" y="240" width="100" height="32" rx="4" fill="${accent}" fill-opacity="0.2"/>
        <rect x="380" y="240" width="100" height="32" rx="4" fill="${accent}"/>
      `;
    }
  }

  // Default fallback
  return `
    <rect x="170" y="120" width="300" height="120" rx="8" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-opacity="0.25"/>
    <text x="320" y="190" font-family="system-ui" font-size="24" fill="${text}" text-anchor="middle" fill-opacity="0.5">◇</text>
  `;
}

async function main() {
  const fs = await import("fs/promises");
  const path = await import("path");

  const outputDir = path.join(process.cwd(), "public", "modules");

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  console.log(`Generating ${modules.length} module mockups...`);

  for (const module of modules) {
    const svg = generateSVG(module);
    const filename = `${module.name}.svg`;
    const filepath = path.join(outputDir, filename);

    await fs.writeFile(filepath, svg);
    console.log(`  ✓ ${filename}`);
  }

  console.log(`\nDone! Generated ${modules.length} mockup images in ${outputDir}`);
}

main().catch(console.error);
