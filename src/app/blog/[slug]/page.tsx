import { sanityFetch, client } from "../../../../sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { ArrowLeftIcon } from "@/components/icons";
import { postBySlugQuery, allPostSlugsQuery } from "../../../../sanity/queries";

// Pre-generate all blog post pages at build time
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityFetch<any>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["posts", `slug:${slug}`],
  });

  if (!post) return {};

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await sanityFetch<any>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["posts", `slug:${slug}`],
  });

  if (!post) {
    notFound();
  }

  // PortableText components for rendering rich content
  const components = {
    types: {
      image: ({ value }: any) => (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ""}
            width={1200}
            height={675}
            className="rounded-xl"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-[var(--foreground-subtle)] mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ),
    },
    block: {
      h2: ({ children }: any) => (
        <h2 className="heading-lg mt-12 mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="heading-md mt-8 mb-3">{children}</h3>
      ),
      normal: ({ children }: any) => (
        <p className="text-[var(--foreground-muted)] leading-relaxed mb-4">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-[var(--accent-violet)] pl-6 my-6 italic text-[var(--foreground-muted)]">
          {children}
        </blockquote>
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          className="text-[var(--accent-violet)] hover:underline"
          target={value.blank ? "_blank" : undefined}
          rel={value.blank ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      ),
      code: ({ children }: any) => (
        <code className="bg-[var(--surface)] px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ),
    },
  };

  return (
    <main className="min-h-screen">
      <article className="section">
        <div className="container-sm">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-12">
            {post.publishedAt && (
              <time className="text-sm text-[var(--foreground-subtle)]">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            <h1 className="display-lg mt-4 mb-6">{post.title}</h1>
            {post.excerpt && (
              <p className="body-lg">{post.excerpt}</p>
            )}
          </header>

          {post.featuredImage && (
            <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden">
              <Image
                src={urlFor(post.featuredImage).width(1200).height(675).url()}
                alt={post.featuredImage.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose-dark">
            <PortableText value={post.content} components={components} />
          </div>
        </div>
      </article>
    </main>
  );
}
