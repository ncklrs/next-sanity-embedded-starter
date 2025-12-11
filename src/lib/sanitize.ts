/**
 * HTML Sanitization Utilities - XSS protection for embeds
 */

const TRUSTED_EMBED_DOMAINS = [
  "youtube.com", "www.youtube.com", "youtube-nocookie.com",
  "vimeo.com", "player.vimeo.com", "soundcloud.com", "w.soundcloud.com",
  "spotify.com", "open.spotify.com", "codepen.io", "codesandbox.io",
  "twitter.com", "platform.twitter.com", "instagram.com", "www.instagram.com",
  "facebook.com", "www.facebook.com", "linkedin.com", "www.linkedin.com",
  "tiktok.com", "www.tiktok.com", "loom.com", "www.loom.com",
  "figma.com", "www.figma.com", "miro.com", "calendly.com", "typeform.com",
  "airtable.com", "notion.so", "google.com", "docs.google.com",
  "maps.google.com", "drive.google.com",
];

const DANGEROUS_PATTERNS = [
  /<script[\s\S]*?>/i, /javascript:/i, /on\w+\s*=/i,
  /data:/i, /<link[\s\S]*?>/i, /<style[\s\S]*?>/i,
  /<meta[\s\S]*?>/i, /<base[\s\S]*?>/i, /<object[\s\S]*?>/i, /<form[\s\S]*?>/i,
];

export function isTrustedEmbedUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return TRUSTED_EMBED_DOMAINS.some(d => hostname === d || hostname.endsWith(`.${d}`));
  } catch { return false; }
}

export function containsDangerousPatterns(html: string): boolean {
  return DANGEROUS_PATTERNS.some(p => p.test(html));
}

function extractIframeSrcs(html: string): string[] {
  const srcs: string[] = [];
  let match;
  const regex = /<iframe[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi;
  while ((match = regex.exec(html)) !== null) srcs.push(match[1]);
  return srcs;
}

export function sanitizeEmbedCode(embedCode: string): { html: string; isValid: boolean; error?: string } {
  if (!embedCode || typeof embedCode !== "string") {
    return { html: "", isValid: false, error: "No embed code provided" };
  }
  if (containsDangerousPatterns(embedCode)) {
    console.warn("[Sanitize] Dangerous patterns detected");
    return { html: "", isValid: false, error: "Embed code contains potentially unsafe content" };
  }
  for (const src of extractIframeSrcs(embedCode)) {
    if (!isTrustedEmbedUrl(src)) {
      console.warn(`[Sanitize] Untrusted iframe: ${src}`);
      return { html: "", isValid: false, error: `Untrusted domain: ${src}` };
    }
  }
  const sandboxed = embedCode.replace(/<iframe([^>]*)>/gi, (m, attrs) =>
    /sandbox=/i.test(attrs) ? m : `<iframe${attrs} sandbox="allow-scripts allow-same-origin allow-popups allow-forms">`
  );
  return { html: sandboxed, isValid: true };
}

export function escapeHtml(text: string): string {
  const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return text.replace(/[&<>"']/g, c => map[c]);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}
