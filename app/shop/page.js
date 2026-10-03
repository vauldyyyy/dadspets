"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Reveal from "../../components/Reveal";
import SceneLayers from "../../components/SceneLayers";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import Icon from "../../components/Icon";
import { ScrollProgress, Words } from "../../components/motionKit";
import { WholesaleForm, AquariumForm } from "../../components/SupplyForms";
import { CATALOG, SHOP_HINTS, PRODUCT_PHOTOS, PRODUCT_SHEETS, BRANDED_PRODUCTS, MODEL_PRODUCTS } from "../../lib/catalog";
import { waLink } from "../../lib/business";

const PRODUCTS = [
  ...MODEL_PRODUCTS.map((item) => ({ ...item, id: `${item.brand}-${item.name}`, exactPhoto: true })),
  ...BRANDED_PRODUCTS.map((item) => ({ ...item, id: `${item.brand}-${item.name}`, featured: true })),
  ...CATALOG.flatMap((group) => group.items.map((item) => ({
    id: `${group.id}-${item}`, name: item, group: group.id, brand: "Any brand", detail: "Ask for brands, sizes and current availability", photo: item, featured: false,
  }))),
];

const FILTER_TYPES = [
  ["all", "All equipment"], ["filters", "All filters"], ["top", "Top filters"],
  ["hang-on", "Hang-on filters"], ["canister", "Canister filters"],
  ["internal", "Internal filters"], ["sponge", "Sponge filters"],
];
const FISH_TYPES = [["all", "All aquatic care"], ["food", "Fish food"], ["conditioners", "Water conditioners"], ["health", "Health & treatments"], ["live", "Live fish"]];
const filterKind = (product) => {
  if (product.kind) return product.kind;
  if (product.brand !== "Any brand") return null;
  const name = product.name.toLowerCase();
  if (name.includes("top filter")) return "top";
  if (name.includes("hang-on filter")) return "hang-on";
  if (name.includes("canister filter")) return "canister";
  if (name.includes("internal filter")) return "internal";
  if (name.includes("sponge filter")) return "sponge";
  return null;
};
const matchesFilterType = (product, type) => type === "all" || (product.group === "equipment" && (type === "filters" ? Boolean(filterKind(product)) : filterKind(product) === type));
const fishKind = (product) => {
  if (product.kind) return product.kind;
  const text = `${product.name} ${product.photo || ""}`.toLowerCase();
  if (/food|feed|bits|flakes/.test(text)) return "food";
  if (/conditioner|dechlorinator|biofilter|water care/.test(text)) return "conditioners";
  if (/health|salt|treatment|medicine/.test(text)) return "health";
  if (/fish|koi|betta/.test(text)) return "live";
  return "other";
};
const matchesFishType = (product, type) => type === "all" || (product.group === "fish" && fishKind(product) === type);

function ProductImage({ product, fallback }) {
  if (product.image) return <img className="store-product-image__exact" src={product.image} alt={`${product.brand} ${product.name} product photograph`} loading="lazy" />;
  const sheet = PRODUCT_SHEETS[product.photo];
  if (sheet) return <span className="store-product-image__sheet" role="img" aria-label={`Illustrative ${product.photo.toLowerCase()}`} style={{ backgroundImage: `url(${sheet.src})`, backgroundPosition: `${sheet.col * 100 / 3}% ${sheet.row * 100 / 3}%` }} />;
  return <img src={PRODUCT_PHOTOS[product.photo] || fallback} alt={`Illustrative ${product.photo.toLowerCase()}`} loading="lazy" />;
}

