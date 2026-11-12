#!/usr/bin/env python3
"""Structural checks for the public MSEI portfolio (no network calls)."""
from __future__ import annotations
from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
failures: list[str] = []
pages = [
    "", "research", "research/microrobotics", "research/dexterous-manipulation",
    "research/medical-robotics", "research/scientific-instrumentation",
    "projects", "capabilities", "impact", "people", "outputs",
    "opportunities", "opportunities/phd", "opportunities/mres",
    "contact", "publications", "team", "group-photo",
    "services", "talks", "teaching", "vacancies",
]
scripts = [
    "assets/index-uZzEyxeI.20261112lab.js",
    "assets/ProgrammeHub.20261112.js",
    "assets/NavigationEditorial.20261112lab.js",
    "assets/LabReferral.20261112.js",
]
styles = [
    "assets/lab-programme.20261112.css",
    "assets/lab-navigation.20261112.css",
]
for rel in scripts + styles:
    if not (root / rel).is_file():
        failures.append("Missing required asset: " + rel)
for page in pages:
    rel = Path("msei_website") / page / "index.html"
    if not (root / rel).is_file():
        failures.append("Missing direct route shell: " + rel.as_posix())
        continue
    html = (root / rel).read_text(encoding="utf-8")
    for asset in scripts[:1] + styles:
        if "/"+asset not in html:
            failures.append(f"{rel}: missing {asset}")
entry = root / scripts[0]
if entry.is_file():
    source = entry.read_text(encoding="utf-8")
    for page in ["projects", "capabilities", "impact", "people", "outputs", "contact"]:
        if f'path:"/{page}"' not in source:
            failures.append("Router missing path: /" + page)
    for asset in ["ProgrammeHub.20261112.js", "LabReferral.20261112.js", "NavigationEditorial.20261112lab.js"]:
        if asset not in source:
            failures.append("Router missing module reference: "+asset)
nav = root / scripts[2]
if nav.is_file():
    text = nav.read_text(encoding="utf-8")
    for label in ["Research", "Projects", "Capabilities", "Impact", "People", "Outputs", "Opportunities", "Contact"]:
        if f"['{label}'," not in text:
            failures.append("Navigation missing primary keyword: "+label)
    for unwanted in ["['Talks',", "['Teaching',"]:
        if unwanted in text:
            failures.append("Personal-only label in main navigation: "+unwanted)
for html_path in [root / "index.html", root / "404.html"]:
    if not html_path.is_file():
        failures.append("Missing top-level shell: "+html_path.name)
        continue
    if "/assets/index-uZzEyxeI.20261112lab.js" not in html_path.read_text(encoding="utf-8"):
        failures.append("Outdated route loader in "+html_path.name)
for err in failures:
    print("FAIL:", err)
print("PASS" if not failures else "FAIL", "-", len(pages), "site route shells,",len(scripts),"JS modules,",len(styles),"styles")
sys.exit(1 if failures else 0)
