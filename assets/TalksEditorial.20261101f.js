import { r as ref, o as onMounted } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261101f.js';
import { node as el, route, link, eyebrow, heading, focusHash } from './ResearchUI.20261101f.js';

const figureLabel = kind => kind === 'event' ? 'Event programme' : kind === 'diagram' ? 'Research context diagram' : 'Research topic illustration';
const dateLabel = value => value ? new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}-01T12:00:00Z`)) : '';
const topicFigure = (figure, title, eager = false, hero = false) => {
  if (!figure) return null;
  const open = (src, className) => link('Open figure ↗', src, className, { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Open figure for ${title}` });
  return el('figure', { class: `${hero ? 'tk-hero-figure' : 'tk-card-figure'}${figure.fit === 'contain' ? ' tk-figure-contained' : ''}`, 'data-kind': figure.kind }, [
    el('picture', null, [
      figure.mobileSrc ? el('source', { media: '(max-width: 650px)', srcset: figure.mobileSrc }) : null,
      el('img', { src: figure.src, alt: figure.alt, loading: eager ? 'eager' : 'lazy', decoding: 'async', width: figure.kind === 'diagram' ? 1280 : 1672, height: figure.kind === 'diagram' ? 800 : 941, ...(eager ? { fetchpriority: 'high' } : {}) })
    ]),
    el('figcaption', null, [el('span', null, figure.caption), el('span', { class: 'tk-figure-links' }, [open(figure.src, figure.mobileSrc ? 'tk-figure-desktop-link' : ''), figure.mobileSrc ? open(figure.mobileSrc, 'tk-figure-mobile-link') : null])])
  ]);
};

