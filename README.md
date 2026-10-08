# Dad's Pets

A Next.js website for Dad's Pets in Goa. The original immersive homepage, Goa beach entrance, aquarium and courtyard video chapters, navigation, and footer are preserved. The Shop page contains the expanded product catalog, brands, live animal enquiries, custom aquarium brief, and wholesale form.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. Run `npm run build` before deployment.

## Video chapters

The Goa beach video plays as the loading entrance. The freshwater aquarium and Goan pet courtyard videos loop behind separate, accessible HTML text. Video files and poster images live in `public/loader/` and `public/bg/`.

| Section | Video | Poster |
| --- | --- | --- |
| Loading entrance | `public/loader/goa-beach-loader-clean.mp4` | `public/loader/goa-beach-poster-clean.jpg` |
| Aquarium | `public/bg/aquatics.mp4`, `.webm` | `public/bg/aquatics.jpg` |
| Companions | `public/bg/companions-courtyard.mp4`, `.webm` | `public/bg/companions-video-poster.jpg` |

The `/?loader` URL is available to preview the entrance. The old scroll-frame chapter option is no longer part of the site.

## Shop catalog and pictures

`lib/catalog.js` defines seven departments, 76 pictured product types, 57 broader branded enquiries, and 25 named models with matched product photographs. `/shop` presents them in a product-card grid with search, department, brand, filter-type, and aquatic-care filters. Selecting any product card opens a prefilled WhatsApp enquiry; there is no online checkout or unconfirmed price. Taiyo appears under fish food, while filter brands appear under equipment. The same Shop page has variety galleries for dogs, cats, fish, birds and poultry: choose an animal category, then choose a variety to enquire on WhatsApp. It also has a custom aquarium brief and a wholesale list form.

The catalog describes enquiry examples, not an exact live inventory. Exact-model reference photographs are in `public/assets/catalog/models/`; their source pages are recorded in `docs/product-photo-sources.json`. Generated, unbranded product illustrations in `public/assets/catalog/` show many broader supply types. Other cards use representative pictures and are marked illustrative. A brand card asks about a manufacturer's range; it does not say Dad's Pets stocks that brand. No price, pack size or animal availability is asserted without confirmation. Obtain permission for third-party reference photographs before using them in a public commercial catalog. Replace them with supplier-authorized images as those become available.

The live-animal gallery images in `public/assets/live/` are a mix of generated breed sheets and individually credited species photographs. They are visual examples, not photos of Dad's Pets' current animals or a claim of availability. Generation prompts are recorded in `docs/live-animal-gallery-prompts.md`; the source and license of each individual photograph are recorded in `docs/live-photo-sources.json` and shown in the gallery's Photo credits disclosure.

## Business information

The confirmed phone and WhatsApp number is configured in `lib/business.js`. The address text matches the supplied Google Maps listing; confirm the exact map pin and opening hours with the shop. Product and pet imagery is illustrative; availability and prices are not asserted.

`BUSINESS.websiteUrl` reads `NEXT_PUBLIC_SITE_URL` at build time and defaults to `https://www.dadspets.com`. Set the variable on the final host explicitly so canonical metadata and the sitemap stay correct if the domain changes later.

## Deployment

The site is a static Next.js export. `npm run build` writes the complete public website to `out/`. The GitHub repository contains the source and assets required to build it; the host publishes **only `out/`**, not the README, docs, or source files.

### Cloudflare Pages from GitHub

1. Register the domain in an account owned by Dad's Pets. The domain registrar and hosting provider can be different.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Import an existing Git repository**. Connect `vauldyyyy/dadspets` and choose `main`.
3. Choose **Next.js (Static HTML Export)**. Set build command to `npm run build` and build output directory to `out`. Leave the project root as `/`.
4. Add build environment variable `NEXT_PUBLIC_SITE_URL=https://www.dadspets.com`.
5. Deploy and check the temporary `*.pages.dev` URL first, especially `/shop`, WhatsApp links, and the three video scenes.
6. In the Pages project, add both `www.dadspets.com` and `dadspets.com` under **Custom domains**. To use the root domain, add `dadspets.com` as a Cloudflare zone and set the registrar's nameservers to the two values Cloudflare shows. Redirect the root domain to `www` so there is one canonical address.

Cloudflare Pages hosts the static output without a running Node server. All current video files are below its 25 MiB per-file limit. If a future file exceeds that limit, host that file separately and update its URL in the site.

The domain cannot go live until the owner buys it and connects their registrar and Cloudflare accounts. After the site resolves over HTTPS, the verified Google Business Profile owner or manager should add `https://www.dadspets.com` in **Edit profile → Website**. Opening hours still need confirmation.
