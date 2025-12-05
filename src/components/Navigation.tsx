"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { MenuIcon, XIcon, AuroraLogo } from "@/components/icons";
import { urlFor } from "@/lib/sanity";

interface NavItem {
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

interface NavigationProps {
  settings?: {
    logo?: any;
    title?: string;
    mainNavigation?: NavItem[];
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

  const getHref = (item: NavItem) => {
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

  const navItems = settings?.mainNavigation || [];

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-container">
        <Link href="/" className="flex items-center">
          {settings?.logo ? (
            <Image
              src={urlFor(settings.logo).width(120).url()}
              alt={settings.title || "Logo"}
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
              href={getHref(item)}
              className="nav-link"
              target={item.linkType === "external" ? "_blank" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm">Get Started</Button>
        </div>

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
                href={getHref(item)}
                className="nav-link block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-[var(--border)] flex flex-col gap-2">
              <Button variant="ghost" className="w-full justify-center">
                Sign In
              </Button>
              <Button className="w-full justify-center">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
