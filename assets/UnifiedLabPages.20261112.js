import { r as ref, w as watch } from './vendor-DnaV-8Px.js';
import { node as e, route as base, link, figure, eyebrow, focusHash } from './ResearchUI.20261111privacy.js';

/* Every research-group page uses the same layout and public data files.
   None imports an earlier SPA bootstrap. */
const $=(tag,attrs,children)=>e(tag,attrs,children);
const ar=x=>Array.isArray(x)?x:[];
const F=(x,cl='')=>{if(!x)return null;const src=typeof x==='string'?x:(x.src||x.image||x.url);
  if(!src||!src.startsWith('/assets/'))return null;
  return $('figure',{class:'rd-figure '+cl},[
    link($('img',{src,alt:x.alt||x.imageAlt||x.title||'Research image',loading:'lazy',decoding:'async'}),src,'lp-image-link',{target:'_blank',rel:'noopener noreferrer','aria-label':'Open full image: '+(x.title||x.alt||'Research figure')}),
    $('figcaption',null,[x.caption||x.imageCaption||'',x.credit?$('span',{class:'lp-image-credit'},x.credit):null,
      x.sourceUrl?link('Source ↗',x.sourceUrl,'lp-image-source'):null])]);};
const a=(label,href,css='lp-card-link')=>link(label,href,css);
const button=(label,href,alt=false)=>a(label,href,'lp-action'+(alt?' lp-action-secondary':''));
const acts=xs=>$('div',{class:'lp-actions'},xs.map(([x,y,z])=>button(x,y,z)));
const hero=(word,title,desc,img,buttons=[])=>$('section',{class:'lp-hero'},$('div',{class:'lp-wrap lp-hero-inner'},[
  $('div',{class:'lp-hero-copy'},[eyebrow('MSEI LAB · '+word.toUpperCase()),$('h1',null,title),$('p',{class:'lp-lede'},desc),acts(buttons)]),
  F(img,'lp-hero-figure')]));
const nav=xs=>$('nav',{class:'lp-section-nav','aria-label':'Page sections'},
  $('div',{class:'lp-wrap lp-nav-scroll'},xs.map(([name,id])=>a(name,'#'+id,'lp-nav-link'))));
const section=(num,title,lead,id,body)=>$('section',{class:'lp-section lp-wrap',id,'aria-labelledby':id+'-heading'},[
  $('div',{class:'lp-section-head'},[eyebrow(num),$('h2',{id:id+'-heading'},title),lead?$('p',{class:'lp-intro'},lead):null]),body]);
const grid=(children,two=false)=>$('div',{class:'lp-grid '+(two?'lp-grid-two':'lp-grid-three')},children);
const card=(title,desc,href,label='Explore →',meta='')=>$('article',{class:'lp-card'},[
  meta?$('p',{class:'lp-plain-meta'},meta):null,$('h3',null,title),$('p',null,desc||''),href?a(label,href):null]);
const links=arr=>$('div',{class:'lp-card-links'},ar(arr).filter(l=>l.url).map(l=>a((l.label||l.type||'Source')+' ↗',l.url)));
const ul=xs=>xs.length?$('ul',{class:'lp-list'},xs.map(x=>$('li',null,x))):null;
const panel=(title,desc)=>$('div',{class:'lp-note'},[$('h3',null,title),$('p',null,desc)]);
const foot=(title,desc)=>$('section',{class:'lp-cta'},$('div',{class:'lp-wrap lp-cta-inner'},[
  $('div',null,[eyebrow('CONNECT WITH MSEI'),$('h2',null,title),$('p',null,desc)]),button('Contact the lab',base+'/contact')]));
const screen=xs=>$('div',{class:'lp-site lp-unified'},xs);
const appcards=d=>grid(ar(d.applications?.applications).map(x=>$('article',{class:'lp-app-card'},[
  F(x,'lp-app-figure'),$('div',{class:'lp-app-copy'},[
  $('h3',null,x.title),$('p',null,x.summary),
  a('Explore application →',base+'/research/'+x.slug)])])),true);

