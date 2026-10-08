/* Dad's Pets business details. Keep the provisional fields marked below current. */
export const BUSINESS = {
  name: "Dad's Pets",
  shortName: "DAD'S PETS",
  locationLabel: "Shirvodem, Margao, Goa",
  // Address shown on the business's Google Maps listing supplied by the owner.
  address: "Sanscar Society, Shirvodem, Margao, Goa 403601",
  mapQuery: "Dad's Pets, Sanscar Society, Shirvodem, Margao, Goa 403601",
  phoneDisplay: "+91 98231 70575",
  phoneE164: "+919823170575",
  whatsappNumber: "919823170575",
  whatsappMessage: "Hi Dad's Pets! I'd like to ask about your pets and products.",
  email: null,
  instagram: null,
  facebook: null,
  // Override during preview builds if a different canonical domain is needed.
  websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.dadspets.com",
  searchIndexingEnabled: true,
  timeZone: "Asia/Kolkata",
  // Set to a Sunday-to-Saturday object of {open, close} minutes once confirmed.
  openingHours: null,
  animation: { desktopParticles: 52, mobileParticles: 22, maxFps: 30 },
};

export const telHref = BUSINESS.phoneE164 ? `tel:${BUSINESS.phoneE164}` : "/contact";
export const waLink = (message = BUSINESS.whatsappMessage) =>
  BUSINESS.whatsappNumber
    ? `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`
    : "/contact";
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapQuery)}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&z=16&output=embed`;

export function formatMinutes(value) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
}

export const weekdayHours = BUSINESS.openingHours
  ? `${formatMinutes(BUSINESS.openingHours[1].open)} – ${formatMinutes(BUSINESS.openingHours[1].close)}`
  : "Hours to be confirmed";
export const sundayHours = BUSINESS.openingHours
  ? `${formatMinutes(BUSINESS.openingHours[0].open)} – ${formatMinutes(BUSINESS.openingHours[0].close)}`
  : "Hours to be confirmed";

export function openStatus(now = new Date()) {
  if (!BUSINESS.openingHours) return { text: "", open: null };
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: BUSINESS.timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const value = Object.fromEntries(parts.map((p) => [p.type, p.value]));
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(value.weekday);
    const hours = BUSINESS.openingHours[day];
    const minutes = Number(value.hour) * 60 + Number(value.minute);
    const isOpen = Boolean(hours && minutes >= hours.open && minutes < hours.close);
    return { text: isOpen ? "Open now" : "Closed now", open: isOpen };
  } catch {
    return { text: "", open: null };
  }
}
