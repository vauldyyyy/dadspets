import Link from "next/link";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { waLink } from "../../lib/business";

export const metadata = {
  title: "Live Fish, Birds & Poultry Enquiries",
  description: "Ask Dad's Pets in Goa about current live fish, bird and poultry availability and care essentials.",
  alternates: { canonical: "/live-stock" },
};

const groups = [
  { title: "Fish & aquatic life", image: "/assets/fishes.jpg", alt: "Illustrative freshwater aquarium fish", text: "Explore freshwater and ornamental fish, with food, water care and equipment in the same place.", ask: "live fish" },
  { title: "Birds", image: "/assets/products/aviary.jpg", alt: "Illustrative pet bird in an aviary", text: "Ask about pet birds and other varieties, alongside cages, feed, enrichment and daily care.", ask: "birds" },
  { title: "Poultry", image: "/assets/poultry-supply.webp", alt: "Illustrative hens and turkeys", text: "Enquire about hens, turkeys and poultry needs, including feed, drinkers and care products.", ask: "poultry" },
];

export default function LiveStockPage() {
  return <>
    <Nav staticLight />
    <main id="main">
      <section className="supply-page-hero supply-page-hero--live" data-nav="light"><div className="supply-container supply-page-hero__inner"><p className="supply-kicker">LIFE AT DAD&apos;S PETS</p><h1>Curious about<br /><em>who&apos;s here?</em></h1><p>From fish to feathers and farmyard favourites, ask Dad&apos;s Pets what&apos;s currently available and what each animal needs to thrive.</p><div className="supply-actions"><a className="supply-button supply-button--dark" href="#explore">Explore live categories →</a><Link className="supply-button supply-button--line" href="/shop">Browse care supplies →</Link></div></div></section>
      <section className="supply-info-section" id="explore" data-nav="light"><div className="supply-container"><div className="supply-section-head"><p className="supply-kicker">ASK ABOUT AVAILABILITY</p><h2>Meet the living side.</h2><p>Availability changes. These are enquiry categories, not a promise that a particular animal is in stock today.</p></div><div className="live-grid">{groups.map((group) => <article key={group.title}><img src={group.image} alt={group.alt} loading="lazy" /><div><h3>{group.title}</h3><p>{group.text}</p><a href={waLink(`Hi Dad's Pets! What ${group.ask} are currently available? I'd also like to know about their care.`)} target="_blank" rel="noopener noreferrer">Ask what&apos;s available →</a></div></article>)}</div></div></section>
      <section className="catalog-outro" data-nav="dark"><div className="supply-container catalog-outro__grid"><div><p className="supply-kicker">THE RIGHT CARE MATTERS</p><h2>Bring home the whole setup.</h2><p>Food, habitats, equipment and practical care supplies are part of the conversation.</p></div><Link className="supply-button supply-button--cream" href="/shop">Explore supplies →</Link></div></section>
    </main>
    <SiteFooter />
    <WhatsAppFloat />
  </>;
}
