/**
 * Site Settings Queries
 *
 * Queries for fetching global site configuration.
 * Already well-structured with explicit field selection.
 */

// Base nav link projection (without children)
const baseNavLinkProjection = `{
  label,
  linkType,
  internalLink->{ slug },
  externalUrl,
  anchor,
  description,
  icon
}`;

// Navigation link projection with children and columns support
const navLinkProjection = `{
  label,
  linkType,
  internalLink->{ slug },
  externalUrl,
  anchor,
  description,
  icon,
  dropdownStyle,
  children[]${`{
    label,
    linkType,
    internalLink->{ slug },
    externalUrl,
    anchor,
    description,
    icon
  }`},
  columns[]{
    title,
    links[]${`{
      label,
      linkType,
      internalLink->{ slug },
      externalUrl,
      anchor,
      description,
      icon
    }`}
  },
  featuredItem{
    title,
    description,
    image{
      asset,
      alt,
      hotspot,
      crop
    },
    link{
      label,
      linkType,
      internalLink->{ slug },
      externalUrl,
      anchor
    }
  }
}`;

// CTA button projection
const ctaButtonProjection = `{
  label,
  linkType,
  internalLink->{ slug },
  externalUrl,
  openInNewTab,
  variant,
  size,
  icon
}`;

/**
 * Fetch complete site settings
 * Includes all navigation and branding
 */
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  // Header Navigation
  headerNavigation{
    logo{
      asset,
      alt
    },
    navLinks[]${navLinkProjection},
    ctaButtons[]${ctaButtonProjection},
    showCta
  },
  // Footer Navigation
  footerNavigation{
    description,
    linkColumns[]{
      title,
      links[]${navLinkProjection}
    },
    socialLinks[]{
      platform,
      url
    },
    bottomLinks[]${navLinkProjection},
    copyrightText
  },
  // Global Engagement Settings
  globalEngagement{
    announcementBar{
      enabled,
      message,
      link{
        text,
        url
      },
      dismissible,
      variant,
      backgroundColor,
      schedule{
        startDate,
        endDate
      }
    },
    stickyCta{
      enabled,
      text,
      url,
      icon,
      position,
      showAfterScroll,
      variant,
      "excludePageSlugs": excludePages[]->slug.current
    },
    exitIntentModal{
      enabled,
      title,
      message,
      image{
        asset,
        alt,
        hotspot,
        crop
      },
      cta{
        text,
        url,
        variant
      },
      showOnce,
      variant,
      "excludePageSlugs": excludePages[]->slug.current
    },
    newsletterPopup{
      enabled,
      title,
      message,
      image{
        asset,
        alt,
        hotspot,
        crop
      },
      placeholder,
      buttonText,
      successMessage,
      trigger,
      triggerValue,
      showOnce
    }
  }
}`;

/**
 * Fetch header navigation only
 * Use when only header is needed
 */
export const headerNavigationQuery = `*[_type == "siteSettings"][0]{
  title,
  headerNavigation{
    logo{
      asset,
      alt
    },
    navLinks[]${navLinkProjection},
    ctaButtons[]${ctaButtonProjection},
    showCta
  }
}`;

/**
 * Fetch footer navigation only
 * Use when only footer is needed
 */
export const footerNavigationQuery = `*[_type == "siteSettings"][0]{
  title,
  footerNavigation{
    description,
    linkColumns[]{
      title,
      links[]${navLinkProjection}
    },
    socialLinks[]{
      platform,
      url
    },
    bottomLinks[]${navLinkProjection},
    copyrightText
  }
}`;

/**
 * Fetch homepage reference
 * Returns only the page ID for resolution
 */
export const homepageReferenceQuery = `*[_type == "siteSettings"][0]{
  "homepageId": homepage._ref
}`;

/**
 * Fetch basic site metadata (for SEO defaults)
 */
export const siteMetadataQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  siteUrl,
  defaultSeoImage{
    asset,
    alt
  },
  socialLinks[]{
    platform,
    url
  }
}`;

/**
 * Fetch social links only
 */
export const socialLinksQuery = `*[_type == "siteSettings"][0]{
  footerNavigation.socialLinks[]{
    platform,
    url
  }
}`;
