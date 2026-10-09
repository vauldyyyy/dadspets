"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../components/Icon";
import Nav from "../components/Nav";
import Reveal from "../components/Reveal";
import VisitWorld from "../components/VisitWorld";
import BeachLoader from "../components/BeachLoader";
import SectionVideo from "../components/SectionVideo";
import SceneLayers, { SceneTransition } from "../components/SceneLayers";
import VideoChapter from "../components/VideoChapter";
import HeartSection from "../components/HeartSection";
import SiteFooter from "../components/SiteFooter";
import WhatsAppFloat from "../components/WhatsAppFloat";
import CompanionsGallery from "../components/CompanionsGallery";
import ReviewsWall from "../components/ReviewsWall";
import Immersion from "../components/Immersion";
import {
  ScrollProgress,
  CountUp,
  lakhFormat,
  Words,
  Marquee,
} from "../components/motionKit";

const EASE = [0.22, 0.61, 0.36, 1];
const LOADER_MIN_MS = 5700;

/* ----------------------------- Beats ----------------------------- */
const aquaticBeats = [
  {
    align: "center",
    range: [0, 0.2],
    content: (
      <>
        <p className="eyebrow eyebrow--aqua">DAD&apos;S PETS · AQUATIC WORLD</p>
        <h2 className="display grad-aqua">
          Life beneath
          <br />
          the surface.
        </h2>
        <p className="lede">
          Discover the colour and calm of a living aquarium.
        </p>
        <div className="scroll-hint">
          <motion.i
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: EASE }}
            style={{ originY: 0 }}
          />
          Scroll
        </div>
      </>
    ),
  },
  {
    align: "center",
    range: [0.24, 0.5],
    content: (
      <>
        <h2 className="display">A living canvas.</h2>
        <p className="lede">
          Shimmering shoals, graceful fins and plants that sway with the water.
        </p>
      </>
    ),
  },
  {
    align: "center",
    range: [0.54, 0.8],
    content: (
      <>
        <h2 className="display">Build their world.</h2>
        <p className="lede">
          Explore fish, aquatic plants and the essentials for a thriving tank.
        </p>
      </>
    ),
  },
];

const gardenBeats = [
  {
    align: "center",
    range: [0, 0.2],
    content: (
      <>
        <p className="eyebrow eyebrow--gold">DAD&apos;S PETS · COMPANIONS</p>
        <h2 className="display grad-forest">Meet the whole family.</h2>
        <p className="lede lede--dark">
          Big paws, tiny paws, bright feathers and curious little noses — every pet brings its own kind of joy.
        </p>
      </>
    ),
  },
  {
    align: "left",
    range: [0.24, 0.5],
    content: (
      <>
        <h2 className="display dark">
          Dogs &amp; cats,
          <br />
          full of character.
        </h2>
        <p className="body body--dark">
          From playful mornings to quiet evenings, every pet brings a different kind of joy.
        </p>
      </>
    ),
  },
  {
    align: "right",
    range: [0.54, 0.78],
    content: (
      <>
        <h2 className="display dark">
          Birds that bring
          <br />a home to life.
        </h2>
        <p className="body body--dark">
          A little colour, a little song, and plenty of personality for every home.
        </p>
      </>
    ),
  },
  {
    align: "center",
    range: [0.82, 1.001],
    content: <h2 className="display display--xl grad-forest">Paws, purrs &amp; wings.</h2>,
  },
];

