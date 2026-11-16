import { node as el, link, eyebrow } from './ResearchUI.20261111privacy.js';

// Shared full-width landing cover. Paper figures remain intact; diagrams stay readable.
const evidence = [
  ['/assets/publication-figures/vitactip-2026f.webp', 'ViTacTip', 'Multimodal sensing'],
  ['/assets/publication-figures/adm-dp-2026f.webp', 'ADM-DP', 'Robot learning'],
  ['/assets/publication-figures/pose-small-dataset-2026g.webp', 'Micro-object pose estimation', 'Small-scale perception']
];
export function landingHero(word, title, description, image, buttons = []) {
  const source = typeof image === 'string' ? image : image?.src || image?.image;
  const diagram = source && /\.svg(?:[?#]|$)/.test(source);
  const papers = /^(Projects|Publications|Outputs)$/.test(word);
  const community = /^(People|Opportunities)$/.test(word);
  const researchOverview = word === 'Research' && title === 'Adaptive physical intelligence.';
  const background = researchOverview ? '/assets/illustrations/physical-intelligence-lovart-20261116.webp' : community || diagram ? '/assets/group_photo/msei-research-group-20261116.jpg'
    : word === 'Contact' ? '/assets/talk/imperial-x-ihub-venue-20261102a.webp'
    : source || '/assets/illustrations/hero-research-aligned-2026c.webp';
  const hero = el('section', {
    class: 'lp-hero lp-home-cover lp-landing-cover' + (papers ? ' lp-landing-papers' : '') + (community || diagram ? ' lp-landing-people' : ''),
    'aria-label': word
  }, [
    papers ? el('div', { class: 'lp-evidence-wall', 'aria-label': 'Figures from representative research papers' }, evidence.map(([src, name, topic]) =>
      el('figure', { class: 'lp-evidence-panel' }, [
        el('img', { src, alt: name + ': original research figure', decoding: 'async' }),
        el('figcaption', null, [el('strong', null, name), el('span', null, topic)])
      ]))) : el('img', { class: 'lp-home-background', src: background, alt: '', fetchpriority: 'high', decoding: 'async' }),
    el('div', { class: 'lp-wrap lp-home-content' }, [
      eyebrow('MSEI LAB · ' + word.toUpperCase()),
      el('h1', null, title),
      el('p', { class: 'lp-lede' }, description),
      el('div', { class: 'lp-actions' }, buttons.map(([label, href, secondary]) =>
        link(label, href, 'lp-action' + (secondary ? ' lp-action-secondary' : ''))))
    ])
  ]);
  return diagram ? el('div', { class: 'lp-landing-intro' }, [hero,
    el('figure', { class: 'lp-wrap lp-route-visual' }, [
      el('img', { src: source, alt: image.alt || 'Application route', loading: 'lazy', decoding: 'async' })
    ])]) : hero;
}
