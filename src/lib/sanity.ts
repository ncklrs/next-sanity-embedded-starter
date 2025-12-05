import { client } from "../../sanity/lib/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ query helpers
export const pageQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  modules[]{
    _type,
    _key,
    ...
  },
  seoTitle,
  seoDescription
}`;

export const homepageQuery = `*[_type == "siteSettings"][0]{
  homepage->{
    _id,
    title,
    slug,
    modules[]{
      _type,
      _key,
      ...
    },
    seoTitle,
    seoDescription
  }
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  // Header Navigation
  headerNavigation{
    logo,
    navLinks[]{
      label,
      linkType,
      internalLink->{slug},
      externalUrl,
      anchor
    },
    ctaButtons[]{
      label,
      linkType,
      internalLink->{slug},
      externalUrl,
      openInNewTab,
      variant,
      size,
      icon
    },
    showCta
  },
  // Footer Navigation
  footerNavigation{
    description,
    linkColumns[]{
      title,
      links[]{
        label,
        linkType,
        internalLink->{slug},
        externalUrl,
        anchor
      }
    },
    socialLinks[]{
      platform,
      url
    },
    bottomLinks[]{
      label,
      linkType,
      internalLink->{slug},
      externalUrl,
      anchor
    },
    copyrightText
  },
  // Legacy fields fallback
  logo,
  mainNavigation[]{
    label,
    linkType,
    internalLink->{slug},
    externalUrl,
    anchor
  },
  socialLinks,
  footerText
}`;
