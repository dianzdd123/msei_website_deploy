# Reusing msei_website

MSEI Lab static website and structured public content.

**Current scope:** Deployed static assets and editable JSON; the original Vue authoring project is not included.


## Local preview

```bash
python -m http.server 8000
```

Open `http://localhost:8000/msei_website/`. The router uses `/msei_website/`; data and assets are loaded from `/data/` and `/assets/`. Serve the repository root to preserve that layout. There is no `package.json` or source build to run with `npm install` in this checkout.

## Edit the right layer

| Layer | Paths | Typical changes |
|---|---|---|
| Structured content | `data/*-content.json` | Biography, publications, research, team, teaching and opportunities |
| Entry pages | `index.html`, `404.html`, `msei_website/` | Router entry and static hosting fallback |
| Deployed implementation | `assets/` | Versioned compiled/readable JavaScript and CSS |
| Provenance | `docs/` | Content sources and maintenance notes |
| Hosting | `CNAME` | Existing custom-domain association |

Follow the README's field conventions; keep IDs and string/array types stable. Content edits generally belong in JSON. Recover the original application source before a substantial rebuild. Prior asset versions support cached clients, so deleting old bundles indiscriminately can break already-open pages.

## Validate changes

```bash
python scripts/check_repository.py
```

After editing the root entry page, run `python scripts/sync-entry-pages.py`, then inspect its diff. Preview the affected route directly and by navigation, including a browser refresh and a narrow viewport. Check that image sources, external references and publication status match the evidence recorded in `docs/`.

The structural check parses tracked Python/JSON and checks local navigation links. It does not render the site, verify every bundled import or validate the factual accuracy of public profiles. The current update does not change the deployed content or domain.

## Reusing the site

Keep a separate deployment configuration for your own domain and route prefix. Replace lab identities, contact details, institutional branding, biographies, images and data with your own authorised content. Existing papers, figures, portraits and third-party assets have their own permissions; do not treat the repository as a freely licensed template.

Keep production deployment changes separate from local previews and inspect the published site after Pages completes. No private student or employment information belongs in public content JSON.

## Attribution and reuse permissions

No repository-wide licence file is included in this checkout. Confirm reuse and redistribution permissions with the relevant rights holders; this maintenance update does not add a licence or relicense upstream code, data or assets.

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for the local workflow and what to include with a proposed change.
