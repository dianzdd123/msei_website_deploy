import { node as el, link, heading } from './ResearchUI.20261106a.js';
export const scholarshipNotice = () => null;
export function scholarshipSection(s) {
  if (!s) return null;
  return el('section', { class: 'rd-section rd-container sc-section', id: 'scholarships', 'aria-labelledby': 'scholarships-title' }, [
    heading(s.cycle, s.title, s.intro, 'scholarships-title'),
    link(`${s.officialLink.label} ↗`, s.officialLink.url, 'rd-button rd-primary'),
    el('p', null, 'For project enquiries, contact d.zhang17@imperial.ac.uk. Formal admission and funding decisions follow Imperial’s application processes.')
  ]);
}
