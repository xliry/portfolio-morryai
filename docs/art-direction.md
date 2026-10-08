# Hero artwork

`hero-monolith.webp` is an original artwork generated with the built-in ImageGen tool, then recolored with a built-in ImageGen edit to match morryAI's Electric Cyan palette. Sharp is used only for WebP encoding at quality 88. Final dimensions: 1586 × 992 pixels. File size: 148,454 bytes.

## Generation prompt

```text
Use case: stylized-concept
Asset type: original premium creative studio portfolio hero artwork, wide cinematic 16:10 landscape.
Scene/backdrop: windswept dark volcanic dunes with finely ridged black sand, distant low dunes fading into a muted smoky pale sage dusk sky.
Subject: one monumental sculptural polished dark olive chrome torus, an open circular portal standing vertically in the landscape. Thin acid-lime luminous inner ring and physically plausible lime reflection on the dark metal and adjacent sand.
Style/medium: cinematic editorial photograph meets photoreal luxury campaign CGI, expensive contemporary art direction. Realistic heavy chrome material with nuanced reflections and subtle fine film grain.
Composition/framing: generous atmospheric upper space and left negative space; the torus stands strongly at right/center, medium-wide low viewpoint, full sculpture visible, dune foreground. Wide landscape, 16:10 framing.
Lighting/mood: refined controlled high-contrast dusk lighting, enigmatic and restrained, matte smoky sky, black olive metallic surface, thin striking lime accent.
Constraints: one image, no text, no logo, no watermark, no UI, no humans. No rainbow gradient, no generic AI nebula.
```

## Brand palette edit prompt

The existing generated artwork was used as the edit target. The edit preserves the portal, composition, dune geometry, material character and photographic realism; the chromatic treatment follows morryAI's graphite and Electric Cyan identity.

```text
Use case: lighting-weather
Asset type: morryAI creative studio portfolio hero artwork brand color edit.
Input image: edit target — existing monolithic torus artwork.
Primary request: Recolor only this existing image to morryAI's neutral graphite and Electric Cyan brand palette. Preserve the exact original composition, torus silhouette, torus position and perspective, full circular opening, camera angle, dune shapes, sand textures, landscape silhouette, cloud shapes, material realism, high-contrast photographic CGI quality and widescreen framing.
Required edit: Change the thin acid-lime luminous inner ring to Electric Cyan #00E5FF, with a subtly brighter #37F0FF highlight. Replace all olive, sage and warm yellow color cast in the chrome, dunes and sky with neutral dark graphite, charcoal and cool gray. Keep the chrome polished and dark. Add only physically plausible modest cyan reflection near the ring, along the adjacent metal and immediate sand underneath. The environment should remain predominantly neutral charcoal with cool-gray atmospheric sky, not heavily blue.
Lighting/mood: restrained expensive cinematic editorial campaign art, neutral smoky dusk, sharp delicate cyan emissive accent, natural nuanced reflections and fine film grain.
Constraints: Color and light edit only; preserve all shapes, location, composition and materials unchanged. Do not add or remove anything. No text, no logo, no watermark, no UI, no humans. No green or lime accent, no sage/olive cast, no rainbow gradient.
```

## Social preview card

`public/images/social-cover.jpg` is a 1200 × 630 pixel branded social preview (60,251 bytes, JPEG quality 90). Its editable, self-contained composition lives in `docs/social-card.svg`: existing cyan portal artwork and brand mark are embedded, with deterministic SVG text in Segoe UI/Arial, a graphite readability gradient and Electric Cyan typography. Sharp rasterizes the SVG and encodes the final JPEG; no new image generation or alteration of the hero asset is involved.
