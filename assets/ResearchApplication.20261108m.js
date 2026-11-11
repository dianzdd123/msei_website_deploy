import { r as ref, o as onMounted, w as watch } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261108m.js';
import { node as el, route, link, eyebrow, heading, figure, glyph, focusHash } from './ResearchUI.20261108m.js';
import { researchFigure, researchJoin } from './ResearchFigures.20261108m.js';

const applicationUrl = app => `${route}/research/${app.slug}/`;
const projectCard = project => el('article', { class: 'rd-app-project' }, [
  el('p', { class: 'rd-app-project-meta' }, `${project.venue} · ${project.year}`),
  el('h3', null, link(project.name, project.url)),
  el('p', { class: 'rd-app-project-title' }, project.title),
  el('p', { class: 'rd-app-project-summary' }, project.summary),
  el('div', { class: 'rd-app-project-footer' }, [
    el('span', { class: `rd-app-status${project.status.toLowerCase().includes('preprint') ? ' is-preprint' : ''}` }, project.status),
    el('div', { class: 'rd-app-project-links' }, [
      link('Read paper ↗', project.url),
      project.codeUrl ? link('Code ↗', project.codeUrl) : null,
      project.projectUrl ? link('Project ↗', project.projectUrl) : null
    ])
  ])
]);

