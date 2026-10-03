import { BUSINESS } from "../lib/business";

const BASE = BUSINESS.websiteUrl || "http://localhost:3000";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/custom-aquariums`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/live-stock`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/wholesale`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/care-guides`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];
}
