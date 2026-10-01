"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Loop chapter footage behind accessible HTML copy; beats fade through on a timer.
 */
export default function VideoChapter({ id, name, theme = "dark", bg = "#050505", beats = [], hold = 5200, active = true, still = null, poster = null, videoBase = null }) {
  const [i, setI] = useState(0);
  const [inView, setInView] = useState(false);
  const section = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    if (!active || !inView || beats.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % beats.length), hold);
    return () => clearInterval(t);
  }, [active, inView, beats.length, hold]);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (active && inView) v.play().catch(() => {});
    else v.pause();
  }, [active, inView]);

  const beat = beats[i];

  return (
    <section
      ref={section}
      id={id}
      data-immersion="true"
      className={`chapter chapter--${theme === "dark" ? "dark" : "warm"} vchapter vchapter--${name}`}
      data-nav={theme === "dark" ? "dark" : "light"}
      style={{
        backgroundColor: bg,
        backgroundImage: `url(${still || poster || `/bg/${name}.jpg`})`,
        backgroundSize: "cover",
        backgroundPosition: still ? undefined : "center",
      }}
    >
      {still ? (
        <div className="vchapter-still" style={{ backgroundImage: `url(${still})` }} aria-hidden="true" />
      ) : (
        <video
          ref={video}
          className="vchapter-video"
          poster={poster || `/bg/${name}.jpg`}
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={`${videoBase || `/bg/${name}`}.mp4`} type="video/mp4" />
          <source src={`${videoBase || `/bg/${name}`}.webm`} type="video/webm" />
        </video>
      )}
      <div className={`vignette vignette--${theme === "dark" ? "dark" : "warm"}`} />
      {/* the .beat wrapper keeps its CSS centring transform; only the inner layer animates */}
      <div className="beats">
        <div className="beat beat--center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -22, filter: "blur(5px)" }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {beat?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
