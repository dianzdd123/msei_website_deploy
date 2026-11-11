import { r as ref, o as onMounted } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261108m.js';
import { node as el, route, link, eyebrow, heading, figure, glyph, focusHash } from './ResearchUI.20261108m.js';
import { researchFigure, researchJoin } from './ResearchFigures.20261108m.js';

const themeEvidence = theme => el('details', { class: 'rd-theme-evidence' }, [
  el('summary', null, `Representative work · ${(theme.evidence || []).length} papers`),
  el('ul', { class: 'rd-evidence-list' }, (theme.evidence || []).map(paper => el('li', null, [
    el('div', { class: 'rd-evidence-top' }, [
      link(`${paper.name} ↗`, paper.url),
      el('span', null, [paper.venue, paper.year, paper.status === 'Preprint' ? 'Preprint' : ''].filter(Boolean).join(' · '))
    ]),
    el('p', null, paper.summary)
  ])))
]);

export default {
  name: 'Research',
  setup() {
    const content = ref(null), applications = ref(null), failed = ref(false);
    onMounted(async () => {
      document.title = 'Research | MSEI Lab | Dandan Zhang';
      try {
        [content.value, applications.value] = await Promise.all([
          dataService.getData('/data/research-content.json'),
          dataService.getData('/data/research-applications-content.json')
        ]);
        focusHash();
      } catch { failed.value = true; }
    });
    return () => {
      if (failed.value) return el('div', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Research'), el('p', null, 'The research page could not load. Please refresh to try again.')]);
      if (!content.value || !applications.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading our research…');
      const s = content.value.sections || {}, vision = s.vision || {}, themes = s.themes || [];
      return el('div', { class: 'rd-research' }, [
        el('section', { class: 'rd-research-hero', 'aria-labelledby': 'research-title' }, el('div', { class: 'rd-container rd-research-hero-grid' }, [
          el('div', null, [
            eyebrow('THE MSEI RESEARCH PROGRAMME'),
            el('h1', { id: 'research-title' }, 'Adaptive physical intelligence.'),
            el('p', { class: 'rd-research-subtitle' }, 'Dexterous manipulation across scales'),
            el('p', { class: 'rd-hero-lede' }, vision.lead),
            el('div', { class: 'rd-actions' }, [link('Explore applications ↓', '#applications', 'rd-button rd-light'), link('Research publications ↗', `${route}/publications`, 'rd-button rd-outline')])
          ]),
          figure('/assets/illustrations/microrobotics-2026c.webp', 'Conceptual optical and magnetic microrobots manipulating small objects in a fluid chamber.', 'Optical and magnetic microrobotics. AI-generated concept artwork; structures and fields are not to scale.', 'rd-research-hero-figure', true)
        ])),
        el('nav', { class: 'rd-subnav', 'aria-label': 'Research page sections' }, el('div', { class: 'rd-container' }, [
          link('Vision', '#research-vision'), link('Applications', '#applications'), link('Methods', '#themes'), link('Evidence', '#platforms'), link('Next questions', '#directions'), link('Join us', '#join-research'), link('Resources', '#resources')
        ])),
        el('section', { class: 'rd-section rd-container rd-vision', id: 'research-vision', 'aria-labelledby': 'research-question' }, [
          heading('01 / THE CONNECTING QUESTION', vision.question, vision.statement, 'research-question'),
          el('div', { class: 'rd-definition' }, [
            el('strong', null, 'What we mean by adaptive physical intelligence'),
            el('p', null, 'The ability to use physical observations and interaction to adjust sensing, learned behaviour, control and, where the task demands it, the robot’s physical design.')
          ]),
          researchFigure(s.figures?.framework, 'rd-framework-figure'),
          vision.directionNote ? el('p', { class: 'rd-direction-note' }, vision.directionNote) : null
        ]),
        el('section', { class: 'rd-application-overview rd-paper-section rd-section', id: 'applications', 'aria-labelledby': 'applications-title' }, el('div', { class: 'rd-container' }, [
          heading('02 / EXPLORE BY APPLICATION', 'Different physical settings. Connected research questions.', 'Begin with the task that interests you. Each application page connects its practical challenge to an approach, representative papers, evidence boundaries and open questions.', 'applications-title'),
          el('div', { class: 'rd-application-grid' }, (applications.value.applications || []).map(app => el('article', { class: 'rd-application-card' }, [
            figure(app.image, app.alt, app.caption, app.visualStyle === 'contain' ? 'rd-application-figure-contained' : ''),
            el('div', { class: 'rd-application-card-copy' }, [
              el('h3', null, link(app.title, `${route}/research/${app.slug}/`)),
              el('p', null, app.summary),
              link('Explore this application →', `${route}/research/${app.slug}/`, 'rd-text-link')
            ])
          ])))
        ])),
        el('section', { class: 'rd-section rd-container', id: 'themes', 'aria-labelledby': 'themes-title' }, [
          heading('03 / CROSS-CUTTING METHODS', 'Four questions that connect the applications.', 'These research themes explain how we approach the physical tasks above. Open each evidence panel to connect the methods to specific papers and experimental results.', 'themes-title'),
          el('div', { class: 'rd-theme-details' }, themes.map((theme, index) => el('article', { class: 'rd-theme-detail', id: theme.id, 'aria-labelledby': `${theme.id}-title` }, [
            el('div', { class: 'rd-theme-detail-title' }, [
              el('span', { class: 'rd-number' }, `0${index + 1}`), glyph(index),
              el('h3', { id: `${theme.id}-title` }, theme.title),
              el('p', { class: 'rd-theme-question' }, theme.question)
            ]),
            el('div', { class: 'rd-theme-detail-content' }, [
              el('p', { class: 'rd-theme-description' }, theme.description),
              el('ul', { class: 'rd-method-list', 'aria-label': 'Research methods' }, (theme.methods || []).map(method => el('li', null, method))),
              themeEvidence(theme),
              theme.nextStep ? el('p', { class: 'rd-next-step' }, [el('strong', null, 'Next question. '), theme.nextStep]) : null
            ])
          ])))
        ]),
        el('section', { class: 'rd-paper-section rd-section', id: 'platforms', 'aria-labelledby': 'platforms-title' }, el('div', { class: 'rd-container' }, [
          heading('04 / RESEARCH AND EVIDENCE', 'Make the physical setting part of the explanation.', 'Sensors, robot bodies, actuation and operators change what a method can observe and achieve. The platforms below provide complementary tests; results remain specific to the conditions of each study.', 'platforms-title'),
          el('div', { class: 'rd-platform-grid' }, (s.platforms || []).map(platform => el('article', { class: 'rd-platform', id: platform.id }, [
            figure(platform.image, platform.alt, platform.caption),
            el('div', { class: 'rd-platform-copy' }, [
              el('h3', null, platform.title), el('p', null, platform.description),
              el('ul', null, (platform.examples || []).map(example => el('li', null, example)))
            ])
          ]))),
          researchFigure(s.figures?.evidence, 'rd-evidence-guide'),
          el('div', { class: 'rd-evidence-reading' }, [
            el('h3', null, 'Start with a representative paper'),
            el('div', { class: 'rd-evidence-reading-grid' }, (s.featuredWork || []).map(paper => link([
              el('span', { class: 'rd-evidence-reading-meta' }, `${paper.venue} · ${paper.year}`),
              el('strong', null, `${paper.name} ↗`),
              el('span', null, paper.theme)
            ], paper.url, 'rd-evidence-reading-card')))
          ])
        ])),
        el('section', { class: 'rd-directions rd-section', id: 'directions', 'aria-labelledby': 'directions-title' }, el('div', { class: 'rd-container' }, [
          heading('05 / LOOKING AHEAD', 'From today’s evidence to the next research question.', 'These longer-term directions build on the methods and studies above. They identify work to investigate, rather than completed general-purpose capabilities.', 'directions-title'),
          el('div', { class: 'rd-direction-grid' }, (s.nextDirections || []).map((direction, index) => el('article', null, [
            el('span', { class: 'rd-number' }, `0${index + 1}`), el('h3', null, direction.title), el('p', null, direction.description)
          ])))
        ])),
        researchJoin(),
        el('section', { class: 'rd-section rd-container', id: 'resources', 'aria-labelledby': 'resources-title' }, [
          heading('OPEN RESEARCH', 'Explore, reproduce and build on the work.', 'Public repositories, datasets and project materials linked to the research.', 'resources-title'),
          el('div', { class: 'rd-resource-grid' }, (s.openResources || []).map(resource => link([
            el('h3', null, [resource.name, el('span', { 'aria-hidden': 'true' }, ' ↗')]), el('p', null, resource.description)
          ], resource.url, 'rd-resource-card'))),
          el('div', { class: 'rd-research-links' }, [
            link('Explore publications →', `${route}/publications`, 'rd-text-link'),
            link('Meet our researchers →', `${route}/team`, 'rd-text-link'),
            link('Discuss a collaboration →', 'mailto:d.zhang17@imperial.ac.uk', 'rd-text-link')
          ]),
          el('details', { class: 'rd-source-details' }, [
            el('summary', null, 'Research sources and publication records'),
            el('ul', null, (s.sources || []).map(source => el('li', null, link(source.label, source.url))))
          ])
        ])
      ]);
    };
  }
};