export default {
  name: 'ResearchApplication',
  props: { applicationSlug: { type: String, required: true } },
  setup(props) {
    const content = ref(null), failed = ref(false);
    const setTitle = () => {
      const app = content.value?.applications?.find(item => item.slug === props.applicationSlug);
      if (app) document.title = `${app.title} | Research | MSEI Lab`;
    };
    watch(() => props.applicationSlug, () => { setTitle(); focusHash(); });
    onMounted(async () => {
      try {
        content.value = await dataService.getData('/data/research-applications-content.json');
        setTitle();
        focusHash();
      } catch { failed.value = true; }
    });
    return () => {
      if (failed.value) return el('div', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Research applications'), el('p', null, 'This research page could not load. Please refresh to try again.'), link('Back to research', `${route}/research/`, 'rd-text-link')]);
      if (!content.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading the research application…');
      const applications = content.value.applications || [];
      const app = applications.find(item => item.slug === props.applicationSlug);
      if (!app) return el('div', { class: 'rd-container rd-load' }, [el('h1', null, 'Research application not found'), link('Explore our research applications', `${route}/research/#applications`, 'rd-text-link')]);
      return el('div', { class: 'rd-research rd-application' }, [
        el('nav', { class: 'rd-container rd-app-breadcrumb', 'aria-label': 'Breadcrumb' }, [
          link('Home', `${route}/`), el('span', { 'aria-hidden': 'true' }, '/'),
          link('Research', `${route}/research/`), el('span', { 'aria-hidden': 'true' }, '/'),
          el('span', { 'aria-current': 'page' }, app.shortTitle)
        ]),
        el('section', { class: 'rd-app-hero', 'aria-labelledby': 'application-title' }, el('div', { class: 'rd-container rd-app-hero-grid' }, [
          el('div', { class: 'rd-app-hero-copy' }, [
            eyebrow(app.kicker), el('h1', { id: 'application-title' }, app.title),
            el('p', { class: 'rd-app-lead' }, app.lead),
            el('div', { class: 'rd-actions' }, [link('Explore the approach ↓', '#application-focus', 'rd-button rd-light'), link('Representative work ↓', '#application-work', 'rd-button rd-outline')])
          ]),
          figure(app.image, app.alt, app.caption, `rd-app-hero-figure rd-app-figure-${app.visualStyle || 'cover'}`, true)
        ])),
        el('nav', { class: 'rd-subnav rd-app-switcher', 'aria-label': 'Research applications' }, el('div', { class: 'rd-container' }, [
          link('All research', `${route}/research/`),
          ...applications.map(item => link(item.shortTitle, applicationUrl(item), item.slug === app.slug ? 'is-current' : '', item.slug === app.slug ? { 'aria-current': 'page' } : {}))
        ])),
        el('nav', { class: 'rd-reading-guide rd-container', 'aria-label': 'On this application page' }, [
          el('p', null, 'ON THIS PAGE'),
          el('ol', null, [
            ['The problem', '#application-problem'], ['The approach', '#application-focus'], ['The evidence', '#application-work'], ['Next questions', '#application-outlook'], ['Join the research', '#application-join']
          ].map(([label, href], index) => el('li', null, link([el('span', { 'aria-hidden': 'true' }, `0${index + 1}`), label], href))))
        ]),
        el('section', { class: 'rd-section rd-container rd-app-problem', id: 'application-problem', 'aria-labelledby': 'application-question' }, [
          heading('01 / THE APPLICATION CHALLENGE', app.question, app.introduction, 'application-question'),
          el('div', { class: 'rd-app-connection' }, [el('h3', null, 'How this connects to our vision'), el('p', null, app.connection)])
        ]),
        el('section', { class: 'rd-paper-section rd-section', id: 'application-focus', 'aria-labelledby': 'application-focus-title' }, el('div', { class: 'rd-container' }, [
          heading('02 / THE RESEARCH APPROACH', 'Connect observations, decisions and physical interaction.', 'Start with the explanatory figure, then explore the specific questions and methods investigated in the work.', 'application-focus-title'),
          researchFigure(app.approachFigure, 'rd-app-approach-figure'),
          el('div', { class: 'rd-app-focus-grid' }, app.focusAreas.map((area, index) => el('article', { class: 'rd-app-focus-card' }, [
            el('span', { class: 'rd-number' }, `0${index + 1}`), el('h3', null, area.title), el('p', null, area.description),
            el('ul', { class: 'rd-app-method-list' }, area.methods.map(item => el('li', null, item))),
            el('div', { class: 'rd-app-focus-evidence' }, [el('p', null, 'RELATED WORK'), ...area.evidence.map(item => link(`${item.label} ↗`, item.url))])
          ]))),
          app.supportFigure ? el('div', { class: 'rd-app-platform' }, [
            figure(app.supportFigure.image, app.supportFigure.alt, app.supportFigure.caption, 'rd-app-platform-figure'),
            el('div', null, [eyebrow('THE RESEARCH SETTING'), el('h3', null, app.supportFigure.title), el('p', null, app.supportFigure.description)])
          ]) : null,
          el('details', { class: 'rd-app-method-connections' }, [
            el('summary', null, 'Connect this application to the four research themes'),
            el('div', { class: 'rd-app-method-grid', 'aria-label': 'Connections to the research themes' }, app.methods.map((method, index) => link([
              glyph(index), el('h3', null, method.label), el('p', null, method.description), el('span', { class: 'rd-text-link' }, 'Explore the theme →')
            ], `${route}/research/#${method.id}`, 'rd-app-method')))
          ])
        ])),
        el('section', { class: 'rd-section rd-container', id: 'application-work', 'aria-labelledby': 'application-work-title' }, [
          heading('03 / REPRESENTATIVE WORK', 'Trace the approach back to the evidence.', 'Each paper establishes a specific contribution under its own experimental conditions. Preprints and reviews are identified so that the type of evidence is clear.', 'application-work-title'),
          el('aside', { class: 'rd-app-evidence-questions', 'aria-labelledby': 'evidence-reading-title' }, [
            el('h3', { id: 'evidence-reading-title' }, 'Three questions to take into the papers'),
            el('ol', null, (app.evidenceQuestions || []).map(question => el('li', null, question)))
          ]),
          el('div', { class: 'rd-app-project-grid' }, app.projects.map(projectCard)),
          el('div', { class: 'rd-research-links' }, [link('Browse selected publications →', `${route}/publications`, 'rd-text-link'), link('Meet our researchers →', `${route}/team`, 'rd-text-link')])
        ]),
        el('section', { class: 'rd-app-outlook rd-section', id: 'application-outlook', 'aria-labelledby': 'application-outlook-title' }, el('div', { class: 'rd-container' }, [
          eyebrow('04 / WHAT FOLLOWS FROM THE EVIDENCE'),
          el('div', { class: 'rd-app-outlook-grid' }, [
            el('div', null, [el('p', { class: 'rd-app-evidence-tag' }, 'ESTABLISHED SCOPE'), el('h2', { id: 'application-outlook-title' }, 'What the research establishes'), el('p', null, app.evidenceNote)]),
            el('div', null, [el('p', { class: 'rd-app-evidence-tag' }, 'OPEN RESEARCH DIRECTION'), el('h2', null, 'The next research question'), el('p', null, app.nextDirection)])
          ])
        ])),
        app.resources.length ? el('section', { class: 'rd-section rd-container', id: 'application-resources', 'aria-labelledby': 'application-resources-title' }, [
          heading('OPEN RESOURCES', 'Build on the methods.', 'Code and research materials connected to this application.', 'application-resources-title'),
          el('div', { class: 'rd-resource-grid' }, app.resources.map(resource => link([el('h3', null, `${resource.name} ↗`), el('p', null, resource.description)], resource.url, 'rd-resource-card')))
        ]) : null,
        researchJoin('application-join', app.title),
        el('section', { class: 'rd-section rd-app-related', 'aria-labelledby': 'related-applications-title' }, el('div', { class: 'rd-container' }, [
          heading('CONNECTED APPLICATIONS', 'Explore another physical setting.', 'Shared research themes connect these applications; their scales, hardware and validation conditions remain distinct.', 'related-applications-title'),
          el('div', { class: 'rd-app-related-grid' }, applications.filter(item => item.slug !== app.slug).map(item => link([
            el('h3', null, item.shortTitle), el('p', null, item.summary), el('span', { class: 'rd-text-link' }, 'Explore the application →')
          ], applicationUrl(item), 'rd-app-related-card'))),
          el('p', { class: 'rd-app-back' }, link('← Back to the research overview', `${route}/research/`, 'rd-text-link'))
        ]))
      ]);
    };
  }
};
