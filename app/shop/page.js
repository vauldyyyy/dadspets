"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import Icon from "../../components/Icon";
import { CATALOG, SHOP_HINTS, PRODUCT_PHOTOS, PRODUCT_SHEETS, BRANDED_PRODUCTS } from "../../lib/catalog";
import { waLink } from "../../lib/business";

const PRODUCTS = [
  ...BRANDED_PRODUCTS.map((item) => ({ ...item, id: `${item.brand}-${item.name}`, featured: true })),
  ...CATALOG.flatMap((group) => group.items.map((item) => ({
    id: `${group.id}-${item}`, name: item, group: group.id, brand: "Any brand", detail: "Ask for brands, sizes and current availability", photo: item, featured: false,
  }))),
];
const BRANDS = [...new Set(BRANDED_PRODUCTS.map((item) => item.brand))].sort();

function ProductImage({ item, fallback }) {
  const sheet = PRODUCT_SHEETS[item];
  if (sheet) return <span className="store-product-image__sheet" role="img" aria-label={`Illustrative ${item.toLowerCase()}`} style={{ backgroundImage: `url(${sheet.src})`, backgroundPosition: `${sheet.col * 100 / 3}% ${sheet.row * 100 / 3}%` }} />;
  return <img src={PRODUCT_PHOTOS[item] || fallback} alt={`Illustrative ${item.toLowerCase()}`} loading="lazy" />;
}

