"use client";

import { useEffect, useState } from "react";
import { waLink } from "../lib/business";

function openEnquiry(message, setStatus) {
  const tab = window.open(waLink(message), "_blank");
  if (tab) tab.opener = null;
  setStatus(tab ? "Your enquiry is ready in WhatsApp. Review it and tap send." : "Please allow pop-ups, or use the WhatsApp button below.");
}

export function WholesaleForm() {
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("interest");
    if (value) setInterest(value);
  }, []);

  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key) => String(form.get(key) || "").trim();
    const message = [
      "*Wholesale enquiry — Dad's Pets*",
      `Business: ${value("business")}`,
      `Contact: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `Buyer type: ${value("buyer")}`,
      `Location: ${value("location") || "Please ask"}`,
      "",
      "Products, brands, sizes and quantities:",
      value("items"),
    ].join("\n");
    openEnquiry(message, setStatus);
  }

  return <form className="supply-form" onSubmit={submit}>
    <div className="supply-form__row">
      <label>Business name<input name="business" autoComplete="organization" required placeholder="Your shop or business" /></label>
      <label>Your name<input name="name" autoComplete="name" required placeholder="Your name" /></label>
    </div>
    <div className="supply-form__row">
      <label>Phone number<input name="phone" type="tel" autoComplete="tel" required placeholder="Number we can reach" /></label>
      <label>Buyer type<select name="buyer" defaultValue="Retailer"><option>Retailer</option><option>Breeder or farm</option><option>Aquarium professional</option><option>Other business</option></select></label>
    </div>
    <label>Delivery or pickup area<input name="location" autoComplete="address-level2" placeholder="Town / area" /></label>
    <label>What do you need?<textarea name="items" rows={6} required value={interest} onChange={(event) => setInterest(event.target.value)} placeholder="List products, preferred brands, pack sizes and estimated quantities" /></label>
    <p className="supply-form__hint">This opens a prefilled WhatsApp message. No order is placed until Dad&apos;s Pets confirms the details.</p>
    <button className="supply-button supply-button--dark" type="submit">Prepare WhatsApp enquiry →</button>
    <p className="supply-form__status" role="status">{status}</p>
  </form>;
}

export function AquariumForm() {
  const [status, setStatus] = useState("");
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key) => String(form.get(key) || "").trim();
    const message = [
      "*Custom aquarium enquiry — Dad's Pets*",
      `Name: ${value("name")}`,
      `Phone: ${value("phone")}`,
      `Aquarium type: ${value("type")}`,
      `Approximate size: ${value("size") || "Need guidance"}`,
      `Location: ${value("location") || "Please ask"}`,
      "",
      "What I have in mind:",
      value("details") || "Please help me plan the setup.",
    ].join("\n");
    openEnquiry(message, setStatus);
  }

  return <form className="supply-form" onSubmit={submit}>
    <div className="supply-form__row"><label>Your name<input name="name" autoComplete="name" required placeholder="Your name" /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required placeholder="Number we can reach" /></label></div>
    <div className="supply-form__row"><label>What kind of aquarium?<select name="type" defaultValue="Freshwater"><option>Freshwater</option><option>Planted aquascape</option><option>Marine / reef</option><option>Pond</option><option>Not sure yet</option></select></label><label>Approximate size<input name="size" placeholder="For example, 4 ft × 2 ft" /></label></div>
    <label>Where will it go?<input name="location" placeholder="Home, office, shop — and your area" /></label>
    <label>Tell us about your idea<textarea name="details" rows={5} placeholder="Fish, plants, cabinet, lighting, filtration, installation…" /></label>
    <p className="supply-form__hint">A specification request, not an instant quote. Dad&apos;s Pets will confirm options and pricing directly.</p>
    <button className="supply-button supply-button--dark" type="submit">Discuss my aquarium →</button>
    <p className="supply-form__status" role="status">{status}</p>
  </form>;
}
