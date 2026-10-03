import Link from "next/link";
import Nav from "../../components/Nav";
import SiteFooter from "../../components/SiteFooter";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import { WholesaleForm } from "../../components/SupplyForms";
import { telHref, BUSINESS } from "../../lib/business";

export const metadata = {
  title: "Wholesale Pet & Aquarium Supplies",
  description: "Enquire about bulk pet, aquarium, bird and poultry supplies from Dad's Pets near Madgaon, Goa.",
  alternates: { canonical: "/wholesale" },
};

export default function WholesalePage() {
  return <>
    <Nav staticLight />
    <main id="main">
      <section className="supply-page-hero supply-page-hero--trade" data-nav="light">
        <div className="supply-container supply-page-hero__inner">
          <p className="supply-kicker">DAD&apos;S PETS · TRADE SUPPLY</p>
          <h1>One conversation.<br /><em>A lot more covered.</em></h1>
          <p>For pet shops, aquarium professionals, breeders and farms sourcing across multiple categories. Tell us what you need, in what quantity, and where it&apos;s going.</p>
          <div className="supply-actions"><a className="supply-button supply-button--dark" href="#enquire">Start a bulk enquiry →</a><Link className="supply-button supply-button--line" href="/shop">Browse the catalog →</Link></div>
        </div>
      </section>

      <section className="supply-info-section" data-nav="light">
        <div className="supply-container">
          <div className="supply-section-head"><p className="supply-kicker">THE RANGE</p><h2>Across the whole world of pets.</h2><p>Start with one department or combine several in a single enquiry.</p></div>
          <div className="supply-mini-grid">
            <div><span>01</span><h3>Aquariums & equipment</h3><p>Tanks, filters, lights, pumps, media, aquascaping materials and more.</p></div>
            <div><span>02</span><h3>Fish & bird supply</h3><p>Ask about live availability, feed, habitats and care products.</p></div>
            <div><span>03</span><h3>Poultry & farm care</h3><p>Poultry enquiries, feed, drinkers, accessories and care products.</p></div>
            <div><span>04</span><h3>Everyday pet essentials</h3><p>Food, treats, grooming, comfort and care for companion animals.</p></div>
          </div>
        </div>
      </section>

      <section className="supply-form-section" id="enquire" data-nav="light">
        <div className="supply-container supply-form-layout">
          <div><p className="supply-kicker">LET&apos;S TALK SUPPLY</p><h2>Send your list.</h2><p>Share product names, preferred brands, pack sizes and estimated quantities. We&apos;ll discuss available options and pricing directly.</p><div className="supply-form-aside"><strong>Need a quick call?</strong><a href={telHref}>{BUSINESS.phoneDisplay}</a><span>Phone and WhatsApp</span></div></div>
          <WholesaleForm />
        </div>
      </section>
    </main>
    <SiteFooter />
    <WhatsAppFloat />
  </>;
}
