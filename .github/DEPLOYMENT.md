# Publishing the public MSEI Lab website

This repository is an independent, reviewed-public snapshot. The source repository remains private. Do not copy private Git history or unreviewed records here.

## One-time GitHub Pages settings

1. Open https://github.com/dianzdd123/msei_website_deploy/settings/pages
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. After a successful workflow deployment, set **Custom domain** to `zhangrobotics.com` in the same Pages settings screen. GitHub Actions deployments do not set a custom domain merely by including a CNAME file.
4. Ensure `zhangrobotics.com` is assigned to only this Pages repository, not also to `msei_website`. Do not remove the old assignment until ready to switch the site.
5. Verify domain ownership and DNS with GitHub Pages guidance, then enable **Enforce HTTPS** when available.

## Deploy and verify

- Workflow: https://github.com/dianzdd123/msei_website_deploy/actions/workflows/deploy-site.yml
- The first run extracts vetted `public-site-part-*.zip` archives, validates content and structure, removes the archives from the repository, commits the public static files, and deploys them.
- The deployed artifact must include top-level `index.html`, `404.html`, `assets/`, `data/`, and `msei_website/`.
- Verify `https://zhangrobotics.com/` and `https://zhangrobotics.com/msei_website/` after the workflow succeeds.
- If the run stays queued, check https://www.githubstatus.com/ and the repository's Actions permission/billing settings before changing website content.

Never make the original private source repository public merely to resolve a Pages issue.
