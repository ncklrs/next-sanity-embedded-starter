"use client";

import { useMemo } from "react";
import { urlFor } from "@/lib/sanity";
import { AnnouncementBar, StickyCta, Modal } from "./modules/Engagement";
import type { EngagementData } from "../../sanity/queries/fetchers";

interface GlobalEngagementProps {
  engagements: EngagementData[];
}

/**
 * Renders global engagement elements (announcement bars, sticky CTAs, modals, popups)
 * Handles priority-based rendering - highest priority wins for each type
 */
export function GlobalEngagement({ engagements }: GlobalEngagementProps) {
  // Group engagements by type and pick highest priority for each
  const activeEngagements = useMemo(() => {
    const byType: Record<string, EngagementData> = {};

    // Engagements already sorted by priority desc from query
    for (const engagement of engagements) {
      // Only keep the first (highest priority) of each type
      if (!byType[engagement.engagementType]) {
        byType[engagement.engagementType] = engagement;
      }
    }

    return byType;
  }, [engagements]);

  const announcementBar = activeEngagements.announcementBar;
  const stickyCta = activeEngagements.stickyCta;
  const exitIntentModal = activeEngagements.exitIntentModal;
  const newsletterPopup = activeEngagements.newsletterPopup;

  return (
    <>
      {/* Announcement Bar - renders at top of page */}
      {announcementBar && announcementBar.message && (
        <AnnouncementBar
          message={announcementBar.message}
          link={
            announcementBar.link?.text && announcementBar.link?.url
              ? { text: announcementBar.link.text, url: announcementBar.link.url }
              : undefined
          }
          dismissible={announcementBar.dismissible}
          variant={announcementBar.variant as "default" | "gradient" | "highlight"}
        />
      )}

      {/* Sticky CTA - fixed position */}
      {stickyCta && stickyCta.text && (
        <StickyCta
          id={stickyCta._id}
          text={stickyCta.text}
          url={stickyCta.url || "#"}
          position={stickyCta.position as "bottom-right" | "bottom-left" | "bottom-center"}
          showAfterScroll={stickyCta.showAfterScroll}
          variant={stickyCta.variant as "button" | "pill" | "expanded"}
          dismissible={stickyCta.dismissible}
        />
      )}

      {/* Exit Intent Modal */}
      {exitIntentModal && (
        <Modal
          id={`exit-${exitIntentModal._id}`}
          title={exitIntentModal.title}
          content={exitIntentModal.message || ""}
          image={
            exitIntentModal.image?.asset
              ? urlFor(exitIntentModal.image).width(800).url()
              : undefined
          }
          cta={
            exitIntentModal.cta
              ? {
                  text: exitIntentModal.cta.text || "",
                  url: exitIntentModal.cta.url || "",
                  variant: exitIntentModal.cta.variant as "primary" | "secondary",
                }
              : undefined
          }
          trigger="exit-intent"
          showOnce={exitIntentModal.showOnce}
          variant={exitIntentModal.variant as "default" | "fullscreen" | "slide-in"}
        />
      )}

      {/* Newsletter Popup */}
      {newsletterPopup && (
        <Modal
          id={`newsletter-${newsletterPopup._id}`}
          title={newsletterPopup.title}
          content={newsletterPopup.message || ""}
          image={
            newsletterPopup.image?.asset
              ? urlFor(newsletterPopup.image).width(800).url()
              : undefined
          }
          trigger={
            newsletterPopup.trigger === "scroll-depth" ? "scroll-depth" : "time-delay"
          }
          triggerValue={
            newsletterPopup.triggerValue ||
            (newsletterPopup.trigger === "scroll-depth" ? 50 : 10000)
          }
          showOnce={newsletterPopup.showOnce}
          formModule={{
            formType: "newsletter",
            submitButtonText: newsletterPopup.buttonText || "Subscribe",
            successMessage: newsletterPopup.successMessage || "Thanks for subscribing!",
          }}
        />
      )}
    </>
  );
}

export default GlobalEngagement;
