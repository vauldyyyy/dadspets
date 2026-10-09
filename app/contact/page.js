"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "../../components/Nav";
import Reveal from "../../components/Reveal";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import LiveBackground from "../../components/LiveBackground";
import { ScrollProgress, Words, Magnetic } from "../../components/motionKit";
import { BUSINESS, waLink, telHref, mapEmbedUrl } from "../../lib/business";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    if (!BUSINESS.whatsappNumber) {
      setStatus("Enquiries will open when Dad's Pets confirms its WhatsApp number. Please visit the shop in the meantime.");
      return;
    }
    const f = new FormData(e.currentTarget);
    const g = (k) => (f.get(k) || "").toString().trim();

    /* Client-side validation — nothing silently fails anymore. */
    const errs = {};
    if (g("name").length < 2) errs.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(g("email"))) errs.email = "That email doesn't look right.";
    if (g("phone") && !/^[\d+\s()-]{7,16}$/.test(g("phone"))) errs.phone = "Please check the phone number.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    /* Primary path: WhatsApp — works on every phone, lands where the owner
       actually answers. Email stays as a fallback. */
    const lines = [
      `*Website enquiry — ${g("topic")}*`,
      ``,
      `Name: ${g("name")}`,
      g("phone") ? `Phone: ${g("phone")}` : null,
      `Email: ${g("email")}`,
      ``,
      g("msg") || `(no message)`,
    ].filter((l) => l !== null);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");

    setStatus(
      "Opening WhatsApp with your enquiry pre-filled — just hit send."
    );
  };

  return (
    <>
      <ScrollProgress />
      <Nav staticLight />
      <main>
        <section className="page-top has-live-bg">
          <LiveBackground variant="forest" density={0.8} />
          <Reveal className="wrap">
            <p className="crumbs">
              <a href="/">Home</a> / Contact
            </p>
            <p className="eyebrow eyebrow--gold">Get in touch</p>
            <Words className="display" text="Visit Dad's Pets" as={motion.h1} />
            <p className="content-lede">
              Explore pets and everyday essentials in Shirvodem, Margao (Madgaon), Goa. Call us or send a WhatsApp message and we&apos;ll help you find what you need.
            </p>
            <div className="contact-quick">
              <a className="btn btn--grad" href={telHref}>Call {BUSINESS.phoneDisplay}</a>
              <a className="btn btn--ghost" href={waLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </div>
          </Reveal>
        </section>

        <section className="content content--cream">
          <div className="wrap contact-grid">
            <Reveal>
              <h2 className="sec-title" style={{ marginBottom: 16 }}>
                Send an Enquiry
              </h2>
              {!BUSINESS.whatsappNumber && <p className="content-lede" style={{ marginBottom: 18 }}>This form will open when Dad&apos;s Pets confirms its WhatsApp number.</p>}
              <form className="form2" onSubmit={onSubmit}>
                <fieldset disabled={!BUSINESS.whatsappNumber} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
                <div className="f2-row">
                  <div className="f2">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} />
                    {errors.name && <p className="ferr">{errors.name}</p>}
                  </div>
                  <div className="f2">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} />
                    {errors.phone && <p className="ferr">{errors.phone}</p>}
                  </div>
                </div>
                <div className="f2">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} />
                  {errors.email && <p className="ferr">{errors.email}</p>}
                </div>
                <div className="f2">
                  <label htmlFor="topic">Topic</label>
                  <select id="topic" name="topic" defaultValue="General enquiry">
                    <option>General enquiry</option>
                    <option>Pet availability</option>
                    <option>Food and treats</option>
                    <option>Accessories</option>
                    <option>Fish and aquariums</option>
                  </select>
                </div>
                <div className="f2">
                  <label htmlFor="msg">Message</label>
                  <textarea id="msg" name="msg" rows={5} placeholder="Tell us what you're looking for…" />
                </div>
                <motion.button
                  className="btn btn--grad"
                  type="submit"
                  whileHover={{ y: -2, boxShadow: "0 18px 40px rgba(63,166,91,.45)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  {BUSINESS.whatsappNumber ? "Send enquiry via WhatsApp" : "Contact details coming soon"}
                </motion.button>
                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontSize: ".86rem", color: "rgba(42,33,24,.7)" }}
                  >
                    {status}
                  </motion.p>
                )}
                {BUSINESS.whatsappNumber && <p style={{ fontSize: ".86rem", color: "rgba(42,33,24,.6)" }}>
                  Prefer to chat? <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ color: "var(--leaf)", fontWeight: 600 }}>Message us on WhatsApp →</a>
                </p>}
                </fieldset>
              </form>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="visit-details" style={{ marginTop: 0, gridTemplateColumns: "1fr", textAlign: "left" }}>
                <div className="vd">
                  <span className="vd-k">Showroom</span>
                  <span className="vd-v">
                    {BUSINESS.address} (exact pin to be confirmed)
                  </span>
                </div>
                <div className="vd">
                  <span className="vd-k">Hours</span>
                  <span className="vd-v">{BUSINESS.openingHours ? "See current hours at the shop" : "To be confirmed"}</span>
                </div>
                <div className="vd">
                  <span className="vd-k">Call / WhatsApp</span>
                  <span className="vd-v">
                    {BUSINESS.phoneDisplay ? <><a href={telHref}>{BUSINESS.phoneDisplay}</a><a className="contact-wa-link" href={waLink()} target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a></> : "Number to be confirmed"}
                  </span>
                </div>
              </div>
              <iframe
                className="cmap"
                style={{ marginTop: 18 }}
                title="Map to Dad's Pets, Madgaon, Goa"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbedUrl}
              />
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
