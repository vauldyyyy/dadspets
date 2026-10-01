import { BUSINESS } from "../lib/business";

const BASE = BUSINESS.websiteUrl || "http://localhost:3000";

export default function robots() {
  return {
    rules: { userAgent: "*", ...(BUSINESS.websiteUrl ? { allow: "/" } : { disallow: "/" }) },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
