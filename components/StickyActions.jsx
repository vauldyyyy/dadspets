"use client";

/* Sticky mobile action bar — the owner's business runs on calls, WhatsApp
   and walk-ins, so those three actions stay thumb-reachable on phones.
   Shown below 720px only; replaces the floating WhatsApp bubble there. */

import { BUSINESS, telHref, waLink, directionsUrl } from "../lib/business";
import Icon from "./Icon";

export default function StickyActions() {
  return (
    <nav className="sticky-actions" aria-label="Quick actions">
      <a href={telHref} aria-label={BUSINESS.phoneE164 ? "Call Dad's Pets" : "Contact Dad's Pets"}>
        <Icon name="phone" size={17} />
        {BUSINESS.phoneE164 ? "Call" : "Contact"}
      </a>
      <a
        href={waLink()}
        target={BUSINESS.whatsappNumber ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="sa-wa"
        aria-label={BUSINESS.whatsappNumber ? "Chat on WhatsApp" : "Contact Dad's Pets"}
      >
        <Icon name="chat" size={17} />
        {BUSINESS.whatsappNumber ? "WhatsApp" : "Enquire"}
      </a>
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get directions on Google Maps"
      >
        <Icon name="pin" size={17} />
        Directions
      </a>
    </nav>
  );
}
