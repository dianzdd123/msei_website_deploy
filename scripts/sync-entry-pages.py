#!/usr/bin/env python3
"""Keep static entry pages in sync with the root HTML shell."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
shell = (root / "index.html").read_text(encoding="utf-8")
routes = ("", "research", "team", "publications", "talks", "teaching",
          "services", "vacancies", "group-photo",
          "research/microrobotics", "research/dexterous-manipulation",
          "research/medical-robotics", "research/scientific-instrumentation",
          "opportunities", "opportunities/phd", "opportunities/mres")
for route in routes:
    destination = root / "msei_website" / route / "index.html"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(shell, encoding="utf-8")
(root / "404.html").write_text(shell, encoding="utf-8")
print(f"Updated {len(routes)} route entry pages and 404.html.")
