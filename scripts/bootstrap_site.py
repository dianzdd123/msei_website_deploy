"""Materialize reviewed static files without transferring Git objects."""
import hashlib
import json
import stat
import zipfile
from pathlib import Path, PurePosixPath

root = Path(__file__).resolve().parents[1]
manifest = json.loads((root / 'scripts/bootstrap-sha256.json').read_text())
allowed = {'assets', 'data', 'docs', 'scripts', 'msei_website', '.gitignore',
           'README.md', 'CONTRIBUTING.md', 'index.html', '404.html', 'CNAME', '_config.yml'}
archives = list(root.glob('public-site-part-*.zip'))
if not archives:
    print('Static files are already materialized.')
    raise SystemExit(0)
if {p.name for p in archives} != set(manifest):
    raise SystemExit('Incomplete public snapshot')
seen = set()
for archive in sorted(archives):
    if hashlib.sha256(archive.read_bytes()).hexdigest() != manifest[archive.name]:
        raise SystemExit('Snapshot checksum mismatch')
    with zipfile.ZipFile(archive) as bundle:
        for info in bundle.infolist():
            path = PurePosixPath(info.filename)
            if path.parts and path.parts[0] == '.github':
                continue
            if path.is_absolute() or '..' in path.parts or not path.parts or path.parts[0] not in allowed:
                raise SystemExit('Unexpected public snapshot path')
            if '.git' in path.parts or stat.S_ISLNK(info.external_attr >> 16):
                raise SystemExit('Git metadata and symbolic links are forbidden')
            if info.filename in seen:
                raise SystemExit('Duplicate snapshot path')
            seen.add(info.filename)
            target = root.joinpath(*path.parts)
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(bundle.read(info))
readme = root / 'README.md'
readme.write_text(readme.read_text() + '''
## Deployment boundary

This independent repository publishes reviewed public website files. Private
records and previous source history remain in the separate private repository.
Never merge or mirror private repository branches or tags here. Transfer only
individually reviewed files, and run both privacy and structural checks before
publishing. Automated checks do not replace review of consent or confidentiality.
''')
contributing = root / 'CONTRIBUTING.md'
contributing.write_text(contributing.read_text().replace('dianzdd123/msei_website', 'dianzdd123/msei_website_deploy').replace('Run `python scripts/check_repository.py`', 'Run `python scripts/check_public_content.py`, `python scripts/check_repository.py`'))
print(f'Materialized {len(seen)} reviewed public files; no Git objects transferred.')
