"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Icon from "./Icon";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/custom-aquariums", label: "Custom aquariums" },
  { href: "/live-stock", label: "Live animals" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/contact", label: "Contact" },
];

const EASE = [0.22, 0.61, 0.36, 1];
const MotionLink = motion.create(Link);

/**
 * The theme follows whichever section sits under the bar: every major
 * section declares data-nav="dark" | "light". Pages without scroll-driven
 * sections pass `staticLight`.
 */
export default function Nav({ staticLight = false }) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(staticLight);
  const [light, setLight] = useState(true);
  const [open, setOpen] = useState(false);

  const update = useCallback(() => {
    if (staticLight) return;
    setSolid(window.scrollY > 40);
    const probe = 32; // px below the top edge, i.e. under the bar
    let theme = "dark";
    document.querySelectorAll("[data-nav]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top <= probe && r.bottom > probe) theme = el.getAttribute("data-nav");
    });
    setLight(theme === "light");
  }, [staticLight]);

  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => { update(); }, [update]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const ink = light ? "rgba(42,55,47,.78)" : "rgba(255,250,239,.82)";
  const inkStrong = light ? "#203b32" : "#ffffff";

  return (
    <>
      <motion.header
        className="nav"
        initial={false}
        animate={{
          backgroundColor: solid
            ? light ? "rgba(255,249,239,0.92)" : "rgba(20,49,44,0.86)"
            : "rgba(20,49,44,0)",
          borderBottomColor: solid
            ? light ? "rgba(32,59,50,0.12)" : "rgba(255,250,239,0.14)"
            : "rgba(255,250,239,0)",
          backdropFilter: solid ? "blur(16px) saturate(140%)" : "blur(0px)",
        }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="nav-inner">
          <Link href="/" className="nav-brand" aria-label="Dad's Pets — home">
            <motion.span
              className="nav-wordmark"
              initial={false}
              animate={{ opacity: light ? 0 : 1 }}
              transition={{ duration: 0.45, ease: EASE }}
            >dad&apos;s pets</motion.span>
            <motion.span
              className="nav-wordmark nav-wordmark--over"
              aria-hidden="true"
              initial={false}
              animate={{ opacity: light ? 1 : 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >dad&apos;s pets</motion.span>
            <small className="nav-brand-tag" style={{ color: ink }}>PET SUPPLY · GOA</small>
          </Link>

          <motion.nav
            className="nav-links"
            aria-label="Primary"
            animate={{ color: ink }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {LINKS.map((l) => (
              <motion.span key={l.href} whileHover={{ y: -1 }}>
                <Link href={l.href}>{l.label}</Link>
              </motion.span>
            ))}
          </motion.nav>

          <div className="nav-actions">
            <MotionLink
              className="nav-cta nav-cta--gold"
              href="/wholesale"
              whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(207,92,58,.28)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Icon name="arrow" size={18} />
              Get a quote
              <Icon name="arrow" size={18} className="nav-cta-arrow" />
            </MotionLink>

            <motion.button
              className="burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              animate={{ color: inkStrong }}
              whileTap={{ scale: 0.92 }}
            >
              <motion.svg width="20" height="14" viewBox="0 0 20 14">
                <motion.rect
                  width="20" height="2" rx="1" fill="currentColor"
                  animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.rect
                  y="6" width="20" height="2" rx="1" fill="currentColor"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.rect
                  y="12" width="20" height="2" rx="1" fill="currentColor"
                  animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className={`mobile-menu${light ? "" : " mobile-menu--dark"}`}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.3, ease: EASE }}
              >
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <Link className="mobile-menu-cta" href="/wholesale" onClick={() => setOpen(false)}>
              <Icon name="arrow" size={16} /> Get a quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
