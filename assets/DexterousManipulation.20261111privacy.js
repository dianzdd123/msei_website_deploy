import { r as ref, o as onMounted } from './vendor-DnaV-8Px.js';
import { node as el, link, route, eyebrow, heading, glyph, focusHash } from './ResearchUI.20261111privacy.js';
import { researchFigure, researchJoin } from './ResearchFigures.20261111privacy.js';

export default {
  name: 'DexterousManipulationResearch',
  setup() {
    const content = ref(null), failed = ref(false), selected = ref(null), dialog = ref(null);
    let lastTrigger;
    const openFigure = (figure, event) => {
      lastTrigger = event.currentTarget;
      selected.value = figure;
      requestAnimationFrame(() => { if (dialog.value && !dialog.value.open) dialog.value.showModal(); });
    };
    const closeFigure = () => dialog.value?.close();
    const restoreFocus = () => { selected.value = null; lastTrigger?.focus({ preventScroll: true }); };
    const credits = f => el('span', { class: 'dm-figure-credit' }, [f.credit, f.sourceUrl ? link('Figure source ↗', f.sourceUrl) : null, f.licenseUrl ? link(f.licenseLabel || 'Licence', f.licenseUrl) : null]);
    const scientificFigure = (f, eager = false) => el('figure', { class: 'dm-figure' }, [
      el('button', { type: 'button', class: 'dm-image-button', 'aria-label': `Enlarge figure: ${f.title}`, 'aria-haspopup': 'dialog', onClick: event => openFigure(f, event) }, [
        el('img', { src: f.src, alt: f.alt, width: f.width, height: f.height, loading: eager ? 'eager' : 'lazy', decoding: 'async', ...(eager ? { fetchpriority: 'high' } : {}) }),
        el('span', { class: 'dm-enlarge', 'aria-hidden': 'true' }, 'View full figure ↗')
      ]),
      el('figcaption', null, [el('span', null, f.caption), credits(f)])
    ]);
    const projectCard = p => el('article', { class: 'dm-project', id: p.id, 'aria-labelledby': `${p.id}-title` }, [
      scientificFigure(p.figure),
      el('div', { class: 'dm-project-copy' }, [
        el('div', { class: 'dm-meta' }, [el('span', { class: 'dm-badge' }, p.status), el('span', null, `${p.venue} · ${p.year}`)]),
        el('h3', { id: `${p.id}-title` }, p.name),
        el('p', { class: 'dm-question' }, p.question),
        el('div', { class: 'dm-tags', 'aria-label': 'Project themes' }, p.tags.map(tag => el('span', null, tag))),
        el('dl', { class: 'dm-project-detail' }, [el('dt', null, 'Approach'), el('dd', null, p.approach), el('dt', null, 'Reported evidence'), el('dd', null, p.evidence)]),
        p.extraFigures.length ? el('details', { class: 'dm-extra-figures' }, [el('summary', null, `Explore ${p.extraFigures.length === 1 ? 'another research figure' : `${p.extraFigures.length} more research figures`}`), ...p.extraFigures.map(f => el('div', null, [el('h4', null, f.title), scientificFigure(f)]))]) : null,
        el('p', { class: 'dm-scope' }, [el('strong', null, 'Study scope. '), p.scope]),
        el('details', { class: 'dm-citation' }, [el('summary', null, 'Full paper title and authors'), el('p', null, p.title), el('p', null, p.authors.join(', '))]),
        el('div', { class: 'dm-project-links' }, p.links.map(l => link(`${l.label} ↗`, l.url)))
      ])
    ]);
    onMounted(async () => {
      try {
        const response = await fetch('/data/dexterous-manipulation-content.json?v=20261111privacy', { cache: 'no-cache' });
        if (!response.ok) throw new Error('Content unavailable');
        content.value = await response.json();
        document.title = 'Dexterous robotic manipulation | MSEI Lab';
        focusHash();
      } catch { failed.value = true; }
    });
    return () => {
      if (failed.value) return el('section', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Dexterous robotic manipulation'), el('p', null, 'The projects could not load. Please refresh to try again.'), link('Research overview', `${route}/research/`)]);
      if (!content.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading manipulation projects…');
      const data = content.value, projects = data.groups.flatMap(g => g.projects);
      const figureCount = projects.reduce((n, p) => n + 1 + p.extraFigures.length, 0);
      return el('div', { class: 'rd-research dm-page' }, [
        el('nav', { class: 'rd-container rd-app-breadcrumb', 'aria-label': 'Breadcrumb' }, [link('Home', `${route}/`), el('span', { 'aria-hidden': 'true' }, '/'), link('Research', `${route}/research/`), el('span', { 'aria-hidden': 'true' }, '/'), el('span', { 'aria-current': 'page' }, 'Dexterous manipulation')]),
        el('section', { class: 'dm-hero', 'aria-labelledby': 'dexterity-title' }, el('div', { class: 'rd-container dm-hero-grid' }, [
          el('div', null, [eyebrow(data.hero.kicker), el('h1', { id: 'dexterity-title' }, data.hero.title), el('p', { class: 'dm-hero-lead' }, data.hero.lead), el('div', { class: 'rd-actions' }, [link('Explore the projects ↓', '#dexterity-guide', 'rd-button rd-light'), link('Code & datasets ↓', '#dexterity-resources', 'rd-button rd-outline')]), el('div', { class: 'dm-hero-stats' }, [[projects.length, 'project studies'], [figureCount, 'research figures'], [data.groups.length, 'connected themes']].map(([n,label]) => el('p', null, [el('strong', null, String(n)), el('span', null, label)])))]),
          scientificFigure(data.hero.figure, true)
        ])),
        el('nav', { class: 'dm-index', 'aria-label': 'Manipulation page sections' }, el('div', { class: 'rd-container' }, [['Page guide','#dexterity-guide'],['Sensors & materials','#tactile-hardware'],['Perception & data','#tactile-learning'],['Grippers & control','#contact-manipulation'],['Coordinated skills','#coordinated-skills'],['Code & data','#dexterity-resources']].map(([label,href]) => link(label,href)))),
        el('section', { class: 'rd-section rd-container', id: 'dexterity-guide', 'aria-labelledby': 'dexterity-guide-title' }, [
          heading('THE RESEARCH PROGRAMME', data.introduction.title, data.introduction.text, 'dexterity-guide-title'),
          el('p', { class: 'dm-intro-note' }, data.introduction.note),
          el('div', { class: 'dm-route-grid' }, data.groups.map((g,i) => el('article', { class: 'dm-route-card' }, [
            el('div', { class: 'dm-route-top' }, [glyph(i),el('span', { class: 'dm-group-number' }, `${g.number} / ${g.projects.length} PROJECTS`)]),
            el('h3', null, link(g.title, `#${g.id}`)), el('p', null, g.description),
            el('nav', { class: 'dm-project-index', 'aria-label': `${g.title} projects` }, g.projects.map(p => link(p.name, `#${p.id}`)))
          ]))),
          el('details', { class: 'dm-scale-comparison' }, [el('summary', null, 'Compare platforms, observations and actions'), el('div', { class: 'dm-table-scroll', role: 'region', 'aria-label': 'Manipulation platform comparison', tabindex: '0' }, el('table', null, [
            el('caption', null, 'The projects connect through contact, but use different sensors, robots and evaluation conditions.'),
            el('thead', null, el('tr', null, ['Platform','What is observed','What it enables','Projects'].map(x => el('th', { scope: 'col' }, x)))),
            el('tbody', null, data.comparison.map(r => el('tr', null, [el('th', { scope: 'row' },r.platform),el('td',null,r.observations),el('td',null,r.action),el('td',null,r.projects)])))
          ]))]),
          el('details', { class: 'dm-scale-comparison' }, [el('summary',null,'See how sensing, representation and action connect'),researchFigure(data.approachFigure)])
        ]),
        ...data.groups.map(g => el('section', { class: 'dm-project-section rd-section', id: g.id, 'aria-labelledby': `${g.id}-heading` }, el('div', { class: 'rd-container' }, [heading(`${g.number} / PROJECTS & EVIDENCE`,g.title,g.description,`${g.id}-heading`),el('div',{class:'dm-project-grid'},g.projects.map(projectCard)),link('Back to project guide ↑','#dexterity-guide','dm-back-link')]))),
        el('section',{class:'rd-section rd-container',id:'dexterity-resources','aria-labelledby':'dexterity-resources-title'},[
          heading('05 / REUSE THE RESEARCH','Code, datasets and experimental protocols.','Start with a task, inspect its paper, then use the corresponding implementation or evaluation resources.','dexterity-resources-title'),
          el('div',{class:'dm-dataset'},[el('div',null,[eyebrow('TACTILE DATA'),el('h3',null,'TacVerse: a common benchmark for sensor shift'),el('p',null,'106,800 images · Seven sensors · Shape classification, grating classification and force regression.'),el('p',{class:'dm-access-note'},'Dataset files require Hugging Face sign-in and acceptance of access conditions.')]),el('div',{class:'dm-project-links'},[link('Dataset ↗','https://huggingface.co/datasets/Lan-2025/Tactile'),link('Benchmark project ↗','https://lannwei.github.io/Tactile_Database/')])]),
          el('div',{class:'dm-resource-grid'},data.resources.map(r => el('article',{class:'dm-resource'},[el('h3',null,r.name),el('p',null,r.description),el('p',{class:'dm-scope'},r.requirements),el('div',{class:'dm-project-links'},[link(`${r.linkLabel || 'GitHub'} ↗`,r.url),r.guideUrl ? link(`${r.guideLabel || 'Reuse guide'} ↗`,r.guideUrl) : null])]))),
          el('p',{class:'dm-sources-note'},data.provenanceNote)
        ]),
        el('section',{class:'dm-outlook rd-section',id:'dexterity-outlook','aria-labelledby':'dexterity-outlook-title'},el('div',{class:'rd-container'},[heading('OPEN QUESTIONS','Towards adaptable contact-rich skills.','Questions connecting the projects and guiding future experiments.','dexterity-outlook-title'),el('div',{class:'dm-outlook-grid'},data.outlook.map(o => el('article',null,[el('h3',null,o.title),el('p',null,o.text)])))])),
        researchJoin('dexterity-join','dexterous robotic manipulation'),
        el('nav',{class:'rd-container dm-end-links','aria-label':'Related research'},[link('← Research overview',`${route}/research/`),link('Microrobotics →',`${route}/research/microrobotics/`),link('Medical robotics →',`${route}/research/medical-robotics/`),link('All publications →',`${route}/publications/`)]),
        el('dialog',{class:'dm-viewer',ref:dialog,'aria-labelledby':'dm-viewer-title',onClose:restoreFocus,onClick:event=>{if(event.target===dialog.value)closeFigure();}},selected.value ? [el('div',{class:'dm-viewer-inner'},[
          el('div',{class:'dm-viewer-heading'},[el('h2',{id:'dm-viewer-title'},selected.value.title),el('button',{type:'button',class:'dm-viewer-close',onClick:closeFigure,autofocus:true},'Close ×')]),
          el('img',{src:selected.value.src,alt:selected.value.alt,width:selected.value.width,height:selected.value.height}),el('p',null,selected.value.caption),credits(selected.value),link('Open full-size image in a new tab ↗',selected.value.src,'rd-text-link',{target:'_blank',rel:'noopener noreferrer'})
        ])] : [])
      ]);
    };
  }
};
