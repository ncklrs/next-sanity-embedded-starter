# Next.js + Sanity Embedded Studio Starter

A [Next.js](https://nextjs.org) project with embedded [Sanity Studio](https://www.sanity.io/docs/studio/embedding-sanity-studio), TypeScript, and Tailwind CSS.

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Sanity project credentials from [sanity.io/manage](https://sanity.io/manage).

3. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio.

## Project Structure

```
├── sanity/
│   ├── lib/
│   │   └── client.ts           # Sanity client for data fetching
│   └── schemas/
│       ├── documents/          # Document type schemas
│       │   ├── page.ts
│       │   ├── post.ts
│       │   └── siteSettings.ts
│       └── index.ts            # Schema exports
├── src/app/
│   └── studio/[[...tool]]/     # Embedded Sanity Studio route
├── sanity.config.ts            # Sanity configuration
└── sanity.cli.ts               # Sanity CLI configuration
```

## Document Types

- **Page**: Basic pages with title, slug, content, and SEO fields
- **Post**: Blog posts with title, slug, excerpt, featured image, content, and publish date
- **Site Settings**: Singleton for global site configuration (title, logo, social links, etc.)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [next-sanity](https://github.com/sanity-io/next-sanity)
