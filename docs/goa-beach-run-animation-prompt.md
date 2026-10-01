# Dad's Pets — beach run entrance

Use `dads-pets-goa-beach-run-start.png` as the **exact first frame**. Make a single continuous 8-second image-to-video shot, 16:9, photorealistic, silent, with a fixed camera. This video **does not loop**; it ends as the dogs approach.

## Main prompt — paste into the video generator

> A calm Goa beach at sunset. Preserve the supplied image's exact composition, setting, lighting, and all four individual pets. There are **exactly two dogs for the entire video**: the golden retriever and the smaller tan-and-white dog standing together at the distant waterline. There are **exactly two cats for the entire video**: the tabby and the ginger-and-white cat playing together on the right-hand dry sand. Never add, clone, replace, merge, hide, or remove a dog or cat.
>
> One continuous locked-off eye-level shot. At 0–2 seconds, the two dogs look toward the camera as a small wave reaches their paws. At 2–6 seconds, they run naturally out of the shallow water along the open **left-centre wet-sand lane**, diagonally closer to the camera, with anatomically correct alternating strides, modest splashes, consistent fur markings, believable scale growth, and reflections. The golden retriever stays slightly left of the smaller dog; both remain visible and clearly separate. At 6–8 seconds they reach the **middle foreground**, still left of the cats, and the shot ends before either dog enters the cats' space or exits the frame. They do not jump or fly.
>
> Throughout the entire shot, keep both cats fully visible in the **right foreground**. The tabby gently bats the woven ball a little; the ginger-and-white cat watches, blinks and lightly turns its head. The cats stay on dry sand and do not move into the dogs' path. The dogs never pass in front of, behind, over, or through either cat. Three small shorebirds move only along the far left edge. Gentle waves, subtle palm movement, and warm sunset reflections provide background motion. Preserve the fishing boats, coastline, and clean upper-centre sky for a separate website logo. End cleanly after eight seconds, without a fade.

## Negative prompt

> Extra dogs or cats, duplicated animals, disappearing tabby, cats hidden by dogs or splashes, dog crossing into right foreground, animals morphing into one another, incorrect limbs, changing fur markings, sudden size jumps, new animals entering, camera cuts, camera pan, zoom rush, airborne dogs, wings, giant waves, text, logo, watermark, UI, baked loading bar.

## Settings and rescue method

- Generate at 1920×1080 or higher, 24 fps, H.264 MP4. Use high identity/structure consistency and low to medium motion strength if those controls exist.
- If the generator offers motion brushes or regions, animate the dogs' left-centre lane separately and keep the cats' right-hand region nearly fixed. Set the dogs' endpoint around the middle foreground, left of the cats.
- If one pass still clones the dogs or hides a cat, make two short controlled layers: a dog run with the cats held still, and a subtle cat-play take with the dogs held still, then composite them. Keep the same first frame and locked camera.

## Still image provenance

The starting image was made with Codex's built-in image generation from this prompt:

> Generate a NEW photorealistic 16:9 cinematic first frame for a short Dad's Pets website entrance video set on a calm beach in Goa at sunset. Compose it specifically for image-to-video animation with four stable animal subjects and separate movement lanes. EXACTLY TWO DOGS, EXACTLY TWO CATS; no other dogs or cats anywhere, including background or reflections. The two dogs are a golden retriever and one smaller tan-and-white dog. Place BOTH DOGS SMALL BUT CLEARLY VISIBLE IN THE MIDDLE DISTANCE, standing at the shallow waterline slightly LEFT OF CENTRE, about 20–25 meters from the camera, facing diagonally toward the camera, poised to run out of the waves along a clear, open left-centre lane of wet sand. They are not jumping or flying in the starting frame. Place BOTH CATS on DRY, slightly raised sand in the RIGHT FOREGROUND, away from the dogs' running lane: one tabby cat playfully taps a small natural woven ball, and one ginger-and-white cat watches close beside it. Keep both cats fully visible with ample clear space around them. The dog path from water to foreground must never pass behind, over, or through either cat. A few small shorebirds run along the FAR LEFT edge of wet sand, separate from the pet movement lanes. Goa setting: tranquil Arabian Sea, warm peach-and-amber setting sun, coconut palms framing the far edges, subtle distant traditional fishing boat and low Goan coastal buildings, a few understated veranda lanterns, small gentle waves, soft sea haze. Eye-level wide shot from the beach, realistic natural fur and anatomy, accurate scale and perspective, believable reflections in wet sand, elegant cinematic 35mm composition with great depth. Calm, magical through light and atmosphere only; warm and real rather than fantasy. Leave the UPPER CENTRE SKY clean and slightly darker for a separate white HTML logo. No people. No extra animals except the few shorebirds, no extra dogs or cats, no cloned limbs, no airborne dogs, no resort clutter, no jungle, no aquarium, no text, no logos, no UI, no watermark.

The still is staged at `public/loader/dads-pets-goa-beach-run-start.png`. The accepted follow-up clip was trimmed past an out-of-place fish; the clean loading video is now `public/loader/goa-beach-loader-clean.mp4`, with its first frame at `public/loader/goa-beach-poster-clean.jpg`. The earlier rejected clip was not added to the website.