function ProductCard({ product }) {
  const group = CATALOG.find((entry) => entry.id === product.group);
  const message = product.featured
    ? `Hi Dad's Pets! I'm enquiring about ${product.brand} ${product.name}. Can you confirm the available model or pack size, price and a photo?`
    : `Hi Dad's Pets! I'm looking for ${product.name.toLowerCase()}. Which brands, sizes and prices are available? Please share product photos.`;
  return <a className="store-card" href={waLink(message)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire on WhatsApp about ${product.brand === "Any brand" ? "" : `${product.brand} `}${product.name}`}>
    <div className="store-card__image"><ProductImage item={product.photo} fallback={group.image} />{product.featured && <span className="store-card__badge">BRAND ENQUIRY</span>}</div>
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
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incoming = params.get("category");
    if (incoming && CATALOG.some((group) => group.id === incoming)) setCategory(incoming);
    if (params.get("q")) setQuery(params.get("q"));
  }, []);

  useEffect(() => { setVisibleCount(24); }, [category, brand, query]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const group = CATALOG.find((entry) => entry.id === product.group);
      return (category === "all" || product.group === category)
        && (brand === "all" || product.brand === brand)
        && (!needle || [product.name, product.brand, product.detail, group.title, group.eyebrow].some((value) => value.toLowerCase().includes(needle)));
    });
  }, [category, brand, query]);

  return <>
    <Nav staticLight />
    <main id="main">
      <section className="catalog-hero" data-nav="light">
        <div className="catalog-hero__copy">
          <p className="supply-kicker">DAD&apos;S PETS · SHOP THE RANGE</p>
          <h1>One shop for <em>every pet need.</em></h1>
          <p>Explore aquarium equipment, food, care, birds, poultry and more. Select any product to ask Dad&apos;s Pets for its current brands, variants, price and photo on WhatsApp.</p>
          <div className="supply-actions"><a className="supply-button supply-button--dark" href="#products">Shop products <Icon name="arrow" size={18} /></a><Link className="supply-button supply-button--line" href="/wholesale">Wholesale enquiry <Icon name="arrow" size={18} /></Link></div>
          <small>Product pictures are illustrative. Brand examples are enquiries, not a claim of current stock. Dad&apos;s Pets confirms the exact item before purchase.</small>
        </div>
        <div className="catalog-hero__image" role="img" aria-label="Illustrative aquarium and pet supply showroom" />
      </section>

      <section className="store" id="products" data-nav="light">
        <div className="supply-container">
          <div className="store-heading"><div><p className="supply-kicker">PRODUCTS & BRANDS</p><h2>Find it. Enquire. Get the right one.</h2><p>Browse product types and familiar brands. If you need a particular model or an unlisted brand, send us the name.</p></div><Link href="/custom-aquariums" className="catalog-build-link">Building an aquarium? <Icon name="arrow" size={18} /></Link></div>
          <div className="store-controls">
            <label className="catalog-search"><span>Search products, brands or departments</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Fluval, fish food, poultry feed…" autoComplete="off" /></label>
            <div className="catalog-hints"><span>Popular:</span>{SHOP_HINTS.map((hint) => <button key={hint} type="button" onClick={() => { setCategory("all"); setBrand("all"); setQuery(hint); }}>{hint}</button>)}</div>
            <div className="catalog-filter" aria-label="Departments"><button type="button" className={category === "all" ? "is-active" : ""} aria-pressed={category === "all"} onClick={() => setCategory("all")}>All products</button>{CATALOG.map((group) => <button key={group.id} type="button" className={category === group.id ? "is-active" : ""} aria-pressed={category === group.id} onClick={() => setCategory(group.id)}>{group.title}</button>)}</div>
            <div className="store-brand-filter"><label htmlFor="brand-filter">Brand</label><select id="brand-filter" value={brand} onChange={(event) => setBrand(event.target.value)}><option value="all">All brands & product types</option>{BRANDS.map((name) => <option key={name} value={name}>{name}</option>)}</select><span>Brand cards show examples to enquire about; stock is confirmed on WhatsApp.</span></div>
          </div>
          <div className="store-brand-rail" aria-label="Browse brands"><strong>{BRANDS.length} brands to explore</strong>{BRANDS.map((name) => <button key={name} type="button" className={brand === name ? "is-active" : ""} aria-pressed={brand === name} onClick={() => { setBrand(name); setCategory("all"); setQuery(""); }}>{name}</button>)}<button type="button" onClick={() => { setBrand("all"); setCategory("all"); setQuery(""); }}>View all</button></div>
          <div className="store-results"><p aria-live="polite"><strong>{results.length}</strong> products and enquiries</p><span>Tap any card to enquire on WhatsApp</span></div>
          {results.length ? <div className="store-grid">{results.slice(0, visibleCount).map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="catalog-empty"><h3>Can&apos;t find it?</h3><p>Send us the product or brand name. We&apos;ll check the current options for you.</p><a className="supply-button supply-button--dark" href={waLink(`Hi Dad's Pets! I'm looking for ${query || brand || "a pet product"}. Can you help?`)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp <Icon name="arrow" size={18} /></a></div>}
          {visibleCount < results.length && <button className="store-load" type="button" onClick={() => setVisibleCount((count) => count + 24)}>Show more products <Icon name="arrow" size={18} /></button>}
          <div className="store-request"><div><p className="supply-kicker">YOUR BRAND, YOUR LIST</p><h3>Looking for something specific?</h3><p>Share a brand, model, size or a photograph. We&apos;ll confirm what can be supplied.</p></div><a className="supply-button supply-button--cream" href={waLink("Hi Dad's Pets! I have a product or brand list I'd like you to check.")} target="_blank" rel="noopener noreferrer">Send your list <Icon name="arrow" size={18} /></a></div>
        </div>
      </section>
      <section className="catalog-outro" data-nav="dark"><div className="supply-container catalog-outro__grid"><div><p className="supply-kicker">FOR SHOPS & SERIOUS KEEPERS</p><h2>Buying in quantity?</h2><p>Share your list, models, sizes and quantities for a wholesale enquiry.</p></div><Link className="supply-button supply-button--cream" href="/wholesale">Request a wholesale quote <Icon name="arrow" size={18} /></Link></div></section>
    </main>
    <SiteFooter />
    <WhatsAppFloat />
  </>;
}