export default {
  name: 'TalksEditorial',
  setup() {
    const content = ref(null), failed = ref(false), search = ref(''), year = ref('all'), topic = ref('all');
    const reset = () => { search.value = ''; year.value = 'all'; topic.value = 'all'; };
    onMounted(async () => {
      document.title = 'Invited talks | MSEI Lab | Dandan Zhang';
      try { content.value = await dataService.getData('/data/talks-content.json'); focusHash(); }
      catch { failed.value = true; }
    });
    return () => {
      if (failed.value) return el('div', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Invited talks'), el('p', null, 'The talk archive could not load. Please refresh to try again.')]);
      if (!content.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading invited talks…');
      const d = content.value, topics = d.topics || [];
      const talks = (d.sections?.['invitedtalks&presentations']?.subsections || []).map(item => item.data).filter(Boolean).sort((a, b) => (b.time || '').localeCompare(a.time || ''));
      const years = [...new Set(talks.map(talk => talk.time?.slice(0, 4)).filter(Boolean))].sort((a, b) => b.localeCompare(a));
      const query = search.value.trim().toLocaleLowerCase();
      const filtered = talks.filter(talk => (year.value === 'all' || talk.time?.startsWith(year.value)) && (topic.value === 'all' || talk.topicId === topic.value) && (!query || [talk.title, talk.organizer, talk.location, topics.find(item => item.id === talk.topicId)?.title].join(' ').toLocaleLowerCase().includes(query)));
      const displayedYears = years.filter(value => filtered.some(talk => talk.time?.startsWith(value)));
      const filtersActive = !!query || year.value !== 'all' || topic.value !== 'all';
      return el('div', { class: 'rd-research tk-page' }, [
        el('section', { class: 'tk-hero', 'aria-labelledby': 'talks-title' }, el('div', { class: 'rd-container tk-hero-grid' }, [
          el('div', { class: 'tk-hero-copy' }, [
            eyebrow('RESEARCH IN CONVERSATION'),
            el('h1', { id: 'talks-title' }, 'Invited talks & presentations.'),
            el('p', { class: 'tk-lead' }, d.metadata.description),
            el('div', { class: 'rd-actions' }, [link('Browse the talks ↓', '#talk-archive', 'rd-button rd-light'), link('Explore publications →', `${route}/publications/`, 'rd-button rd-outline')]),
            el('p', { class: 'tk-hero-note' }, 'From tactile interaction to precision manipulation and optical or magnetic microrobotics.')
          ]),
          topicFigure(d.heroFigure, 'Dexterity across scales', true, true)
        ])),
        el('nav', { class: 'rd-subnav', 'aria-label': 'Invited talks sections' }, el('div', { class: 'rd-container' }, [link('Talk archive', '#talk-archive'), ...displayedYears.map(value => link(value, `#talks-${value}`)), link('Research connections', '#talk-connections')])),
        el('section', { class: 'rd-section rd-container tk-archive', id: 'talk-archive', 'aria-labelledby': 'talk-archive-title' }, [
          heading('SELECTED INVITED TALKS', 'Ideas shared across research communities.', 'Browse by year, topic or host institution. Each entry connects the talk title to related research, with event material or a labelled topic illustration.', 'talk-archive-title'),
          el('div', { class: 'tk-filters', role: 'search', 'aria-label': 'Filter invited talks' }, [
            el('div', { class: 'tk-search-field' }, [el('label', { for: 'talk-search' }, 'Search talks'), el('input', { id: 'talk-search', type: 'search', value: search.value, placeholder: 'Title, host or location', onInput: event => { search.value = event.target.value; }, autocomplete: 'off' })]),
            el('div', null, [el('label', { for: 'talk-year' }, 'Year'), el('select', { id: 'talk-year', value: year.value, onChange: event => { year.value = event.target.value; } }, [el('option', { value: 'all' }, 'All years'), ...years.map(value => el('option', { value }, value))])]),
            el('div', { class: 'tk-topic-field' }, [el('label', { for: 'talk-topic' }, 'Topic'), el('select', { id: 'talk-topic', value: topic.value, onChange: event => { topic.value = event.target.value; } }, [el('option', { value: 'all' }, 'All topics'), ...topics.map(item => el('option', { value: item.id }, item.title))])]),
            el('button', { type: 'button', class: 'tk-reset', onClick: reset, disabled: !filtersActive }, 'Clear filters')
          ]),
          el('div', { class: 'tk-results-status' }, [el('p', { role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' }, `${filtered.length} ${filtered.length === 1 ? 'talk' : 'talks'}${filtersActive ? ` of ${talks.length}` : ''} shown`), el('p', null, 'Newest first within each year')]),
          filtered.length ? el('div', { class: 'tk-year-groups' }, displayedYears.map(value => el('section', { class: 'tk-year-group', id: `talks-${value}`, 'aria-labelledby': `talks-year-${value}` }, [
            el('div', { class: 'tk-year-heading' }, [el('h2', { id: `talks-year-${value}` }, value), el('span', null, `${filtered.filter(talk => talk.time?.startsWith(value)).length} ${filtered.filter(talk => talk.time?.startsWith(value)).length === 1 ? 'talk' : 'talks'}`)]),
            el('div', { class: 'tk-talk-grid' }, filtered.filter(talk => talk.time?.startsWith(value)).map(talk => el('article', { class: 'tk-talk-card', id: `talk-${talk.id}`, 'aria-labelledby': `talk-title-${talk.id}` }, [
              el('div', { class: 'tk-card-visual' }, [topicFigure(talk.figure, talk.title), el('span', { class: `tk-figure-label tk-figure-label-${talk.figure?.kind || 'concept'}` }, figureLabel(talk.figure?.kind))]),
              el('div', { class: 'tk-card-copy' }, [
                el('p', { class: 'tk-card-meta' }, [el('time', { datetime: talk.time }, dateLabel(talk.time)), el('span', { 'aria-hidden': 'true' }, ' · '), el('span', null, talk.location)]),
                el('h3', { id: `talk-title-${talk.id}` }, talk.title),
                el('p', { class: 'tk-host' }, talk.organizer),
                el('span', { class: 'tk-topic-badge' }, topics.find(item => item.id === talk.topicId)?.shortTitle || 'Research talk'),
                el('div', { class: 'tk-research-connection' }, [el('p', { class: 'tk-connection-label' }, 'Research connection'), el('p', null, talk.researchConnection)]),
                el('div', { class: 'tk-card-links' }, (talk.relatedLinks || []).map(item => link(`${item.label} →`, item.url, 'rd-text-link')))
              ])
            ])))
          ]))) : el('div', { class: 'tk-empty', role: 'status' }, [el('h2', null, 'No talks match these filters.'), el('p', null, 'Try another title, institution, location or topic.'), el('button', { type: 'button', class: 'tk-reset', onClick: reset }, 'Show all talks')])
        ]),
        el('section', { class: 'rd-section tk-connections', id: 'talk-connections', 'aria-labelledby': 'talk-connections-title' }, el('div', { class: 'rd-container tk-connections-grid' }, [
          el('div', null, [eyebrow('FOLLOW THE RESEARCH'), el('h2', { id: 'talk-connections-title' }, 'Explore the work behind the conversation.'), el('p', null, 'Read the research themes, examine representative papers and find the application area that connects with your interests.')]),
          el('div', { class: 'tk-connections-links' }, [link('Research themes and applications →', `${route}/research/`), link('Publications grouped by theme →', `${route}/publications/`), link('Contact Dandan Zhang ↗', 'mailto:d.zhang17@imperial.ac.uk')])
        ]))
      ]);
    };
  }
};
