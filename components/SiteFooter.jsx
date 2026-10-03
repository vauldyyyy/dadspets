"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionVideo from "./SectionVideo";
import SceneLayers from "./SceneLayers";
import { BUSINESS, telHref, waLink, directionsUrl } from "../lib/business";

export default function SiteFooter() {
  return (
    <footer className="site-foot" data-nav="dark">
      <SectionVideo name="footer" scrim="dark" scrimStrength={0.6} opacity={0.7} fallback={<SceneLayers preset="footer" />} />
      <div className="wrap">
        <div>
          <div className="logo">DAD&apos;S PETS</div>
          <p style={{ maxWidth: 290, marginTop: 10 }}>Pet, aquarium and poultry supplies for homes, shops and farms in Goa.</p>
        </div>
        <div>
          <h5>Explore</h5>
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/custom-aquariums">Custom Aquariums</Link>
          <Link href="/live-stock">Live Animals</Link>
          <Link href="/wholesale">Wholesale</Link>
          <Link href="/care-guides">Care Guides</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h5>Visit</h5>
          {BUSINESS.phoneDisplay && <a href={telHref}>{BUSINESS.phoneDisplay}</a>}
          {BUSINESS.whatsappNumber && <a href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>}
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">{BUSINESS.locationLabel}</a>
        </div>
        <div>
          <h5>Follow</h5>
          {BUSINESS.instagram && <motion.a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" whileHover={{ x: 3, color: "#d69a34" }}>Instagram</motion.a>}
          {BUSINESS.facebook && <motion.a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" whileHover={{ x: 3, color: "#d69a34" }}>Facebook</motion.a>}
          {!BUSINESS.instagram && !BUSINESS.facebook && <span>Links coming soon</span>}
        </div>
        <div className="fb">© {new Date().getFullYear()} Dad&apos;s Pets · Goa</div>
      </div>
    </footer>
  );
}
