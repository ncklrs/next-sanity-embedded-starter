"use client";

import { forwardRef, type HTMLAttributes } from "react";
import Image from "next/image";

// TypeScript Interfaces
export interface SocialLink {
  platform: "twitter" | "linkedin" | "github" | "email" | "website";
  url: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image: string;
  imageAlt?: string;
  socialLinks?: SocialLink[];
}

interface TeamSectionProps extends HTMLAttributes<HTMLElement> {
  badge?: string;
  heading: string;
  subheading?: string;
  members: TeamMember[];
  backgroundColor?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
}

interface TeamGridProps extends TeamSectionProps {}

interface TeamCardsProps extends TeamSectionProps {
  columns?: 3 | 4;
}

interface TeamCompactProps extends TeamSectionProps {
  layout?: "row" | "grid";
  showInfoOnHover?: boolean;
}

// Social Icon Components
function TwitterIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function EmailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function WebsiteIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// Social Links Component
function SocialLinks({ links, className = "" }: { links: SocialLink[]; className?: string }) {
  const getIcon = (platform: SocialLink["platform"]) => {
    const iconClass = "w-5 h-5";
    switch (platform) {
      case "twitter":
        return <TwitterIcon className={iconClass} />;
      case "linkedin":
        return <LinkedInIcon className={iconClass} />;
      case "github":
        return <GitHubIcon className={iconClass} />;
      case "email":
        return <EmailIcon className={iconClass} />;
      case "website":
        return <WebsiteIcon className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target={link.platform !== "email" ? "_blank" : undefined}
          rel={link.platform !== "email" ? "noopener noreferrer" : undefined}
          className="text-[var(--foreground-subtle)] hover:text-[var(--accent-violet)] transition-colors duration-200"
          aria-label={`${link.platform} link`}
        >
          {getIcon(link.platform)}
        </a>
      ))}
    </div>
  );
}

// Section Header Component
function SectionHeader({
  badge,
  heading,
  subheading,
  className = "",
}: {
  badge?: string;
  heading: string;
  subheading?: string;
  className?: string;
}) {
  return (
    <div className={`section-header ${className}`}>
      {badge && <div className="badge badge-gradient mb-4">{badge}</div>}
      <h2 className="heading-lg mb-4">{heading}</h2>
      {subheading && <p className="body-lg">{subheading}</p>}
    </div>
  );
}

// TeamGrid - Full featured team grid with images, bio, and social links
export const TeamGrid = forwardRef<HTMLElement, TeamGridProps>(
  (
    {
      badge,
      heading,
      subheading,
      members,
      backgroundColor,
      spacing = "xl",
      className = "",
      ...props
    },
    ref
  ) => {
    const spacingMap = {
      sm: "py-12 px-6",
      md: "py-16 px-6",
      lg: "py-20 px-8",
      xl: "py-24 px-8",
    };

    return (
      <section
        ref={ref}
        className={`section ${spacingMap[spacing]} ${className}`}
        style={backgroundColor ? { backgroundColor } : undefined}
        {...props}
      >
        <div className="container">
          <SectionHeader badge={badge} heading={heading} subheading={subheading} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <div
                key={index}
                className="glass-card p-0 overflow-hidden group"
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.imageAlt || member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="heading-md mb-1">{member.name}</h3>
                  <p className="text-[var(--accent-violet)] text-sm font-medium mb-3">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="text-[var(--foreground-muted)] text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  )}
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <SocialLinks links={member.socialLinks} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

TeamGrid.displayName = "TeamGrid";

// TeamCards - Compact cards with social icons overlay on hover
export const TeamCards = forwardRef<HTMLElement, TeamCardsProps>(
  (
    {
      badge,
      heading,
      subheading,
      members,
      columns = 4,
      backgroundColor,
      spacing = "xl",
      className = "",
      ...props
    },
    ref
  ) => {
    const spacingMap = {
      sm: "py-12 px-6",
      md: "py-16 px-6",
      lg: "py-20 px-8",
      xl: "py-24 px-8",
    };

    const columnMap = {
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
    };

    return (
      <section
        ref={ref}
        className={`section ${spacingMap[spacing]} ${className}`}
        style={backgroundColor ? { backgroundColor } : undefined}
        {...props}
      >
        <div className="container">
          <SectionHeader badge={badge} heading={heading} subheading={subheading} />

          <div className={`grid grid-cols-1 sm:grid-cols-2 ${columnMap[columns]} gap-6`}>
            {members.map((member, index) => (
              <div
                key={index}
                className="group relative glass-card p-0 overflow-hidden"
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.imageAlt || member.name}
                    fill
                    className="object-cover"
                  />
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <SocialLinks links={member.socialLinks} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-[var(--foreground-muted)] text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

TeamCards.displayName = "TeamCards";

// TeamCompact - Minimal team display with circular avatars
export const TeamCompact = forwardRef<HTMLElement, TeamCompactProps>(
  (
    {
      badge,
      heading,
      subheading,
      members,
      layout = "grid",
      showInfoOnHover = true,
      backgroundColor,
      spacing = "xl",
      className = "",
      ...props
    },
    ref
  ) => {
    const spacingMap = {
      sm: "py-12 px-6",
      md: "py-16 px-6",
      lg: "py-20 px-8",
      xl: "py-24 px-8",
    };

    const layoutClass =
      layout === "row"
        ? "flex flex-wrap justify-center items-center gap-6"
        : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8";

    return (
      <section
        ref={ref}
        className={`section ${spacingMap[spacing]} ${className}`}
        style={backgroundColor ? { backgroundColor } : undefined}
        {...props}
      >
        <div className="container">
          <SectionHeader badge={badge} heading={heading} subheading={subheading} />

          <div className={layoutClass}>
            {members.map((member, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[var(--border)] transition-all duration-300 group-hover:border-[var(--accent-violet)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                    <Image
                      src={member.image}
                      alt={member.imageAlt || member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {member.socialLinks && member.socialLinks.length > 0 && showInfoOnHover && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-[var(--surface-elevated)] px-3 py-2 rounded-full border border-[var(--border)] shadow-lg">
                        <SocialLinks links={member.socialLinks} className="scale-90" />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={
                    showInfoOnHover
                      ? "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      : ""
                  }
                >
                  <h3 className="font-semibold text-base mb-1">{member.name}</h3>
                  <p className="text-[var(--foreground-muted)] text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

TeamCompact.displayName = "TeamCompact";

// Default export
export default {
  TeamGrid,
  TeamCards,
  TeamCompact,
};