/* ----------------------------- Page ----------------------------- */
export default function Home() {
  // Play the Goa beach entrance once; ?loader loops it for previewing.
  const [minDone, setMinDone] = useState(false);
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setPreview(q.has("loader"));
    // Only used if the browser cannot finish playback (for example, a stalled stream).
    const id = setTimeout(() => setMinDone(true), LOADER_MIN_MS + 5000);
    return () => clearTimeout(id);
  }, []);
  const showLoader = preview || !minDone;

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <BeachLoader
            key="loader"
            progress={100}
            minMs={LOADER_MIN_MS}
            demo={preview}
            onFinished={() => setMinDone(true)}
          />
        )}
      </AnimatePresence>

      <ScrollProgress />
      <Nav />

      <main id="main">
        {/* ---------- Chapter 1 — Aquatic opening ---------- */}
        <VideoChapter id="aquatics" name="aquatics" theme="dark" bg="#050505" beats={aquaticBeats} hold={8000} active={!showLoader} />

        {/* ---------- The pet shop introduction ---------- */}
        <section className="home-intro" data-nav="light" aria-labelledby="home-intro-title">
          <div className="home-intro__shell">
            <div className="home-intro__copy">
              <p className="home-intro__eyebrow"><span aria-hidden="true" /> YOUR NEIGHBOURHOOD PET SHOP · GOA</p>
              <h1 id="home-intro-title">A little more joy <em>for every pet.</em></h1>
              <p className="home-intro__lede">From food and play to the companions who make a house a home, find your kind of pet place at Dad&apos;s Pets.</p>
              <div className="home-intro__actions">
                <Link href="/shop" className="home-intro__primary">Explore the shop <Icon name="arrow" size={19} /></Link>
                <Link href="/#gallery" className="home-intro__secondary">Meet the companions <Icon name="arrow" size={17} /></Link>
              </div>
              <p className="home-intro__note">For curious pets, caring people, and all the days in between.</p>
            </div>
            <div className="home-intro__art" aria-label="A dog, a cat and a planted aquarium">
              <div className="home-intro__shape home-intro__shape--one" aria-hidden="true" />
              <div className="home-intro__shape home-intro__shape--two" aria-hidden="true" />
              <figure className="home-intro__photo home-intro__photo--dog"><img src="/assets/golden-retriever.jpg" alt="Golden retriever in a garden" /></figure>
              <figure className="home-intro__photo home-intro__photo--cat"><img src="/assets/persian-cat.jpg" alt="Fluffy Persian cat at home" /></figure>
              <figure className="home-intro__photo home-intro__photo--fish"><img src="/assets/aquarium.jpg" alt="Planted aquarium" /></figure>
              <div className="home-intro__sticker">Made for<br /><strong>pet people</strong><span aria-hidden="true"> ✳</span></div>
            </div>
          </div>
          <nav className="home-intro__paths" aria-label="Explore Dad's Pets">
            <Link href="/#gallery"><span>01 / COMPANIONS</span><strong>Meet the pets</strong><Icon name="arrow" size={19} /></Link>
            <Link href="/#services"><span>02 / EVERYDAY LIFE</span><strong>Food, care &amp; play</strong><Icon name="arrow" size={19} /></Link>
            <Link href="/#companions"><span>03 / OUR WORLD</span><strong>Meet the whole family</strong><Icon name="arrow" size={19} /></Link>
          </nav>
        </section>

        {/* ---------- Interlude ---------- */}
        <section className="interlude has-live-bg amb-ocean" id="care" data-nav="dark">
          <SectionVideo name="care" scrim="dark" scrimStrength={0.45} fallback={<SceneLayers preset="care" />} />
          <div className="wrap">
            <Reveal>
              <p className="interlude-eyebrow">A LITTLE MORE FOR THE PETS WE LOVE</p>
            </Reveal>
            <div className="interlude-grid">
              {[
                ["PETS", "companions of every kind"],
                ["CARE", "essentials for everyday life"],
                ["GOA", "a local place to explore"],
              ].map(([n, label], i) => (
                <Reveal className="s" key={label} delay={i * 0.1}>
                  <b>{n}</b>
                  <span>{label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Transition ---------- */}
        <section className="transition" data-nav="dark">
          <SectionVideo name="transition" mode="once" scrim="dark" scrimStrength={0.35} fallback={<SceneTransition />} />
          <Reveal>
            <p className="transition-line">
              A home feels brighter with a pet in it.
              <br />
              <em>Some walk beside you; some fill the room with song.</em>
            </p>
          </Reveal>
        </section>

        {/* ---------- Chapter 2 — Garden ---------- */}
        <VideoChapter id="companions" name="companions" theme="warm" bg="#f6f1e8" beats={gardenBeats} poster="/bg/companions-video-poster.jpg" videoBase="/bg/companions-courtyard" />

        {/* ---------- Companions gallery ---------- */}
        <CompanionsGallery />

        {/* ---------- Services ---------- */}
        <section className="content content--cream has-live-bg amb-home" id="services" data-nav="light">
          <SectionVideo name="services" scrim="light" scrimStrength={0.6} fallback={<SceneLayers preset="services" />} />
          <div className="amb-motes" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="wrap">
            <Reveal className="center">
              <p className="eyebrow eyebrow--gold">What we offer</p>
              <Words className="display dark" text="Products & Services" />
              <p className="content-lede">
                Explore pets and everyday essentials for feeding, play, comfort and care.
              </p>
            </Reveal>
            <div className="cards-3 service-tiles">
              {[
                {
                  t: "Pets & Everyday Life",
                  img: "/assets/pet-lifestyle.jpg",
                  items: [
                    "Companion discovery",
                    "Food and treats",
                    "Toys and accessories",
                    "Bird and small-pet essentials",
                    "Grooming essentials",
                  ],
                },
                {
                  t: "Fish & Aquariums",
                  img: "/assets/aquarium.jpg",
                  items: [
                    "Aquarium inspiration",
                    "Fishkeeping essentials",
                    "Food and water care",
                    "Filters and equipment",
                    "Aquatic accessories",
                  ],
                },
                {
                  t: "Care & Comfort",
                  img: "/assets/care-safety.jpg",
                  items: [
                    "Everyday care products",
                    "Comfortable beds and habitats",
                    "Feeding accessories",
                    "Helpful care guidance",
                  ],
                },
              ].map((c, i) => (
                <Reveal
                  className="ccard"
                  key={c.t}
                  delay={i * 0.12}
                  whileHover={{ y: -6, boxShadow: "0 24px 54px rgba(42,33,24,.14)" }}
                >
                  <img className="svc-banner" src={c.img} alt={c.t} loading="lazy" />
                  <h3>{c.t}</h3>
                  <ul className="tick">
                    {c.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {/* Auto-scrolling strip of photo cards — everything we do */}
            <div className="svc-cards" aria-hidden="true">
              <div className="svc-cards-track">
                {(() => {
                  const cards = [
                    ["/assets/aquarium.jpg", "Aquarium inspiration"],
                    ["/assets/fishes.jpg", "Fishkeeping"],
                    ["/assets/products/planted-2ft.jpg", "Planted aquascapes"],
                    ["/assets/products/reef-system.jpg", "Aquatic ideas"],
                    ["/assets/products/koi.jpg", "Pond inspiration"],
                    ["/assets/products/aviary.jpg", "Bird habitats"],
                    ["/assets/products/grooming.jpg", "Grooming essentials"],
                    ["/assets/care-safety.jpg", "Care essentials"],
                    ["/assets/golden-retriever.jpg", "Dogs & puppies"],
                    ["/assets/persian-cat.jpg", "Cats & kittens"],
                    ["/assets/husky.jpg", "Dog companions"],
                    ["/assets/hamster.jpg", "Small pets"],
                    ["/assets/products/filtration.jpg", "Aquarium equipment"],
                    ["/assets/products/driftwood.jpg", "Aquarium decor"],
                  ];
                  return [...cards, ...cards].map(([src, label], i) => (
                    <figure className="svc-card" key={i}>
                      <img src={src} alt="" loading="lazy" />
                      <figcaption>{label}</figcaption>
                    </figure>
                  ));
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Why us ---------- */}
        <section className="content content--espresso has-live-bg amb-ocean" id="why" data-nav="dark">
          <SectionVideo name="why" scrim="dark" scrimStrength={0.55} fallback={<SceneLayers preset="why" />} />
          <div className="wrap">
            <Reveal className="center">
              <p className="eyebrow eyebrow--gold">Why us</p>
              <Words className="display" text="Why Dad's Pets?" />
              <p className="content-lede muted">
                For the little routines and big moments you share with your pets, Dad's Pets is here to help you explore.
              </p>
            </Reveal>
            <div className="stat-row">
              {[
                ["01", "Find your companion"],
                ["02", "Explore essentials"],
                ["03", "Learn about care"],
                ["04", "Visit the shop"],
              ].map(([n, l], i) => (
                <Reveal className="s" key={l} delay={i * 0.08}>
                  <b>{n}</b>
                  <span>{l}</span>
                </Reveal>
              ))}
            </div>
            <div className="feat-row">
              {[
                ["For every kind of pet", "Explore ideas for dogs, cats, birds, fish and small companions."],
                ["For every daily routine", "From food and play to comfort and care, find a place to start."],
                ["Here in Goa", "Visit Dad's Pets in Shirvodem, Margao (Madgaon), and see the shop for yourself."],
              ].map(([h, p], i) => (
                <Reveal className="feat" key={h} delay={i * 0.1}>
                  <h4>{h}</h4>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Same editorial sections, awaiting owner photos and stories ---------- */}
        <section className="content content--cream has-live-bg amb-home" id="founders" data-nav="light">
          <SectionVideo name="founders" scrim="light" scrimStrength={0.55} fallback={<SceneLayers preset="founders" />} />
          <div className="wrap">
            <Reveal className="center">
              <p className="eyebrow eyebrow--gold">Our world</p>
              <Words className="display dark" text="For Every Pet Person" />
              <p className="content-lede">The best part of pet life is the bond you build along the way.</p>
            </Reveal>
            <div className="cards-3">
              {[
                { img: "/assets/golden-retriever.jpg", n: "For the playful days", r: "DOGS", b: "Walks, games and all the small adventures in between." },
                { img: "/assets/persian-cat.jpg", n: "For the quiet moments", r: "CATS", b: "A sunny spot, a soft bed and a companion who makes it theirs." },
                { img: "/assets/hamster.jpg", n: "For every little life", r: "SMALL PETS", b: "Thoughtful habitats and care make room for big personalities." },
              ].map((f, i) => (
                <Reveal className="founder" key={f.r} delay={i * 0.12} whileHover={{ y: -6 }}>
                  <img className="founder-photo" src={f.img} alt={f.r.toLowerCase()} loading="lazy" />
                  <h3>{f.n}</h3><p className="role">{f.r}</p><p>{f.b}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="content content--sand has-live-bg amb-home pet-people" id="clients" data-nav="light">
          <SectionVideo name="clients" scrim="light" scrimStrength={0.5} fallback={<SceneLayers preset="clients" />} />
          <div className="wrap pet-people__layout">
            <Reveal className="pet-people__story">
              <p className="eyebrow eyebrow--gold">Life is better together</p>
              <h2>Small moments. <em>Big love.</em></h2>
              <p>Some pets greet you at the door. Some watch the world from a sunny window. Some turn a quiet room into a little underwater universe.</p>
              <p>We&apos;re here for all of them, and for the people who love them.</p>
              <Link href="/#reviews" className="pet-people__link">Explore life with pets <Icon name="arrow" size={18} /></Link>
            </Reveal>
            <div className="pet-people__mosaic">
              {[["/assets/golden-retriever.jpg", "Dogs"], ["/assets/persian-cat.jpg", "Cats"], ["/assets/fishes.jpg", "Fish"]].map(([src, name], i) => (
                <Reveal className={`pet-people__tile pet-people__tile--${i + 1}`} key={name} delay={i * 0.08}>
                  <img src={src} alt={`${name} at Dad's Pets`} loading="lazy" />
                  <span>{name}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Reviews wall ---------- */}
        <ReviewsWall />

        <HeartSection />
        <VisitWorld />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <Immersion />
    </>
  );
}
