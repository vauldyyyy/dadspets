# Dad's Pets

A Next.js website for Dad's Pets in Goa. The project began from the [Dolphin Aquarium & Pets site](https://github.com/vauldyyyy/dolphin-aquarium-enhanced) and has its own pet-shop layout, visual assets, copy, loading film and video chapters.

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

## Business information

Edit `lib/business.js` when the shop confirms its phone, WhatsApp number, opening hours, social accounts and exact map pin. Until then, those contact routes stay inactive or lead to the contact page. Product and pet imagery is illustrative; availability and prices are not asserted. The current address text is provisional.

`BUSINESS.websiteUrl` points to the current Vercel URL for canonical metadata and the sitemap. Update it if a custom domain is added. Search indexing remains off until the shop details are confirmed.

## Deployment

Deploy the root of this repository as a Next.js project on Vercel. The default `npm run build` command is sufficient; no environment variables are required for the current preview.
