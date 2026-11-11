# Research-aligned illustrations — November 2026 design refresh

Created on 1 November 2026 with the built-in image generation tool. These images are **AI-generated conceptual editorial illustrations**, not photographs of laboratory equipment, microscopy observations, experimental results, or exact apparatus diagrams. Objects and effects are not to scale. They should have visible captions that communicate this context.

The user-supplied `Dandan_Zhang_Website_Redesign_2026/lab-site/assets/hero-across-scales.png` was used as a visual-style reference. Both it and `personal-site/assets/hero-physical-intelligence.png` were inspected before generation. The new images retain icy blue, white, navy and cyan visual language while replacing unrelated subjects with the group's tactile manipulation, precision manipulation, and optical/magnetic microrobotics themes.

## Assets and technical preparation

All three outputs are 1672 × 941 pixels. Each web asset is WebP encoded from the original generated PNG with Pillow, quality 86 and method 6, at the original dimensions. No retouching, compositing, or scientific image manipulation was performed. Original generated PNGs remain in the tool's output directory outside the website repository. Only final web assets and this provenance record belong to the repository.

| Web asset | Intended placement | Size |
| --- | --- | --- |
| `hero-research-aligned-2026c.webp` | Main hero with live text in the clear left region | 165,250 bytes |
| `tactile-learning-2026c.webp` | Tactile perception and robot learning research theme | 175,396 bytes |
| `microrobotics-2026c.webp` | Optical and magnetic microrobotics research theme | 163,812 bytes |

SHA-256 checksums:

```text
433cde684fc9ca8a8fcc89b0c8f56d23bf11984c5bcddb42ab5e361d6b06a149  hero-research-aligned-2026c.webp
8cf965daf1f8754375fa43f9d8ba4e75267298f646819c6f846819b1754f647f  tactile-learning-2026c.webp
d5e6bd7d78fd14274a7d77c2309b815ab6e50e3536982f5ca602107463b9a9da  microrobotics-2026c.webp
```

## Accessible text and captions

### Main hero

Alt: `Conceptual montage of tactile robotic contact, precision tools handling a material sample, and engineered microstructures in a fluid chamber.`

Caption: `Sensing, learning and dexterous manipulation across scales. AI-generated conceptual illustration; objects are not to scale.`

### Tactile learning

Alt: `Conceptual close-up of a robotic gripper sensing a deformable object, with an abstract tactile representation.`

Caption: `Learning from physical contact. AI-generated conceptual illustration, not experimental data.`

### Microrobotics

Alt: `Conceptual illustration of engineered microgrippers and beads in a transparent chamber with optical and magnetic actuation.`

Caption: `Optical and magnetic micromanipulation. AI-generated conceptual illustration; objects and fields are not to scale.`

## Generation prompts

### Main hero

```text
Use case: stylized-concept
Asset type: 16:9 wide website main hero illustration for an academic embodied intelligence and microrobotics laboratory.
Reference image role: style reference only. Match the supplied image's bright icy white/blue palette, sophisticated CGI visual quality, polished white and navy machinery, luminous cyan light trails, fine blue particle-wave contours, and restrained sense of depth. Create a substantially different image aligned to the actual research programme described below. Do not preserve the source subjects.
PRIMARY COMPOSITION REQUIREMENT: LEFT 45 PERCENT OF ENTIRE IMAGE MUST BE NEARLY EMPTY, ALMOST WHITE / VERY PALE ICY BLUE, low contrast and softly graduated. This blank region is for real website text overlay. No important object, node, beam, dark silhouette, or diagram in the left 45 percent. A very subtle faint flow line low in that blank area is acceptable. The scene’s scientific content occupies the RIGHT 55 percent only.
RIGHT-SIDE SUBJECTS: create one coherent, elegant flowing research montage of three related laboratory vignettes. Upper right: a white and navy robotic precision gripper with translucent cyan tactile fingertips gently contacting a deformable blue-grey object. Middle right: two slim precision robotic tools poised over an abstract soft pale-blue material sample, not a human, not a body, and not a clinical procedure. Lower right: an enlarged clear microfluidic chamber containing tiny engineered abstract microgrippers, a short helical microstructure, and a few smooth beads, with a restrained cyan optical focus and a subtle curved magnetic-field motif. All three suggest sensing, learning and dexterous manipulation across scales.
Connect the vignettes with one or two graceful cyan light paths and faint fine dot-mesh ribbons, echoing the reference's elegant flow while staying simple and readable. No circular loop infographic, no globe, no icons for generic AI. The montage should be airy, not cluttered; realistic polished materials with conceptual scale relationships.
Background: near-white icy blue gradient, no landscape or buildings; darker navy objects and cyan accents concentrated at right. Soft premium editorial lighting, gentle shadows, luminous edges without overwhelming bloom.
Text: absolutely none.
Must exclude: drones, aircraft, turbines, engines, wind farms, cities, mountains, environmental scenes, human brains, surgery patients, surgeons, hospital rooms, organs, DNA, molecules, nanoscale scientific imagery, scale labels, numbers, letters, words, axis plots, logos, watermarks, graph charts.
The result is a beautiful conceptual academic editorial illustration, not documentary lab imagery and not a claimed experiment. Objects are intentionally not to scale. Wide landscape16:9. Keep all meaningful right-side objects legible when the illustration is cropped modestly for responsive website use.
```

