# MSEI Lab website

Public website: https://zhangrobotics.com/msei_website/

This repository contains public static website assets and editable JSON. The original Vue authoring project is not included.

## Editing and validation

Edit public website content in `data/`. Validate with `python scripts/check_repository.py` and `python scripts/check_public_content.py`. After editing `index.html`, run `python scripts/sync-entry-pages.py`.

GitHub Pages deploys from `main`; the custom domain is in `CNAME`. The router uses `/msei_website/`, and assets and JSON are served from the domain root. All deployed files are public.

See the [reuse guide](docs/REUSE.md), [contributing guide](CONTRIBUTING.md), and [public repository guide](docs/PUBLIC_REPOSITORIES.md).

## Public content boundary

Keep private lab records in an institutionally approved system or a separate private repository with restricted access. Never add student records, internal project allocations, supervision or mentoring assignments, internal funding decisions, administrative forms, credentials, budgets or unpublished research plans here. Removing a navigation link does not restrict access to a static file.

Team entries should contain only approved public professional details and links to public work. Obtain approval before publishing new personal details or project descriptions. Source notes and internal announcements do not belong in this repository. Review staged changes before every publication.

Deleting a file does not remove earlier Git commits, forks, downloaded copies or external caches. Repository visibility and history cleanup require separate administration.

## Deployment boundary

This independent repository publishes reviewed public website files. Private
records and previous source history remain in the separate private repository.
Never merge or mirror private repository branches or tags here. Transfer only
individually reviewed files, and run both privacy and structural checks before
publishing. Automated checks do not replace review of consent or confidentiality.
