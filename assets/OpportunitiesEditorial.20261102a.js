import { r as ref, o as onMounted } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261102a.js';
import { node as el, route, link, eyebrow, heading, focusHash } from './ResearchUI.20261102a.js';

const guidePath = slug => `${route}/opportunities/${slug}/`;
const researchCards = areas => el('div', { class: 'op-research-grid' }, areas.map(area => el('article', { class: 'op-research-card' }, [
  area.image ? el('figure', { class: 'op-research-figure' }, [el('img', { src: area.image, alt: area.imageAlt, loading: 'lazy', decoding: 'async', width: 800, height: 450 }), el('figcaption', null, area.imageCaption)]) : null,
  el('div', { class: 'op-research-copy' }, [el('h3', null, link(area.title, `${route}/research/${area.slug}/`)), el('p', null, area.text), link('Explore the research →', `${route}/research/${area.slug}/`, 'rd-text-link')])
])));

export default {
  name: 'OpportunitiesEditorial',
  setup() {
    const content = ref(null), failed = ref(false);
    onMounted(async () => {
      document.title = 'Research opportunities | MSEI Lab | Dandan Zhang';
      try { content.value = await dataService.getData('/data/opportunities-content.json'); focusHash(); }
      catch { failed.value = true; }
    });
    return () => {
      if (failed.value) return el('div', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Research opportunities'), el('p', null, 'This page could not load. Please refresh to try again.'), link('Contact Dr Dandan Zhang', 'mailto:d.zhang17@imperial.ac.uk', 'rd-text-link')]);
      if (!content.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading research opportunities…');
      const d = content.value;
      return el('div', { class: 'rd-research op-page' }, [
        el('section', { class: 'op-hero', 'aria-labelledby': 'opportunities-title' }, el('div', { class: 'rd-container op-hero-grid' }, [
          el('div', null, [eyebrow(d.intro.kicker), el('h1', { id: 'opportunities-title' }, d.intro.title), el('p', { class: 'op-lead' }, d.intro.lead), el('div', { class: 'rd-actions' }, [link('Explore PhD guidance →', guidePath('phd'), 'rd-button rd-light'), link('Explore MRes guidance →', guidePath('mres'), 'rd-button rd-outline')])]),
          el('aside', { class: 'op-route-summary', 'aria-label': 'Choosing a postgraduate research route' }, [eyebrow('CHOOSE YOUR NEXT STEP'), el('div', { class: 'op-route-summary-row' }, [el('span', { class: 'op-route-badge' }, 'PhD'), el('div', null, [el('h2', null, 'An original contribution'), el('p', null, 'Develop a research question through sustained investigation and increasing independence.')])]), el('div', { class: 'op-route-summary-row' }, [el('span', { class: 'op-route-badge op-route-badge-purple' }, 'MRes'), el('div', null, [el('h2', null, 'A focused research project'), el('p', null, 'Combine taught foundations with substantial project experience and research training.')])]), el('p', { class: 'op-route-summary-note' }, 'Both routes start with a clear connection between your interests, your preparation and the research you want to explore.')])
        ])),
        el('nav', { class: 'rd-subnav', 'aria-label': 'Opportunities page sections' }, el('div', { class: 'rd-container' }, [link('Application guides', '#application-guides'), link('Research fit', '#research-fit'), link('Other opportunities', '#other-opportunities'), link('Contact', '#contact')])),
        el('section', { class: 'rd-section rd-container', id: 'application-guides', 'aria-labelledby': 'application-guides-title' }, [
          heading('TWO PROGRAMME ROUTES', 'Find the right application guide.', 'Each guide separates official admissions requirements from practical suggestions for discussing research with the lab.', 'application-guides-title'),
          el('div', { class: 'op-guide-grid' }, d.guides.map(g => el('article', { class: 'op-guide-card' }, [
            el('div', { class: 'op-guide-copy' }, [eyebrow(g.kicker), el('h3', null, link(g.shortTitle, guidePath(g.slug))), el('p', { class: 'op-guide-programme' }, g.routeLabel), el('p', null, g.routeSummary)]),
            el('figure', { class: 'op-guide-figure' }, [el('img', { src: g.image, alt: g.imageAlt, width: 680, height: 740, loading: 'lazy', decoding: 'async' }), el('figcaption', null, g.imageCaption)]),
            el('div', { class: 'op-guide-footer' }, [el('p', null, 'Research fit · preparation · formal application · funding · enquiry template'), link(`Read the ${g.slug === 'phd' ? 'PhD' : 'MRes'} guide →`, guidePath(g.slug), 'rd-button rd-primary')])
          ])))
        ]),
        el('section', { class: 'rd-section op-tint', id: 'research-fit', 'aria-labelledby': 'research-fit-title' }, el('div', { class: 'rd-container' }, [
          heading('START WITH THE RESEARCH', 'Which application motivates your question?', 'Read the application overview and representative work, then explain the problem you want to investigate and what you bring to it.', 'research-fit-title'), researchCards(d.researchAreas),
          el('div', { class: 'op-fit-note' }, [el('h3', null, 'Connect a task to a research method.'), el('p', null, 'Across these applications, the programme studies sensing, learning, shared control and physical design. A useful enquiry identifies a concrete task, the limitation you would like to address and a possible way to test progress.'), link('Explore the research themes →', `${route}/research/#themes`, 'rd-text-link')])
        ])),
        el('section', { class: 'rd-section rd-container', id: 'other-opportunities', 'aria-labelledby': 'other-opportunities-title' }, [
          heading('PROJECTS & COLLABORATION', 'There are several ways to contribute.', 'Make the proposed research and timing clear so that the conversation can focus on fit, supervision and practical arrangements.', 'other-opportunities-title'),
          el('div', { class: 'op-other-grid' }, d.otherRoutes.map((item, index) => el('article', { class: 'op-other-card' }, [el('span', { class: 'op-card-number' }, `0${index + 1}`), el('h3', null, item.title), el('p', null, item.text)])))
        ]),
        el('section', { class: 'rd-section op-contact', id: 'contact', 'aria-labelledby': 'contact-title' }, el('div', { class: 'rd-container op-contact-grid' }, [
          el('div', null, [eyebrow('BEGIN A RESEARCH CONVERSATION'), el('h2', { id: 'contact-title' }, 'A focused enquiry is a useful first step.'), el('p', null, d.contact.note), link(`Email ${d.contact.name} ↗`, `mailto:${d.contact.email}`, 'rd-button rd-light')]),
          el('div', { class: 'op-contact-details' }, [el('h3', null, 'Before you write'), el('ul', null, [el('li', null, 'Choose a programme or collaboration route.'), el('li', null, 'Connect a specific research interest to a relevant lab paper or project.'), el('li', null, 'Show your own contribution to relevant work.'), el('li', null, 'State your intended period and any funding route you are considering.')]), el('div', { class: 'op-inline-links' }, [link('PhD enquiry template →', `${guidePath('phd')}#enquire`), link('MRes enquiry template →', `${guidePath('mres')}#enquire`)])])
        ])),
        el('section', { class: 'rd-container op-source-section', 'aria-labelledby': 'official-resources-title' }, [el('h2', { id: 'official-resources-title' }, 'Official admissions resources'), el('p', null, `Admissions information checked on ${d.metadata.officialInformationChecked}. Follow the current programme and funding pages for formal requirements and decisions.`), el('div', { class: 'op-source-links' }, d.sources.map(source => link(`${source.label} ↗`, source.url)))])
      ]);
    };
  }
};
