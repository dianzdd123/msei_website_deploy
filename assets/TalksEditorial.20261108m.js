import { r as ref, o as onMounted } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261108m.js';
import { node as el, link, focusHash } from './ResearchUI.20261108m.js';

const dateLabel = talk => {
  const value = talk.date || talk.time;
  if (!value) return '';
  const exact = /^\d{4}-\d{2}-\d{2}$/.test(value);
  const date = new Date(`${exact ? value : `${value}-01`}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-GB', { ...(exact ? { day: 'numeric' } : {}), month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
};
const pictureFor = talk => talk.thumbnail || (talk.image ? { src: talk.image, alt: talk.imageAlt || `${talk.organizer} programme`, caption: 'Programme', kind: 'programme', width: 602, height: 421 } : null);
const talkRow = talk => {
  const picture = pictureFor(talk);
  const venue = talk.venue || talk.location;
  return el('article', { class: `tk-talk-row${picture ? ' tk-has-thumbnail' : ''}`, id: `talk-${talk.id}`, 'aria-labelledby': `talk-title-${talk.id}` }, [
    el('div', { class: 'tk-talk-copy' }, [
      el('h3', { id: `talk-title-${talk.id}` }, talk.title),
      el('p', { class: 'tk-talk-venue' }, talk.eventUrl ? link(talk.organizer, talk.eventUrl, 'tk-venue-link') : talk.organizer),
      el('p', { class: 'tk-talk-meta' }, [
        el('time', { datetime: talk.date || talk.time }, dateLabel(talk)),
        ...(venue ? [el('span', { 'aria-hidden': 'true' }, ' · '), el('span', null, venue)] : []),
        ...(talk.speakerRole ? [el('span', { class: 'tk-speaker-role' }, talk.speakerRole)] : [])
      ]),
      talk.recordingUrl ? link('Watch talk ↗', talk.recordingUrl, 'tk-recording-link') : null
    ]),
    picture ? el('figure', { class: 'tk-event-thumbnail' }, [
      link(el('img', { src: picture.src, alt: picture.alt || `${talk.organizer} event image`, width: picture.width || 600, height: picture.height || 420, loading: 'lazy', decoding: 'async' }), picture.src, 'tk-thumbnail-link', { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Open the image for ${talk.organizer}` }),
      el('figcaption', null, [
        el('span', { class: 'tk-image-caption' }, picture.caption || 'Event image'),
        picture.credit ? el('span', { class: 'tk-image-credit' }, picture.credit) : null,
        picture.licenseLabel && picture.licenseUrl ? link(picture.licenseLabel, picture.licenseUrl, 'tk-image-license', { title: picture.modification || picture.licenseLabel }) : null,
        picture.sourceUrl ? link('Source ↗', picture.sourceUrl, 'tk-image-source') : null
      ])
    ]) : null
  ]);
};

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
      const talks = (d.sections?.['invitedtalks&presentations']?.subsections || []).map(item => item.data).filter(Boolean).sort((a, b) => (b.date || b.time || '').localeCompare(a.date || a.time || ''));
      const years = [...new Set(talks.map(talk => talk.time?.slice(0, 4)).filter(Boolean))].sort((a, b) => b.localeCompare(a));
      return el('div', { class: 'rd-research tk-page tk-compact' }, el('div', { class: 'rd-container tk-container' }, [
        el('header', { class: 'tk-page-heading' }, [
          el('h1', { id: 'talks-title' }, 'Invited Talks & Presentations'),
          el('p', null, 'Invited talks at conferences, workshops and universities.')
        ]),
        el('nav', { class: 'tk-year-nav', 'aria-label': 'Talks by year' }, years.map(year => link(year, `#talks-${year}`))),
        ...years.map(year => el('section', { class: 'tk-year', id: `talks-${year}`, 'aria-labelledby': `talks-year-${year}` }, [
          el('h2', { id: `talks-year-${year}` }, year),
          el('div', { class: 'tk-talk-list' }, talks.filter(talk => talk.time?.startsWith(year)).map(talkRow))
        ]))
      ]));
    };
  }
};
