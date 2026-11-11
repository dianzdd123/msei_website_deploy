import { r as ref, o as onMounted, w as watch } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261102a.js';
import { node as el, route, link, eyebrow, heading, focusHash } from './ResearchUI.20261102a.js';

const guidePath = slug => `${route}/opportunities/${slug}/`;
const linkList = sources => el('div', { class: 'op-source-links' }, sources.map(source => link(`${source.label} ↗`, source.url)));

export default {
  name: 'ApplicationGuide',
  props: { guideSlug: { type: String, required: true } },
  setup(props) {
    const content = ref(null), failed = ref(false), checked = ref({}), copyStatus = ref('');
    const currentGuide = () => content.value?.guides.find(guide => guide.slug === props.guideSlug);
    const syncPage = () => { const g = currentGuide(); if (g) document.title = `${g.shortTitle} | MSEI Lab | Dandan Zhang`; focusHash(); };
    onMounted(async () => { try { content.value = await dataService.getData('/data/opportunities-content.json'); syncPage(); } catch { failed.value = true; } });
    watch(() => props.guideSlug, () => { checked.value = {}; copyStatus.value = ''; syncPage(); });
    const copyTemplate = async guide => {
      copyStatus.value = 'Copying the template… You can also select the text below and copy it manually.';
      let copyTimer;
      try {
        await Promise.race([
          navigator.clipboard.writeText(`Subject: ${guide.enquirySubject}\n\n${guide.enquiryTemplate}`),
          new Promise((resolve, reject) => { copyTimer = window.setTimeout(() => reject(new Error('Clipboard request timed out')), 1500); })
        ]);
        copyStatus.value = 'Template copied. Replace the bracketed prompts before sending.';
      }
      catch { copyStatus.value = 'Select the template text below and copy it with your device’s copy command.'; }
      finally { if (copyTimer !== undefined) window.clearTimeout(copyTimer); }
    };
    return () => {
      if (failed.value) return el('div', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Application guidance'), el('p', null, 'This guide could not load. Please refresh to try again.'), link('Research opportunities →', `${route}/opportunities/`, 'rd-text-link')]);
      if (!content.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading application guidance…');
      const d = content.value, g = currentGuide();
      if (!g) return el('div', { class: 'rd-container rd-load' }, [el('h1', null, 'Application guide not found'), link('Explore our application guides →', `${route}/opportunities/`, 'rd-text-link')]);
      const totalItems = g.preparation.reduce((total, group) => total + group.items.length, 0), completedItems = Object.values(checked.value).filter(Boolean).length, otherGuide = d.guides.find(guide => guide.slug !== g.slug);
      return el('div', { class: 'rd-research op-page op-application-guide' }, [
        el('nav', { class: 'rd-container op-breadcrumb', 'aria-label': 'Breadcrumb' }, [link('Opportunities', `${route}/opportunities/`), el('span', { 'aria-hidden': 'true' }, '/'), el('span', { 'aria-current': 'page' }, g.shortTitle)]),
        el('section', { class: 'op-hero op-guide-hero', 'aria-labelledby': 'guide-title' }, el('div', { class: 'rd-container op-hero-grid' }, [
          el('div', null, [eyebrow(g.kicker), el('h1', { id: 'guide-title' }, g.title), el('p', { class: 'op-lead' }, g.lead), el('p', { class: 'op-route-label' }, g.routeLabel), el('div', { class: 'rd-actions' }, [link('Prepare your enquiry ↓', '#prepare', 'rd-button rd-light'), link('Official requirements ↓', '#requirements', 'rd-button rd-outline')])]),
          el('figure', { class: 'op-hero-figure' }, [el('img', { src: g.image, alt: g.imageAlt, width: 680, height: 740, loading: 'eager', fetchpriority: 'high', decoding: 'async' }), el('figcaption', null, g.imageCaption)])
        ])),
        el('nav', { class: 'rd-subnav', 'aria-label': `${g.shortTitle} page sections` }, el('div', { class: 'rd-container' }, [link('Research fit', '#fit'), link('Requirements', '#requirements'), link('Preparation', '#prepare'), link('Application steps', '#application-process'), link('Funding & dates', '#funding'), link('Enquiry template', '#enquire'), link('FAQs', '#faqs')])),
        el('section', { class: 'rd-section rd-container', id: 'fit', 'aria-labelledby': 'fit-title' }, [
          heading('FIND YOUR RESEARCH FIT', g.fitTitle, g.fitText, 'fit-title'),
          el('div', { class: 'op-three-grid' }, g.fitCards.map((card, index) => el('article', { class: 'op-principle-card' }, [el('span', { class: 'op-card-number' }, `0${index + 1}`), el('h3', null, card.title), el('p', null, card.text)]))),
          el('div', { class: 'op-interest-links' }, [el('p', null, 'Explore an application area'), ...d.researchAreas.map(area => link(`${area.title} →`, `${route}/research/${area.slug}/`))])
        ]),
        el('section', { class: 'rd-section op-tint', id: 'requirements', 'aria-labelledby': 'requirements-title' }, el('div', { class: 'rd-container' }, [
          heading('OFFICIAL ADMISSIONS GUIDANCE', g.officialTitle, g.officialIntro, 'requirements-title'),
          el('div', { class: 'op-requirements-grid' }, g.requirements.map(item => el('article', { class: 'op-requirement' }, [el('h3', null, item.title), el('p', null, item.text)]))),
          el('div', { class: 'op-official-source' }, [el('p', null, `Official information checked on ${d.metadata.officialInformationChecked}. Read the current guidance before submitting.`), linkList(g.officialLinks)])
        ])),
        el('section', { class: 'rd-section rd-container', id: 'prepare', 'aria-labelledby': 'prepare-title' }, [
          heading('LAB PREPARATION SUGGESTIONS', 'Make your experience and question clear.', g.preparationIntro, 'prepare-title'),
          el('div', { class: 'op-checklist-status' }, [el('div', null, [el('label', { id: 'op-progress-label', for: 'op-preparation-progress' }, `${completedItems} of ${totalItems} preparation prompts reviewed`), el('progress', { id: 'op-preparation-progress', max: totalItems, value: completedItems, 'aria-labelledby': 'op-progress-label' }, `${completedItems} / ${totalItems}`)]), el('button', { type: 'button', class: 'op-reset-button', onClick: () => { checked.value = {}; } }, 'Reset checklist')]),
          el('div', { class: 'op-checklist-grid' }, g.preparation.map((group, groupIndex) => el('section', { class: 'op-checklist-group', 'aria-labelledby': `${g.slug}-prep-${groupIndex}` }, [
            el('h3', { id: `${g.slug}-prep-${groupIndex}` }, group.title),
            el('ul', null, group.items.map((item, itemIndex) => { const key = `${groupIndex}-${itemIndex}`; return el('li', null, el('label', { class: `op-check-item${checked.value[key] ? ' is-checked' : ''}` }, [el('input', { type: 'checkbox', checked: !!checked.value[key], onChange: event => { checked.value = { ...checked.value, [key]: event.target.checked }; } }), el('span', null, item)])); }))
          ]))),
          el('p', { class: 'op-small-note' }, 'Use this checklist for your own preparation. The programme and scholarship pages define the documents required for admission.')
        ]),
        el('section', { class: 'rd-section op-process-section', id: 'application-process', 'aria-labelledby': 'process-title' }, el('div', { class: 'rd-container' }, [
          heading('THE APPLICATION PROCESS', g.processTitle, 'Use the official route for the submission and a focused research discussion to establish fit.', 'process-title'),
          el('ol', { class: 'op-process-list' }, g.process.map((step, index) => el('li', null, [el('span', { class: 'op-step-number', 'aria-hidden': 'true' }, `0${index + 1}`), el('div', null, [el('h3', null, step.title), el('p', null, step.text)])]))),
          link(`${g.processSource.label} ↗`, g.processSource.url, 'rd-text-link'),
          el('div', { class: 'op-development' }, [el('h3', null, g.developmentTitle), el('p', { class: 'op-development-intro' }, 'A suggested progression for developing research skills; agree project milestones with the relevant supervisors.'), el('div', { class: 'op-three-grid' }, g.development.map((item, index) => el('article', null, [el('span', { class: 'op-card-number' }, `0${index + 1}`), el('h4', null, item.title), el('p', null, item.text)])))])
        ])),
        el('section', { class: 'rd-section rd-container', id: 'funding', 'aria-labelledby': 'funding-title' }, [
          heading('PLAN THE FUNDING ROUTE', 'Check eligibility, coverage and timing.', g.fundingIntro, 'funding-title'),
          el('div', { class: 'op-three-grid' }, g.fundingCards.map(card => el('article', { class: 'op-funding-card' }, [el('h3', null, card.title), el('p', null, card.text), link(`${(card.link || card.internalLink).label} ${card.link ? '↗' : '→'}`, (card.link || card.internalLink).url, 'rd-text-link')]))),
          el('div', { class: 'op-dates' }, [el('div', null, [eyebrow('A DATED PLANNING REFERENCE'), el('h3', { id: 'dates-title' }, g.dates.title), el('p', null, g.dates.intro), link(`${g.dates.link.label} ↗`, g.dates.link.url, 'rd-text-link')]), el('table', { 'aria-labelledby': 'dates-title' }, [el('thead', null, el('tr', null, [el('th', { scope: 'col' }, 'Application round'), el('th', { scope: 'col' }, 'Closing date')])), el('tbody', null, g.dates.rows.map(row => el('tr', null, [el('th', { scope: 'row' }, row.label), el('td', null, el('time', { datetime: row.iso }, row.date))])))])])
        ]),
        el('section', { class: 'rd-section op-tint', id: 'enquire', 'aria-labelledby': 'enquire-title' }, el('div', { class: 'rd-container' }, [
          heading('WRITE A FOCUSED ENQUIRY', 'Start a useful research conversation.', 'Adapt the template to your experience and interests. Explain your own contribution and choose the most relevant work to share.', 'enquire-title'),
          el('div', { class: 'op-enquiry-grid' }, [el('div', { class: 'op-enquiry-contact' }, [el('h3', null, d.contact.name), link(d.contact.email, `mailto:${d.contact.email}`, 'rd-text-link'), el('p', null, 'Use the programme’s formal application system for admission and referee submissions. A research enquiry helps to explore a possible match.'), el('div', { class: 'rd-actions' }, [link('Open an email draft ↗', `mailto:${d.contact.email}?subject=${encodeURIComponent(g.enquirySubject)}`, 'rd-button rd-primary')]), el('p', { class: 'op-small-note' }, 'Add your own message and attachments before sending.')]),
            el('div', { class: 'op-template-panel' }, [el('div', { class: 'op-template-heading' }, [el('h3', null, 'Enquiry template'), el('button', { type: 'button', class: 'op-copy-button', onClick: () => copyTemplate(g) }, 'Copy template')]), el('p', { class: 'op-template-subject' }, [el('strong', null, 'Subject: '), g.enquirySubject]), el('pre', { class: 'op-template-text', tabindex: '0', 'aria-label': 'Enquiry email template' }, g.enquiryTemplate), el('p', { class: 'op-copy-status', role: 'status', 'aria-live': 'polite' }, copyStatus.value)])])
        ])),
        el('section', { class: 'rd-section rd-container', id: 'faqs', 'aria-labelledby': 'faqs-title' }, [
          heading('COMMON QUESTIONS', 'A few points before you apply.', 'For an individual admissions decision or an exceptional qualification, use the relevant programme or departmental admissions contact.', 'faqs-title'),
          el('div', { class: 'op-faq-list' }, g.faqs.map(faq => el('details', { class: 'op-faq' }, [el('summary', null, faq.question), el('p', null, faq.answer)]))),
          el('div', { class: 'op-resources' }, [el('h3', null, 'Official programme and application resources'), linkList(g.resources), el('p', { class: 'op-small-note' }, `Last checked: ${d.metadata.officialInformationChecked}. Admissions requirements and funding schedules may be updated by Imperial.`)]),
          el('div', { class: 'op-guide-navigation' }, [link('← All research opportunities', `${route}/opportunities/`, 'rd-text-link'), otherGuide ? link(`Explore ${otherGuide.shortTitle} →`, guidePath(otherGuide.slug), 'rd-text-link') : null])
        ])
      ]);
    };
  }
};
