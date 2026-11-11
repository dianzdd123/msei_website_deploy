import { node as el, route, link, eyebrow } from './ResearchUI.20261101g.js';

// Separate mobile compositions keep figure labels readable without horizontal scrolling.
export const researchFigure = (item, className = '') => item ? el('figure', { class: `rd-explainer-figure ${className}` }, [
  el('picture', null, [
    item.mobileImage ? el('source', { media: '(max-width: 640px)', srcset: item.mobileImage }) : null,
    el('img', { src: item.image, alt: item.alt, width: item.width || 1280, height: item.height || 540, loading: 'lazy', decoding: 'async' })
  ]),
  el('figcaption', null, [
    el('div', null, [el('strong', null, item.title), el('p', null, item.caption), item.sourceUrl ? link(`${item.sourceLabel || 'Supporting research'} ↗`, item.sourceUrl, 'rd-text-link') : null]),
    el('div', { class: 'rd-figure-open' }, [
      link('Open full figure ↗', item.image, 'rd-text-link rd-figure-wide-link', { target: '_blank', rel: 'noopener noreferrer' }),
      item.mobileImage ? link('Open full figure ↗', item.mobileImage, 'rd-text-link rd-figure-mobile-link', { target: '_blank', rel: 'noopener noreferrer' }) : null
    ])
  ])
]) : null;

export const researchJoin = (id = 'join-research', application = '') => el('section', { class: 'rd-research-join rd-section', id, 'aria-labelledby': `${id}-title` }, el('div', { class: 'rd-container rd-research-join-grid' }, [
  el('div', null, [
    eyebrow('JOIN THE RESEARCH'),
    el('h2', { id: `${id}-title` }, 'Turn a research question into your next project.'),
    el('p', null, application ? `Interested in ${application.toLowerCase()}? Start with a paper or an open question from this page, then explore the route that matches your research experience and goals.` : 'Explore the PhD and MRes routes, identify a question that connects to the programme, and prepare an enquiry grounded in the research.'),
    el('p', { class: 'rd-research-join-note' }, 'The guides explain research fit, application preparation and the distinction between discussing a project and applying through Imperial.')
  ]),
  el('div', { class: 'rd-research-join-options' }, [
    link([el('strong', null, 'PhD research'), el('span', null, 'Develop an original research contribution'), el('span', { class: 'rd-text-link' }, 'Explore the PhD guide →')], `${route}/opportunities/phd/`, 'rd-research-join-card'),
    link([el('strong', null, 'MRes research'), el('span', null, 'Build research experience through a focused project'), el('span', { class: 'rd-text-link' }, 'Explore the MRes guide →')], `${route}/opportunities/mres/`, 'rd-research-join-card')
  ])
]));
