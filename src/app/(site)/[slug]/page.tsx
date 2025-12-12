import { notFound } from "next/navigation";
import {
  getPageBySlug,
  getEngagementsForPage,
  getAllPageSlugs,
} from "../../../../sanity/queries";
import { ModuleRenderer } from "@/components/ModuleRenderer";
import { GlobalEngagement } from "@/components/GlobalEngagement";

// Pre-generate all page routes at build time
export async function generateStaticParams() {
  // Skip static generation when using placeholder credentials (CI builds)
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder') {
    return [];
  }
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) return {};

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [page, engagements] = await Promise.all([
    getPageBySlug(slug),
    getEngagementsForPage(slug),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <>
      <GlobalEngagement engagements={engagements} />
      <main>
        <ModuleRenderer modules={page.modules || []} />
      </main>
    </>
  );
}
