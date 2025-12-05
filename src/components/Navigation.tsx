"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { MenuIcon, XIcon, AuroraLogo } from "@/components/icons";
import { urlFor } from "@/lib/sanity";

interface NavLink {
  label: string;
  linkType: "internal" | "external" | "anchor";
  internalLink?: {
    slug: {
      current: string;
    };
  };
  externalUrl?: string;
  anchor?: string;
}

interface CtaButton {
  label: string;
  linkType: "internal" | "external";
  internalLink?: {
    slug: {
      current: string;
    };
  };
  externalUrl?: string;
  openInNewTab?: boolean;
  variant: "primary" | "secondary" | "ghost" | "outline";
  size: "sm" | "md" | "lg";
  icon?: string;
}

interface HeaderNavigation {
  logo?: any;
  navLinks?: NavLink[];
  ctaButtons?: CtaButton[];
  showCta?: boolean;
}

export interface NavigationProps {
  settings?: {
    title?: string;
    headerNavigation?: HeaderNavigation;
    // Legacy fields for backwards compatibility
    logo?: any;
    mainNavigation?: NavLink[];
  };
}

export function Navigation({ settings }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavHref = (item: NavLink) => {
    switch (item.linkType) {
      case "internal":
        return item.internalLink?.slug?.current ? `/${item.internalLink.slug.current}` : "/";
      case "external":
        return item.externalUrl || "#";
      case "anchor":
        return item.anchor || "#";
      default:
        return "#";
    }
  };

  const getCtaHref = (button: CtaButton) => {
    if (button.linkType === "internal") {
      return button.internalLink?.slug?.current ? `/${button.internalLink.slug.current}` : "/";
    }
    return button.externalUrl || "#";
  };

  // Use new structure with fallback to legacy fields
  const headerNav = settings?.headerNavigation;
  const logo = headerNav?.logo || settings?.logo;
  const navItems = headerNav?.navLinks || settings?.mainNavigation || [];
  const ctaButtons = headerNav?.ctaButtons || [];
  const showCta = headerNav?.showCta !== false; // Default to true

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-container">
        <Link href="/" className="flex items-center">
          {logo ? (
            <Image
              src={urlFor(logo).width(120).url()}
              alt={settings?.title || "Logo"}
              width={120}
              height={32}
            />
          ) : (
            <AuroraLogo />
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={getNavHref(item)}
              className="nav-link"
              target={item.linkType === "external" ? "_blank" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        {showCta && ctaButtons.length > 0 && (
          <div className="hidden md:flex items-center gap-3">
            {ctaButtons.map((button, index) => {
              const variantClasses: Record<string, string> = {
                primary: "btn btn-primary",
                secondary: "btn btn-secondary",
                ghost: "btn btn-ghost",
                outline: "btn border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)]",
              };
              const sizeClasses: Record<string, string> = {
                sm: "btn-sm",
                md: "",
                lg: "btn-lg",
              };
              return (
                <Link
                  key={index}
                  href={getCtaHref(button)}
                  target={button.openInNewTab ? "_blank" : undefined}
                  rel={button.openInNewTab ? "noopener noreferrer" : undefined}
                  className={`${variantClasses[button.variant] || variantClasses.primary} ${sizeClasses[button.size] || ""}`}
                >
                  {button.label}
                </Link>
              );
            })}
          </div>
        )}

        {/* Fallback CTA if no buttons configured */}
        {showCta && ctaButtons.length === 0 && (
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[var(--border)] p-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={getNavHref(item)}
                className="nav-link block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {showCta && (
              <div className="pt-4 mt-2 border-t border-[var(--border)] flex flex-col gap-2">
                {ctaButtons.length > 0 ? (
                  ctaButtons.map((button, index) => {
                    const variantClasses: Record<string, string> = {
                      primary: "btn btn-primary",
                      secondary: "btn btn-secondary",
                      ghost: "btn btn-ghost",
                      outline: "btn border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)]",
                    };
                    return (
                      <Link
                        key={index}
                        href={getCtaHref(button)}
                        target={button.openInNewTab ? "_blank" : undefined}
                        rel={button.openInNewTab ? "noopener noreferrer" : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`${variantClasses[button.variant] || variantClasses.primary} w-full justify-center`}
                      >
                        {button.label}
                      </Link>
                    );
                  })
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-center">
                      Sign In
                    </Button>
                    <Button className="w-full justify-center">Get Started</Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
