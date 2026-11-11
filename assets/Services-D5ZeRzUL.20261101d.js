import { r as ref, o as onMounted, J as el } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261101d.js';

const paragraph = (text, className = 'ts-copy') => el('p', { class: className }, text);
const title = (text, tag = 'h2') => el(tag, { class: tag === 'h2' ? 'ts-section-title' : 'ts-subheading' }, text);
const entries = (section) => (section?.subsections || []).map(item => item.data);
const sourceLink = (url, label = 'Official page') => el('a', { href: url, class: 'ts-link', target: '_blank', rel: 'noopener noreferrer' }, label);

function serviceRow(item) {
  return el('li', { class: 'ts-service-row', key: item.name + (item.period || '') }, [
    el('div', { class: 'ts-service-date' }, [
      item.period ? el('span', null, item.period) : null,
      item.status ? el('span', { class: ['ts-badge', /review|Nominated/.test(item.status) ? 'ts-badge-pending' : ''].filter(Boolean).join(' ') }, item.status) : null
    ].filter(Boolean)),
    el('div', { class: 'ts-service-detail' }, [
      item.role ? paragraph(item.role, 'ts-role') : null,
      el('h3', { class: 'ts-card-title' }, item.name),
      item.description ? paragraph(item.description) : null,
      item.url ? sourceLink(item.url) : null
    ].filter(Boolean))
  ]);
}

function serviceList(section) {
  return el('ul', { class: 'ts-service-list' }, entries(section).map(serviceRow));
}

function group(section, level = 'h3') {
  return el('div', { class: 'ts-service-group' }, [
    title(section.title, level),
    section.description ? paragraph(section.description, 'ts-meta') : null,
    serviceList(section)
  ].filter(Boolean));
}

export default {
  name: 'Services',
  setup() {
    const data = ref(null);
    const failure = ref(false);
    async function load() {
      failure.value = false;
      try {
        const result = await dataService.getData('/data/services-content.json');
        if (!result?.sections) throw new Error('Missing service content');
        data.value = result;
      } catch (_) { failure.value = true; }
    }
    onMounted(load);

    return () => {
      if (failure.value) return el('section', { class: 'ts-page' }, [
        el('h1', { class: 'ts-page-title' }, 'Professional Service'),
        paragraph('The service content could not be loaded. Please try again.', 'ts-error'),
        el('button', { type: 'button', class: 'ts-retry', onClick: load }, 'Try again')
      ]);
      if (!data.value) return el('section', { class: 'ts-page', 'aria-busy': 'true' }, [
        el('h1', { class: 'ts-page-title' }, 'Professional Service'),
        el('p', { role: 'status', class: 'ts-meta' }, 'Loading professional service…')
      ]);

      const d = data.value, s = d.sections;
      return el('div', { class: 'ts-page ts-services' }, [
        el('header', { class: 'ts-page-header' }, [
          paragraph('ACADEMIC LEADERSHIP & ENGAGEMENT', 'ts-eyebrow'),
          el('h1', { class: 'ts-page-title' }, d.metadata.title),
          paragraph(d.intro, 'ts-intro')
        ]),
        el('div', { class: 'ts-service-highlights' }, d.highlights.map(item => el('article', { class: 'ts-highlight' }, [
          el('h2', { class: 'ts-card-title' }, item.label), paragraph(item.detail), paragraph(item.period, 'ts-meta'),
          item.url ? sourceLink(item.url) : null
        ].filter(Boolean)))),
        el('nav', { class: 'ts-nav', 'aria-label': 'Service page sections' }, [
          ['services-leadership', 'Leadership'], ['services-editorial', 'Editorial'], ['services-review', 'Peer & grant review'],
          ['services-examining', 'Examination'], ['services-institutional', 'Institutional'], ['services-outreach', 'Engagement']
        ].map(([id, text]) => el('a', { href: '#' + id }, text))),
        el('section', { class: 'ts-section', id: 'services-leadership' }, [
          title(s.leadership.title), serviceList(s.leadership),
          el('div', { class: 'ts-proposal-panel' }, [
            title(s.proposals.title, 'h3'), paragraph(s.proposals.description, 'ts-meta'), serviceList(s.proposals)
          ]),
          el('details', { class: 'ts-details' }, [
            el('summary', null, s.earlierleadership.title + ' · 2022–2025'), serviceList(s.earlierleadership)
          ]),
          group(s.programcommittee)
        ]),
        el('section', { class: 'ts-section', id: 'services-editorial' }, [
          title(s.journaleditorial.title), serviceList(s.journaleditorial)
        ]),
        el('section', { class: 'ts-section', id: 'services-review' }, [
          title('Peer review, grants & fellowships'),
          el('div', { class: 'ts-review-grid' }, ['Journal Reviewer', 'Conference Reviewer'].map(kind => {
            const list = s['journal&conferencereviewer'].subsections.filter(item => item.name === kind);
            return el('details', { class: 'ts-details ts-review-details' }, [
              el('summary', null, (kind === 'Journal Reviewer' ? 'Journal peer review' : 'Conference peer review') + ' · ' + list.length + ' venues'),
              el('ul', { class: 'ts-list ts-review-venues' }, list.map(item => el('li', null, item.data.name)))
            ]);
          })),
          group(s.grantreview)
        ]),
        el('section', { class: 'ts-section', id: 'services-examining' }, [
          title(s.examination.title), serviceList(s.examination),
          el('div', { class: 'ts-nominations' }, [title(s.nominations.title, 'h3'), paragraph(s.nominations.description, 'ts-meta'), serviceList(s.nominations)])
        ]),
        el('section', { class: 'ts-section', id: 'services-institutional' }, [
          title(s.institutional.title), serviceList(s.institutional),
          el('details', { class: 'ts-details' }, [el('summary', null, s.memberships.title), serviceList(s.memberships)])
        ]),
        el('section', { class: 'ts-section', id: 'services-outreach' }, [
          title(s.outreach.title),
          el('figure', { class: 'ts-hero-figure ts-documentary-figure' }, [
            el('img', { src: s.outreach.figure.src, alt: s.outreach.figure.alt, width: 1600, height: 1067, loading: 'lazy', decoding: 'async' }),
            el('figcaption', null, [s.outreach.figure.caption, ' ', sourceLink(s.outreach.figure.source, 'Gallery')])
          ]),
          serviceList(s.outreach),
          title(s.openresearch.title, 'h3'),
          el('div', { class: 'ts-theme-grid' }, entries(s.openresearch).map(item => el('article', { class: 'ts-theme' }, [
            el('h4', { class: 'ts-card-title' }, item.name), paragraph(item.description)
          ]))),
          el('div', { class: 'ts-links' }, [
            el('a', { href: '/msei_website/talks', class: 'ts-link' }, 'Invited talks & seminars'),
            el('a', { href: '/msei_website/publications', class: 'ts-link' }, 'Selected publications'),
            el('a', { href: '/msei_website/group-photo', class: 'ts-link' }, 'Lab photographs')
          ])
        ]),
        el('footer', { class: 'ts-page-footer' }, [
          paragraph('Academic record reviewed 30 October 2026; website updated 1 November 2026. Forthcoming events, proposals and nominations retain their stated status.', 'ts-meta'),
          sourceLink('https://profiles.imperial.ac.uk/d.zhang17', 'Imperial profile')
        ])
      ]);
    };
  }
};
