import { r as ref, o as onMounted, J as el } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261108m.js';

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
      item.url ? sourceLink(item.url, item.sourceLabel || 'Official page') : null
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

function featuredEvents(events) {
  if (!events?.length) return null;
  return el('section', { class: 'ts-section ts-service-featured', id: 'services-figures' }, [
    title('Selected conference and workshop service'),
    paragraph('Original organisers’ graphics and programme material, rather than lab group photographs. Each record links to the event source.', 'ts-meta'),
    el('div', { class: 'ts-service-figure-grid' }, events.map(item =>
      el('article', { class: 'ts-service-figure-card', key: item.title }, [
        el('a', { class: 'ts-service-figure-image', href: item.links?.[0]?.url || '#services-leadership', target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'View official source for ' + item.title }, [
          el('img', { src: item.image.src, alt: item.image.alt, loading: 'lazy', decoding: 'async', class: item.image.fit === 'contain' ? 'ts-fit-contain' : 'ts-fit-cover' })
        ]),
        el('div', { class: 'ts-service-figure-body' }, [
          paragraph(item.eyebrow, 'ts-service-figure-eyebrow'),
          el('h3', { class: 'ts-service-figure-title' }, item.title),
          paragraph(item.role, 'ts-role'),
          paragraph(item.description),
          paragraph(item.image.caption, 'ts-service-figure-credit'),
          el('div', { class: 'ts-service-figure-links' }, (item.links || []).map(link => sourceLink(link.url, link.label)))
        ])
      ])
    ))
  ]);
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
          ['services-figures', 'Events & figures'], ['services-leadership', 'Leadership'], ['services-community', 'Recent activity'], ['services-editorial', 'Editorial'], ['services-review', 'Peer & grant review'],
          ['services-examining', 'Examination'], ['services-institutional', 'Institutional'], ['services-outreach', 'Engagement']
        ].map(([id, text]) => el('a', { href: '#' + id }, text))),
        featuredEvents(d.featuredFigures),
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
        el('section', { class: 'ts-section', id: 'services-community' }, [
          title(s.communityactivities.title), paragraph(s.communityactivities.description, 'ts-meta'), serviceList(s.communityactivities)
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
          serviceList(s.outreach),
          title(s.openresearch.title, 'h3'),
          el('div', { class: 'ts-theme-grid' }, entries(s.openresearch).map(item => el('article', { class: 'ts-theme' }, [
            el('h4', { class: 'ts-card-title' }, item.name), paragraph(item.description)
          ]))),
          el('div', { class: 'ts-links' }, [
            el('a', { href: '/msei_website/talks', class: 'ts-link' }, 'Invited talks & seminars'),
            el('a', { href: '/msei_website/publications', class: 'ts-link' }, 'Selected publications'),
            el('a', { href: '#services-figures', class: 'ts-link' }, 'Conference and workshop figures')
          ])
        ]),
        el('footer', { class: 'ts-page-footer' }, [
          paragraph('Academic record reviewed 30 October 2026, with public event evidence updated 8 November 2026. Proposals and nominations retain their stated status.', 'ts-meta'),
          sourceLink('https://profiles.imperial.ac.uk/d.zhang17', 'Imperial profile')
        ])
      ]);
    };
  }
};