function ProductCard({ product }) {
  const group = CATALOG.find((entry) => entry.id === product.group);
  const message = product.exactPhoto
    ? `Hi Dad's Pets! I'm enquiring about the ${product.brand} ${product.name}. Is this exact model available? Please share the price, specifications and current product photo.`
    : product.featured
    ? `Hi Dad's Pets! I'm enquiring about ${product.brand} ${product.name}. Can you confirm the available model or pack size, price and a photo?`
    : `Hi Dad's Pets! I'm looking for ${product.name.toLowerCase()}. Which brands, sizes and prices are available? Please share product photos.`;
  return <a className="store-card" href={waLink(message)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire on WhatsApp about ${product.brand === "Any brand" ? "" : `${product.brand} `}${product.name}`}>
    <div className="store-card__image"><ProductImage product={product} fallback={group.image} />{(product.exactPhoto || product.featured) && <span className="store-card__badge">{product.exactPhoto ? "MODEL PHOTO" : "BRAND ENQUIRY"}</span>}</div>
    <div className="store-card__content">
      <span className="store-card__category">{group.eyebrow}</span>
      <strong>{product.name}</strong>
      <span className="store-card__brand">{product.brand === "Any brand" ? "Explore available brands" : product.brand}</span>
      <p>{product.detail}</p>
      <span className="store-card__action">Enquire on WhatsApp <Icon name="arrow" size={16} /></span>
    </div>
  </a>;
}

export default function Shop() {
  const [category, setCategory] = useState("all");
  const [brand, setBrand] = useState("all");
  const [equipmentType, setEquipmentType] = useState("all");
  const [fishType, setFishType] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);
  const brands = useMemo(() => [...new Set(PRODUCTS.filter((item) => (category === "all" || item.group === category) && (category !== "equipment" || matchesFilterType(item, equipmentType)) && (category !== "fish" || matchesFishType(item, fishType)) && item.brand !== "Any brand").map((item) => item.brand))].sort(), [category, equipmentType, fishType]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incoming = params.get("category");
    if (incoming && CATALOG.some((group) => group.id === incoming)) setCategory(incoming);
    if (params.get("q")) setQuery(params.get("q"));
  }, []);

  useEffect(() => { setVisibleCount(24); }, [category, brand, query, equipmentType, fishType]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const group = CATALOG.find((entry) => entry.id === product.group);
      return (category === "all" || product.group === category)
        && (category !== "equipment" || matchesFilterType(product, equipmentType))
        && (category !== "fish" || matchesFishType(product, fishType))
        && (brand === "all" || product.brand === brand)
        && (!needle || [product.name, product.brand, product.detail, product.kind || "", group.title, group.eyebrow].some((value) => value.toLowerCase().includes(needle)));
    });
  }, [category, brand, query, equipmentType, fishType]);

  return <>
    <ScrollProgress />
    <Nav staticLight />
    <main id="main">
      <section className="page-top has-live-bg" data-nav="light">
        <SceneLayers preset="shop" />
        <Reveal className="wrap">
          <p className="crumbs"><a href="/">Home</a> / Shop</p>
          <p className="eyebrow eyebrow--gold">Our collections</p>
          <Words className="display" text="Explore Pets & Essentials" as={motion.h1} />
          <p className="content-lede">Aquariums, equipment, food, birds, poultry and everyday care. Explore the range, then enquire about the exact product on WhatsApp.</p>
        </Reveal>
      </section>

      <nav className="store-jump-links" aria-label="Shop sections"><div className="supply-container"><a href="#products">Products & brands</a><a href="#live-animals">Live animals</a><a href="#custom-aquariums">Custom aquariums</a><a href="#wholesale">Wholesale</a></div></nav>

      <section className="store" id="products" data-nav="light">
        <div className="supply-container">
          <div className="store-heading"><div><p className="supply-kicker">PRODUCTS & BRANDS</p><h2>Find it. Enquire. Get the right one.</h2><p>Browse pictured models, product types and brands. Ask us on WhatsApp to confirm the exact item, price and availability.</p></div><a href="#custom-aquariums" className="catalog-build-link">Building an aquarium? <Icon name="arrow" size={18} /></a></div>
          <div className="store-controls">
            <label className="catalog-search"><span>Search products, brands or departments</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Fluval, fish food, poultry feed…" autoComplete="off" /></label>
            <div className="catalog-hints"><span>Popular:</span>{SHOP_HINTS.map((hint) => <button key={hint} type="button" onClick={() => { setBrand("all"); if (hint === "Filters") { setCategory("equipment"); setEquipmentType("filters"); setFishType("all"); setQuery(""); } else if (hint === "Fish food") { setCategory("fish"); setEquipmentType("all"); setFishType("food"); setQuery(""); } else { setCategory("all"); setEquipmentType("all"); setFishType("all"); setQuery(hint); } }}>{hint}</button>)}</div>
            <div className="catalog-filter" aria-label="Departments"><button type="button" className={category === "all" ? "is-active" : ""} aria-pressed={category === "all"} onClick={() => { setCategory("all"); setBrand("all"); setEquipmentType("all"); setFishType("all"); }}>All products</button>{CATALOG.map((group) => <button key={group.id} type="button" className={category === group.id ? "is-active" : ""} aria-pressed={category === group.id} onClick={() => { setCategory(group.id); setBrand("all"); setEquipmentType("all"); setFishType("all"); }}>{group.title}</button>)}</div>
            {category === "equipment" && <div className="store-type-filter" aria-label="Filter types"><span>Explore equipment:</span>{FILTER_TYPES.map(([value, label]) => <button key={value} type="button" className={equipmentType === value ? "is-active" : ""} aria-pressed={equipmentType === value} onClick={() => { setEquipmentType(value); setBrand("all"); setQuery(""); }}>{label}</button>)}</div>}
            {category === "fish" && <div className="store-type-filter" aria-label="Aquatic care types"><span>Explore aquatic care:</span>{FISH_TYPES.map(([value, label]) => <button key={value} type="button" className={fishType === value ? "is-active" : ""} aria-pressed={fishType === value} onClick={() => { setFishType(value); setBrand("all"); setQuery(""); }}>{label}</button>)}</div>}
            <div className="store-brand-filter"><label htmlFor="brand-filter">Brand</label><select id="brand-filter" value={brand} onChange={(event) => setBrand(event.target.value)}><option value="all">All brands & product types</option>{brands.map((name) => <option key={name} value={name}>{name}</option>)}</select><span>Brand cards show examples to enquire about; stock is confirmed on WhatsApp.</span></div>
          </div>
          <div className="store-brand-rail" aria-label="Browse brands"><strong>{brands.length} brands to explore</strong>{brands.map((name) => <button key={name} type="button" className={brand === name ? "is-active" : ""} aria-pressed={brand === name} onClick={() => { setBrand(name); setQuery(""); }}>{name}</button>)}<button type="button" onClick={() => { setBrand("all"); setQuery(""); }}>View all</button></div>
          <div className="store-results"><p aria-live="polite"><strong>{results.length}</strong> products and enquiries</p><span>Tap any card to enquire on WhatsApp</span></div>
          {results.length ? <div className="store-grid">{results.slice(0, visibleCount).map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="catalog-empty"><h3>Can&apos;t find it?</h3><p>Send us the product or brand name. We&apos;ll check the current options for you.</p><a className="supply-button supply-button--dark" href={waLink(`Hi Dad's Pets! I'm looking for ${query || brand || "a pet product"}. Can you help?`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp <Icon name="arrow" size={18} /></a></div>}
          {visibleCount < results.length && <button className="store-load" type="button" onClick={() => setVisibleCount((count) => count + 24)}>Show more products <Icon name="arrow" size={18} /></button>}
          <div className="store-request"><div><p className="supply-kicker">YOUR BRAND, YOUR LIST</p><h3>Looking for something specific?</h3><p>Share a brand, model, size or a photograph. We&apos;ll confirm what can be supplied.</p></div><a className="supply-button supply-button--cream" href={waLink("Hi Dad's Pets! I have a product or brand list I'd like you to check.")} target="_blank" rel="noopener noreferrer">Send your list <Icon name="arrow" size={18} /></a></div>
        </div>
      </section>
      <section className="store-live" id="live-animals" data-nav="light"><div className="supply-container"><div className="store-section-title"><p className="supply-kicker">THE LIVING SIDE</p><h2>Ask about live availability.</h2><p>Dad&apos;s Pets can confirm what is currently available and the care that goes with it. Pictures are illustrative.</p></div><div className="store-live-grid">
        <a href={waLink("Hi Dad's Pets! What fish are currently available? Please share photos, prices and care details.")} target="_blank" rel="noopener noreferrer"><img src="/assets/fishes.jpg" alt="Illustrative freshwater fish" loading="lazy" /><div><span>AQUATIC LIFE</span><h3>Fish</h3><p>Freshwater, ornamental and pond enquiries.</p><strong>Enquire on WhatsApp →</strong></div></a>
        <a href={waLink("Hi Dad's Pets! What pet birds are currently available? Please share photos, prices and care details.")} target="_blank" rel="noopener noreferrer"><img src="/assets/products/aviary.jpg" alt="Illustrative pet birds" loading="lazy" /><div><span>FEATHERS & FLIGHT</span><h3>Birds</h3><p>Pet and exotic bird enquiries, food and habitats.</p><strong>Enquire on WhatsApp →</strong></div></a>
        <a href={waLink("Hi Dad's Pets! What hens, turkeys or other poultry are currently available? Please share photos, prices and care details.")} target="_blank" rel="noopener noreferrer"><img src="/assets/poultry-supply.webp" alt="Illustrative poultry" loading="lazy" /><div><span>FOR THE FLOCK</span><h3>Poultry</h3><p>Hens, turkeys, feed and practical care.</p><strong>Enquire on WhatsApp →</strong></div></a>
      </div></div></section>

      <section className="store-special" id="custom-aquariums" data-nav="light"><div className="supply-container store-special__grid"><div className="store-special__intro"><p className="supply-kicker">MADE FOR YOUR SPACE</p><h2>Custom aquariums, from tank to finish.</h2><p>Tell us your size, style and location. Ask about glass tanks, cabinets, filtration, lights, soil, plants and installation together.</p><img src="/assets/products/custom-4ft.jpg" alt="Illustrative custom aquarium" loading="lazy" /></div><AquariumForm /></div></section>

      <section className="store-trade" id="wholesale" data-nav="dark"><div className="supply-container store-trade__grid"><div><p className="supply-kicker">WHOLESALE & BULK SUPPLY</p><h2>Stocking a shop or farm?</h2><p>Send your full list in one enquiry: products, preferred brands, pack sizes, quantities and destination. Dad&apos;s Pets will confirm the current options directly.</p><div className="store-trade__facts"><span>Aquariums & equipment</span><span>Pet food & accessories</span><span>Bird & poultry supplies</span></div></div><WholesaleForm /></div></section>
    </main>
    <SiteFooter />
    <WhatsAppFloat />
  </>;
}
