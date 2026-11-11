import { r as ref, o as onMounted } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261101g.js';
import { node as el, link, focusHash } from './ResearchUI.20261101g.js';

const dateLabel = value => value ? new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}-01T12:00:00Z`)) : '';

export default {
  name: 'TalksEditorial',
  setup() {
    const content = ref(null), failed = ref(false);
    onMounted(async () => {
      document.title = 'Invited talks | MSEI Lab | Dandan Zhang';
      try { content.value = await dataService.getData('/data/talks-content.json'); focusHash(); }
      catch { failed.value = true; }
    });
    return () => {
      if (failed.value) return el('div', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Invited talks'), el('p', null, 'The talk archive could not load. Please refresh to try again.')]);
      if (!content.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading invited talks…');
      const d = content.value;
      const talks = (d.sections?.['invitedtalks&presentations']?.subsections || []).map(item => item.data).filter(Boolean).sort((a, b) => (b.time || '').localeCompare(a.time || ''));
      const years = [...new Set(talks.map(talk => talk.time?.slice(0, 4)).filter(Boolean))].sort((a, b) => b.localeCompare(a));
      return el('div', { class: 'rd-research tk-page tk-compact' }, el('div', { class: 'rd-container tk-container' }, [
        el('header', { class: 'tk-page-heading' }, [
          el('h1', { id: 'talks-title' }, 'Invited Talks & Presentations'),
          el('p', null, 'Invited talks at conferences, workshops and universities.')
        ]),
        el('nav', { class: 'tk-year-nav', 'aria-label': 'Talks by year' }, years.map(year => link(year, `#talks-${year}`))),
        ...years.map(year => el('section', { class: 'tk-year', id: `talks-${year}`, 'aria-labelledby': `talks-year-${year}` }, [
          el('h2', { id: `talks-year-${year}` }, year),
          el('div', { class: 'tk-talk-list' }, talks.filter(talk => talk.time?.startsWith(year)).map(talk => el('article', { class: `tk-talk-row${talk.image ? ' tk-has-thumbnail' : ''}`, id: `talk-${talk.id}`, 'aria-labelledby': `talk-title-${talk.id}` }, [
            el('div', { class: 'tk-talk-copy' }, [
              el('h3', { id: `talk-title-${talk.id}` }, talk.title),
              el('p', { class: 'tk-talk-venue' }, talk.organizer),
              el('p', { class: 'tk-talk-meta' }, [el('time', { datetime: talk.time }, dateLabel(talk.time)), el('span', { 'aria-hidden': 'true' }, ' · '), el('span', null, talk.location)])
            ]),
            talk.image ? el('figure', { class: 'tk-event-thumbnail' }, [
              link(el('img', { src: talk.image, alt: talk.imageAlt || `${talk.organizer} programme`, width: 602, height: 421, loading: 'lazy', decoding: 'async' }), talk.image, '', { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Open the ${talk.organizer} programme` }),
              el('figcaption', null, 'Programme ↗')
            ]) : null
          ])))
        ]))
      ]));
    };
  }
};