function research(d){
 const s=d.research.sections||{},v=s.vision||{};
 return screen([
  hero('Research','Adaptive physical intelligence.',v.lead||'Robotics across scales.',
    {src:'/assets/illustrations/microrobotics-2026c.webp',alt:'Concept of optical and magnetic microrobots.',caption:'AI-generated illustration; not experimental data.'},
    [['Projects',base+'/projects'],['Publications',base+'/publications',true]]),
  nav([['Vision','vision'],['Applications','applications'],['Themes','themes'],['Platforms','platforms'],['Directions','directions']]),
  section('01 / SCIENTIFIC VISION',v.question||'Research questions',v.statement,'vision',
    $('div',{class:'lp-note'},[$('h3',null,v.headline||'Adaptive robotics'),$('p',null,v.directionNote||''),F(s.figures?.framework,'lp-inline-figure')])),
  section('02 / APPLICATIONS','Different physical settings.','Each application page connects physical tasks to methods and supporting research evidence.','applications',appcards(d)),
  section('03 / THEMES','Four connected research questions.','Research connects sensing, transferable learning, shared control and robot embodiment.','themes',
    grid(ar(s.themes).map(t=>$('article',{class:'lp-card lp-theme',id:t.id},[
      $('h3',null,t.title),$('p',{class:'lp-question'},t.question),$('p',null,t.description),
      ar(t.evidence).length?$('details',{class:'lp-reveal'},[
        $('summary',null,'Representative publications ('+t.evidence.length+')'),
        $('div',{class:'lp-reveal-body'},t.evidence.map(p=>$('p',null,[
          a((p.name||p.title||'Paper')+' ↗',p.url),$('span',{class:'lp-plain-meta'},' · '+[p.venue,p.year,p.status].filter(Boolean).join(' · ')),
          $('span',null,p.summary?' — '+p.summary:'')
        ])))]) : null])),true)),
  section('04 / EXPERIMENTS','Research platforms.','Capabilities and their actual availability must be confirmed with the laboratory.','platforms',
    grid(ar(s.platforms).map(x=>$('article',{class:'lp-card'},[F(x,'lp-project-figure'),$('h3',null,x.title),$('p',null,x.description),a('Explore capabilities →',base+'/capabilities')])),true)),
  section('05 / NEXT QUESTIONS','Research directions.','These are objectives, not claims of demonstrated performance.','directions',
    grid(ar(s.nextDirections).map(x=>card(x.title,x.description,base+'/projects','Evidence portfolio →')))),
  foot('Explore scientific collaboration.','Connect with the team about new questions and research partnerships.')
 ]);
}
const members=x=>ar(x?.subsections).map(p=>p.data).filter(p=>p?.name);
const person=p=>$('article',{class:'lp-person',id:p.id||undefined},[
  p.avatar?$('img',{class:'lp-person-image',src:p.avatar,alt:'Portrait of '+p.name,loading:'lazy'}):
    $('span',{class:'lp-person-placeholder','aria-hidden':'true'},p.name.split(' ').slice(0,2).map(w=>w[0]).join('')),
  $('div',{class:'lp-person-copy'},[
   $('h3',null,p.name),$('p',{class:'lp-person-role'},[p.role,p.roleDetail].filter(Boolean).join(' · ')),
   p.affiliation?$('p',{class:'lp-person-affiliation'},p.affiliation):null,
   p.research||p.description?$('p',null,p.research||p.description):null,
   ul(ar(p.topics).slice(0,5)),links(p.links),
   ar(p.selectedWorks).length?$('details',{class:'lp-reveal'},[
     $('summary',null,'Selected publications'),
     $('div',{class:'lp-reveal-body'},p.selectedWorks.slice(0,4).map(w=>$('p',null,a(w.title+' ↗',w.url))))]):null
  ])
]);
function people(d){
 const s=d.team.sections||{}, phd=members(s.phdstudents),
 visiting=[...members(s.visitingresearchers),...members(s.researchassistants),...members(s.visitingphdstudents)],
 mres=members(s.msstudents),interns=members(s.interns),alumni=members(s.alumni);
 return screen([
  hero('People','The research team.',d.team.intro||'Researchers and students exploring intelligence across scales.',
    {src:'/assets/photos/cnrs-imperial-meeting-2026.webp',alt:'Researchers at an Imperial collaboration meeting.',caption:'Photograph from the group archive.'},
    [['Research',base+'/research'],['Opportunities',base+'/opportunities',true]]),
  nav([['Leadership','leadership'],['PhD','phd'],['Visitors','visitors'],['MRes','mres'],['Alumni','alumni'],['Photos','photos']]),
  section('01 / LEADERSHIP','Principal investigator.','The full academic biography is maintained on Dandan Zhang’s personal website.','leadership',
    $('div',null,[grid(members(s.principalinvestigator).map(person),true),$('div',{class:'lp-after-grid'},button('Dandan Zhang’s website ↗','https://www.intelligentrobotics-acrossscales.com/',true))])),
  section('02 / RESEARCHERS','PhD researchers.','Research on tactile intelligence, robotics, learning and control.','phd',grid(phd.map(person))),
  section('03 / EXCHANGES','Visitors and research staff.','Research exchanges and visiting appointments.','visitors',
    visiting.length?grid(visiting.map(person)):panel('No current profiles','Check back for new research appointments.')),
  section('04 / TRAINING','MRes and student researchers.','Students contributing to research across the programme.','mres',
    mres.length?grid(mres.map(person)):panel('No profiles listed','Visit Opportunities for current pathways.')),
  section('05 / HISTORY','Alumni and interns.','Earlier contributions and the extended group network.','alumni',
    $('div',{class:'lp-archive'},[
      interns.length?$('details',{class:'lp-reveal'},[$('summary',null,'Interns · '+interns.length),grid(interns.map(person))]):null,
      alumni.length?$('details',{class:'lp-reveal'},[$('summary',null,'Alumni · '+alumni.length),grid(alumni.map(person))]):null
    ])),
  section('06 / GROUP LIFE','Collaboration and lab culture.','Research meetings, visits and group photographs.','photos',
    $('div',null,[F(d.gallery?.main,'lp-lab-photo'),$('div',{class:'lp-after-grid'},button('Photo archive',base+'/group-photo',true))])),
  foot('Join the next research question.','Explore PhD, MRes and collaborative research routes.')
 ]);
}
const primary=p=>(['DOI','arXiv','PDF','Project'].map(type=>ar(p.links).find(x=>x.type===type)).find(Boolean)||ar(p.links)[0]);
function publications(d,query,theme){
 const p=d.publications,all=ar(p.sections).filter(x=>x.title&&x.year),themes=ar(p.themes);
 const subset=all.filter(x=>(!query||[x.title,x.summary,x.venue,x.year,ar(x.authors).join(' ')].join(' ').toLowerCase().includes(query.toLowerCase()))&&
 (!theme||theme==='all'||x.primaryTheme===theme));
 return screen([
  hero('Publications','Research outputs and evidence.',p.intro?.lead||'Publications by research theme.',
    {src:'/assets/illustrations/tactile-learning-2026c.webp',alt:'Concept of tactile sensing.',caption:'AI-generated concept, not experimental results.'},
    [['Open resources',base+'/outputs#resources'],['Research',base+'/research',true]]),
  nav([['Archive','archive'],['Themes','themes']]),
  section('01 / SCIENTIFIC RECORD','Browse published research.',p.intro?.scope||'Journal, conference and explicitly labelled preprint work.','archive',
    $('div',null,[
      $('div',{class:'lp-filters'},[
        $('label',null,[$('span',null,'Search papers'),
          $('input',{type:'search',value:query,onInput:event=>{window.dispatchEvent(new CustomEvent('msei:search',{detail:event.target.value}));},
            placeholder:'Title, author, year or venue','aria-label':'Search research publications'})]),
        $('label',null,[$('span',null,'Research theme'),
          $('select',{value:theme,onChange:event=>{window.dispatchEvent(new CustomEvent('msei:theme',{detail:event.target.value}));},
            'aria-label':'Filter research publications'},[
              $('option',{value:'all'},'All research themes'),
              ...themes.map(t=>$('option',{value:t.id},t.shortTitle||t.title))])])
      ]),
      $('p',{class:'lp-results','aria-live':'polite'},'Showing '+subset.length+' of '+all.length+' research records'),
      subset.length?grid(subset.map(x=>$('article',{class:'lp-card lp-pub',id:x.id},[
        $('p',{class:'lp-plain-meta'},[x.year,x.type,x.venue].filter(Boolean).join(' · ')),
        $('h3',null,primary(x)?.url?a(x.title,primary(x).url):x.title),
        $('p',null,x.summary||'See source for scope and methods.'),
        $('p',{class:'lp-pub-authors'},ar(x.authors).join(', ')),links(x.links),
        x.figure?.src?F(x.figure,'lp-pub-figure'):null
      ])),true):panel('No matching papers','Try another search or theme.')
    ])),
  section('02 / RESEARCH CONNECTIONS','Explore research themes.','See how these outputs relate to methods and physical platforms.','themes',
    grid(themes.map(t=>card(t.title,t.description,base+'/research#'+t.id,'Explore theme →')),true))
 ]);
}
const reqCard=x=>card(x.title,x.text);
function opportunities(d){
 const o=d.opportunities;
 return screen([
  hero('Opportunities','Join the research programme.',o.intro?.lead||'Research pathways at MSEI Lab.',
    {src:'/assets/illustrations/hero-research-aligned-2026c.webp',alt:'Physical intelligence illustration.',caption:'AI-generated concept illustration.'},
    [['PhD',base+'/opportunities/phd'],['MRes',base+'/opportunities/mres',true]]),
  nav([['Research fit','fit'],['Routes','routes'],['Official','official']]),
  section('01 / RESEARCH FIT','Find a scientific question.','Explore the lab’s active research areas and their supporting evidence.','fit',
    grid(ar(o.researchAreas).map(x=>card(x.title,x.text,base+'/research/'+x.slug,'Explore area →')),true)),
  section('02 / ACADEMIC ROUTES','PhD and MRes opportunities.','Check requirements and deadlines on official Imperial pages.','routes',
    grid(ar(o.guides).map(x=>card(x.shortTitle||x.title,x.routeSummary||x.lead,base+'/opportunities/'+x.slug,'Application guide →')),true)),
  section('03 / AUTHORITATIVE REQUIREMENTS','Official sources.','Imperial controls eligibility, deadlines and admissions decisions.','official',
    grid(ar(o.sources).map(x=>card(x.label,'Current university information.',x.url,'Official guidance ↗')),true)),
  foot('Discuss a research question.','Explain your intended research route, background and scientific interest.')
 ]);
}
function guide(d,slug){
 const g=ar(d.opportunities.guides).find(x=>x.slug===slug);
 if(!g)return screen([hero('Opportunities','Guide unavailable','View research opportunities.',null,[['Overview',base+'/opportunities']])]);
 return screen([
  hero('Opportunities',g.title,g.lead,{src:g.image,alt:g.imageAlt,caption:g.imageCaption},
    [['Official programme',g.officialLinks?.[0]?.url||base+'/opportunities'],['All opportunities',base+'/opportunities',true]]),
  nav([['Fit','fit'],['Requirements','requirements'],['Process','process'],['Dates','dates'],['FAQs','faqs']]),
  section('01 / RESEARCH FIT',g.fitTitle||'Research preparation.',g.fitText,'fit',grid(ar(g.fitCards).map(reqCard),true)),
  section('02 / APPLICATION REQUIREMENTS',g.officialTitle||'Official requirements.',g.officialIntro,'requirements',
    $('div',null,[grid(ar(g.requirements).map(reqCard),true),links(g.officialLinks)])),
  section('03 / APPLICATION PROCESS',g.processTitle||'Preparing your application.',g.preparationIntro,'process',
    $('div',null,[grid(ar(g.preparation).map(reqCard),true),grid(ar(g.process).map(reqCard),true)])),
  section('04 / FUNDING AND DATES',g.dates?.title||'Verify dates and funding.',g.dates?.intro,'dates',
    $('div',null,[
      panel('Check current university guidance','This historical snapshot is not a guarantee of currently available deadlines or funding.'),
      grid(ar(g.dates?.rows).map(x=>card(x.label,x.date)),true),
      g.dates?.link?a(g.dates.link.label+' ↗',g.dates.link.url):null,
      grid(ar(g.fundingCards).map(reqCard),true)
    ])),
  section('05 / FREQUENT QUESTIONS','Questions about the route.','The official Imperial application is required.','faqs',
    $('div',{class:'lp-archive'},ar(g.faqs).map(x=>$('details',{class:'lp-reveal'},[
      $('summary',null,x.question),$('p',{class:'lp-reveal-body'},x.answer)])))),
  foot('Contact MSEI.','Share your research interests and intended programme.')
 ]);
}
function application(d,slug){
 const app=ar(d.applications.applications).find(x=>x.slug===slug);
 if(!app)return screen([hero('Research','Application unavailable','Explore the other research topics.',null,[['Research',base+'/research']])]);
 const detail=slug==='microrobotics'?d.microrobotics:slug==='dexterous-manipulation'?d.dexterous:null;
 const groups=ar(detail?.groups);
 const work=x=>{const paper=ar(d.publications?.sections).find(p=>p.title===x.title||ar(p.links).some(l=>l.url===x.url));
 const figures=[x.figure||paper?.figure,...ar(x.extraFigures)].filter(Boolean);
 return $('article',{class:'lp-research-work',id:x.id||undefined},[
   $('header',{class:'lp-work-heading'},[$('h4',null,x.name||x.title),$('p',{class:'lp-plain-meta'},[x.venue,x.year,x.status].filter(Boolean).join(' · '))]),
   $('div',{class:'lp-work-details'},[
      $('div',{class:'lp-work-figures'},figures.map(f=>F(f,'lp-work-figure'))),
      x.title&&x.name!==x.title?$('p',{class:'lp-paper-title'},x.title):null,
      x.question?$('p',null,[$('strong',null,'Question: '),x.question]):null,
      x.approach?$('p',null,[$('strong',null,'Approach: '),x.approach]):null,
      x.evidence?$('p',null,[$('strong',null,'Evidence: '),x.evidence]):null,
      x.scope?$('p',null,[$('strong',null,'Scope: '),x.scope]):null,
      x.summary?$('p',null,x.summary):null,
      links(x.links|| (x.url?[{label:'Paper',url:x.url}]:[]))
   ])
 ]);};
 return screen([
  hero('Research',app.title,app.lead||app.summary,app,[['Research',base+'/research'],['Publications',base+'/publications',true]]),
  nav([['Overview','overview'],['Methods','methods'],['Evidence','evidence'],['Resources','resources'],['Next','next']]),
  section('01 / RESEARCH OVERVIEW',app.question||app.title,app.introduction||detail?.introduction?.text,'overview',
    $('div',null,[$('div',{class:'lp-image-grid'},[
      app.approachFigure?.image?F({src:app.approachFigure.image,alt:app.approachFigure.alt,caption:app.approachFigure.caption},'lp-inline-figure'):null,
      app.supportFigure?F(app.supportFigure,'lp-inline-figure'):null]),
      detail?.introduction?.note?panel('Evidence boundary',detail.introduction.note):null])),
  section('02 / METHODS','Scientific approach.','What can be inferred, controlled or transferred under the physical conditions?','methods',
    grid(ar(app.focusAreas).map(x=>$('article',{class:'lp-card'},[
      $('h3',null,x.title),$('p',null,x.description),ul(ar(x.methods)),links(x.evidence)
    ])),true)),
  section('03 / RESEARCH EVIDENCE','Projects and experiments.','Papers and methods remain linked to original research sources.','evidence',
    $('div',{class:'lp-archive'},groups.length?groups.map(g=>$('section',{class:'lp-group',id:g.id},[
      $('h3',null,g.title),$('p',null,g.description),$('div',{class:'lp-work-list'},ar(g.projects).map(work))
    ])):$('div',{class:'lp-work-list'},ar(app.projects).map(work)))),
  ar(detail?.platforms).length?section('EXPERIMENTAL PLATFORMS','Apparatus and simulation.','Original laboratory images and project diagrams; simulation views remain labelled.','apparatus',
    $('div',{class:'lp-image-grid'},detail.platforms.map(f=>F(f,'lp-work-figure')))):null,
  ar(detail?.reviews).length?section('RESEARCH PERSPECTIVES','Reviews and research context.','Figures and citations from the research archive.','reviews',
    $('div',{class:'lp-work-list'},detail.reviews.map(work))):null,
  section('04 / OPEN RESOURCES','Software and datasets.','Check documentation, licensing and hardware requirements before reuse.','resources',
    grid(ar(detail?.resources).length?detail.resources.map(x=>card(x.name,x.description,x.url,'Open source ↗')):
         ar(app.resources).map(x=>card(x.name,x.description,x.url,'Open source ↗')),true)),
  section('05 / FUTURE WORK','Next scientific questions.',app.evidenceNote||'Future work requires validation.','next',
    $('div',null,[grid(ar(detail?.outlook).map(x=>card(x.title,x.text)),true),
      app.nextDirection?panel('Research direction',app.nextDirection):null])),
  foot('Build on research evidence.','Discuss experimental methods, collaboration and future projects.')
 ]);
}
function gallery(d){
 const g=d.gallery;
 return screen([
  hero('People','Lab life and research exchange.',g.description||'Research group photos.',g.main,
    [['People',base+'/people'],['Opportunities',base+'/opportunities',true]]),
  nav([['Albums','albums'],['People','people']]),
  section('01 / ARCHIVE','Research group photographs.','Approved archival images and captions.','albums',
    $('div',{class:'lp-gallery-grid'},ar(g.albums).map(album=>$('article',{class:'lp-gallery-album'},[
      $('h3',null,(album.title||'Group')+' · '+album.year),$('p',null,album.description),
      $('div',{class:'lp-gallery-photos'},ar(album.photos).map(x=>F({src:x.url,alt:x.alt,caption:x.caption||x.title},'lp-gallery-photo')))
    ])))),
  section('02 / TEAM','Research community.','Meet the people working in the laboratory.','people',
    grid([card('People','Researchers and students.',base+'/people'),
      card('Opportunities','Join the research programme.',base+'/opportunities')],true))
 ]);
}
const needs={
 research:['research-content.json','research-applications-content.json'],
 people:['team-content.json','group-photo-content.json'],
 publications:['publications-content.json'],
 opportunities:['opportunities-content.json'],
 guide:['opportunities-content.json'],
 application:['research-applications-content.json','publications-content.json'],
 gallery:['group-photo-content.json']
};
export default {
 name:'UnifiedLabPages',
 props:{section:{type:String,required:true},slug:{type:String,default:''}},
 setup(props){
   const data=ref(null),err=ref(''),query=ref(''),theme=ref('all');
   const search=ev=>{query.value=ev.detail;};
   const changeTheme=ev=>{theme.value=ev.detail;};
   window.addEventListener('msei:search',search);
   window.addEventListener('msei:theme',changeTheme);
   const load=async()=>{
     err.value='';data.value=null;
     try {
       const names=[...needs[props.section]||[]];
       if(props.section==='application'&&props.slug==='microrobotics')names.push('microrobotics-content.json');
       if(props.section==='application'&&props.slug==='dexterous-manipulation')names.push('dexterous-manipulation-content.json');
       const entries=await Promise.all([...new Set(names)].map(async n=>{
         const response=await fetch('/data/'+n+'?v=20261112unified',{cache:'no-cache'});
         if(!response.ok)throw Error('Failed loading '+n);
         return [n,await response.json()];
       }));
       const r=Object.fromEntries(entries);
       data.value={research:r['research-content.json'],applications:r['research-applications-content.json'],
         team:r['team-content.json'],gallery:r['group-photo-content.json'],publications:r['publications-content.json'],
         opportunities:r['opportunities-content.json'],microrobotics:r['microrobotics-content.json'],
         dexterous:r['dexterous-manipulation-content.json']};
       focusHash();
     }catch(ex){err.value=ex?.message||String(ex);}
   };
   watch(()=>[props.section,props.slug],load,{immediate:true});
   return ()=>{
     if(err.value)return screen([hero('Research','Content unavailable.','The page data could not load. Please try refreshing.',null,
       [['Research',base+'/research'],['Contact',base+'/contact',true]]),section('STATUS','Data error.','The requested public data did not load.','status',$('p',{role:'alert'},err.value))]);
     if(!data.value)return screen([$('div',{class:'lp-wrap lp-load',role:'status'},'Loading research information…')]);
     const d=data.value,k=props.section;
     if(k==='research')return research(d);
     if(k==='people')return people(d);
     if(k==='publications')return publications(d,query.value,theme.value);
     if(k==='opportunities')return opportunities(d);
     if(k==='guide')return guide(d,props.slug);
     if(k==='application')return application(d,props.slug);
     if(k==='gallery')return gallery(d);
     return screen([hero('Research','Not found.','Please explore the research programme.',null,[['Research',base+'/research']])]);
   };
 }
};
