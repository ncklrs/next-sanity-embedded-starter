import { sanityFetch } from "../../../sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt
}`;

export const metadata = {
  title: "Blog | Aurora",
  description: "Latest articles and insights from the Aurora team",
};

export default async function BlogPage() {
  const posts = await sanityFetch<any[]>({
    query: postsQuery,
    tags: ["posts"],
  });

  return (
    <main className="min-h-screen">
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h1 className="display-lg mb-4">
              Latest <span className="text-gradient">Articles</span>
            </h1>
            <p className="body-lg">
              Insights, tutorials, and updates from our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group"
              >
                <article className="card h-full flex flex-col">
                  {post.featuredImage && (
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(post.featuredImage).width(600).height(340).url()}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {post.publishedAt && (
                      <time className="text-sm text-[var(--foreground-subtle)]">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    )}
                    <h2 className="heading-md mt-2 mb-3 group-hover:text-[var(--accent-violet)] transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[var(--foreground-muted)] line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
