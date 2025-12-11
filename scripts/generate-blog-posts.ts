#!/usr/bin/env bun
/**
 * Blog Post Generator
 *
 * Creates 15 sample blog posts in Sanity with:
 * - Varied topics (tech, product, design, engineering)
 * - Portable Text content with headers, paragraphs, lists
 * - Featured images from Unsplash
 * - SEO metadata
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing environment variables:");
  console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID:", projectId ? "✓" : "✗");
  console.error("- NEXT_PUBLIC_SANITY_DATASET:", dataset ? "✓" : "✗");
  console.error("- SANITY_API_WRITE_TOKEN:", token ? "✓" : "✗");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

// Generate unique keys for array items
function key(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Upload image from URL and return asset reference
async function uploadImage(
  url: string,
  filename: string
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } }> {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload("image", Buffer.from(buffer), {
      filename,
    });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Failed to upload image ${filename}:`, error);
    throw error;
  }
}

// Unsplash images for blog posts
const blogImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop", // coding
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=800&fit=crop", // analytics dashboard
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop", // team collaboration
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=800&fit=crop", // workspace
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop", // laptop code
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop", // data visualization
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=800&fit=crop", // meeting
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop", // team work
  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop", // modern office
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop", // workspace design
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop", // macbook code
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop", // presentation
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop", // boardroom
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=800&fit=crop", // tech devices
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop", // business meeting
];

// Helper to create a text span
function span(text: string): object {
  return {
    _type: "span",
    _key: key(),
    text,
    marks: [],
  };
}

// Helper to create a paragraph block
function paragraph(text: string): object {
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [span(text)],
  };
}

// Helper to create a heading block
function heading(text: string, level: "h2" | "h3" = "h2"): object {
  return {
    _type: "block",
    _key: key(),
    style: level,
    markDefs: [],
    children: [span(text)],
  };
}

// Helper to create a bullet list
function bulletList(items: string[]): object[] {
  return items.map((item) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [span(item)],
  }));
}

// Helper to create a numbered list
function numberedList(items: string[]): object[] {
  return items.map((item) => ({
    _type: "block",
    _key: key(),
    style: "normal",
    listItem: "number",
    level: 1,
    markDefs: [],
    children: [span(item)],
  }));
}

// Helper to create a blockquote
function blockquote(text: string): object {
  return {
    _type: "block",
    _key: key(),
    style: "blockquote",
    markDefs: [],
    children: [span(text)],
  };
}

// Blog post data
const blogPosts = [
  {
    title: "Building Scalable Web Applications with Next.js 15",
    slug: "building-scalable-web-applications-nextjs-15",
    excerpt:
      "Learn how to leverage the latest features in Next.js 15 to build performant, scalable web applications that delight users.",
    publishedAt: "2024-12-01T10:00:00Z",
    content: [
      paragraph(
        "Next.js 15 introduces groundbreaking features that revolutionize how we build modern web applications. With improved server components, streaming, and partial prerendering, developers can create faster and more responsive applications than ever before."
      ),
      heading("What's New in Next.js 15"),
      paragraph(
        "The latest version brings several key improvements that address common pain points in web development. Let's explore the most impactful changes."
      ),
      heading("Server Components by Default", "h3"),
      paragraph(
        "React Server Components are now the default in Next.js 15, enabling better performance through reduced client-side JavaScript. This means faster page loads and improved SEO out of the box."
      ),
      heading("Partial Prerendering", "h3"),
      paragraph(
        "One of the most exciting features is partial prerendering, which combines static and dynamic content seamlessly. Your pages can now have a static shell that loads instantly while dynamic content streams in."
      ),
      ...bulletList([
        "Instant initial page load with static content",
        "Dynamic content streams in without blocking",
        "Better perceived performance for users",
        "Reduced Time to First Byte (TTFB)",
      ]),
      heading("Getting Started"),
      paragraph(
        "To start using Next.js 15, simply create a new project or upgrade your existing application. The migration path is straightforward, with most applications requiring minimal changes."
      ),
      blockquote(
        "The future of web development is here, and it's faster, more efficient, and more developer-friendly than ever before."
      ),
      paragraph(
        "Stay tuned for more deep dives into specific features and best practices for building with Next.js 15."
      ),
    ],
    seo: {
      title: "Building Scalable Web Applications with Next.js 15 | Blog",
      description:
        "Discover how to use Next.js 15's new features including server components, streaming, and partial prerendering to build faster web apps.",
    },
  },
  {
    title: "The Complete Guide to TypeScript in 2024",
    slug: "complete-guide-typescript-2024",
    excerpt:
      "Master TypeScript with this comprehensive guide covering everything from basics to advanced patterns used in production applications.",
    publishedAt: "2024-11-28T09:00:00Z",
    content: [
      paragraph(
        "TypeScript has become the de facto standard for building large-scale JavaScript applications. In this guide, we'll cover everything you need to know to become proficient in TypeScript."
      ),
      heading("Why TypeScript?"),
      paragraph(
        "TypeScript provides static type checking, better tooling support, and catches errors at compile time rather than runtime. These benefits become increasingly valuable as your codebase grows."
      ),
      ...bulletList([
        "Catch errors during development, not in production",
        "Improved IDE support with intelligent autocomplete",
        "Better documentation through type definitions",
        "Easier refactoring with confidence",
      ]),
      heading("Essential TypeScript Features"),
      heading("Type Inference", "h3"),
      paragraph(
        "TypeScript is smart enough to infer types in many situations, reducing the amount of type annotations you need to write while still providing full type safety."
      ),
      heading("Generics", "h3"),
      paragraph(
        "Generics allow you to write reusable code that works with multiple types while maintaining type safety. They're essential for building flexible, type-safe APIs."
      ),
      heading("Utility Types", "h3"),
      paragraph(
        "TypeScript provides built-in utility types like Partial, Required, Pick, and Omit that make working with types more convenient and expressive."
      ),
      heading("Best Practices"),
      ...numberedList([
        "Enable strict mode in your tsconfig.json",
        "Use interfaces for object shapes, types for unions",
        "Leverage const assertions for immutable data",
        "Prefer unknown over any for type safety",
        "Use discriminated unions for complex state management",
      ]),
      paragraph(
        "By following these practices, you'll write cleaner, more maintainable TypeScript code that scales with your application."
      ),
    ],
    seo: {
      title: "The Complete Guide to TypeScript in 2024",
      description:
        "Learn TypeScript from basics to advanced patterns. This comprehensive guide covers type inference, generics, utility types, and best practices.",
    },
  },
  {
    title: "Designing User-Centric Interfaces: A Modern Approach",
    slug: "designing-user-centric-interfaces",
    excerpt:
      "Discover the principles and practices behind creating interfaces that users love, from research to implementation.",
    publishedAt: "2024-11-25T14:00:00Z",
    content: [
      paragraph(
        "Great design isn't about making things look pretty—it's about solving problems for users. In this article, we'll explore how to create interfaces that truly serve your users' needs."
      ),
      heading("Understanding Your Users"),
      paragraph(
        "Before designing anything, you need to understand who you're designing for. User research isn't optional—it's the foundation of good design."
      ),
      ...bulletList([
        "Conduct user interviews to understand pain points",
        "Create user personas based on real data",
        "Map user journeys to identify opportunities",
        "Use analytics to understand behavior patterns",
      ]),
      heading("Core Design Principles"),
      heading("Clarity Over Cleverness", "h3"),
      paragraph(
        "Users should never have to guess what something does. Every element should have a clear purpose and predictable behavior. When in doubt, choose the simpler option."
      ),
      heading("Consistency is Key", "h3"),
      paragraph(
        "Consistent design reduces cognitive load and helps users build mental models. Use design systems to ensure consistency across your entire product."
      ),
      heading("Feedback and Responsiveness", "h3"),
      paragraph(
        "Every action should have a clear response. Whether it's a button animation, loading state, or success message, users need to know their actions are being processed."
      ),
      blockquote(
        "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs"
      ),
      heading("Practical Implementation"),
      paragraph(
        "Turn these principles into practice by establishing a design system, creating component libraries, and building prototypes that can be tested with real users."
      ),
      paragraph(
        "Remember: good design is invisible. If users don't notice your interface, you've done your job well."
      ),
    ],
    seo: {
      title: "Designing User-Centric Interfaces: A Modern Approach",
      description:
        "Learn the principles of user-centric design including user research, core design principles, and practical implementation strategies.",
    },
  },
  {
    title: "API Design Best Practices for Modern Applications",
    slug: "api-design-best-practices",
    excerpt:
      "Build APIs that developers love with these proven design patterns and practices for RESTful and GraphQL APIs.",
    publishedAt: "2024-11-22T11:00:00Z",
    content: [
      paragraph(
        "A well-designed API can make or break the developer experience. Whether you're building RESTful APIs or GraphQL endpoints, these principles will help you create APIs that are intuitive, consistent, and maintainable."
      ),
      heading("RESTful API Design"),
      paragraph(
        "REST remains the most popular API architecture. Following these conventions will make your APIs predictable and easy to use."
      ),
      ...bulletList([
        "Use nouns for resources, verbs for actions",
        "Follow HTTP method semantics (GET, POST, PUT, DELETE)",
        "Return appropriate status codes",
        "Implement pagination for list endpoints",
        "Version your APIs from the start",
      ]),
      heading("Error Handling"),
      paragraph(
        "Good error handling is crucial for developer experience. Errors should be informative, actionable, and consistent across your API."
      ),
      heading("Error Response Structure", "h3"),
      paragraph(
        "Include an error code, human-readable message, and any additional context that might help developers debug the issue. Consider including a link to documentation."
      ),
      heading("GraphQL Considerations"),
      paragraph(
        "If you're building GraphQL APIs, the principles are similar but the implementation differs. Focus on schema design, efficient resolvers, and proper error handling."
      ),
      ...numberedList([
        "Design your schema with the client in mind",
        "Implement DataLoader for efficient batching",
        "Use custom scalars for type safety",
        "Consider rate limiting at the resolver level",
      ]),
      heading("Documentation"),
      paragraph(
        "No API is complete without documentation. Use tools like OpenAPI/Swagger for REST or GraphQL Playground for GraphQL to create interactive documentation."
      ),
      blockquote(
        "The best API is one that developers can understand without reading the documentation."
      ),
    ],
    seo: {
      title: "API Design Best Practices for Modern Applications",
      description:
        "Learn how to design APIs that developers love. Covers RESTful design, GraphQL patterns, error handling, and documentation best practices.",
    },
  },
  {
    title: "Mastering React Performance Optimization",
    slug: "mastering-react-performance-optimization",
    excerpt:
      "Learn proven techniques to optimize your React applications for maximum performance and user satisfaction.",
    publishedAt: "2024-11-19T08:00:00Z",
    content: [
      paragraph(
        "Performance is a feature. Users expect fast, responsive applications, and React provides the tools to deliver them—if you know how to use them properly."
      ),
      heading("Understanding React Rendering"),
      paragraph(
        "Before optimizing, you need to understand how React decides when to re-render components. This knowledge is fundamental to writing performant React code."
      ),
      heading("Key Optimization Techniques"),
      heading("Memoization", "h3"),
      paragraph(
        "Use React.memo for components, useMemo for expensive calculations, and useCallback for function references. But remember: premature optimization is the root of all evil."
      ),
      heading("Code Splitting", "h3"),
      paragraph(
        "Split your code into smaller chunks that load on demand. React.lazy and Suspense make this straightforward, and it can dramatically improve initial load times."
      ),
      ...bulletList([
        "Split by route for multi-page applications",
        "Lazy load heavy components like charts and editors",
        "Use dynamic imports for conditional features",
        "Consider suspense boundaries for loading states",
      ]),
      heading("Virtualization", "h3"),
      paragraph(
        "When rendering large lists, virtualization libraries like react-window only render visible items, dramatically reducing DOM nodes and improving performance."
      ),
      heading("Measuring Performance"),
      paragraph(
        "You can't optimize what you can't measure. Use React DevTools Profiler, Lighthouse, and Web Vitals to identify performance bottlenecks."
      ),
      ...numberedList([
        "Profile before optimizing to find actual bottlenecks",
        "Focus on user-perceived performance metrics",
        "Test on real devices, not just development machines",
        "Monitor performance in production continuously",
      ]),
      paragraph(
        "Remember: most React apps don't need aggressive optimization. Focus on writing clean code first, then optimize based on measurements."
      ),
    ],
    seo: {
      title: "Mastering React Performance Optimization",
      description:
        "Learn React performance optimization techniques including memoization, code splitting, virtualization, and performance measurement strategies.",
    },
  },
  {
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    excerpt:
      "Make your web applications accessible to everyone with these practical guidelines and implementation strategies.",
    publishedAt: "2024-11-16T13:00:00Z",
    content: [
      paragraph(
        "Accessibility isn't just a nice-to-have—it's essential. Building accessible applications ensures that everyone can use your product, regardless of their abilities."
      ),
      heading("Why Accessibility Matters"),
      paragraph(
        "Over 1 billion people worldwide have some form of disability. When you build accessible applications, you're not just being inclusive—you're also reaching a larger audience."
      ),
      ...bulletList([
        "15% of the world's population has a disability",
        "Accessible design often benefits all users",
        "Many countries require accessibility by law",
        "It's simply the right thing to do",
      ]),
      heading("Core Accessibility Principles"),
      heading("Semantic HTML", "h3"),
      paragraph(
        "Use semantic HTML elements whenever possible. Screen readers and other assistive technologies rely on proper HTML structure to understand and navigate content."
      ),
      heading("Keyboard Navigation", "h3"),
      paragraph(
        "Ensure all interactive elements are keyboard accessible. Users should be able to navigate your entire application using only a keyboard."
      ),
      heading("Color and Contrast", "h3"),
      paragraph(
        "Maintain sufficient color contrast ratios and never rely solely on color to convey information. Use tools like WebAIM's contrast checker to verify compliance."
      ),
      heading("ARIA When Needed", "h3"),
      paragraph(
        "ARIA attributes can enhance accessibility, but should only be used when semantic HTML isn't sufficient. Incorrect ARIA can actually harm accessibility."
      ),
      heading("Testing for Accessibility"),
      ...numberedList([
        "Use automated tools like axe-core and Lighthouse",
        "Test with actual screen readers (VoiceOver, NVDA)",
        "Navigate your entire app using only a keyboard",
        "Include users with disabilities in user testing",
      ]),
      blockquote(
        "The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect. - Tim Berners-Lee"
      ),
    ],
    seo: {
      title: "Building Accessible Web Applications",
      description:
        "Learn how to build accessible web applications with semantic HTML, keyboard navigation, proper contrast, ARIA, and accessibility testing.",
    },
  },
  {
    title: "The Future of AI in Software Development",
    slug: "future-of-ai-software-development",
    excerpt:
      "Explore how artificial intelligence is transforming software development and what it means for developers.",
    publishedAt: "2024-11-13T10:00:00Z",
    content: [
      paragraph(
        "Artificial intelligence is revolutionizing how we write, review, and maintain software. From code generation to automated testing, AI tools are becoming indispensable parts of the modern developer's toolkit."
      ),
      heading("AI-Powered Development Tools"),
      paragraph(
        "Tools like GitHub Copilot, Claude, and ChatGPT are changing how developers write code. These AI assistants can generate boilerplate, suggest implementations, and even explain complex code."
      ),
      ...bulletList([
        "Code completion and generation",
        "Automated code review and suggestions",
        "Natural language to code translation",
        "Documentation generation",
        "Bug detection and fixes",
      ]),
      heading("Benefits and Challenges"),
      heading("Increased Productivity", "h3"),
      paragraph(
        "AI tools can significantly speed up development by handling repetitive tasks and providing instant suggestions. Developers report productivity gains of 20-50% on certain tasks."
      ),
      heading("Quality Concerns", "h3"),
      paragraph(
        "While AI can generate functional code, it doesn't always produce optimal or secure solutions. Human review remains essential to ensure code quality and catch potential issues."
      ),
      heading("The Role of Human Developers"),
      paragraph(
        "AI won't replace developers—it will augment them. The most effective developers will be those who learn to work alongside AI tools, leveraging their strengths while compensating for their limitations."
      ),
      ...numberedList([
        "Focus on problem-solving and architecture",
        "Develop strong code review skills",
        "Learn to write effective AI prompts",
        "Stay current with AI tool capabilities",
        "Understand AI limitations and biases",
      ]),
      blockquote(
        "AI is a tool, not a replacement. The best developers will be those who learn to wield it effectively."
      ),
      paragraph(
        "The future of software development is human-AI collaboration. Embrace these tools while continuing to develop your core engineering skills."
      ),
    ],
    seo: {
      title: "The Future of AI in Software Development",
      description:
        "Explore how AI tools are transforming software development, their benefits and challenges, and what this means for the future of developers.",
    },
  },
  {
    title: "Microservices vs Monoliths: Making the Right Choice",
    slug: "microservices-vs-monoliths",
    excerpt:
      "Understand the tradeoffs between microservices and monolithic architectures to make informed decisions for your projects.",
    publishedAt: "2024-11-10T09:00:00Z",
    content: [
      paragraph(
        "The debate between microservices and monoliths has dominated software architecture discussions for years. The truth? Neither is universally better—the right choice depends on your specific context."
      ),
      heading("Understanding Monoliths"),
      paragraph(
        "A monolithic architecture packages all functionality into a single deployable unit. Despite recent criticism, monoliths have significant advantages, especially for smaller teams."
      ),
      ...bulletList([
        "Simpler to develop and deploy initially",
        "Easier debugging and testing",
        "Lower operational complexity",
        "Better performance for tightly coupled operations",
        "Ideal for small teams and early-stage startups",
      ]),
      heading("Understanding Microservices"),
      paragraph(
        "Microservices decompose an application into small, independent services that communicate over networks. They offer flexibility but come with added complexity."
      ),
      ...bulletList([
        "Independent deployment and scaling",
        "Technology flexibility per service",
        "Better fault isolation",
        "Easier to understand individual services",
        "Well-suited for large teams",
      ]),
      heading("When to Choose Each"),
      heading("Choose Monolith When", "h3"),
      paragraph(
        "You have a small team, are building a new product, need to move fast, or your domain boundaries aren't clear yet. Start monolithic and extract services as needed."
      ),
      heading("Choose Microservices When", "h3"),
      paragraph(
        "You have multiple teams, clear domain boundaries, need independent scaling, or require different technology stacks for different parts of the system."
      ),
      heading("The Modular Monolith Alternative"),
      paragraph(
        "Consider a modular monolith: a well-structured monolith with clear module boundaries. It provides many microservices benefits while maintaining operational simplicity."
      ),
      blockquote(
        "If you can't build a well-structured monolith, what makes you think you can build a distributed system?"
      ),
    ],
    seo: {
      title: "Microservices vs Monoliths: Making the Right Choice",
      description:
        "Learn when to choose microservices or monolithic architecture. Understand the tradeoffs and make informed decisions for your projects.",
    },
  },
  {
    title: "Effective Code Review Practices",
    slug: "effective-code-review-practices",
    excerpt:
      "Transform your code review process from a bottleneck into a powerful tool for knowledge sharing and code quality.",
    publishedAt: "2024-11-07T14:00:00Z",
    content: [
      paragraph(
        "Code reviews are one of the most valuable practices in software development. When done well, they catch bugs, share knowledge, and improve code quality. When done poorly, they become bottlenecks and sources of frustration."
      ),
      heading("For Authors"),
      paragraph(
        "As the person submitting code for review, you have significant control over how smoothly the process goes."
      ),
      ...bulletList([
        "Keep pull requests small and focused",
        "Write clear, descriptive PR descriptions",
        "Self-review before requesting others",
        "Respond to feedback constructively",
        "Don't take feedback personally",
      ]),
      heading("For Reviewers"),
      paragraph(
        "As a reviewer, your goal is to improve code quality while maintaining a positive team dynamic."
      ),
      ...bulletList([
        "Review promptly—don't let PRs languish",
        "Focus on important issues, not style nitpicks",
        "Explain the 'why' behind your suggestions",
        "Praise good code, not just criticize problems",
        "Ask questions instead of making demands",
      ]),
      heading("What to Look For"),
      ...numberedList([
        "Correctness: Does the code do what it's supposed to?",
        "Design: Is the architecture appropriate?",
        "Complexity: Is the code easy to understand?",
        "Testing: Are there adequate tests?",
        "Naming: Are names clear and descriptive?",
        "Security: Are there potential vulnerabilities?",
      ]),
      heading("Building a Review Culture"),
      paragraph(
        "Great code review practices come from culture, not mandates. Lead by example, provide training, and create psychological safety for honest feedback."
      ),
      blockquote(
        "The goal of code review is not to find fault—it's to collaboratively improve the codebase while sharing knowledge."
      ),
    ],
    seo: {
      title: "Effective Code Review Practices",
      description:
        "Learn how to conduct effective code reviews that improve code quality, share knowledge, and maintain team morale.",
    },
  },
  {
    title: "Database Design Patterns for Modern Applications",
    slug: "database-design-patterns-modern-applications",
    excerpt:
      "Learn essential database design patterns to build scalable, maintainable data layers for your applications.",
    publishedAt: "2024-11-04T11:00:00Z",
    content: [
      paragraph(
        "Your database design can make or break your application's performance and maintainability. In this guide, we'll explore essential patterns for designing robust data layers."
      ),
      heading("Choosing the Right Database"),
      paragraph(
        "The first decision is choosing between SQL and NoSQL databases. Each has its strengths, and many modern applications use both."
      ),
      heading("Relational Databases", "h3"),
      paragraph(
        "Choose relational databases when you need ACID transactions, complex queries, or have highly structured data with clear relationships."
      ),
      heading("Document Databases", "h3"),
      paragraph(
        "Choose document databases for flexible schemas, hierarchical data, or when your data model maps naturally to documents."
      ),
      heading("Essential Design Patterns"),
      heading("Normalization and Denormalization", "h3"),
      paragraph(
        "Normalization reduces redundancy but can impact read performance. Denormalization improves reads but increases complexity. Balance based on your read/write patterns."
      ),
      heading("Indexing Strategies", "h3"),
      paragraph(
        "Proper indexing is crucial for query performance. Index columns used in WHERE clauses, JOINs, and ORDER BY, but avoid over-indexing as it slows writes."
      ),
      ...bulletList([
        "Create indexes for frequently queried columns",
        "Use composite indexes for multi-column queries",
        "Consider covering indexes for read-heavy workloads",
        "Monitor and remove unused indexes",
      ]),
      heading("Data Modeling Best Practices"),
      ...numberedList([
        "Start with your access patterns, not your data",
        "Use UUIDs vs auto-increment based on your needs",
        "Implement soft deletes for important data",
        "Plan for data migration from the start",
        "Consider time-series optimization for event data",
      ]),
      paragraph(
        "Good database design is iterative. Start with a reasonable design, measure performance in production, and optimize based on real usage patterns."
      ),
    ],
    seo: {
      title: "Database Design Patterns for Modern Applications",
      description:
        "Learn essential database design patterns including normalization, indexing strategies, and data modeling best practices for scalable applications.",
    },
  },
  {
    title: "Testing Strategies for Frontend Applications",
    slug: "testing-strategies-frontend-applications",
    excerpt:
      "Build confidence in your frontend code with a comprehensive testing strategy covering unit, integration, and end-to-end tests.",
    publishedAt: "2024-11-01T08:00:00Z",
    content: [
      paragraph(
        "Testing frontend applications presents unique challenges. Components are visual, user interactions are complex, and state management can be tricky. Here's how to build a testing strategy that gives you confidence."
      ),
      heading("The Testing Pyramid"),
      paragraph(
        "The testing pyramid suggests having many unit tests, fewer integration tests, and even fewer end-to-end tests. For frontend, this ratio might be different, but the principle holds."
      ),
      heading("Unit Testing"),
      paragraph(
        "Unit tests verify individual functions and components in isolation. They're fast, reliable, and excellent for testing business logic."
      ),
      ...bulletList([
        "Test utility functions thoroughly",
        "Test component logic independent of rendering",
        "Mock external dependencies",
        "Aim for high coverage of critical paths",
      ]),
      heading("Integration Testing"),
      paragraph(
        "Integration tests verify that components work together correctly. For frontend, this often means testing component interactions and API integrations."
      ),
      heading("Component Integration", "h3"),
      paragraph(
        "Use React Testing Library to test components as users would interact with them. Focus on behavior, not implementation details."
      ),
      heading("API Integration", "h3"),
      paragraph(
        "Use tools like MSW (Mock Service Worker) to mock API responses and test how your frontend handles different scenarios."
      ),
      heading("End-to-End Testing"),
      paragraph(
        "E2E tests verify complete user flows through your application. Tools like Playwright and Cypress make this more accessible than ever."
      ),
      ...numberedList([
        "Focus on critical user journeys",
        "Test happy paths and key error scenarios",
        "Keep E2E tests stable and maintainable",
        "Run E2E tests in CI/CD pipelines",
      ]),
      blockquote(
        "Write tests that give you confidence to deploy. No more, no less."
      ),
    ],
    seo: {
      title: "Testing Strategies for Frontend Applications",
      description:
        "Learn frontend testing strategies including unit tests, integration tests, and end-to-end tests to build confidence in your code.",
    },
  },
  {
    title: "DevOps Practices for Small Teams",
    slug: "devops-practices-small-teams",
    excerpt:
      "Implement essential DevOps practices without a dedicated team. Learn what matters most for small teams.",
    publishedAt: "2024-10-29T10:00:00Z",
    content: [
      paragraph(
        "You don't need a dedicated DevOps team to benefit from DevOps practices. Small teams can implement essential practices that dramatically improve their development workflow."
      ),
      heading("Essential Practices"),
      heading("Version Control", "h3"),
      paragraph(
        "If you're not using Git effectively, start here. Branch strategies, commit hygiene, and pull request workflows are foundational to everything else."
      ),
      heading("Continuous Integration", "h3"),
      paragraph(
        "Set up automated builds and tests that run on every commit. Services like GitHub Actions make this accessible for teams of any size."
      ),
      ...bulletList([
        "Run tests automatically on every push",
        "Lint and format code consistently",
        "Build and verify the application compiles",
        "Block merges that fail CI checks",
      ]),
      heading("Continuous Deployment", "h3"),
      paragraph(
        "Automate deployments to remove manual error and enable rapid iteration. Start with staging, then extend to production when you're confident."
      ),
      heading("Infrastructure as Code"),
      paragraph(
        "Define your infrastructure in version-controlled code. Tools like Terraform, Pulumi, or even Docker Compose give you reproducibility and history."
      ),
      heading("Monitoring and Observability"),
      paragraph(
        "You can't fix what you can't see. Implement logging, metrics, and alerting from the start—it's much harder to add later."
      ),
      ...numberedList([
        "Centralize logs for easy searching",
        "Track key performance metrics",
        "Set up alerts for critical issues",
        "Use error tracking tools like Sentry",
      ]),
      heading("Start Small, Iterate"),
      paragraph(
        "Don't try to implement everything at once. Start with the highest-impact practices for your team and build from there. Perfect is the enemy of good."
      ),
    ],
    seo: {
      title: "DevOps Practices for Small Teams",
      description:
        "Implement essential DevOps practices without a dedicated team. Learn CI/CD, infrastructure as code, and monitoring for small teams.",
    },
  },
  {
    title: "Understanding Web Security Fundamentals",
    slug: "understanding-web-security-fundamentals",
    excerpt:
      "Protect your web applications from common vulnerabilities with these security fundamentals every developer should know.",
    publishedAt: "2024-10-26T13:00:00Z",
    content: [
      paragraph(
        "Security isn't optional—it's essential. Every developer should understand common web vulnerabilities and how to prevent them. Here's what you need to know."
      ),
      heading("The OWASP Top 10"),
      paragraph(
        "The OWASP Top 10 represents the most critical web application security risks. Understanding these is your first line of defense."
      ),
      heading("Injection Attacks", "h3"),
      paragraph(
        "SQL injection, command injection, and other injection attacks occur when untrusted data is sent to an interpreter. Always use parameterized queries and sanitize inputs."
      ),
      heading("Cross-Site Scripting (XSS)", "h3"),
      paragraph(
        "XSS attacks inject malicious scripts into web pages. Prevent them by escaping output, using Content Security Policy, and avoiding innerHTML when possible."
      ),
      heading("Cross-Site Request Forgery (CSRF)", "h3"),
      paragraph(
        "CSRF attacks trick users into performing unintended actions. Use CSRF tokens, SameSite cookies, and verify the Origin header to prevent them."
      ),
      heading("Authentication and Authorization"),
      ...bulletList([
        "Use strong password hashing (bcrypt, argon2)",
        "Implement proper session management",
        "Use HTTPS everywhere",
        "Consider multi-factor authentication",
        "Follow the principle of least privilege",
      ]),
      heading("Security Headers"),
      paragraph(
        "HTTP security headers provide an additional layer of protection. Implement these essential headers in your application."
      ),
      ...numberedList([
        "Content-Security-Policy: Prevent XSS and injection",
        "X-Frame-Options: Prevent clickjacking",
        "X-Content-Type-Options: Prevent MIME sniffing",
        "Strict-Transport-Security: Enforce HTTPS",
      ]),
      blockquote(
        "Security is not a feature—it's a requirement. Build it into your development process from the start."
      ),
    ],
    seo: {
      title: "Understanding Web Security Fundamentals",
      description:
        "Learn web security fundamentals including injection prevention, XSS, CSRF, authentication best practices, and security headers.",
    },
  },
  {
    title: "Remote Work Best Practices for Developers",
    slug: "remote-work-best-practices-developers",
    excerpt:
      "Thrive as a remote developer with these proven practices for productivity, communication, and work-life balance.",
    publishedAt: "2024-10-23T09:00:00Z",
    content: [
      paragraph(
        "Remote work offers incredible flexibility, but it also presents unique challenges. After years of remote development experience, here are the practices that work best."
      ),
      heading("Setting Up for Success"),
      heading("Your Workspace", "h3"),
      paragraph(
        "Invest in a dedicated workspace. A comfortable chair, proper monitor setup, and good lighting aren't luxuries—they're essential for long-term health and productivity."
      ),
      heading("Your Schedule", "h3"),
      paragraph(
        "Set clear working hours and communicate them. Without office boundaries, it's easy to work too much or too little. Consistency helps both you and your team."
      ),
      heading("Communication"),
      paragraph(
        "Remote work lives and dies by communication. Over-communicate rather than under-communicate, and choose the right medium for each message."
      ),
      ...bulletList([
        "Write clear, comprehensive messages",
        "Use async communication by default",
        "Save synchronous meetings for discussions",
        "Document decisions and context",
        "Be explicit about availability and response times",
      ]),
      heading("Staying Productive"),
      ...numberedList([
        "Start each day with a clear plan",
        "Use time-blocking for deep work",
        "Take regular breaks—seriously",
        "Have clear boundaries between work and personal time",
        "Stay connected with your team socially",
      ]),
      heading("Avoiding Burnout"),
      paragraph(
        "Remote work can blur the line between work and life. Protect yourself by maintaining routines, taking real vacations, and knowing when to disconnect."
      ),
      blockquote(
        "The freedom of remote work requires the discipline to use that freedom wisely."
      ),
      paragraph(
        "Remote work isn't just about where you work—it's about how you work. Invest in developing these practices and you'll thrive anywhere."
      ),
    ],
    seo: {
      title: "Remote Work Best Practices for Developers",
      description:
        "Thrive as a remote developer with proven practices for workspace setup, communication, productivity, and avoiding burnout.",
    },
  },
  {
    title: "Building a Developer Portfolio That Stands Out",
    slug: "building-developer-portfolio-stands-out",
    excerpt:
      "Create a portfolio that showcases your skills and lands you opportunities, whether you're a new grad or experienced developer.",
    publishedAt: "2024-10-20T14:00:00Z",
    content: [
      paragraph(
        "Your portfolio is often the first impression potential employers or clients have of you. Here's how to create one that effectively showcases your abilities and lands opportunities."
      ),
      heading("What to Include"),
      heading("Projects", "h3"),
      paragraph(
        "Quality over quantity. Three well-documented projects are better than ten incomplete ones. Choose projects that demonstrate your strongest skills."
      ),
      ...bulletList([
        "Include the problem you solved",
        "Explain your technical decisions",
        "Show the impact or results",
        "Provide live demos when possible",
        "Link to source code on GitHub",
      ]),
      heading("About You", "h3"),
      paragraph(
        "Tell your story. What drives you? What are you passionate about? Personality matters—give employers a reason to want to work with you."
      ),
      heading("Technical Skills", "h3"),
      paragraph(
        "List your skills, but be honest about proficiency levels. It's better to list fewer skills you know well than many you barely understand."
      ),
      heading("Design Matters"),
      paragraph(
        "Even if you're not a designer, your portfolio should look professional. Use clean layouts, good typography, and consistent styling."
      ),
      ...numberedList([
        "Keep the design simple and focused",
        "Ensure mobile responsiveness",
        "Optimize for fast loading",
        "Make navigation intuitive",
        "Include clear calls to action",
      ]),
      heading("Keep It Updated"),
      paragraph(
        "A stale portfolio suggests you're not active. Regularly update with new projects, skills, and blog posts. Consider adding a blog to show ongoing learning."
      ),
      heading("Stand Out Strategies"),
      ...bulletList([
        "Solve real problems, not just tutorials",
        "Contribute to open source",
        "Write about what you learn",
        "Create unique, memorable projects",
        "Show personality and passion",
      ]),
      blockquote(
        "Your portfolio should answer one question: Why should someone hire you? Make that answer obvious."
      ),
    ],
    seo: {
      title: "Building a Developer Portfolio That Stands Out",
      description:
        "Create a developer portfolio that showcases your skills effectively. Learn what to include, design tips, and strategies to stand out.",
    },
  },
];

async function generateBlogPosts() {
  console.log("🚀 Starting blog post generation...\n");

  // Upload images
  console.log("📸 Uploading images from Unsplash...");
  const uploadedImages: Array<{
    _type: "image";
    asset: { _type: "reference"; _ref: string };
  } | null> = [];

  for (let i = 0; i < blogImages.length; i++) {
    try {
      console.log(`  Uploading image ${i + 1}/${blogImages.length}...`);
      const image = await uploadImage(blogImages[i], `blog-${i + 1}.jpg`);
      uploadedImages.push(image);
    } catch (error) {
      console.error(`  Failed to upload image ${i + 1}, skipping`);
      uploadedImages.push(null);
    }
  }

  console.log("✅ Images uploaded\n");

  // Create blog posts
  console.log("📝 Creating blog posts...");

  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i];
    const image = uploadedImages[i];

    try {
      const document = {
        _type: "post",
        _id: `post-${post.slug}`,
        title: post.title,
        slug: {
          _type: "slug",
          current: post.slug,
        },
        excerpt: post.excerpt,
        featuredImage: image
          ? {
              ...image,
              alt: post.title,
            }
          : undefined,
        content: post.content,
        publishedAt: post.publishedAt,
        seo: post.seo,
      };

      await client.createOrReplace(document);
      console.log(`  ✅ Created: "${post.title}"`);
    } catch (error) {
      console.error(`  ❌ Failed to create "${post.title}":`, error);
    }
  }

  console.log("\n🎉 Blog post generation complete!");
  console.log(`\nCreated ${blogPosts.length} blog posts:`);
  blogPosts.forEach((post) => {
    console.log(`  - ${post.title}`);
  });
}

// Run the generator
generateBlogPosts().catch(console.error);
