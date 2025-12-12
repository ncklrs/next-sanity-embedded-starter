import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getSiteSettings } from "../../../sanity/queries";

// Check for placeholder credentials (CI builds)
const isPlaceholder = () =>
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder';

/**
 * Site layout that wraps all public-facing pages
 * Provides consistent Navigation and Footer from site settings
 *
 * Note: GlobalEngagement is NOT included here because engagements
 * can be page-specific. Pages that need engagements should fetch
 * and render GlobalEngagement themselves.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip data fetching when using placeholder credentials (CI builds)
  const settings = isPlaceholder() ? null : await getSiteSettings();

  return (
    <>
      <Navigation settings={settings ?? undefined} />
      {children}
      <Footer settings={settings ?? undefined} />
    </>
  );
}
