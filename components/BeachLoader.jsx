"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1];

/** The beach footage plays once before the home page opens. */
export default function BeachLoader({ progress = 0, minMs = 5700, demo = false, onFinished }) {
  const [shown, setShown] = useState(0);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const timed = demo
        ? ((elapsed % minMs) / minMs) * 100
        : Math.min(100, (elapsed / minMs) * 100);
      const value = demo ? timed : Math.min(progressRef.current, timed);
      setShown(Math.round(Math.max(0, Math.min(100, value))));
    }, 90);
    return () => window.clearInterval(id);
  }, [minMs, demo]);

  return (
    <motion.div
      className="beach-loader"
      role="status"
      aria-label={`Loading Dad's Pets, ${shown}%`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <video
        className="beach-loader__video"
        src="/loader/goa-beach-loader-clean.mp4"
        poster="/loader/goa-beach-poster-clean.jpg"
        autoPlay
        muted
        loop={demo}
        playsInline
        preload="auto"
        onEnded={demo ? undefined : onFinished}
        onError={onFinished}
        aria-hidden="true"
      />
      <div className="beach-loader__shade" aria-hidden="true" />

      <div className="beach-loader__brand">
        <motion.span
          className="beach-loader__logo"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          DAD&apos;S PETS
        </motion.span>
        <motion.span
          className="beach-loader__tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          A LITTLE JOY, RIGHT HERE IN GOA
        </motion.span>
      </div>

      <div className="beach-loader__bottom" aria-hidden="true">
        <div className="beach-loader__progress-label">
          <span>THE GOOD DAYS ARE ON THEIR WAY</span>
          <span>{shown}%</span>
        </div>
        <div className="beach-loader__track">
          <span style={{ width: `${shown}%` }} />
        </div>
      </div>
    </motion.div>
  );
}
