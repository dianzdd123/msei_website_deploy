import { r as ref, o as onMounted } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261109d.js';
import { node as el, link, route, eyebrow, heading, focusHash } from './ResearchUI.20261109d.js';
import { researchJoin } from './ResearchFigures.20261109d.js';

const badge = text => el('span', { class: `mr-badge${text.toLowerCase().includes('preprint') ? ' mr-preprint' : ''}` }, text);
const sectionNav = [
  ['Overview', '#micro-overview'],
  ['Optical manipulation', '#optical-manipulation'],
  ['Microscopy & learning', '#microscopy-perception'],
  ['Magnetic systems', '#magnetic-intelligence'],
  ['Platforms', '#micro-platforms'],
  ['Reviews', '#micro-reviews'],
  ['Code & data', '#micro-resources']
];

export default {
  name: 'MicroroboticsResearch',
  setup() {
    const content = ref(null), failed = ref(false), selected = ref(null), dialog = ref(null);
    let lastTrigger = null;
    const openFigure = (figure, event) => {
      lastTrigger = event.currentTarget;
      selected.value = figure;
      requestAnimationFrame(() => {
        if (dialog.value && !dialog.value.open) dialog.value.showModal();
      });
    };
    const closeFigure = () => dialog.value?.close();
    const restoreFocus = () => {
      selected.value = null;
      lastTrigger?.focus({ preventScroll: true });
    };
    const credits = fig => el('span', { class: 'mr-figure-credit' }, [
      fig.credit || '',
      fig.sourceUrl ? link('Figure source ↗', fig.sourceUrl) : null,
      fig.licenseUrl ? link(fig.licenseLabel || 'Licence', fig.licenseUrl) : null
    ]);
    const scientificFigure = (fig, { eager = false, compact = false } = {}) => el('figure', { class: `mr-figure${compact ? ' mr-figure-compact' : ''}` }, [
      el('button', { type: 'button', class: 'mr-image-button', 'aria-label': `Enlarge original figure: ${fig.title}`, 'aria-haspopup': 'dialog', onClick: event => openFigure(fig, event) }, [
        el('img', { src: fig.src, alt: fig.alt, width: fig.width, height: fig.height, loading: eager ? 'eager' : 'lazy', decoding: 'async', ...(eager ? { fetchpriority: 'high' } : {}) }),
        el('span', { class: 'mr-enlarge', 'aria-hidden': 'true' }, 'View full figure ↗')
      ]),
      el('figcaption', null, [el('span', null, fig.caption), credits(fig)])
    ]);
    const projectCard = project => el('article', { class: 'mr-project', id: project.id, 'aria-labelledby': `${project.id}-title` }, [
      scientificFigure(project.figure),
      el('div', { class: 'mr-project-copy' }, [
        el('div', { class: 'mr-meta' }, [badge(project.status), el('span', null, `${project.venue} · ${project.year}`)]),
        el('h3', { id: `${project.id}-title` }, project.name),
        el('p', { class: 'mr-question' }, project.question),
        el('dl', { class: 'mr-project-detail' }, [
          el('dt', null, 'Approach'), el('dd', null, project.approach),
          el('dt', null, 'Reported evidence'), el('dd', null, project.evidence)
        ]),
        el('p', { class: 'mr-scope' }, [el('strong', null, 'Study scope. '), project.scope]),
        project.extraFigures?.length ? el('details', { class: 'mr-extra-figures' }, [
          el('summary', null, 'Explore the evaluation figure'),
          ...project.extraFigures.map(fig => scientificFigure(fig))
        ]) : null,
        el('details', { class: 'mr-citation' }, [el('summary', null, 'Full paper title and authors'), el('p', null, project.title), el('p', null, project.authors.join(', '))]),
        el('div', { class: 'mr-project-links' }, project.links.map(item => link(`${item.label} ↗`, item.url)))
      ])
    ]);
    onMounted(async () => {
      try {
        content.value = await dataService.getData('/data/microrobotics-content.json');
        document.title = 'Optical and magnetic microrobotics | MSEI Lab';
        focusHash();
      } catch { failed.value = true; }
    });
    return () => {
      if (failed.value) return el('section', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Microrobotics'), el('p', null, 'The project collection could not load. Please refresh to try again.'), link('Research overview', `${route}/research/`)]);
      if (!content.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading microrobotics projects…');
      const data = content.value;
      return el('div', { class: 'rd-research mr-page' }, [
        el('nav', { class: 'rd-container rd-app-breadcrumb', 'aria-label': 'Breadcrumb' }, [link('Home', `${route}/`), el('span', { 'aria-hidden': 'true' }, '/'), link('Research', `${route}/research/`), el('span', { 'aria-hidden': 'true' }, '/'), el('span', { 'aria-current': 'page' }, 'Microrobotics')]),
        el('section', { class: 'mr-hero', 'aria-labelledby': 'micro-title' }, el('div', { class: 'rd-container mr-hero-grid' }, [
          el('div', null, [eyebrow(data.hero.kicker), el('h1', { id: 'micro-title' }, data.hero.title), el('p', { class: 'mr-hero-lead' }, data.hero.lead), el('div', { class: 'rd-actions' }, [link('Explore the projects ↓', '#optical-manipulation', 'rd-button rd-light'), link('Code & datasets ↓', '#micro-resources', 'rd-button rd-outline')]), el('p', { class: 'mr-hero-note' }, 'Robot design · Perception · Learning · Shared autonomy')]),
          scientificFigure(data.hero.figure, { eager: true })
        ])),
        el('nav', { class: 'mr-index', 'aria-label': 'Microrobotics page sections' }, el('div', { class: 'rd-container' }, sectionNav.map(([label, href]) => link(label, href)))),
        el('section', { class: 'rd-section rd-container', id: 'micro-overview', 'aria-labelledby': 'micro-overview-title' }, [
          heading('THE RESEARCH PROGRAMME', data.introduction.title, data.introduction.text, 'micro-overview-title'),
          el('p', { class: 'mr-intro-note' }, data.introduction.note),
          el('div', { class: 'mr-route-grid' }, data.groups.map(group => link([el('span', { class: 'mr-group-number' }, group.number), el('h3', null, group.title), el('p', null, group.description), el('span', { class: 'rd-text-link' }, 'Explore these projects ↓')], `#${group.id}`, 'mr-route-card'))),
          el('details', { class: 'mr-scale-comparison' }, [
            el('summary', null, 'Compare the physical platforms and research questions'),
            el('div', { class: 'mr-table-scroll', role: 'region', 'aria-label': 'Platform comparison', tabindex: '0' }, el('table', null, [
              el('caption', null, 'Related research platforms with different scales, actuation and measurement conditions.'),
              el('thead', null, el('tr', null, ['Platform', 'Actuation', 'Observations', 'Research questions'].map(x => el('th', { scope: 'col' }, x)))),
              el('tbody', null, data.comparison.map(row => el('tr', null, [el('th', { scope: 'row' }, row.platform), el('td', null, row.actuation), el('td', null, row.observations), el('td', null, row.questions)])))
            ]))
          ])
        ]),
        ...data.groups.map(group => el('section', { class: 'mr-project-section rd-section', id: group.id, 'aria-labelledby': `${group.id}-heading` }, el('div', { class: 'rd-container' }, [
          heading(`${group.number} / PROJECTS & EVIDENCE`, group.title, group.description, `${group.id}-heading`),
          el('div', { class: 'mr-project-grid' }, group.projects.map(projectCard)),
          group.id === 'magnetic-intelligence' ? el('article', { class: 'mr-fabrication', id: data.fabrication.id }, [
            el('div', null, [eyebrow('FABRICATION & MAGNETIC FUNCTIONALISATION'), el('h3', null, data.fabrication.title), el('p', { class: 'mr-meta' }, `${data.fabrication.venue} · ${data.fabrication.year}`)]),
            el('div', null, [el('p', null, data.fabrication.description), el('p', { class: 'mr-scope' }, data.fabrication.scope), el('details', { class: 'mr-citation' }, [el('summary', null, 'Full paper title and authors'), el('p', null, data.fabrication.paperTitle), el('p', null, data.fabrication.authors.join(', '))]), link('Read the fabrication study ↗', data.fabrication.url, 'rd-text-link')])
          ]) : null,
          link('Back to page guide ↑', '#micro-overview', 'mr-back-link')
        ]))),
        el('section', { class: 'rd-section rd-container', id: 'micro-platforms', 'aria-labelledby': 'micro-platforms-title' }, [
          heading('04 / APPARATUS & SIMULATION', 'See the experimental and virtual workspaces.', 'Laboratory photographs and project diagrams show how actuation, observation and human interaction come together. Select a figure to inspect its details.', 'micro-platforms-title'),
          el('div', { class: 'mr-platform-grid' }, data.platforms.map(fig => el('article', null, [el('h3', null, fig.title), scientificFigure(fig)])))
        ]),
        el('section', { class: 'mr-reviews rd-section', id: 'micro-reviews', 'aria-labelledby': 'micro-reviews-title' }, el('div', { class: 'rd-container' }, [
          heading('05 / REVIEWS & PERSPECTIVES', 'Place the projects in their wider research context.', 'These papers connect individual methods to broader questions about fabrication, biomedical manipulation, micro-dexterity and embodied intelligence.', 'micro-reviews-title'),
          el('div', { class: 'mr-review-grid' }, data.reviews.map(review => el('article', { class: 'mr-review', id: review.id }, [
            scientificFigure(review.figure, { compact: true }),
            el('div', { class: 'mr-review-copy' }, [el('div', { class: 'mr-meta' }, [badge(review.status), el('span', null, `${review.venue} · ${review.year}`)]), el('h3', null, review.name), el('p', null, review.approach), el('p', { class: 'mr-scope' }, review.scope), el('details', { class: 'mr-citation' }, [el('summary', null, 'Full citation'), el('p', null, review.title), el('p', null, review.authors.join(', '))]), el('div', { class: 'mr-project-links' }, review.links.map(item => link(`${item.label} ↗`, item.url)))])
          ])))
        ])),
        el('section', { class: 'rd-section rd-container', id: 'micro-resources', 'aria-labelledby': 'micro-resources-title' }, [
          heading('06 / REUSE THE RESEARCH', 'Code, data and practical starting points.', 'Primary code links lead to Dandan Zhang’s GitHub copies. Each reuse guide explains the environment, inputs, workflow and validation limits; original authorship remains credited.', 'micro-resources-title'),
          el('div', { class: 'mr-dataset' }, [el('div', null, [eyebrow('OPEN MICROSCOPY DATA'), el('h3', null, data.dataset.title), el('p', null, data.dataset.description)]), el('div', { class: 'mr-project-links' }, [link('Browse the dataset ↗', data.dataset.url), link('Benchmark paper ↗', data.dataset.paperUrl)])]),
          el('div', { class: 'mr-resource-grid' }, data.resources.map(item => el('article', { class: 'mr-resource' }, [el('h3', null, item.name), el('p', null, item.description), el('p', { class: 'mr-scope' }, item.requirements), el('div', { class: 'mr-project-links' }, [link('GitHub ↗', item.url), link('Reuse guide ↗', item.guideUrl)])]))),
          el('p', { class: 'mr-sources-note' }, data.provenanceNote)
        ]),
        el('section', { class: 'mr-outlook rd-section', id: 'micro-outlook', 'aria-labelledby': 'micro-outlook-title' }, el('div', { class: 'rd-container' }, [
          heading('OPEN QUESTIONS', 'Towards adaptive physical intelligence at small scales.', 'These directions connect the projects; they are research questions rather than claims that every platform already has these capabilities.', 'micro-outlook-title'),
          el('div', { class: 'mr-outlook-grid' }, data.outlook.map(item => el('article', null, [el('h3', null, item.title), el('p', null, item.text)])))
        ])),
        researchJoin('micro-join', 'optical and magnetic microrobotics'),
        el('div', { class: 'rd-container mr-end-links' }, [link('← Research overview', `${route}/research/`), link('All publications →', `${route}/publications/`)]),
        el('dialog', { class: 'mr-viewer', ref: dialog, 'aria-labelledby': 'mr-viewer-title', onClose: restoreFocus, onClick: event => { if (event.target === dialog.value) closeFigure(); } }, selected.value ? [
          el('div', { class: 'mr-viewer-inner' }, [
            el('div', { class: 'mr-viewer-heading' }, [el('h2', { id: 'mr-viewer-title' }, selected.value.title), el('button', { type: 'button', class: 'mr-viewer-close', onClick: closeFigure, autofocus: true }, 'Close ×')]),
            el('img', { src: selected.value.src, alt: selected.value.alt, width: selected.value.width, height: selected.value.height }),
            el('p', null, selected.value.caption), credits(selected.value),
            link('Open original-size image in a new tab ↗', selected.value.src, 'rd-text-link', { target: '_blank', rel: 'noopener noreferrer' })
          ])
        ] : [])
      ]);
    };
  }
};
