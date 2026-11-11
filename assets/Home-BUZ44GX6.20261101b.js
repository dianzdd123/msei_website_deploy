import { r as ref, o as onMounted, J as el } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261101b.js';

const link = (text, href, className = '') => el('a', {
  href, class: className,
  ...(href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})
}, text);
const trustedHTML = (tag, className, html) => el(tag, { class: className, innerHTML: html || '' });
const figure = (photo, className = '') => el('figure', { class: `hp-figure ${className}` }, [
  el('img', { src: photo.src, alt: photo.alt, width: photo.width, height: photo.height, loading: 'lazy', decoding: 'async' }),
  el('figcaption', null, photo.caption)
]);
function newsItem(item) {
  const links = (item.links || []).map(value => {
    const split = value.indexOf(':');
    return split > 0 ? link(value.slice(0, split).trim(), value.slice(split + 1).trim(), 'hp-inline-link') : null;
  }).filter(Boolean);
  return el('li', { class: 'hp-news-item', key: `${item.date}-${item.title || item.summary}` }, [
    el('span', { class: 'hp-news-date' }, item.date),
    el('div', null, [trustedHTML('span', '', item.summary || item.title), ...links])
  ]);
}

export default {
  name: 'Home',
  setup() {
    const content = ref(null);
    const failed = ref(false);
    onMounted(async () => {
      try { content.value = await dataService.getData('/data/home-content.json'); }
      catch { failed.value = true; }
    });
    return () => {
      if (failed.value) return el('section', { class: 'hp-page', role: 'alert' }, [
        el('h1', null, 'MSEI Lab'), el('p', null, 'This page could not load. Please refresh to try again.'),
        link('Visit Dandan’s Imperial profile', 'https://profiles.imperial.ac.uk/d.zhang17')
      ]);
      if (!content.value) return el('p', { class: 'hp-loading', role: 'status' }, 'Loading the MSEI Lab profile…');
      const s = content.value.sections || {};
      const hero = s.hero || {};
      const research = s.researchoverview || {};
      const news = (s.latestnews?.subsections || []).map(item => item.data);
      const contacts = s.contactinformation?.subsections || [];
      const contact = contacts.find(item => item.name === 'Contact Details')?.data || {};
      const social = contacts.find(item => item.name === 'Social Links')?.data || {};
      return el('div', { class: 'hp-page' }, [
        el('section', { class: 'hp-hero', 'aria-labelledby': 'home-title' }, [
          el('p', { class: 'hp-eyebrow' }, 'Multi-Scale Embodied Intelligence Lab'),
          el('div', { class: 'hp-title-row' }, [
            el('img', { class: 'hp-mobile-portrait', src: '/assets/photos/dandan-zhang-portrait-2026.webp', alt: 'Dr Dandan Zhang', width: 900, height: 900, fetchpriority: 'high' }),
            el('div', null, [el('h1', { id: 'home-title' }, hero.title), el('p', { class: 'hp-subtitle' }, hero.subtitle)])
          ]),
          el('p', { class: 'hp-affiliations' }, hero.affiliations),
          el('div', { class: 'hp-bio' }, (hero.biographyParagraphs || []).map(text => el('p', null, text))),
          el('nav', { class: 'hp-link-row', 'aria-label': 'Profile and lab links' }, (hero.profileLinks || []).map(item => link(item.label, item.url, 'hp-pill-link')))
        ]),
        el('section', { class: 'hp-section', 'aria-labelledby': 'home-research' }, [
          el('h2', { id: 'home-research' }, 'Research across scales'),
          hero.featureImage ? figure(hero.featureImage, 'hp-research-figure') : null,
          el('div', { class: 'hp-research-grid' }, (research.subsections || []).map((item, index) => el('article', { class: 'hp-research-card' }, [
            el('span', { class: 'hp-card-index', 'aria-hidden': 'true' }, String(index + 1).padStart(2, '0')),
            el('h3', null, item.data.title), el('p', null, item.data.intro),
            el('p', { class: 'hp-small' }, item.data.description)
          ]))),
          trustedHTML('div', 'hp-description', research.description)
        ]),
        el('section', { class: 'hp-section', 'aria-labelledby': 'home-education' }, [
          el('h2', { id: 'home-education' }, 'Teaching and academic service'),
          el('div', { class: 'hp-two-columns' }, (s.educationAndService || []).map(item => el('article', { class: 'hp-feature-card' }, [
            el('p', { class: 'hp-eyebrow' }, item.eyebrow), el('h3', null, item.title), el('p', null, item.description), link(item.linkLabel, item.url, 'hp-text-link')
          ])))
        ]),
        s.labPhotos ? el('section', { class: 'hp-section', 'aria-labelledby': 'home-lab-life' }, [
          el('h2', { id: 'home-lab-life' }, 'In the lab'),
          el('div', { class: 'hp-two-columns hp-photo-grid' }, s.labPhotos.map(photo => figure(photo))),
          link('Explore group photographs and activities', '/msei_website/group-photo', 'hp-text-link')
        ]) : null,
        s.opening ? el('section', { class: 'hp-section hp-opportunities', 'aria-labelledby': 'home-opportunities' }, [
          el('h2', { id: 'home-opportunities' }, 'Opportunities'), trustedHTML('div', '', s.opening.description)
        ]) : null,
        el('section', { class: 'hp-section', 'aria-labelledby': 'home-news' }, [
          el('h2', { id: 'home-news' }, 'Latest news'), el('ul', { class: 'hp-news' }, news.slice(0, 7).map(newsItem)),
          news.length > 7 ? el('details', { class: 'hp-earlier-news' }, [
            el('summary', null, `Earlier news (${news.length - 7})`), el('ul', { class: 'hp-news' }, news.slice(7).map(newsItem))
          ]) : null
        ]),
        s.award?.lists ? el('section', { class: 'hp-section', 'aria-labelledby': 'home-honours' }, [
          el('h2', { id: 'home-honours' }, 'Selected honours'), el('ul', { class: 'hp-honours' }, s.award.lists.map(item => trustedHTML('li', '', item)))
        ]) : null,
        el('section', { class: 'hp-section hp-contact', 'aria-labelledby': 'home-contact' }, [
          el('h2', { id: 'home-contact' }, 'Contact'),
          el('p', null, [link('d.zhang17@imperial.ac.uk', 'mailto:d.zhang17@imperial.ac.uk')]),
          contact.address ? el('p', null, contact.address) : null,
          contact.phone ? el('p', null, contact.phone) : null,
          contact.website ? link('Website', contact.website) : null,
          el('div', { class: 'hp-link-row' }, Object.entries(social).filter(([,value]) => value).map(([name,value]) => link(name, value.startsWith('http') ? value : `https://twitter.com/${value.replace('@','')}`))),
          el('p', { class: 'hp-updated' }, 'Profile updated 1 November 2026.')
        ])
      ]);
    };
  }
};
