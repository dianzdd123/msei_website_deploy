#!/usr/bin/env python3
"""Fail on internal records and sensitive funding fields in website content.

This checks the public schema and common credential formats. Human approval
is still needed for personal details and unpublished research.
"""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
errors = []
team = json.loads((root / 'data/team-content.json').read_text())
allowed = {'name', 'id', 'role', 'roleDetail', 'affiliation', 'avatar', 'links',
           'research', 'topics', 'selectedWorks', 'programmeGroup'}
for key, section in team['sections'].items():
    if key == 'principalinvestigator' or not isinstance(section, dict):
        continue
    for item in section.get('subsections', []):
        if set(item['data']) - allowed:
            errors.append('Team profile contains fields outside the public schema')
if team['sections'].get('groupprojects'):
    errors.append('Group project allocations require a separate privacy review')

for path in root.rglob('*'):
    if not path.is_file() or '.git' in path.parts or path == Path(__file__):
        continue
    rel = path.relative_to(root)
    if path.name == '.DS_Store' or path.suffix in {'.bundle', '.pem', '.key'} or any(part in {'private', 'internal', 'backups'} for part in rel.parts):
        errors.append(f'Private or local-only file: {rel}')
    if path.suffix not in {'.json', '.js', '.html', '.md', '.yml'}:
        continue
    text = path.read_text(encoding='utf-8')
    if path.suffix == '.json' and re.search(r'"(?:nominationLink|nominationIso|departmentMeeting|departmentDeadline|facultyMeeting|departmentDecision)"\s*:', text):
        errors.append(f'Internal scholarship fields: {rel}')
    if re.search(r'https://forms\.cloud\.microsoft/', text):
        errors.append(f'Administrative form link requires removal/review: {rel}')
    if re.search(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{30,}|\bAKIA[A-Z0-9]{16}\b', text):
        errors.append(f'Possible credential: {rel}')

for error in errors:
    print(f'ERROR: {error}')
print('FAIL' if errors else 'PASS: public content schema and credential patterns')
raise SystemExit(bool(errors))
