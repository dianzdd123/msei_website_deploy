import { r as ref, o as onMounted } from './vendor-DnaV-8Px.js';
import { node as el, route, link, eyebrow, figure, focusHash } from './ResearchUI.20261111privacy.js';

/* Public-facing research portfolio. All claims are drawn from existing published
   MSEI content. Concept imagery is labelled. This component reads public JSON only. */
const urls = {
  research: route + '/research',
  projects: route + '/projects',
  capabilities: route + '/capabilities',
  impact: route + '/impact',
  people: route + '/people',
  outputs: route + '/outputs',
  opportunities: route + '/opportunities',
  contact: route + '/contact',
  personal: 'https://www.intelligentrobotics-acrossscales.com/'
};
const action = (label, href, secondary = false) =>
  link(label, href, 'lp-action' + (secondary ? ' lp-action-secondary' : ''));
const sector = (kicker, title, description, id, children) =>
  el('section', { class: 'lp-section lp-wrap', id, 'aria-labelledby': id + '-title' }, [
    el('div', { class: 'lp-section-head' }, [
      eyebrow(kicker), el('h2', { id: id + '-title' }, title),
      description ? el('p', { class: 'lp-intro' }, description) : null
    ]),
    children
  ]);
const smallCard = (title, description, href, label = 'Explore →', extra = '') =>
  el('article', { class: 'lp-card ' + extra }, [
    el('h3', null, title), el('p', null, description),
    href ? link(label, href, 'lp-card-link') : null
  ]);
const steps = items => el('div', { class: 'lp-steps' },
  items.map((item, index) => el('div', { class: 'lp-step' }, [
    el('span', { class: 'lp-step-num' }, '0' + (index + 1)),
    el('div', null, [el('h3', null, item.title), el('p', null, item.text)])
  ])));
const textList = items => el('ul', { class: 'lp-list' }, items.map(item => el('li', null, item)));
const appCards = applications => el('div', { class: 'lp-grid lp-grid-two' },
  (applications || []).map(app => el('article', { class: 'lp-app-card' }, [
    figure(app.image, app.alt, app.caption, 'lp-app-figure'),
    el('div', { class: 'lp-app-copy' }, [
      el('h3', null, app.title), el('p', null, app.summary),
      link('Explore research →', urls.research + '/' + app.slug, 'lp-card-link')
    ])
  ])));
const projectCards = papers => el('div', { class: 'lp-grid lp-grid-three' },
  (papers || []).map(paper => el('article', { class: 'lp-project' }, [
    el('p', { class: 'lp-label' }, paper.theme || 'RESEARCH EVIDENCE'),
    el('h3', null, paper.name || paper.title),
    el('p', null, paper.summary),
    el('p', { class: 'lp-citation' }, [paper.venue, paper.year, paper.status].filter(Boolean).join(' · ')),
    el('div', { class: 'lp-card-actions' }, [
      link('View research evidence ↗', paper.url, 'lp-card-link'),
      link('Research programme →', urls.research, 'lp-muted-link')
    ])
  ])));
const pageHero = (keyword, title, description, picture, alt, caption, buttons) =>
  el('section', { class: 'lp-hero' }, el('div', { class: 'lp-wrap lp-hero-inner' }, [
    el('div', { class: 'lp-hero-copy' }, [
      eyebrow('MSEI LAB · ' + keyword.toUpperCase()),
      el('h1', null, title), el('p', { class: 'lp-lede' }, description),
      buttons ? el('div', { class: 'lp-actions' }, buttons.map(x => action(x[0], x[1], !!x[2]))) : null
    ]),
    picture ? figure(picture, alt, caption, 'lp-hero-figure', true) : null
  ]));
const subnav = entries => el('nav', { class: 'lp-section-nav', 'aria-label': 'Sections on this page' },
  el('div', { class: 'lp-wrap lp-nav-scroll' },
    entries.map(item => link(item[0], '#' + item[1], 'lp-nav-link'))));
const footerCTA = (title, description, main = ['Discuss collaboration', urls.contact]) =>
  el('section', { class: 'lp-cta' }, el('div', { class: 'lp-wrap lp-cta-inner' }, [
    el('div', null, [eyebrow('CONNECT WITH THE RESEARCH'), el('h2', null, title), el('p', null, description)]),
    action(main[0], main[1])
  ]));
