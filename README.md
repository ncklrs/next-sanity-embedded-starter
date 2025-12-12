# Next.js + Sanity Embedded Studio Starter

A production-ready [Next.js 15](https://nextjs.org) template with embedded [Sanity Studio](https://www.sanity.io/docs/studio/embedding-sanity-studio), featuring a modular page builder with 60+ content modules, dynamic forms, engagement tools, and a complete blog system.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fncklrs%2Fnext-sanity-aurora&env=NEXT_PUBLIC_SANITY_PROJECT_ID,NEXT_PUBLIC_SANITY_DATASET&envDescription=Sanity%20project%20credentials&envLink=https%3A%2F%2Fsanity.io%2Fmanage&project-name=sanity-aurora&repository-name=sanity-aurora)

## Features

- **60+ Content Modules** - Hero sections, features, pricing, testimonials, CTAs, galleries, and more
- **Visual Page Builder** - Drag-and-drop modular content with live preview
- **Dynamic Form Builder** - Create forms in Sanity with email, webhook, and Discord integrations
- **Engagement System** - Announcement bars, sticky CTAs, exit-intent modals, newsletter popups
- **Blog System** - Full-featured blog with categories, featured posts, and SEO
- **Embedded Sanity Studio** - Content management at `/studio`
- **TypeScript** - Full type safety throughout
- **Tailwind CSS 4** - Modern styling with design system
- **On-Demand Revalidation** - Webhook-based cache invalidation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A [Sanity.io](https://sanity.io) account

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/ncklrs/next-sanity-aurora.git
cd next-sanity-aurora

# Install dependencies
npm install
# or
bun install
```

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Sanity project credentials from [sanity.io/manage](https://sanity.io/manage):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run Development Server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio.

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (site)/             # Main site routes
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── [slug]/         # Dynamic pages
│   │   │   └── blog/           # Blog routes
│   │   ├── studio/             # Embedded Sanity Studio
│   │   ├── api/                # API routes (revalidation, forms)
│   │   └── actions/            # Server Actions
│   ├── components/
│   │   ├── modules/            # 60+ content module components
│   │   ├── forms/              # Form components
│   │   ├── ui/                 # UI primitives (Radix + shadcn)
│   │   └── portable-text/      # Rich text renderers
│   └── lib/                    # Utilities and helpers
├── sanity/
│   ├── schemas/
│   │   ├── documents/          # Page, Post, Form, Settings, Engagement
│   │   ├── modules/            # 60+ module schemas
│   │   └── objects/            # Reusable object schemas
│   ├── queries/                # GROQ queries
│   └── lib/                    # Sanity client configuration
├── sanity.config.ts            # Sanity Studio configuration
└── sanity.cli.ts               # Sanity CLI configuration
```

## Content Modules

### Hero Sections
`heroDefault` · `heroCentered` · `heroSplit` · `heroVideo` · `heroMinimal`

### Features
`featuresGrid` · `featuresAlternating` · `featuresIconCards`

### Pricing
`pricingCards` · `pricingComparison` · `pricingSimple`

### Testimonials
`testimonialsGrid` · `testimonialsCarousel` · `testimonialsFeatured`

### Call-to-Action
`ctaDefault` · `ctaNewsletter` · `ctaSplit` · `ctaBanner` · `ctaStats`

### Blog
`blogFeaturedPost` · `blogGrid` · `blogList` · `blogCarousel` · `blogMinimal`

### Forms
`formContact` · `formNewsletter` · `formWithImage` · `formMultiStep` · `formDynamic`

### And More...
FAQ, galleries, logo clouds, social proof, stats, tabs, accordions, timelines, and more.

## Dynamic Forms

Create forms directly in Sanity Studio with:

- **Field Types**: Text, email, phone, textarea, select, radio, checkbox, file upload
- **Validation**: Required fields, email format, custom rules
- **Actions**:
  - Send to Discord webhook
  - POST to any webhook URL
  - Email notifications (Resend, SendGrid, Mailgun)
  - Store submissions in Sanity

## Engagement Tools

- **Announcement Bars** - Top banners with dismissible option
- **Sticky CTAs** - Fixed position buttons that appear on scroll
- **Exit Intent Modals** - Capture leaving visitors
- **Newsletter Popups** - Time or scroll-triggered email capture
- **Advanced Targeting** - Show on specific pages, scheduling, priority system

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Dataset name (e.g., `production`) |
| `SANITY_API_READ_TOKEN` | No | For preview/draft content |
| `SANITY_API_WRITE_TOKEN` | No | For form submissions |
| `SANITY_WEBHOOK_SECRET` | No | For on-demand revalidation |
| `RESEND_API_KEY` | No | For email form actions |
| `EMAIL_FROM` | No | Sender email address |

## Deployment

### Vercel (Recommended)

1. Click the "Deploy with Vercel" button above
2. Connect your Sanity project
3. Set environment variables
4. Deploy

### Other Platforms

Build the production application:

```bash
npm run build
npm start
```

## On-Demand Revalidation

Set up a webhook in Sanity to trigger revalidation:

1. Go to [sanity.io/manage](https://sanity.io/manage) > API > Webhooks
2. Create webhook pointing to `https://your-domain.com/api/revalidate`
3. Set the secret to match `SANITY_WEBHOOK_SECRET`
4. Select document types to trigger revalidation

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [next-sanity](https://github.com/sanity-io/next-sanity)

## License

MIT License - see [LICENSE](LICENSE) for details.
