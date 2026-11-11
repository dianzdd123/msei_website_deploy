import { r as ref, o as onMounted, J as el } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261101c.js';

// Plain Vue render functions keep this deployed-only repository editable.
const paragraph = (text, className = 'ts-copy') => el('p', { class: className }, text);
const external = (url) => /^https?:\/\//.test(url);
const link = (item) => el('a', {
  href: item.url,
  class: 'ts-link',
  ...(external(item.url) ? { target: '_blank', rel: 'noopener noreferrer' } : {})
}, item.label);
const links = (items = []) => el('div', { class: 'ts-links' }, items.map(link));
const heading = (title, level = 'h2') => el(level, { class: 'ts-section-title' }, title);
const entries = (section) => (section?.subsections || []).map(item => item.data);
const badge = (text, tone = '') => el('span', { class: ['ts-badge', tone].filter(Boolean).join(' ') }, text);

function courseCard(course) {
  return el('article', { class: 'ts-course', key: course.name }, [
    el('div', { class: 'ts-course-top' }, [
      course.code ? el('span', { class: 'ts-course-code' }, course.code) : null,
      course.status ? badge(course.status, course.status === 'Current' ? 'ts-badge-current' : '') : null
    ].filter(Boolean)),
    el('h3', { class: 'ts-card-title' }, course.name),
    paragraph(course.role, 'ts-role'),
    paragraph([course.period, course.audience].filter(Boolean).join(' · '), 'ts-meta'),
    paragraph(course.description),
    course.details?.length ? el('ul', { class: 'ts-list ts-course-details' }, course.details.map(detail => el('li', null, detail))) : null,
    course.links?.length ? links(course.links) : null
  ].filter(Boolean));
}

