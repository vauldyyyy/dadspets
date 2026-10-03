import Link from "next/link";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { AquariumForm } from "../../components/SupplyForms";

export const metadata = {
  title: "Custom Aquariums & Aquascaping",
  description: "Plan a custom aquarium with Dad's Pets in Goa. Ask about tanks, lighting, filtration, soil, stone, driftwood and installation options.",
  alternates: { canonical: "/custom-aquariums" },
};

const steps = [
  ["01", "Shape the idea", "Tell us where the aquarium will live, its approximate size and the look you have in mind."],
  ["02", "Choose the system", "Discuss the tank, stand, lighting, filtration, substrate, hardscape and other components."],
  ["03", "Confirm the plan", "Dad's Pets checks the practical options, current availability and a quote with you."],
];

export default function CustomAquariumsPage() {
  return <>
    <Nav staticLight />
    <main id="main">
      <section className="supply-page-hero supply-page-hero--aquarium" data-nav="dark">
        <div className="supply-container supply-page-hero__inner">
          <p className="supply-kicker">AQUARIUMS MADE FOR YOUR SPACE</p>
          <h1>Build a world<br /><em>of your own.</em></h1>
          <p>From glass and cabinetry to filters, lights, soil, stone, driftwood and plants, bring the pieces of an aquarium together with Dad&apos;s Pets.</p>
          <div className="supply-actions"><a className="supply-button supply-button--cream" href="#plan">Plan my aquarium →</a><Link className="supply-button supply-button--outline-light" href="/shop?category=equipment">Explore equipment →</Link></div>
        </div>
      </section>

      <section className="supply-info-section" data-nav="light">
        <div className="supply-container">
          <div className="supply-section-head"><p className="supply-kicker">FROM THE FIRST SKETCH</p><h2>The whole setup, considered.</h2><p>Aquariums are more than a tank. Explore the equipment and materials that make the idea work.</p></div>
          <div className="aquarium-feature-grid">
            <article><img src="/assets/products/custom-4ft.jpg" alt="Illustrative large custom aquarium" loading="lazy" /><div><h3>Custom tanks & cabinetry</h3><p>Talk through dimensions, placement, stands and the finish you want.</p></div></article>
            <article><img src="/assets/products/filtration.jpg" alt="Aquarium filtration equipment" loading="lazy" /><div><h3>Working equipment</h3><p>Filters, pumps, lighting, heating, media and maintenance essentials.</p></div></article>
            <article><img src="/assets/products/driftwood.jpg" alt="Driftwood for aquascaping" loading="lazy" /><div><h3>Living landscapes</h3><p>Soil, sand, rock, wood, plants and decor for the world inside.</p></div></article>
          </div>
        </div>
      </section>

      <section className="supply-steps" data-nav="dark"><div className="supply-container"><p className="supply-kicker">HOW TO START</p><h2>From idea to enquiry.</h2><div className="supply-steps__grid">{steps.map(([number,title,description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="supply-form-section" id="plan" data-nav="light"><div className="supply-container supply-form-layout"><div><p className="supply-kicker">YOUR AQUARIUM STARTS HERE</p><h2>Tell us what you imagine.</h2><p>Already have measurements? Great. Starting from a rough idea? That works too. This will open an enquiry on WhatsApp.</p></div><AquariumForm /></div></section>
    </main>
    <SiteFooter />
    <WhatsAppFloat />
  </>;
}
