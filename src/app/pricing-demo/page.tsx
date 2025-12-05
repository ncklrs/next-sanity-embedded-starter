"use client";

import { PricingCardsExample, PricingComparisonExample, PricingSimpleExample } from "@/components/modules/Pricing/examples";

export default function PricingDemoPage() {
  return (
    <main className="min-h-screen">
      {/* Demo Navigation */}
      <div className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)] backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-xl font-bold">Pricing Components Demo</h1>
          <div className="flex gap-4 mt-2 text-sm">
            <a href="#cards" className="text-[var(--accent-violet)] hover:underline">
              Cards
            </a>
            <a href="#comparison" className="text-[var(--accent-violet)] hover:underline">
              Comparison
            </a>
            <a href="#simple" className="text-[var(--accent-violet)] hover:underline">
              Simple
            </a>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div id="cards">
        <PricingCardsExample />
      </div>

      {/* Spacer */}
      <div className="h-24" />

      {/* Pricing Comparison */}
      <div id="comparison">
        <PricingComparisonExample />
      </div>

      {/* Spacer */}
      <div className="h-24" />

      {/* Pricing Simple */}
      <div id="simple">
        <PricingSimpleExample />
      </div>

      {/* Bottom spacer */}
      <div className="h-24" />
    </main>
  );
}
