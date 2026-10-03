"use client";

import { useEffect, useRef, useState } from "react";
import { waLink } from "../lib/business";

const LIVE_GROUPS = [
  {
    id: "dogs", name: "Dogs", eyebrow: "LOYAL COMPANIONS", cover: "/assets/golden-retriever.jpg",
    summary: "Breeds, puppies and everyday companions.", sheet: "/assets/live/dog-varieties.png",
    varieties: ["Golden Retriever", "Labrador Retriever", "Beagle", "Pomeranian", "Siberian Husky", "Cocker Spaniel", "Dalmatian", "German Shepherd", "Indian Indie"],
    enquiry: "Please share current photos, age, breed, price and care details.",
  },
  {
    id: "cats", name: "Cats", eyebrow: "CURIOUS COMPANIONS", cover: "/assets/persian-cat.jpg",
    summary: "Cats and kittens with plenty of personality.", sheet: "/assets/live/cat-varieties.png",
    varieties: ["Persian", "British Shorthair", "Maine Coon", "Siamese", "Bengal", "Ragdoll", "Russian Blue", "Sphynx", "Domestic Shorthair"],
    enquiry: "Please share current photos, age, breed, price and care details.",
  },
  {
    id: "fish", name: "Fish", eyebrow: "AQUATIC LIFE", cover: "/assets/fishes.jpg",
    summary: "Aquarium favourites and pond fish.", sheet: "/assets/live/fish-varieties.png",
    varieties: ["Betta", "Discus", "Fancy Goldfish", "Koi", "Guppy", "Freshwater Angelfish", "Neon Tetra", "Black Molly", "Dwarf Gourami"],
    enquiry: "Please share current photos, size, price and care details.",
  },
  {
    id: "birds", name: "Birds", eyebrow: "FEATHERS & FLIGHT", cover: "/assets/products/aviary.jpg",
    summary: "Small songbirds, parrots and exotic enquiries.", sheet: "/assets/live/bird-varieties.png",
    varieties: ["Blue-and-yellow Macaw", "Budgerigar", "Cockatiel", "Lovebird", "African Grey", "Green-cheek Conure", "Zebra Finch", "Canary"],
    enquiry: "Please share current photos, age, price, care details and relevant paperwork.",
  },
  {
    id: "poultry", name: "Poultry", eyebrow: "FOR THE FLOCK", cover: "/assets/poultry-supply.webp",
    summary: "Farm birds, chicks and ornamental breeds.", sheet: "/assets/live/poultry-varieties.png",
    varieties: ["Laying Hen", "Chicks", "Turkey", "Domestic Duck", "Japanese Quail", "Goose", "Rooster", "Bantam Chicken", "Guinea Fowl"],
    enquiry: "Please share current photos, age, price and care details.",
  },
];

function varietyPhoto(sheet, index, name) {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return <span className="live-variety-card__photo" role="img" aria-label={`Illustrative ${name}`} style={{ backgroundImage: `url(${sheet})`, backgroundPosition: `${col * 50}% ${row * 50}%` }} />;
}

export default function LiveAnimalExplorer() {
  const [activeId, setActiveId] = useState(null);
  const headingRef = useRef(null);
  const active = LIVE_GROUPS.find((group) => group.id === activeId);

  useEffect(() => {
    if (!activeId) return;
    const frame = requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [activeId]);

  return <section className="store-live" id="live-animals" data-nav="light">
    <div className="supply-container">
      <div className="store-section-title">
        <p className="supply-kicker">THE LIVING SIDE</p>
        <h2>Find your kind of companion.</h2>
        <p>Choose an animal to explore varieties, then tap a variety to enquire on WhatsApp. These pictures show examples; Dad&apos;s Pets will confirm current availability.</p>
      </div>
      <div className="store-live-grid" aria-label="Browse live animals">
        {LIVE_GROUPS.map((group) => <button key={group.id} type="button" className={activeId === group.id ? "is-active" : ""} aria-expanded={activeId === group.id} aria-controls={activeId === group.id ? "live-varieties" : undefined} onClick={() => setActiveId(group.id)}>
          <img src={group.cover} alt={`Illustrative ${group.name.toLowerCase()}`} loading="lazy" />
          <span className="store-live-grid__copy"><span className="store-live-grid__eyebrow">{group.eyebrow}</span><strong>{group.name}</strong><span className="store-live-grid__summary">{group.summary}</span><span className="store-live-grid__action">Explore {group.varieties.length} varieties <span aria-hidden="true">→</span></span></span>
        </button>)}
      </div>
      {active && <div className="live-varieties" id="live-varieties">
        <div className="live-varieties__top">
          <div><p className="supply-kicker">EXPLORE THE POSSIBILITIES</p><h3 ref={headingRef} tabIndex={-1}>Explore {active.name}</h3><p>These are variety examples, not a live stock list. Tap one to ask for current photos, price and care details.</p></div>
          <a href={waLink(`Hi Dad's Pets! I'm looking for a ${active.name.toLowerCase()} variety that isn't shown on your website. Can you help me find it?`)} target="_blank" rel="noopener noreferrer">Ask about another variety →</a>
        </div>
        <div className="live-varieties__tabs" aria-label="Switch animal category">{LIVE_GROUPS.map((group) => <button key={group.id} type="button" className={activeId === group.id ? "is-active" : ""} aria-pressed={activeId === group.id} onClick={() => setActiveId(group.id)}>{group.name}</button>)}</div>
        <div className="live-varieties__grid">{active.varieties.map((name, index) => <a key={name} className="live-variety-card" href={waLink(`Hi Dad's Pets! I'm enquiring about ${name} ${active.name.toLowerCase()}. Are they currently available? ${active.enquiry}`)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire on WhatsApp about ${name}`}>
          {varietyPhoto(active.sheet, index, name)}
          <span className="live-variety-card__body"><strong>{name}</strong><span>Enquire on WhatsApp →</span></span>
        </a>)}</div>
      </div>}
    </div>
  </section>;
}