const researchData = d => d.research.sections || {};
const newsData = d => (d.home.sections?.latestnews?.subsections || [])
  .map(x => x.data || {})
  .filter(x => x.title && !/TR35|workshop|Dandan/i.test(x.title))
  .slice(0, 3);

function home(d) {
  const s = researchData(d), projects = s.featuredWork || [], apps = d.apps.applications || [];
  const news = newsData(d), platforms = s.platforms || [];
  return el('div', { class: 'lp-site', id: 'main-content' }, [
    pageHero('Home', 'Adaptive physical intelligence across scales.',
      'We investigate how sensing, learning, control and physical design can work together to make robotic manipulation adaptive, transferable and reliable.',
      '/assets/illustrations/hero-research-aligned-2026c.webp',
      'Concept artwork connecting tactile manipulation, microscopy and robot actuation across scales.',
      'AI-generated conceptual illustration; objects are not to scale.',
      [['Explore the research', urls.research], ['See evidence and projects', urls.projects, true]]),
    subnav([['Questions','programme'], ['Projects','evidence'], ['Platforms','platforms'], ['Latest','latest'], ['Collaborate','collaborate']]),
    sector('01 / RESEARCH QUESTIONS', 'One programme. Four connected questions.',
      'Our research spans physical-state inference, learning, control and embodiment. Each theme is studied in concrete physical experiments.',
      'programme',
      el('div', { class: 'lp-grid lp-grid-two' },
        (s.themes || []).map(t => smallCard(t.title, t.question + ' ' + t.description, urls.research + '#' + t.id, 'Explore the theme →')))),
    sector('02 / DOCUMENTED EVIDENCE', 'Selected research outcomes.',
      'Representative results from peer-reviewed papers and explicitly labelled preprints. Follow the source links for methods, scope and evaluation.',
      'evidence', el('div', null, [
        projectCards(projects.slice(0, 3)),
        el('div', { class: 'lp-after-grid' }, action('View flagship projects', urls.projects, true))
      ])),
    sector('03 / LABORATORY CAPABILITIES', 'From tactile contact to micro-scale actuation.',
      'The programme connects sensing, interaction and experimental systems. Platform descriptions are research contexts, not offers of equipment access.',
      'platforms', el('div', { class: 'lp-grid lp-grid-three' },
        platforms.map(p => smallCard(p.title, p.description, urls.capabilities, 'Explore capabilities →')))),
    sector('04 / RESEARCH SETTINGS', 'Testing ideas across physical scales.',
      'Explore the applications where scientific methods are investigated and their limitations are tested.',
      'applications', appCards(apps)),
    sector('05 / RECENT WORK', 'Research updates.',
      'Selected publicly documented results and resources.',
      'latest', el('div', { class: 'lp-grid lp-grid-three' }, news.map(n =>
        smallCard(n.title, n.summary, (n.links && n.links[0] || '').split(': ').slice(1).join(': ') || urls.outputs, 'Source ↗')))),
    sector('06 / PEOPLE AND PARTNERSHIPS', 'Research is built collaboratively.',
      'Discover the researchers, technical approaches and academic exchanges supporting this programme.',
      'collaborate', el('div', { class: 'lp-grid lp-grid-two' }, [
        smallCard('The research team', 'Meet the researchers, students and collaborators involved in the programme.', urls.people),
        smallCard('Impact and research partnerships', 'Read about research exchanges, public engagement and pathways towards practical impact.', urls.impact)
      ])),
    sector('PRINCIPAL INVESTIGATOR', 'Dr Dandan Zhang.',
      'Assistant Professor in Bioengineering at Imperial College London and director of the Multi-Scale Embodied Intelligence Laboratory.',
      'pi', el('div', { class: 'lp-personal-link' }, [
        figure('/assets/photos/dandan-zhang-portrait-2026.webp', 'Dr Dandan Zhang', '', 'lp-portrait'),
        el('div', null, [
          el('p', null, 'The laboratory website documents the research programme and its evidence. Dandan’s personal website contains her full academic biography, invited talks, teaching and individual academic service.'),
          action('Dandan Zhang — personal website ↗', urls.personal, true)
        ])
      ])),
    footerCTA('Explore research collaboration.', 'Contact the laboratory about scientific questions, research exchanges and potential partnerships.')
  ]);
}
function projects(d) {
  const s = researchData(d);
  return el('div', { class: 'lp-site', id: 'main-content' }, [
    pageHero('Projects', 'Flagship research. Verifiable evidence.',
      'Our selected work links scientific questions to methods, experimental evaluations and openly accessible research sources.',
      '/assets/illustrations/tactile-learning-2026c.webp',
      'Concept illustration of a tactile-enabled robot interacting with an object.',
      'AI-generated concept illustration; not experimental data.',
      [['Explore research themes', urls.research], ['View all publications', route + '/publications', true]]),
    subnav([['Evidence','flagship'],['Applications','application-links'],['Next','next']]),
    sector('01 / SELECTED RESEARCH', 'Representative results.',
      'These examples are drawn from the existing published MSEI research record. They do not claim an unverified grant award or a completed deployment.',
      'flagship', projectCards(s.featuredWork || [])),
    sector('02 / APPLICATION CONNECTIONS', 'Where methods meet tasks.',
      'Research applications show how these methods are used across different physical constraints and evaluation settings.',
      'application-links', appCards(d.apps.applications)),
    sector('03 / NEXT SCIENTIFIC QUESTIONS', 'What remains to be investigated.',
      'Future research directions are stated as questions and objectives, not as demonstrated results.',
      'next', el('div', { class: 'lp-grid lp-grid-three' },
        (s.nextDirections || []).map(x => smallCard(x.title,x.description,urls.research,'Research programme →')))),
    footerCTA('Discuss the next research question.', 'We welcome enquiries from prospective academic and industrial research collaborators.')
  ]);
}
function capabilities(d) {
  const s = researchData(d);
  return el('div', { class: 'lp-site', id: 'main-content' }, [
    pageHero('Capabilities', 'Physical platforms. Connected methods.',
      'Research platforms connect robotic hardware, multimodal perception, learning and control across tasks and scales.',
      '/assets/research/research3.png',
      'Experimental micromanipulation setup with precision stages and an anatomical model.',
      'Research platform image from the published MSEI website.',
      [['Explore research applications', urls.research], ['Discuss collaboration', urls.contact, true]]),
    subnav([['Platforms','platforms'],['Methods','methods'],['Availability','availability']]),
    sector('01 / RESEARCH PLATFORMS', 'Experimental settings.',
      'Published descriptions of platform families and the questions they enable. Images are captioned as photographs or conceptual illustrations.',
      'platforms', el('div', { class: 'lp-stack' }, (s.platforms || []).map(p =>
        el('article', { class: 'lp-platform' }, [
          figure(p.image,p.alt,p.caption,'lp-platform-figure'),
          el('div', null, [
            el('h3',null,p.title),el('p',null,p.description),
            el('h4',null,'Representative lines of work'),textList(p.examples || []),
            link('Related research →',urls.research,'lp-card-link')
          ])
        ])))),
    sector('02 / CROSS-CUTTING METHODS', 'Methods that connect the platforms.',
      'Experimental capability is not just equipment: it includes sensing, transferable learning, shared control and physical design.',
      'methods', el('div', {class:'lp-grid lp-grid-two'}, (s.themes || []).map(t =>
        smallCard(t.title,t.description,urls.research + '#' + t.id,'Explore method →')))),
    sector('03 / FACILITY INFORMATION', 'Research access and status.',
      'The public record describes research platform types. It does not establish the present availability, commissioning status or shared-user access of an individual instrument.',
      'availability',el('div',{class:'lp-note'},[
        el('h3',null,'Enquire about a specific collaboration'),
        el('p',null,'For current instrument status, research supervision, safe access and any collaboration arrangements, contact the laboratory. Availability is confirmed case by case.'),
        action('Research and facilities enquiry',urls.contact)
      ])),
    footerCTA('Connect a method to your research question.', 'Explore joint experiments, shared research and capability development.')
  ]);
}
function impact(d) {
  const s = d.services.sections || {};
  return el('div', { class: 'lp-site', id: 'main-content' }, [
    pageHero('Impact', 'From physical interaction to useful knowledge.',
      'We investigate potential applications in healthcare, robotic manipulation and scientific experimentation, while documenting research exchanges and reusable outputs.',
      '/assets/illustrations/scientific-experiments-concept-2026e.webp',
      'Concept illustration of a microscope and robotic scientific instruments.',
      'AI-generated illustration; not a completed autonomous laboratory.',
      [['Explore applications', urls.research], ['Open research outputs', urls.outputs, true]]),
    subnav([['Applications','pathways'], ['Partnerships','partnerships'], ['Support','support'], ['Community','engagement']]),
    sector('01 / TRANSLATION PATHWAYS', 'Where the methods could matter.',
      'Application areas represent research settings and possible pathways; potential benefits are not presented as achieved clinical or industrial outcomes.',
      'pathways', appCards(d.apps.applications)),
    sector('02 / RESEARCH EXCHANGE', 'Partnerships and engagement.',
      'Selected publicly documented exchanges and activities, drawn from the existing research-community record.',
      'partnerships', el('div',{class:'lp-grid lp-grid-two'}, (s.exchanges?.items || []).filter(x => !/invited talks/i.test(x.name)).map(x =>
        smallCard(x.name,x.description,x.url,'Read the source ↗')))),
    sector('03 / RESPONSIBLE SUPPORT', 'Funding and research stewardship.',
      'We provide funder acknowledgements alongside verified research outputs when such information is publicly approved. Internal proposals, confidential allocations, unannounced awards and private budgets are not published here.',
      'support', el('div',{class:'lp-note'},[
        el('h3',null,'Research capability with transparent evidence'),
        el('p',null,'Review publications and shared resources for documented results. For questions about current programmes or partnership opportunities, contact the research team.'),
        el('div',{class:'lp-actions'},[action('Review outputs',urls.outputs,true),action('Contact the lab',urls.contact)])
      ])),
    sector('04 / SCHOLARLY COMMUNITY', 'Building the research community.',
      'Individual event and academic-service appointments are recorded on Dandan Zhang’s personal website; the group site highlights their collaborative relevance.',
      'engagement', el('div',{class:'lp-grid lp-grid-three'}, (s.workshops?.items || []).slice(0,3).map(x =>
        smallCard(x.name,x.description,x.url,'Official workshop ↗')))),
    footerCTA('Build a research partnership.', 'Tell us the scientific challenge, research context and potential forms of collaboration.')
  ]);
}
function outputs(d) {
  const s = researchData(d);
  return el('div', {class:'lp-site',id:'main-content'}, [
    pageHero('Outputs','Evidence, publications and open research.',
      'Find representative papers and available public implementations, simulation environments and supporting resources.',
      '/assets/illustrations/tactile-learning-2026c.webp',
      'Concept illustration of tactile robot sensing and learning.',
      'AI-generated concept illustration; not a research performance chart.',
      [['Browse publications',route + '/publications'],['Explore projects',urls.projects,true]]),
    subnav([['Publications','papers'],['Resources','resources'],['Reuse','reuse']]),
    sector('01 / PUBLICATIONS','Scientific record.',
      'The publication archive distinguishes journals, conference papers and preprints. Each record links to the research source.',
      'papers',el('div',null,[
        projectCards((s.featuredWork||[]).slice(0,3)),
        el('div',{class:'lp-after-grid'}, action('Open the full publication archive',route+'/publications',true))
      ])),
    sector('02 / OPEN RESOURCES','Code, models and experimental tools.',
      'These external links are listed in the existing research record. Read each repository’s own requirements and licensing information before attempting reuse.',
      'resources',el('div',{class:'lp-grid lp-grid-two'},(s.openResources||[]).map(x =>
        smallCard(x.name,x.description,x.url,'View public repository ↗')))),
    sector('03 / REPRODUCIBILITY','Use resources with appropriate context.',
      'Availability of a code repository is not evidence of an instantly reproducible experiment. Some research needs datasets, simulator versions, calibration or specialist hardware.',
      'reuse',el('div',{class:'lp-note'},[
        el('h3',null,'Before reusing research material'),
        textList(['Check the original paper and repository documentation.','Review required software, external data and calibration.','Respect licensing, attribution, safety and dataset terms.','Contact authors where a research system requires specialist instrumentation.'])
      ])),
    footerCTA('Find the right evidence.', 'Contact the lab about research outputs, reproducibility and potential joint experiments.')
  ]);
}
function contact() {
  return el('div',{class:'lp-site',id:'main-content'},[
    pageHero('Contact','Start a research conversation.',
      'For questions about research collaboration, experimental platforms, scientific exchanges or prospective research work, contact the MSEI Lab.',
      '/assets/illustrations/hero-research-aligned-2026c.webp',
      'Concept illustration of embodied robotics across physical scales.',
      'AI-generated conceptual illustration.',
      [['Email the laboratory','mailto:d.zhang17@imperial.ac.uk'],['Explore research',urls.research,true]]),
    sector('01 / ENQUIRY ROUTES','Choose the right starting point.',
      'A short, focused message helps us identify the relevant research area and next steps.',
      'enquiries',el('div',{class:'lp-grid lp-grid-two'},[
        smallCard('Research partnerships','Describe the scientific question, proposed collaboration, relevant methods and intended time frame.','mailto:d.zhang17@imperial.ac.uk?subject=MSEI%20research%20collaboration','Email about collaboration ↗'),
        smallCard('Experimental platforms','Explain the intended work and the platform or technique of interest; current capability and safe access must be confirmed.','mailto:d.zhang17@imperial.ac.uk?subject=MSEI%20experimental%20platform','Email about platforms ↗'),
        smallCard('Prospective PhD or MRes','Read published application guidance and current official Imperial requirements before enquiring.',urls.opportunities,'View opportunities →'),
        smallCard('Speaking and academic service','For Dandan Zhang’s personal talks, press or academic-service enquiries, use her personal website.',urls.personal,'Dandan Zhang’s website ↗')
      ])),
    sector('02 / AFFILIATION','Multi-Scale Embodied Intelligence Laboratory.',
      'Department of Bioengineering · Imperial College London.',
      'affiliation',el('div',{class:'lp-note'},[
        el('h3',null,'MSEI Lab'),
        el('p',null,'Research interests include multimodal tactile sensing, adaptive robot learning, shared autonomy, medical robotics and optical or magnetic microrobotics.'),
        link('Imperial College London ↗','https://www.imperial.ac.uk','lp-card-link')
      ]))
  ]);
}
const PAGE_TITLES = {
  home:'MSEI Lab | Adaptive Physical Intelligence',
  projects:'Projects | MSEI Lab',
  capabilities:'Capabilities | MSEI Lab',
  impact:'Impact | MSEI Lab',
  outputs:'Outputs | MSEI Lab',
  contact:'Contact | MSEI Lab'
};
const PAGE_RENDERERS = {home,projects,capabilities,impact,outputs,contact};

export default {
  name:'ProgrammeHub',
  props:{section:{type:String,required:true}},
  setup(props) {
    const records=ref(null), failed=ref(false);
    onMounted(async () => {
      try {
        const names=['home','research','research-applications','services'];
        const entries=await Promise.all(names.map(async name => {
          const response=await fetch('/data/'+name+'-content.json?v=20261112lab',{cache:'no-cache'});
          if (!response.ok) throw new Error('Failed to load '+name);
          return response.json();
        }));
        records.value={home:entries[0],research:entries[1],apps:entries[2],services:entries[3]};
        focusHash();
      } catch (error) {
        failed.value=true;
      }
    });
    return () => {
      const which=props.section || 'home';
      document.title=PAGE_TITLES[which] || 'MSEI Lab';
      if (failed.value) return el('div',{class:'lp-load lp-wrap',role:'alert'},[
        el('h1',null,'Research information unavailable'),
        el('p',null,'Please refresh this page or contact the laboratory.'),
        action('Contact the lab',urls.contact)
      ]);
      if (!records.value) return el('div',{class:'lp-load lp-wrap',role:'status'},'Loading research information…');
      return (PAGE_RENDERERS[which] || home)(records.value);
    };
  }
};
