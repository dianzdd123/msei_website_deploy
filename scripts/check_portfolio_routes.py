#!/usr/bin/env python3
"""Regression checks for MSEI unified editorial pages and direct site routes."""
from pathlib import Path
import sys
root=Path(__file__).resolve().parents[1]
failures=[]
pages=["","research","research/microrobotics","research/dexterous-manipulation","research/medical-robotics",
"research/scientific-instrumentation","projects","capabilities","impact","people","outputs","opportunities",
"opportunities/phd","opportunities/mres","contact","publications","team","group-photo","services","talks",
"teaching","vacancies"]
entry="assets/index-uZzEyxeI.20261112fixed.js"
js=["assets/ProgrammeHub.20261112.js","assets/UnifiedLabPages.20261112.js",
"assets/NavigationEditorial.20261112lab.js","assets/LabReferral.20261112.js"]
css=["assets/lab-programme.20261112.css","assets/lab-navigation.20261112.css","assets/lab-unified.20261112.css"]
for name in [entry]+js+css:
    if not (root/name).is_file(): failures.append("Missing asset: "+name)
for route in pages:
    path=Path("msei_website")/route/"index.html"
    target=root/path
    if not target.is_file():
        failures.append("Missing direct URL shell: "+str(path))
        continue
    html=target.read_text(encoding="utf-8")
    for name in [entry]+css:
        if "/"+name not in html: failures.append(str(path)+" omits "+name)
for name in ["index.html","404.html"]:
    target=root/name
    if not target.is_file() or "/"+entry not in target.read_text(encoding="utf-8"):
        failures.append(name+" uses old routing")
if (root/entry).is_file():
    text=(root/entry).read_text(encoding="utf-8")
    route_map=text.split("const B=[",1)[-1].split("],q=g({history:",1)[0]
    for p in pages:
        if not p: marker='path:"/"'
        else: marker='path:"/'+p+'"'
        if marker not in route_map:failures.append("Router omits "+p)
    for module in ["UnifiedLabPages.20261112.js","ProgrammeHub.20261112.js","LabReferral.20261112.js"]:
        if module not in route_map:failures.append("Router omits "+module)
    if "20261111privacy.js" in route_map:failures.append("Old page imports in active router")
    if "import NavigationEditorial from \"./NavigationEditorial.20261112lab.js\"" not in text:
        failures.append("Navigation bundle is outdated")
if (root/js[1]).is_file():
    source=(root/js[1]).read_text(encoding="utf-8")
    if "index-uZzEyxeI.20261111privacy.js" in source:failures.append("Unified view imports old bootstrap")
    for name in ["team-content.json","publications-content.json","opportunities-content.json","research-content.json"]:
        if name not in source or not (root/"data"/name).is_file():failures.append("Missing backed data: "+name)
if (root/js[2]).is_file():
    source=(root/js[2]).read_text(encoding="utf-8")
    for label in ["Research","Projects","Capabilities","Impact","People","Outputs","Opportunities","Contact"]:
        if "['"+label+"'," not in source:failures.append("Navigation missing "+label)
for message in failures:print("FAIL:",message)
print(("PASS" if not failures else "FAIL"),len(pages),"direct route shells;",len(js)+1,"active JS modules;",len(css),"styles; failures",len(failures))
sys.exit(bool(failures))
