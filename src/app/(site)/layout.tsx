import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { getSiteSettings } from "../../../sanity/queries";

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
  const settings = await getSiteSettings();

  return (
    <>
      <Navigation settings={settings ?? undefined} />
      {children}
      <Footer settings={settings ?? undefined} />
    </>
  );
}
