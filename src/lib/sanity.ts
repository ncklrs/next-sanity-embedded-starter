import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

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
