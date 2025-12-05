import Link from "next/link";
import { AuroraLogo } from "@/components/icons";

interface FooterProps {
  settings?: {
    title?: string;
    description?: string;
    socialLinks?: Array<{ platform: string; url: string }>;
    footerText?: string;
  };
}

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Integrations"],
  Company: ["About", "Blog", "Careers", "Press", "Partners"],
  Resources: ["Documentation", "API Reference", "Guides", "Status", "Support"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const currentYear = new Date().getFullYear();

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <AuroraLogo className="mb-4" />
            <p className="text-[var(--foreground-muted)] mb-6">
              {settings?.description || "The modern platform for building exceptional digital experiences."}
            </p>
            <div className="flex gap-4">
              {settings?.socialLinks && settings.socialLinks.length > 0 ? (
                settings.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors capitalize"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.platform}
                  </a>
                ))
              ) : (
                ["Twitter", "GitHub", "Discord"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {social}
                  </a>
                ))
              )}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="footer-heading">{category}</h4>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="footer-link">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>{settings?.footerText || `© ${currentYear} Aurora. All rights reserved.`}</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[var(--foreground)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[var(--foreground)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
