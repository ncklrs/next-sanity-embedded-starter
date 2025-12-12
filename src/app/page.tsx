import { getHomepage, getHomepageWithSettingsAndEngagement } from "../../sanity/queries";
import { ModuleRenderer } from "@/components/ModuleRenderer";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GlobalEngagement } from "@/components/GlobalEngagement";
import Link from "next/link";

export async function generateMetadata() {
  const page = await getHomepage();

  return {
    title: page?.seo?.title || page?.title || "Aurora - Modern SaaS Platform",
    description: page?.seo?.description || "The next-generation platform for building exceptional digital experiences",
  };
}

export default async function Home() {
  const { page, settings, engagements } = await getHomepageWithSettingsAndEngagement();

  // If no homepage is configured, show a setup message
  if (!page) {
    return (
      <>
        <GlobalEngagement engagements={engagements} />
        <Navigation settings={settings} />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-lg mx-auto px-4">
            <h1 className="display-lg mb-4">
              Welcome to <span className="text-gradient">Aurora</span>
            </h1>
            <p className="body-lg mb-8">
              No homepage has been configured yet. Go to the Sanity Studio to:
            </p>
            <ol className="text-left text-[var(--foreground-muted)] space-y-2 mb-8">
              <li>1. Create a new Page with your desired modules</li>
              <li>2. Go to Site Settings</li>
              <li>3. Select your page as the Homepage</li>
            </ol>
            <Link href="/studio" className="btn btn-primary">
              Open Sanity Studio
            </Link>

          </div>
        </main>
        <Footer settings={settings} />
      </>
    );
  }

  return (
    <>
      <GlobalEngagement engagements={engagements} />
      <Navigation settings={settings} />
      <main>
        <ModuleRenderer modules={page.modules || []} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