### Tactile learning

```text
Use case: stylized-concept
Asset type: wide 16:9 research card illustration for the Multi-Scale Embodied Intelligence Lab academic website.
Reference image role: style reference ONLY. Use the supplied lab hero image for its polished white robotic machinery, luminous ice-blue and cyan accents, fine particle-light trails and elegant academic CGI quality. Do not copy its subjects, layout, labels, drones, city, operating theatre, globe, or mountains.
Primary request: a distinctive close-up editorial concept of tactile perception and robot learning through physical interaction.
Scene: deep navy background with subtle cyan depth and atmospheric light, plenty of clarity and breathing room. A white and brushed-metal precision robotic two-finger gripper gently contacts a soft blue-grey deformable rounded object sitting on a clean dark surface. The fingertip pads have subtly translucent cyan elastomer skins, and the object has a visibly gentle indentation exactly where each finger contacts it. Show convincing close-up material contrast and precise believable mechanics.
A small clean floating circular sensory inset occupies unused space to the right, connected to the contact point by a very thin cyan visual thread. The inset contains an abstract curved cyan dot field suggesting a tactile image, not a numeric plot, no heatmap scale, no axes, no chart, no data claims. One other restrained geometric neural feature representation may appear subtly behind the inset; avoid decorative clutter.
Style: beautiful high-end 3D scientific editorial concept, physically plausible materials, sharp contact region, restrained luminous cyan reflections, white robot housing against navy, fine contours, cinematic but sober. Maintain a clean academic aesthetic, no fantasy humanoids.
Composition: landscape 16:9, single clear focal interaction centered slightly left, gripper enters naturally from upper left, whole contact object in view, inset smaller than main subject and clear. The card should read instantly at medium website size.
Text: none.
Constraints: conceptual AI-generated artwork, not an actual experimental result or documentary lab photograph. No words, letters, numbers, axes, scale bars, equations, logos or watermarks. No people, no face, no biological tissue, no brain. No arrows or circular process diagram. No unrelated medical or aerial robotics imagery.
```

### Microrobotics

```text
Use case: stylized-concept
Asset type: wide 16:9 research card illustration for an academic microrobotics laboratory website.
Reference image role: style reference only. Echo the supplied lab hero's refined scientific CGI quality, polished white/navy engineered forms, luminous cyan optical lines, translucent glass and elegant flowing light. Do not use its unrelated subjects, labels, city, globe, drones, turbines, mountains or clinical imagery.
Primary request: portray optical and magnetic microrobotic manipulation as a compelling clear conceptual close-up inside a fluid chamber.
Scene: a transparent rectangular microfluidic chamber viewed at a slight oblique macro angle, shown large in the frame against a deep navy background. Within the fluid are two beautifully detailed tiny engineered microgrippers with simple articulated jaw forms, one elegant short helical microstructure, and several smooth spherical beads. One microgripper gently approaches a bead; the other is visible behind it, with a clear sense of miniature engineered manipulation. The machinery is abstract conceptual design, no miniature humanoid robots and no motors large enough to dominate.
An understated cyan converging optical beam enters from above to a small focus near one microstructure; its light shows a visual suggestion of optical manipulation without portraying a dangerous laser beam. A few very thin curved cyan lines near the far side of the chamber suggest a magnetic field, elegant and subtle, not a measurement plot or technical claim. Keep the fluid optically clear and clean. Avoid molecular ball-and-stick models, living tissue, blood, organs and cell imagery.
Style: polished high-end 3D academic editorial concept, navy and ice blue with cyan glints, realistic glass refraction, soft specular highlights, precise edges, restrained depth of field so chamber and principal gripper are sharp. Make the main objects easily distinguishable, not crowded.
Composition: wide16:9, balanced central chamber occupying ~70% of frame, main gripper and bead near center left, optical focus high center, slight negative space around the glass. Maintain sober elegant clarity rather than sci-fi effects.
Text: absolutely none. No numbers, letters, words, axes, scale bars, labels, equations, logos or watermarks. No people, faces, clinical procedure or anatomical imagery. No decorative brain or globe.
This is explicitly conceptual AI-generated artwork, not a real micrograph, experiment, apparatus claim or exact diagram. Objects not to scale.
```

