import { r as ref, o as onMounted, w as watch } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261101d.js';
import { node as el, route, link, eyebrow, heading, figure, glyph, focusHash } from './ResearchUI.20261101d.js';

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
            el('div', { class: 'rd-actions' }, [link('Explore the research ↓', '#application-focus', 'rd-button rd-light'), link('Representative work ↓', '#application-work', 'rd-button rd-outline')])
          ]),
          figure(app.image, app.alt, app.caption, `rd-app-hero-figure rd-app-figure-${app.visualStyle || 'cover'}`, true)
        ])),
        el('nav', { class: 'rd-subnav rd-app-switcher', 'aria-label': 'Research applications' }, el('div', { class: 'rd-container' }, [
          link('All research', `${route}/research/`),
          ...applications.map(item => link(item.shortTitle, applicationUrl(item), item.slug === app.slug ? 'is-current' : '', item.slug === app.slug ? { 'aria-current': 'page' } : {}))
        ])),
        el('section', { class: 'rd-section rd-container', 'aria-labelledby': 'application-question' }, [
          heading('THE APPLICATION', app.question, app.introduction, 'application-question'),
          el('div', { class: 'rd-app-connection' }, [el('h3', null, 'How this connects to our vision'), el('p', null, app.connection)]),
          el('div', { class: 'rd-app-method-grid', 'aria-label': 'Connections to the research themes' }, app.methods.map((method, index) => link([
            glyph(index), el('h3', null, method.label), el('p', null, method.description), el('span', { class: 'rd-text-link' }, 'Explore the theme →')
          ], `${route}/research/#${method.id}`, 'rd-app-method')))
        ]),
        el('section', { class: 'rd-paper-section rd-section', id: 'application-focus', 'aria-labelledby': 'application-focus-title' }, el('div', { class: 'rd-container' }, [
          heading('RESEARCH FOCUS', 'Questions, methods and physical systems.', 'The work connects concrete experimental challenges to sensing, learning, control and robot design.', 'application-focus-title'),
          el('div', { class: 'rd-app-focus-grid' }, app.focusAreas.map((area, index) => el('article', { class: 'rd-app-focus-card' }, [
            el('span', { class: 'rd-number' }, `0${index + 1}`), el('h3', null, area.title), el('p', null, area.description),
            el('ul', { class: 'rd-app-method-list' }, area.methods.map(item => el('li', null, item))),
            el('div', { class: 'rd-app-focus-evidence' }, [el('p', null, 'RELATED WORK'), ...area.evidence.map(item => link(`${item.label} ↗`, item.url))])
          ]))),
          app.supportFigure ? el('div', { class: 'rd-app-platform' }, [
            figure(app.supportFigure.image, app.supportFigure.alt, app.supportFigure.caption, 'rd-app-platform-figure'),
            el('div', null, [eyebrow('THE EXPERIMENTAL PLATFORM'), el('h3', null, app.supportFigure.title), el('p', null, app.supportFigure.description)])
          ]) : null,
          app.workflow ? el('figure', { class: 'rd-app-workflow', 'aria-labelledby': 'workflow-title' }, [
            el('h3', { id: 'workflow-title' }, app.workflow.title),
            el('ol', { class: 'rd-app-workflow-steps' }, app.workflow.steps.map((step, index) => el('li', null, [el('span', { class: 'rd-app-step-number' }, `0${index + 1}`), el('strong', null, step.title), el('p', null, step.text)]))),
            el('figcaption', null, [app.workflow.caption, ' ', link(`${app.workflow.sourceLabel} ↗`, app.workflow.sourceUrl)])
          ]) : null
        ])),
        el('section', { class: 'rd-section rd-container', id: 'application-work', 'aria-labelledby': 'application-work-title' }, [
          heading('REPRESENTATIVE WORK', 'Explore the supporting research.', 'Selected papers connect the application to specific methods and experimental evidence. Preprints and reviews are identified.', 'application-work-title'),
          el('div', { class: 'rd-app-project-grid' }, app.projects.map(projectCard)),
          el('div', { class: 'rd-research-links' }, [link('Browse selected publications →', `${route}/publications`, 'rd-text-link'), link('Meet our researchers →', `${route}/team`, 'rd-text-link')])
        ]),
        el('section', { class: 'rd-app-outlook rd-section', 'aria-labelledby': 'application-outlook-title' }, el('div', { class: 'rd-container' }, [
          eyebrow('EVIDENCE AND NEXT STEPS'), el('div', { class: 'rd-app-outlook-grid' }, [
            el('div', null, [el('h2', { id: 'application-outlook-title' }, 'What the evidence establishes'), el('p', null, app.evidenceNote)]),
            el('div', null, [el('h2', null, 'The next research question'), el('p', null, app.nextDirection)])
          ])
        ])),
        app.resources.length ? el('section', { class: 'rd-section rd-container', 'aria-labelledby': 'application-resources-title' }, [
          heading('OPEN RESOURCES', 'Build on the methods.', 'Code and research materials connected to this application.', 'application-resources-title'),
          el('div', { class: 'rd-resource-grid' }, app.resources.map(resource => link([el('h3', null, `${resource.name} ↗`), el('p', null, resource.description)], resource.url, 'rd-resource-card')))
        ]) : null,
        el('section', { class: 'rd-section rd-app-related', 'aria-labelledby': 'related-applications-title' }, el('div', { class: 'rd-container' }, [
          heading('CONNECTED APPLICATIONS', 'Explore another application.', 'Shared research themes connect these different physical settings.', 'related-applications-title'),
          el('div', { class: 'rd-app-related-grid' }, applications.filter(item => item.slug !== app.slug).map(item => link([
            el('h3', null, item.shortTitle), el('p', null, item.summary), el('span', { class: 'rd-text-link' }, 'Explore the application →')
          ], applicationUrl(item), 'rd-app-related-card'))),
          el('p', { class: 'rd-app-back' }, link('← Back to the research overview', `${route}/research/`, 'rd-text-link'))
        ]))
      ]);
    };
  }
};
