"use client";

import { useEffect, useRef, useState } from "react";
import { waLink } from "../lib/business";
import photoCredits from "../docs/live-photo-sources.json";

const sprite = (name, cell) => ({ name, cell });
const photo = (name, file) => ({ name, image: `/assets/live/${file}.webp` });

const LIVE_GROUPS = [
  {
    id: "dogs", name: "Dogs", eyebrow: "LOYAL COMPANIONS", cover: "/assets/golden-retriever.jpg",
    summary: "Breeds, puppies and everyday companions.", sheet: "/assets/live/dog-varieties.webp",
    varieties: [
      photo("Shih Tzu", "shih-tzu"), photo("Pomeranian", "pomeranian"), photo("Labrador Retriever", "labrador-retriever"),
      photo("Doberman Pinscher", "doberman-pinscher"), photo("German Shepherd", "german-shepherd"),
      sprite("Golden Retriever", 0), sprite("Beagle", 2), sprite("Siberian Husky", 4),
      sprite("Cocker Spaniel", 5), sprite("Dalmatian", 6), sprite("Indian Indie", 8),
    ],
    enquiry: "Please share current photos, age, breed, price and care details.",
  },
  {
    id: "cats", name: "Cats", eyebrow: "CURIOUS COMPANIONS", cover: "/assets/persian-cat.jpg",
    summary: "Cats and kittens with plenty of personality.", sheet: "/assets/live/cat-varieties.webp",
    varieties: [
      photo("Persian", "persian-cat"), photo("Himalayan", "himalayan-cat"),
      sprite("British Shorthair", 1), sprite("Maine Coon", 2), sprite("Siamese", 3),
      sprite("Bengal", 4), sprite("Ragdoll", 5), sprite("Russian Blue", 6),
      sprite("Sphynx", 7), sprite("Domestic Shorthair", 8),
    ],
    enquiry: "Please share current photos, age, breed, price and care details.",
  },
  {
    id: "fish", name: "Fish", eyebrow: "AQUATIC LIFE", cover: "/assets/fishes.jpg",
    summary: "Aquarium favourites and pond fish.", sheet: "/assets/live/fish-varieties.webp",
    varieties: [
      photo("Arowana", "arowana"), photo("Flowerhorn Cichlid", "flowerhorn"),
      photo("Oscar Cichlid", "oscar-cichlid"), photo("Electric Blue Acara", "electric-blue-acara"),
      photo("Clown Loach", "clown-loach"), photo("Black Ghost Knifefish", "black-ghost-knifefish"),
      sprite("Betta", 0), sprite("Discus", 1), sprite("Fancy Goldfish", 2),
      sprite("Koi", 3), sprite("Guppy", 4), sprite("Freshwater Angelfish", 5),
      sprite("Neon Tetra", 6), sprite("Black Molly", 7), sprite("Dwarf Gourami", 8),
    ],
    enquiry: "Please share current photos, size, price and care details.",
  },
  {
    id: "birds", name: "Birds", eyebrow: "FEATHERS & FLIGHT", cover: "/assets/products/aviary.jpg",
    summary: "Small songbirds, parrots and exotic enquiries.", sheet: "/assets/live/bird-varieties.webp",
    varieties: ["Blue-and-yellow Macaw", "Budgerigar", "Cockatiel", "Lovebird", "African Grey", "Green-cheek Conure", "Zebra Finch", "Canary"].map((name, cell) => sprite(name, cell)),
    enquiry: "Please share current photos, age, price, care details and relevant paperwork.",
  },
  {
    id: "poultry", name: "Poultry", eyebrow: "FOR THE FLOCK", cover: "/assets/poultry-supply.webp",
    summary: "Farm birds, chicks and ornamental breeds.", sheet: "/assets/live/poultry-varieties.webp",
    varieties: ["Laying Hen", "Chicks", "Turkey", "Domestic Duck", "Japanese Quail", "Goose", "Rooster", "Bantam Chicken", "Guinea Fowl"].map((name, cell) => sprite(name, cell)),
    enquiry: "Please share current photos, age, price and care details.",
  },
];

function varietyPhoto(sheet, variety) {
  if (variety.image) {
    return <img className="live-variety-card__photo" src={variety.image} alt={`Illustrative ${variety.name}`} loading="lazy" />;
  }
  const col = variety.cell % 3;
  const row = Math.floor(variety.cell / 3);
  return <span className="live-variety-card__photo live-variety-card__photo--sheet" role="img" aria-label={`Illustrative ${variety.name}`} style={{ backgroundImage: `url(${sheet})`, backgroundPosition: `${col * 50}% ${row * 50}%` }} />;
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
        <div className="live-varieties__grid">{active.varieties.map((variety) => <a key={variety.name} className="live-variety-card" href={waLink(`Hi Dad's Pets! I'm enquiring about ${variety.name} ${active.name.toLowerCase()}. Are they currently available? ${active.enquiry}`)} target="_blank" rel="noopener noreferrer" aria-label={`Enquire on WhatsApp about ${variety.name}`}>
          {varietyPhoto(active.sheet, variety)}
          <span className="live-variety-card__body"><strong>{variety.name}</strong><span>Enquire on WhatsApp →</span></span>
        </a>)}</div>
      </div>}
      <details className="live-photo-credits">
        <summary>Photo credits</summary>
        <ul>{photoCredits.map((credit) => <li key={credit.file}><a href={credit.source} target="_blank" rel="noopener noreferrer">{credit.name}</a> photo by {credit.author}, <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a>; resized and cropped for this gallery.</li>)}</ul>
      </details>
    </div>
  </section>;
}
