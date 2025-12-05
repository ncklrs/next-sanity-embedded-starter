import { client } from "../../sanity/lib/client";
import { homepageQuery, siteSettingsQuery } from "@/lib/sanity";
import { ModuleRenderer } from "@/components/ModuleRenderer";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export async function generateMetadata() {
  const data = await client.fetch(homepageQuery);
  const page = data?.homepage;

  return {
    title: page?.seoTitle || page?.title || "Aurora - Modern SaaS Platform",
    description: page?.seoDescription || "The next-generation platform for building exceptional digital experiences",
  };
}

export default async function Home() {
  const [homepageData, settings] = await Promise.all([
    client.fetch(homepageQuery),
    client.fetch(siteSettingsQuery),
  ]);

  const page = homepageData?.homepage;

  // If no homepage is configured, show a setup message
  if (!page) {
    return (
      <>
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
            <a
              href="/studio"
              className="btn btn-primary"
            >
              Open Sanity Studio
            </a>
          </div>
        </main>
        <Footer settings={settings} />
      </>
    );
  }

  return (
    <>
      <Navigation settings={settings} />
      <main>
        <ModuleRenderer modules={page.modules || []} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
