"use client";

import { useState } from "react";

// Types
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface BaseFAQProps {
  items: FAQItem[];
  heading?: string;
  subheading?: string;
  badge?: string;
  backgroundColor?: string;
  className?: string;
}

interface FAQAccordionProps extends BaseFAQProps {
  allowMultiple?: boolean;
  iconType?: "plus-minus" | "chevron";
}

interface FAQTwoColumnProps extends BaseFAQProps {}

// Sanity category format with nested items
interface SanityFAQCategory {
  _key?: string;
  name: string;
  items?: FAQItem[];
}

interface FAQWithCategoriesProps extends BaseFAQProps {
  categories: string[] | SanityFAQCategory[];
  defaultCategory?: string;
}

interface FAQSimpleProps extends BaseFAQProps {
  showCTA?: boolean;
  ctaHeading?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

// FAQAccordion Component
export function FAQAccordion({
  items: rawItems,
  heading,
  subheading,
  badge,
  allowMultiple = false,
  iconType = "chevron",
  backgroundColor,
  className = "",
}: FAQAccordionProps) {
  const items = rawItems ?? [];
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  const isOpen = (index: number) => openIndices.includes(index);

  return (
    <section
      className={`section ${className}`}
      style={{ backgroundColor }}
    >
      <div className="container max-w-3xl mx-auto">
        {(badge || heading || subheading) && (
          <div className="section-header text-center mb-12">
            {badge && (
              <span className="badge badge-gradient mb-4">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="display-lg mb-4">{heading}</h2>
            )}
            {subheading && (
              <p className="body-lg">{subheading}</p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="accordion-item"
            >
              <button
                onClick={() => toggleItem(index)}
                className="accordion-trigger"
                aria-expanded={isOpen(index)}
              >
                <span className="pr-4">
                  {item.question}
                </span>
                {iconType === "chevron" ? (
                  <svg
                    className={`accordion-icon text-[var(--foreground-subtle)] ${
                      isOpen(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                ) : (
                  <span className="text-2xl text-[var(--foreground-subtle)] flex-shrink-0 font-light">
                    {isOpen(index) ? "−" : "+"}
                  </span>
                )}
              </button>
              <div
                className={`accordion-content ${isOpen(index) ? "open" : ""}`}
                style={{
                  maxHeight: isOpen(index) ? "500px" : "0",
                }}
              >
                <div className="accordion-body">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQTwoColumn Component
export function FAQTwoColumn({
  items: rawItems,
  heading,
  subheading,
  badge,
  backgroundColor,
  className = "",
}: FAQTwoColumnProps) {
  const items = rawItems ?? [];
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isOpen = (index: number) => openIndices.includes(index);

  const midPoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midPoint);
  const rightColumn = items.slice(midPoint);

  const renderColumn = (columnItems: FAQItem[], startIndex: number) => (
    <div className="space-y-4">
      {columnItems.map((item, idx) => {
        const index = startIndex + idx;
        return (
          <div
            key={index}
            className="accordion-item"
          >
            <button
              onClick={() => toggleItem(index)}
              className="accordion-trigger"
              aria-expanded={isOpen(index)}
            >
              <span className="pr-4">
                {item.question}
              </span>
              <svg
                className={`accordion-icon text-[var(--foreground-subtle)] ${
                  isOpen(index) ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`accordion-content ${isOpen(index) ? "open" : ""}`}
              style={{
                maxHeight: isOpen(index) ? "500px" : "0",
              }}
            >
              <div className="accordion-body">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      className={`section ${className}`}
      style={{ backgroundColor }}
    >
      <div className="container">
        {(badge || heading || subheading) && (
          <div className="section-header text-center mb-12">
            {badge && (
              <span className="badge badge-gradient mb-4">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="display-lg mb-4">{heading}</h2>
            )}
            {subheading && (
              <p className="body-lg">{subheading}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderColumn(leftColumn, 0)}
          {renderColumn(rightColumn, midPoint)}
        </div>
      </div>
    </section>
  );
}

// FAQWithCategories Component
export function FAQWithCategories({
  items: rawItems,
  heading,
  subheading,
  badge,
  categories: rawCategories,
  defaultCategory,
  backgroundColor,
  className = "",
}: FAQWithCategoriesProps) {
  // Handle both Sanity format (categories with nested items) and component format (flat items + string categories)
  const isSanityFormat =
    rawCategories &&
    rawCategories.length > 0 &&
    typeof rawCategories[0] === "object" &&
    "name" in rawCategories[0];

  // Extract category names and flatten items from Sanity format
  let categoryNames: string[] = [];
  let allItems: FAQItem[] = [];

  if (isSanityFormat) {
    const sanityCategories = rawCategories as SanityFAQCategory[];
    categoryNames = sanityCategories.map((cat) => cat.name);
    // Flatten items from all categories, adding category field to each
    allItems = sanityCategories.flatMap((cat) =>
      (cat.items ?? []).map((item) => ({
        ...item,
        category: cat.name,
      }))
    );
  } else {
    categoryNames = (rawCategories as string[]) ?? [];
    allItems = rawItems ?? [];
  }

  const [selectedCategory, setSelectedCategory] = useState(
    defaultCategory || categoryNames[0] || "All"
  );
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const filteredItems =
    selectedCategory === "All"
      ? allItems
      : allItems.filter((item) => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isOpen = (index: number) => openIndices.includes(index);

  // Reset open items when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setOpenIndices([]);
  };

  return (
    <section
      className={`section ${className}`}
      style={{ backgroundColor }}
    >
      <div className="container max-w-4xl mx-auto">
        {(badge || heading || subheading) && (
          <div className="section-header text-center mb-12">
            {badge && (
              <span className="badge badge-gradient mb-4">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="display-lg mb-4">{heading}</h2>
            )}
            {subheading && (
              <p className="body-lg">{subheading}</p>
            )}
          </div>
        )}

        {/* Category Tabs */}
        <div className="category-tabs">
          {categoryNames.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-tab ${
                selectedCategory === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 transition-all duration-300">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={index}
                className="accordion-item animate-fade-in"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="accordion-trigger"
                  aria-expanded={isOpen(index)}
                >
                  <span className="pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`accordion-icon text-[var(--foreground-subtle)] ${
                      isOpen(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`accordion-content ${isOpen(index) ? "open" : ""}`}
                  style={{
                    maxHeight: isOpen(index) ? "500px" : "0",
                  }}
                >
                  <div className="accordion-body">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="body-lg">
                No questions found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// FAQSimple Component
export function FAQSimple({
  items: rawItems,
  heading,
  showCTA = false,
  ctaHeading = "Still have questions?",
  ctaButtonText = "Contact Us",
  ctaButtonHref = "/contact",
  backgroundColor,
  className = "",
}: FAQSimpleProps) {
  const items = rawItems ?? [];
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isOpen = (index: number) => openIndices.includes(index);

  return (
    <section
      className={`section ${className}`}
      style={{ backgroundColor }}
    >
      <div className="container max-w-3xl mx-auto">
        {heading && (
          <h2 className="display-lg mb-8 text-center">
            {heading}
          </h2>
        )}

        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="border-b border-[var(--border)] pb-6 last:border-0">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-start justify-between text-left group"
                aria-expanded={isOpen(index)}
              >
                <span className="text-lg font-semibold text-[var(--foreground)] pr-4 group-hover:text-[var(--accent-violet)] transition-colors duration-200">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[var(--foreground-subtle)] flex-shrink-0 mt-1 transition-transform duration-300 ${
                    isOpen(index) ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen(index)
                    ? "max-h-[500px] opacity-100 mt-3"
                    : "max-h-0 opacity-0"
                }`}
                style={{
                  overflow: "hidden",
                }}
              >
                <p className="text-[var(--foreground-muted)] leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {showCTA && (
          <div className="mt-16 text-center glass-card p-8">
            <h3 className="heading-lg mb-4">
              {ctaHeading}
            </h3>
            <p className="body-lg mb-6 max-w-md mx-auto">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <a
              href={ctaButtonHref}
              className="btn btn-primary"
            >
              {ctaButtonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

// Default export with all variants
export default {
  Accordion: FAQAccordion,
  TwoColumn: FAQTwoColumn,
  WithCategories: FAQWithCategories,
  Simple: FAQSimple,
};
