"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import BeachLoader from "../components/BeachLoader";
import SectionVideo from "../components/SectionVideo";
import Icon from "../components/Icon";
import { CATALOG } from "../lib/catalog";
import { BUSINESS, telHref, waLink, directionsUrl } from "../lib/business";

const featured = ["aquariums", "equipment", "aquascaping", "fish", "birds", "poultry", "pets"];

export default function Home() {
  const [loaderMode, setLoaderMode] = useState("checking");

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).has("loader");
    if (preview) setLoaderMode("preview");
    else if (window.sessionStorage.getItem("dadsPetsIntroSeen") === "1") setLoaderMode("done");
    else setLoaderMode("play");
  }, []);

  const finishIntro = useCallback(() => {
    window.sessionStorage.setItem("dadsPetsIntroSeen", "1");
    setLoaderMode("done");
  }, []);

  useEffect(() => {
    if (loaderMode !== "play") return;
    const timer = window.setTimeout(finishIntro, 11000);
    return () => window.clearTimeout(timer);
  }, [loaderMode, finishIntro]);

  return <>
    <AnimatePresence>
      {loaderMode === "checking" && <div className="supply-boot" key="boot" aria-hidden="true" />}
      {(loaderMode === "play" || loaderMode === "preview") && <BeachLoader key="beach" progress={100} minMs={5700} demo={loaderMode === "preview"} onFinished={finishIntro} onSkip={finishIntro} />}
    </AnimatePresence>

    <Nav />
    <main id="main">
      <section className="supply-home-hero" data-nav="dark" aria-labelledby="supply-home-title">
        <div className="supply-container supply-home-hero__inner">
          <p className="supply-kicker">DAD&apos;S PETS · GOA · WHOLESALE & RETAIL</p>
          <h1 id="supply-home-title">Every pet.<br />Every setup.<br /><em>Every essential.</em></h1>
          <p className="supply-home-hero__lede">Aquarium equipment, fish, birds, poultry, food and everyday care—find the range you need, whether you&apos;re building one tank or stocking a whole shop.</p>
          <div className="supply-actions">
            <Link className="supply-button supply-button--cream" href="/shop">Explore the catalog <Icon name="arrow" size={19} /></Link>
            <Link className="supply-button supply-button--outline-light" href="/wholesale">Wholesale enquiries <Icon name="arrow" size={18} /></Link>
          </div>
          <div className="supply-home-hero__proof"><span>Aquariums & equipment</span><span>Live animals & care</span><span>Bulk supply enquiries</span></div>
        </div>
        <span className="supply-home-hero__caption">Illustrative showroom visual</span>
      </section>

      <nav className="supply-fast-links" aria-label="Popular departments" data-nav="dark">
        <div className="supply-container">
          <Link href="/shop?category=equipment">Filters & lights <Icon name="arrow" size={18} /></Link>
          <Link href="/shop?category=aquascaping">Soil, stone & wood <Icon name="arrow" size={18} /></Link>
          <Link href="/shop?category=poultry">Poultry supplies <Icon name="arrow" size={18} /></Link>
          <Link href="/custom-aquariums">Custom aquariums <Icon name="arrow" size={18} /></Link>
        </div>
      </nav>

      <section className="supply-home-categories" id="departments" data-nav="light">
        <div className="supply-container">
          <div className="supply-section-head supply-section-head--split"><div><p className="supply-kicker">THE WHOLE RANGE</p><h2>Find your department.</h2><p>From the smallest part in a filter to the foundation of a new aquarium.</p></div><Link href="/shop" className="supply-text-link">See the full catalog <Icon name="arrow" size={18} /></Link></div>
          <div className="supply-department-grid">
            {featured.map((id) => {
              const group = CATALOG.find((entry) => entry.id === id);
              return <Link key={id} href={`/shop?category=${id}`} className="supply-department"><img src={group.image} alt="" loading="lazy" /><div><span>{group.eyebrow}</span><h3>{group.title}</h3><Icon name="arrow" size={19} /></div></Link>;
            })}
          </div>
          <p className="supply-range-note">Explore product families online; ask Dad&apos;s Pets for current brands, specifications, prices and availability.</p>
        </div>
      </section>

      <section className="supply-film supply-film--water" data-nav="dark" aria-labelledby="aquarium-film-title">
        <SectionVideo name="aquatics" scrim="dark" scrimStrength={0.42} />
        <div className="supply-container supply-film__content"><p className="supply-kicker">AQUARIUMS FROM THE GROUND UP</p><h2 id="aquarium-film-title">Build the world<br /><em>beneath the surface.</em></h2><p>Tank, filtration, lighting, soil, stones, driftwood, plants and the life inside. Bring the whole setup together.</p><div className="supply-actions"><Link className="supply-button supply-button--cream" href="/custom-aquariums">Plan a custom aquarium →</Link><Link className="supply-button supply-button--outline-light" href="/shop?category=equipment">Browse equipment →</Link></div></div>
      </section>

      <section className="supply-home-trade" data-nav="light">
        <div className="supply-container supply-home-trade__grid"><div><p className="supply-kicker">STOCK YOUR SHELVES</p><h2>One supplier.<br /><em>Many moving parts.</em></h2><p>Retailers, breeders, farms and aquarium professionals can bring several product needs into one conversation—from everyday feed to specialist equipment.</p><Link className="supply-button supply-button--dark" href="/wholesale">Request a wholesale quote <Icon name="arrow" size={18} /></Link></div><div className="supply-home-trade__image"><img src="/assets/supply-showroom.webp" alt="Illustrative pet and aquarium supply showroom" loading="lazy" /><span>SUPPLY ACROSS CATEGORIES</span></div></div>
      </section>

      <section className="supply-film supply-film--companions" data-nav="dark" aria-labelledby="live-film-title">
        <SectionVideo name="companions-courtyard" scrim="dark" scrimStrength={0.48} />
        <div className="supply-container supply-film__content"><p className="supply-kicker">THE LIVING SIDE</p><h2 id="live-film-title">Life, colour<br /><em>and care.</em></h2><p>Ask about fish, birds and poultry, and find the food, habitats and care supplies that go with them.</p><Link className="supply-button supply-button--cream" href="/live-stock">Explore live enquiries <Icon name="arrow" size={18} /></Link></div>
      </section>

      <section className="supply-home-contact" id="visit" data-nav="light"><div className="supply-container supply-home-contact__grid"><div><p className="supply-kicker">DAD&apos;S PETS · NEAR MADGAON</p><h2>Bring us your list.</h2><p>Need a specific brand, size or quantity? Call or WhatsApp us and we&apos;ll help you find a starting point.</p><div className="supply-actions"><a className="supply-button supply-button--dark" href={waLink()} target="_blank" rel="noopener noreferrer">WhatsApp us <Icon name="arrow" size={18} /></a><a className="supply-button supply-button--line" href={telHref}>Call {BUSINESS.phoneDisplay}</a></div></div><div className="supply-home-contact__details"><span>VISIT & ENQUIRE</span><strong>{BUSINESS.locationLabel}</strong><p>Exact map pin and opening hours will be confirmed directly.</p><a href={directionsUrl} target="_blank" rel="noopener noreferrer">Open map search →</a></div></div></section>
    </main>
    <SiteFooter />
    <WhatsAppFloat />
  </>;
}
