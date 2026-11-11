# Research figures — 1 November 2026

These six explanatory SVG figures were authored for the MSEI research pages in Imperial Blue (#003E74) and purple (#6B3FA0). Each has a desktop and a separately composed mobile layout, semantic title/description, descriptive page alt text, a caption, and an open-figure link. The diagrams contain no measured data, plotted results, scales or clinical claims.

| Figure | Purpose and evidence boundary | Page |
| --- | --- | --- |
| `adaptive-physical-intelligence-2026e.svg` | Synthesis of the existing sensing, learning, adaptive control and embodiment themes. Couplings describe a programme, not a completed integrated system. | Research overview |
| `research-evidence-guide-2026e.svg` | Editorial guide to reading task conditions, comparisons, outcomes and scope. It does not assert that every paper uses the same evaluation protocol. | Research overview |
| `microrobotics-workflow-2026e.svg` | Conceptual links between microscopy, state estimation, optical or magnetic actuation, and physical response. Different studies use different scales and platforms; magnetic millirobots remain identified as millimetre-scale work. | Optical and magnetic microrobotics |
| `tactile-manipulation-workflow-2026e.svg` | Conceptual relationship between touch/vision, state representation, learned policies and manipulation. Different hardware and tasks are investigated in separate studies. | Dexterous robotic manipulation |
| `medical-shared-control-2026e.svg` | Illustrative operator-in-the-loop relationship among human intent, task context, adaptive assistance and motion/feedback. Describes research and training settings, not clinical deployment. | Medical robotics and microsurgery |
| `scientific-perception-workflow-2026e.svg` | Explanatory summary of the multi-pipette localisation component: microscope images → visibility enhancement → coarse detection → fine localisation. This does not depict a completed autonomous patch-clamp experiment or autonomous laboratory. | Robotics for scientific experiments |

For each file, the mobile counterpart adds `-mobile` before `.svg`. Mobile compositions enlarge and wrap labels vertically instead of shrinking a wide diagram or requiring horizontal scrolling.

## Provenance

The research-theme and application diagrams synthesise the descriptions and paper records already held in `data/research-content.json` and `data/research-applications-content.json`. The scientific-perception workflow follows the existing summary and source link for [multi-pipette localisation research](https://arxiv.org/abs/2504.01044). The original HTML workflow data remains in the JSON for compatibility; its SVG presentation replaces the duplicated HTML figure on the application page.

The medical and scientific concept hero illustrations are documented separately in `application-concepts-2026e.md`. Original research assets (`research2.png`, `research3.png` and `research1.png`) remain visible with their existing descriptions as research-setting figures. The generated concept artwork is explicitly labelled; it is never presented as experimental evidence.

## Visual verification

All twelve SVG files were rendered with Inkscape and visually inspected in desktop/mobile contact sheets. The diagrams use a pale background, short labels, explicit arrows where appropriate, and line icons. The mobile evidence-guide feedback panel was enlarged after inspection to accommodate its wrapped caption.
