"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui";
import { MenuIcon, XIcon, AuroraLogo, ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import { urlFor } from "@/lib/sanity";

// Icon mapping for dropdown items
const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  // Add more icons as needed from your icons.tsx
};

const BUTTON_VARIANT_CLASSES: Record<string, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
  outline: "btn border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)]",
};

const BUTTON_SIZE_CLASSES: Record<string, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

interface NavLink {
  label: string;
  linkType: "internal" | "external" | "anchor";
  internalLink?: { slug: { current: string } };
  externalUrl?: string;
  anchor?: string;
  description?: string;
  icon?: string;
  children?: NavLink[];
}

interface CtaButton {
  label: string;
  linkType: "internal" | "external";
  internalLink?: { slug: { current: string } };
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
    logo?: any;
    mainNavigation?: NavLink[];
  };
}

// Dropdown Link Item Component
function DropdownLinkItem({ item, onClick }: { item: NavLink; onClick?: () => void }) {
  const href = getNavHref(item);
  const isExternal = item.linkType === "external";

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="group block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-[var(--surface)] focus:bg-[var(--surface)]"
    >
      <div className="flex items-start gap-3">
        {item.icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--primary)] group-hover:bg-[var(--primary)]/10 transition-colors">
            <span className="text-lg">{item.icon}</span>
          </div>
        )}
        <div className="flex-1">
          <div className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
            {item.label}
          </div>
          {item.description && (
            <p className="mt-1 text-sm leading-snug text-[var(--foreground-muted)]">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function getNavHref(item: NavLink) {
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
}

function getCtaHref(button: CtaButton) {
  if (button.linkType === "internal") {
    return button.internalLink?.slug?.current ? `/${button.internalLink.slug.current}` : "/";
  }
  return button.externalUrl || "#";
}

export function Navigation({ settings }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedItems(new Set());
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setExpandedItems(new Set());
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const toggleExpanded = useCallback((index: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const isActiveLink = (item: NavLink): boolean => {
    const href = getNavHref(item);
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const headerNav = settings?.headerNavigation;
  const logo = headerNav?.logo || settings?.logo;
  const navItems = headerNav?.navLinks || settings?.mainNavigation || [];
  const ctaButtons = headerNav?.ctaButtons || [];
  const showCta = headerNav?.showCta !== false;

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

        {/* Desktop Navigation with Dropdowns */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.children && item.children.length > 0 ? (
                    <>
                      <NavigationMenuTrigger className="nav-link">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-1 p-4 w-[400px] md:w-[500px] lg:w-[600px] md:grid-cols-2">
                          {item.children.map((child, childIndex) => (
                            <DropdownLinkItem key={childIndex} item={child} />
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={getNavHref(item)} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} ${isActiveLink(item) ? "text-[var(--foreground)] bg-[var(--surface)]/50" : ""}`}
                        target={item.linkType === "external" ? "_blank" : undefined}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop CTA Buttons */}
        {showCta && ctaButtons.length > 0 && (
          <div className="hidden md:flex items-center gap-3">
            {ctaButtons.map((button, index) => (
              <Link
                key={index}
                href={getCtaHref(button)}
                target={button.openInNewTab ? "_blank" : undefined}
                rel={button.openInNewTab ? "noopener noreferrer" : undefined}
                className={`${BUTTON_VARIANT_CLASSES[button.variant] || BUTTON_VARIANT_CLASSES.primary} ${BUTTON_SIZE_CLASSES[button.size] || ""}`}
              >
                {button.label}
              </Link>
            ))}
          </div>
        )}

        {showCta && ctaButtons.length === 0 && (
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button size="sm">Get Started</Button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu with Submenu Support */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[var(--border)] shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col p-4">
            {navItems.map((item, index) => (
              <div key={index} className="border-b border-[var(--border)]/50 last:border-b-0">
                {item.children && item.children.length > 0 ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(index)}
                      className="flex items-center justify-between w-full py-3 px-2 text-left text-[var(--foreground)] font-medium hover:bg-[var(--surface)] rounded-lg transition-colors"
                      aria-expanded={expandedItems.has(index)}
                    >
                      <span>{item.label}</span>
                      {expandedItems.has(index) ? (
                        <ChevronUpIcon className="w-4 h-4 text-[var(--foreground-muted)]" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-[var(--foreground-muted)]" />
                      )}
                    </button>

                    {/* Submenu items with smooth expand animation */}
                    <div
                      className={`overflow-hidden transition-all duration-200 ease-out ${
                        expandedItems.has(index) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 pb-2 space-y-1">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={getNavHref(child)}
                            className="block py-2.5 px-3 rounded-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors"
                            onClick={closeMobileMenu}
                            target={child.linkType === "external" ? "_blank" : undefined}
                          >
                            <div className="flex items-center gap-3">
                              {child.icon && (
                                <span className="text-[var(--primary)]">{child.icon}</span>
                              )}
                              <div>
                                <div className="font-medium text-sm">{child.label}</div>
                                {child.description && (
                                  <div className="text-xs text-[var(--foreground-muted)] mt-0.5">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={getNavHref(item)}
                    className={`block py-3 px-2 rounded-lg font-medium transition-colors ${
                      isActiveLink(item)
                        ? "text-[var(--primary)] bg-[var(--surface)]"
                        : "text-[var(--foreground)] hover:bg-[var(--surface)]"
                    }`}
                    onClick={closeMobileMenu}
                    aria-current={isActiveLink(item) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA Buttons */}
            {showCta && (
              <div className="pt-4 mt-4 border-t border-[var(--border)] flex flex-col gap-2">
                {ctaButtons.length > 0 ? (
                  ctaButtons.map((button, index) => (
                    <Link
                      key={index}
                      href={getCtaHref(button)}
                      target={button.openInNewTab ? "_blank" : undefined}
                      rel={button.openInNewTab ? "noopener noreferrer" : undefined}
                      onClick={closeMobileMenu}
                      className={`${BUTTON_VARIANT_CLASSES[button.variant] || BUTTON_VARIANT_CLASSES.primary} w-full justify-center`}
                    >
                      {button.label}
                    </Link>
                  ))
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-center">Sign In</Button>
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
