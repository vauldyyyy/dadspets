"use client";

/* Editorial cards keep the original moving review-wall treatment until
   Dad's Pets supplies genuine reviews and permission to publish them. */

import { motion } from "framer-motion";
import SectionVideo from "./SectionVideo";
import SceneLayers from "./SceneLayers";

const REVIEWS_A = [
  ["01", "Food & treats", "Small daily choices help make the days together happier."],
  ["02", "Play & enrichment", "A little curiosity and play can make an ordinary afternoon memorable."],
  ["03", "Comfort at home", "A favourite corner can quickly become your pet's whole world."],
  ["04", "Everyday routines", "Food, rest, exercise and attention all have their place."],
  ["05", "Growing together", "The best pet stories are made one day at a time."],
];

const REVIEWS_B = [
  ["06", "For dogs", "Every walk is a new adventure when you're seeing the world together."],
  ["07", "For cats", "A quiet companion can make a whole room feel warmer."],
  ["08", "For birds", "A little colour and song can brighten the day."],
  ["09", "For small pets", "Small companions have wonderful personalities of their own."],
];

/* Simple animal silhouettes that drift across the backdrop. */
const ANIMALS = [
  { d: "M2 14c4-8 12-10 18-6 2-3 6-3 7 0 3 0 5 2 5 4s-2 3-4 3c-2 4-8 6-14 5L8 24l-2-6c-2 0-4-2-4-4Z", w: 90, top: "12%", dur: 95, delay: 0, flip: false }, // bird
  { d: "M4 26c0-8 4-12 8-12 1-4 4-8 8-8s7 3 7 7c3 1 5 4 5 8v7H18v-4c-3 2-8 2-11 0v4H4v-2Z", w: 110, top: "58%", dur: 120, delay: -40, flip: true }, // deer
  { d: "M4 22c0-6 3-10 8-10 1-3 3-5 6-5 4 0 7 3 7 7 0 1 0 2-1 3 2 1 4 3 4 5H14c-4 0-7 1-10 0Z", w: 70, top: "76%", dur: 105, delay: -70, flip: false }, // rabbit
  { d: "M12 2c3 0 5 2 5 5 0 1 0 2-1 3 2 1 4 3 4 6 0 4-4 8-9 8s-9-4-9-8c0-3 2-5 4-6-1-1-1-2-1-3 0-3 2-5 5-5Z", w: 46, top: "30%", dur: 80, delay: -20, flip: true }, // butterfly-ish
];

function Card({ av, name, quote, tilt }) {
  return (
    <figure className="rwall-card" style={{ rotate: `${tilt}deg` }}>
      <div className="stars" aria-hidden="true">♡</div>
      <p>{quote}</p>
      <figcaption>
        <span className="av">{av}</span>
        {name}
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="rwall-row">
      <div className="rwall-rope" aria-hidden="true" />
      <div className={`rwall-track${reverse ? " rwall-track--rev" : ""}`}>
        {doubled.map(([av, name, quote], i) => (
          <Card key={`${name}-${i}`} av={av} name={name} quote={quote} tilt={i % 2 ? 1.4 : -1.6} />
        ))}
      </div>
    </div>
  );
}

export default function ReviewsWall() {
  return (
    <section className="rwall" id="reviews" data-nav="light" aria-label="Pet life inspiration">
      <SectionVideo name="reviews" scrim="light" scrimStrength={0.4} fallback={<SceneLayers preset="reviews" />} />
      {/* Warm sunlit-forest backdrop with slow-drifting animal silhouettes */}
      <div className="rwall-bg" aria-hidden="true">
        <div className="rwall-sun" />
        {ANIMALS.map((a, i) => (
          <svg
            key={i}
            className="rwall-animal"
            style={{ width: a.w, top: a.top, animationDuration: `${a.dur}s`, animationDelay: `${a.delay}s`, transform: a.flip ? "scaleX(-1)" : undefined }}
            viewBox="0 0 40 30"
          >
            <path d={a.d} fill="currentColor" />
          </svg>
        ))}
      </div>

      <div className="wrap rwall-head">
        <motion.p
          className="eyebrow eyebrow--gold"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Everyday moments
        </motion.p>
        <motion.h2
          className="display dark"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.08 }}
        >
          Life With Pets
        </motion.h2>
        <motion.p
          className="content-lede"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.16 }}
        >
          Little reminders of why the bond with a pet means so much.
        </motion.p>
      </div>

      <Row items={REVIEWS_A} />
      <Row items={REVIEWS_B} reverse />
    </section>
  );
}
