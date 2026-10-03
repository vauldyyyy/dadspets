# Dad's Pets

A Next.js website for Dad's Pets in Goa. It presents the business as a broad pet and aquarium supplier, with a searchable, pictured catalog, custom aquarium enquiries, live animal enquiries, and wholesale requests. The original Goa beach entrance and the aquarium and courtyard video chapters remain part of the site.

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

`lib/catalog.js` defines seven departments, 76 pictured product types, and 60 branded product or range enquiries spanning 59 brands. `/shop` presents them in a product-card grid with search, department and brand filters. Selecting any card opens a prefilled WhatsApp enquiry; there is no online checkout or unconfirmed price. `/wholesale` has a list-based enquiry form, `/custom-aquariums` has a build brief, and `/live-stock` explains current live animal enquiries.

The catalog describes product types and brand enquiries, not an exact live inventory. Generated, unbranded product photographs in `public/assets/catalog/` give many supply types distinct pictures. The remaining product cards use representative photos that may be reused across related types. The site labels images as illustrative. A brand card asks about a manufacturer's range; it does not say Dad's Pets stocks that brand. No price, pack size or animal availability is asserted without confirmation. To show exact product photographs later, add licensed files to `public/assets/products/`, remove the corresponding entry from `PRODUCT_SHEETS`, and change the matching entry in `PRODUCT_PHOTOS` in `lib/catalog.js`.

## Business information

The confirmed phone and WhatsApp number is configured in `lib/business.js`. Update the opening hours, social accounts and exact map pin when the shop confirms them. Product and pet imagery is illustrative; availability and prices are not asserted. The current address text is provisional.

`BUSINESS.websiteUrl` points to the current Vercel URL for canonical metadata and the sitemap. Update it if a custom domain is added. Search indexing remains off until the shop details are confirmed.

## Deployment

Deploy the root of this repository as a Next.js project on Vercel. The default `npm run build` command is sufficient; no environment variables are required for the current preview.
