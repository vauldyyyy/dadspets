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

`lib/catalog.js` defines seven departments, 76 pictured product types, 57 broader branded enquiries, and 25 named models with matched product photographs. `/shop` presents them in a product-card grid with search, department, brand, filter-type, and aquatic-care filters. Selecting any card opens a prefilled WhatsApp enquiry; there is no online checkout or unconfirmed price. Taiyo appears under fish food, while filter brands appear under equipment. The same Shop page also has live fish, bird and poultry enquiry cards, a custom aquarium brief, and a wholesale list form.

The catalog describes enquiry examples, not an exact live inventory. Exact-model reference photographs are in `public/assets/catalog/models/`; their source pages are recorded in `docs/product-photo-sources.json`. Generated, unbranded product illustrations in `public/assets/catalog/` show many broader supply types. Other cards use representative pictures and are marked illustrative. A brand card asks about a manufacturer's range; it does not say Dad's Pets stocks that brand. No price, pack size or animal availability is asserted without confirmation. Obtain permission for third-party reference photographs before using them in a public commercial catalog. Replace them with supplier-authorized images as those become available.

## Business information

The confirmed phone and WhatsApp number is configured in `lib/business.js`. Update the opening hours, social accounts and exact map pin when the shop confirms them. Product and pet imagery is illustrative; availability and prices are not asserted. The current address text is provisional.

`BUSINESS.websiteUrl` points to the current Vercel URL for canonical metadata and the sitemap. Update it if a custom domain is added. Search indexing remains off until the shop details are confirmed.

## Deployment

Deploy the root of this repository as a Next.js project on Vercel. The default `npm run build` command is sufficient; no environment variables are required for the current preview.