export default {
  name: 'Teaching',
  setup() {
    const data = ref(null);
    const failure = ref(false);
    async function load() {
      failure.value = false;
      try {
        const result = await dataService.getData('/data/teaching-content.json');
        if (!result?.sections) throw new Error('Missing teaching content');
        data.value = result;
      } catch (_) { failure.value = true; }
    }
    onMounted(load);

    return () => {
      if (failure.value) return el('section', { class: 'ts-page' }, [
        el('h1', { class: 'ts-page-title' }, 'Teaching & Supervision'),
        paragraph('The teaching content could not be loaded. Please try again.', 'ts-error'),
        el('button', { type: 'button', class: 'ts-retry', onClick: load }, 'Try again')
      ]);
      if (!data.value) return el('section', { class: 'ts-page', 'aria-busy': 'true' }, [
        el('h1', { class: 'ts-page-title' }, 'Teaching & Supervision'),
        el('p', { role: 'status', class: 'ts-meta' }, 'Loading teaching information…')
      ]);

      const d = data.value, s = d.sections, learning = s.learning, sup = s.supervision;
      return el('div', { class: 'ts-page ts-teaching' }, [
        el('header', { class: 'ts-page-header' }, [
          paragraph('EDUCATION & RESEARCHER DEVELOPMENT', 'ts-eyebrow'),
          el('h1', { class: 'ts-page-title' }, d.metadata.title),
          paragraph(d.intro, 'ts-intro'),
          el('div', { class: 'ts-credentials' }, d.credentials.map(item => el('div', { class: 'ts-credential' }, [
            el('strong', null, item.label), el('span', null, item.detail)
          ])))
        ]),
        el('nav', { class: 'ts-nav', 'aria-label': 'Teaching page sections' }, [
          ['teach-imperial', 'Imperial teaching'], ['teach-learning', 'Learning approach'],
          ['teach-supervision', 'Supervision'], ['teach-advising', 'Advising'], ['teach-bristol', 'Bristol teaching']
        ].map(([id, text]) => el('a', { href: '#' + id }, text))),
        el('figure', { class: 'ts-hero-figure' }, [
          el('img', { src: d.illustration.src, alt: d.illustration.alt, width: 1672, height: 941, decoding: 'async', loading: 'eager' }),
          el('figcaption', null, [d.illustration.caption, el('span', { class: 'ts-image-credit' }, d.illustration.credit)])
        ]),
        el('section', { class: 'ts-section', id: 'teach-imperial' }, [
          heading(s.currentteaching.title),
          el('div', { class: 'ts-course-grid' }, entries(s.currentteaching).map(courseCard))
        ]),
        el('section', { class: 'ts-section', id: 'teach-learning' }, [
          heading(learning.title), paragraph(learning.description),
          el('figure', { class: 'ts-process-figure' }, [
            el('ol', { class: 'ts-process' }, learning.steps.map((step, index) => el('li', { class: 'ts-process-step' }, [
              el('span', { class: 'ts-step-number', 'aria-hidden': 'true' }, String(index + 1).padStart(2, '0')),
              el('h3', null, step.title), paragraph(step.description),
              el('strong', { class: 'ts-step-outcome' }, step.detail)
            ]))),
            el('figcaption', null, 'A learning sequence from an intuitive explanation to an experiment that can be evaluated and reproduced.')
          ]),
          el('div', { class: 'ts-theme-grid' }, learning.themes.map(theme => el('article', { class: 'ts-theme' }, [
            el('h3', { class: 'ts-card-title' }, theme.name), paragraph(theme.description)
          ]))),
          el('aside', { class: 'ts-development' }, [
            badge('In development'), el('h3', { class: 'ts-card-title' }, learning.development.title), paragraph(learning.development.description)
          ])
        ]),
        el('section', { class: 'ts-section', id: 'teach-supervision' }, [
          heading(sup.title),
          paragraph('Supervision record as of ' + sup.asOf + '. Totals include lead and co-supervision across institutions.', 'ts-meta'),
          el('dl', { class: 'ts-stats' }, sup.stats.map(stat => el('div', { class: 'ts-stat' }, [
            el('dt', null, stat.label), el('dd', { class: 'ts-stat-number' }, stat.value), el('dd', { class: 'ts-stat-detail' }, stat.detail)
          ]))),
          paragraph(sup.description),
          el('ul', { class: 'ts-tags', 'aria-label': 'Supervision research areas' }, sup.researchAreas.map(area => el('li', null, area))),
          el('h3', { class: 'ts-subheading' }, 'Master’s research leading to ICRA 2026 papers'),
          paragraph(sup.projectsNote),
          el('div', { class: 'ts-project-grid' }, sup.projects.map(project => el('article', { class: 'ts-project' }, [
            el('h4', { class: 'ts-card-title' }, project.name), paragraph(project.researcher, 'ts-meta'), paragraph(project.description)
          ]))),
          el('details', { class: 'ts-details' }, [
            el('summary', null, 'Selected student and researcher achievements'),
            el('ul', { class: 'ts-record-list' }, sup.achievements.map(item => el('li', null, [
              el('span', { class: 'ts-record-year' }, item.year),
              el('div', null, [el('strong', null, item.name), paragraph(item.description)])
            ])))
          ]),
          links(sup.links)
        ]),
        el('section', { class: 'ts-section', id: 'teach-advising' }, [
          heading(s.advising.title),
          el('ul', { class: 'ts-record-list' }, entries(s.advising).map(item => el('li', null, [
            el('span', { class: 'ts-record-year' }, item.period),
            el('div', null, [el('h3', { class: 'ts-card-title' }, item.name), paragraph(item.institution + ' · ' + item.role, 'ts-meta')])
          ])))
        ]),
        el('section', { class: 'ts-section', id: 'teach-bristol' }, [
          heading(s.pastteaching.title),
          el('div', { class: 'ts-course-grid ts-course-grid-past' }, entries(s.pastteaching).map(courseCard))
        ]),
        el('footer', { class: 'ts-page-footer' }, [
          paragraph('Academic record updated 1 November 2026. Historical delivery figures are labelled by academic year.', 'ts-meta'),
          links([{ label: 'Imperial profile', url: 'https://profiles.imperial.ac.uk/d.zhang17' }, { label: 'Teaching activities', url: 'https://www.intelligentrobotics-acrossscales.com/teaching' }])
        ])
      ]);
    };
  }
};
