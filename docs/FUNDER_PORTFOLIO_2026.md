# MSEI Lab website — research-funder information architecture

**Status:** Public-site implementation on the `restructure-funder-portfolio-20261112` branch.  
**Purpose:** Present the MSEI Laboratory as a coherent evidence-led research programme, not a duplicate of Dandan Zhang's personal site.

## Visitor pathways and content ownership

| Main keyword | New path | What the visitor can verify | Editorial owner |
| --- | --- | --- | --- |
| Home | `/msei_website/` | Why the scientific programme matters; themes, selected evidence, research team | MSEI Lab |
| Research | `/msei_website/research` | Four themes, four application domains, research questions and boundaries | MSEI Lab |
| Projects | `/msei_website/projects` | Representative published outcomes and next scientific questions | MSEI Lab |
| Capabilities | `/msei_website/capabilities` | Public research platform families, methods and status caveats | MSEI Lab |
| Impact | `/msei_website/impact` | Scientific application paths, verified collaborations, responsible support | MSEI Lab |
| People | `/msei_website/people` | Team expertise and group profiles | MSEI Lab |
| Outputs | `/msei_website/outputs` | Publication hub, code, datasets, tools and reuse cautions | MSEI Lab |
| Opportunities | `/msei_website/opportunities` | PhD, MRes and research applicant guidance | MSEI Lab |
| Contact | `/msei_website/contact` | Research partnership, facilities and student enquiry routes | MSEI Lab |

**Personal website canonical home:** https://www.intelligentrobotics-acrossscales.com/

It owns Dandan's full academic biography, invited talks, personal media, teaching resources, mentorship philosophy and individual academic service.

## Keep, consolidate and refer

- **Preserve** the detailed scientific and applications pages `/research/*` as the research programme's core.
- **Preserve** complete publication records at `/publications`. The new Outputs hub links there rather than duplicating 40+ records.
- **Preserve** current researchers and approved alumni at `/team`, now also reachable via `/people`. Personal academic biography belongs off-site.
- **Preserve** the live PhD/MRes routes and opportunities. Do not invent new openings, student allocations or deadlines.
- **Consolidate** group-relevant Community/Services records under Impact, with the old `/services` route retained.
- **Replace** detailed group-site Talks and Teaching pages with contextual referrals to the personal website. Existing URLs remain reachable.
- **Preserve** the group-photo URL as a related People archive, rather than a main-menu item.
- **Do not fabricate** funder amounts, funded programmes, industry adoption, patient outcomes or apparatus availability.

## Information architecture choices

### Research vs Projects

Research describes **mechanisms and unanswered questions**; Projects describes **selected source-linked evidence and experimental achievements**. Citation links remain attached to claims. A future named flagship case study should only be added with verified scope, methods, results, contributors and outputs.

### Capabilities

This page describes three existing public platform families: contact-rich manipulation, medical/scientific instrumentation, and optical/magnetic microrobotics. Concept images retain explicit captions. It is not an equipment-booking service or proof an instrument is available for an external user.

### Impact

Distinguishes demonstrated research outputs from potential applications. Partnerships are described at the specificity already supported by public records. Public grants can be added once approved information is available. Individual editorial or invited-speaking records live on the personal site.

### Outputs

The public project evidence is source-linked. The full publication catalogue lives at the established `/publications` URL. Code links retain the original descriptions and software/hardware caveats.

## Historical URL compatibility

Keep `/talks`, `/teaching`, `/services`, `/team`, `/publications`, `/group-photo`, existing Research subroutes and PhD/MRes guidance loadable. Do not remove files or issue redirects unless there is a verified destination and a tested recovery path.

## Design

- Imperial-inspired navy and whites with restrained cool grey/lavender accents.
- Semantic headings and one keyword per page.
- Clear calls to action and local section navigation.
- Consistent citation, project and capability cards, with explicit captions for concept art.
- Responsive mobile navigation with labelled buttons and focus states.
- No auto-generated unsupported "impact" metrics.

## Changing these pages in future

- Code: `assets/ProgrammeHub.20261112.js`, `assets/NavigationEditorial.20261112lab.js`, `assets/LabReferral.20261112.js`.
- Styles: `assets/lab-programme.20261112.css`, `assets/lab-navigation.20261112.css`.
- Route loader: `assets/index-uZzEyxeI.20261112lab.js`.
- Content authority: existing publicly reviewed `data/*.json` files, particularly `research-content.json`, `research-applications-content.json`, `publications-content.json`, `team-content.json` and `opportunities-content.json`.
- Public shells: `index.html`, `404.html`, and `msei_website/**/index.html`.

**Deployment model:** The independent public repository publishes via GitHub Actions. Its authoring assets are a reviewed public snapshot; never copy private history, internal award/funding nominations, confidential project schedules or unreviewed source data from the separate private original repository.

## Release evidence required

1. `python3 scripts/check_public_content.py`.
2. `python3 scripts/check_repository.py`.
3. `python3 scripts/check_portfolio_routes.py`.
4. JavaScript module parse checks for the new navigation, route loader, referral and portfolio modules.
5. Confirm each canonical public path and each legacy path loads directly and after refresh.
6. Verify dropdown navigation, keyboard escape, desktop/mobile, content links and concept-photo labels.
7. Review all public JSON and media URLs for confidential information.
8. Verify the actual GitHub Pages deployment run and live site after merging.
9. Record successful checks, unverified items and the rollback commit.

A green commit is not the same thing as a successful published site.
