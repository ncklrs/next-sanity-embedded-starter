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

interface FAQWithCategoriesProps extends BaseFAQProps {
  categories: string[];
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
  items,
  heading,
  subheading,
  badge,
  allowMultiple = false,
  iconType = "chevron",
  backgroundColor,
  className = "",
}: FAQAccordionProps) {
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
      className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="max-w-3xl mx-auto">
        {(badge || heading || subheading) && (
          <div className="text-center mb-12">
            {badge && (
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl font-bold text-white mb-2">{heading}</h2>
            )}
            {subheading && (
              <p className="text-gray-400 text-lg">{subheading}</p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-white/20"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-200 hover:bg-white/5"
                aria-expanded={isOpen(index)}
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {item.question}
                </span>
                {iconType === "chevron" ? (
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
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
                  <span className="text-2xl text-gray-400 flex-shrink-0 font-light">
                    {isOpen(index) ? "−" : "+"}
                  </span>
                )}
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen(index)
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
                style={{
                  overflow: "hidden",
                }}
              >
                <div className="px-6 pb-4 pt-2">
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
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
  items,
  heading,
  subheading,
  badge,
  backgroundColor,
  className = "",
}: FAQTwoColumnProps) {
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
            className="bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-white/20"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-200 hover:bg-white/5"
              aria-expanded={isOpen(index)}
            >
              <span className="text-lg font-semibold text-white pr-4">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
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
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              style={{
                overflow: "hidden",
              }}
            >
              <div className="px-6 pb-4 pt-2">
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        {(badge || heading || subheading) && (
          <div className="text-center mb-12">
            {badge && (
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl font-bold text-white mb-2">{heading}</h2>
            )}
            {subheading && (
              <p className="text-gray-400 text-lg">{subheading}</p>
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
  items,
  heading,
  subheading,
  badge,
  categories,
  defaultCategory,
  backgroundColor,
  className = "",
}: FAQWithCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    defaultCategory || categories[0] || "All"
  );
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const filteredItems =
    selectedCategory === "All"
      ? items
      : items.filter((item) => item.category === selectedCategory);

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
      className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="max-w-4xl mx-auto">
        {(badge || heading || subheading) && (
          <div className="text-center mb-12">
            {badge && (
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl font-bold text-white mb-2">{heading}</h2>
            )}
            {subheading && (
              <p className="text-gray-400 text-lg">{subheading}</p>
            )}
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
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
                className="bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-white/20 animate-fadeIn"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-200 hover:bg-white/5"
                  aria-expanded={isOpen(index)}
                >
                  <span className="text-lg font-semibold text-white pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
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
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <div className="px-6 pb-4 pt-2">
                    <p className="text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
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
  items,
  heading,
  showCTA = false,
  ctaHeading = "Still have questions?",
  ctaButtonText = "Contact Us",
  ctaButtonHref = "/contact",
  backgroundColor,
  className = "",
}: FAQSimpleProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const isOpen = (index: number) => openIndices.includes(index);

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="max-w-3xl mx-auto">
        {heading && (
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {heading}
          </h2>
        )}

        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="border-b border-white/10 pb-6 last:border-0">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-start justify-between text-left group"
                aria-expanded={isOpen(index)}
              >
                <span className="text-lg font-semibold text-white pr-4 group-hover:text-blue-400 transition-colors duration-200">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-1 transition-transform duration-300 ${
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
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {showCTA && (
          <div className="mt-16 text-center bg-white/5 border border-white/10 rounded-lg p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              {ctaHeading}
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <a
              href={ctaButtonHref}
              className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg shadow-blue-500/30"
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
