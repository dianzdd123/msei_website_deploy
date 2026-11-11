import { r as ref, o as onMounted, J as el } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261111privacy.js';
const p=(v,c='ts-copy')=>el('p',{class:c},v);
const t=v=>el('h2',{class:'ts-section-title'},v);
const a=(url,label)=>el('a',{href:url,class:'ts-link',target:/^https?:/.test(url)?'_blank':undefined,rel:/^https?:/.test(url)?'noopener noreferrer':undefined},label);
const entries=s=>el('div',{class:'ts-community-items'},s.items.map(x=>el('article',{class:'ts-community-item',key:x.name},[
  x.period?p(x.period,'ts-meta'):null,el('h3',{class:'ts-card-title'},x.name),p(x.description),a(x.url,'View details')
].filter(Boolean))));
const sections=(id,s)=>el('section',{id,class:'ts-section'},[t(s.title),p(s.description,'ts-meta'),entries(s)]);
const photo=x=>el('article',{class:'ts-service-figure-card',key:x.title},[
  el('a',{href:x.links[0].url,target:'_blank',rel:'noopener noreferrer',class:'ts-service-figure-image'},[
    el('img',{src:x.image.src,alt:x.image.alt,loading:'lazy',decoding:'async',class:x.image.fit==='contain'?'ts-fit-contain':'ts-fit-cover'})
  ]),
  el('div',{class:'ts-service-figure-body'},[
    p(x.eyebrow,'ts-service-figure-eyebrow'),el('h3',{class:'ts-service-figure-title'},x.title),
    p(x.description),p(x.image.caption,'ts-service-figure-credit'),
    el('div',{class:'ts-service-figure-links'},x.links.map(y=>a(y.url,y.label)))
  ])
]);
export default {name:'MSEIResearchCommunity',setup(){
  const data=ref(null),failed=ref(false);
  async function load(){try{const x=await dataService.getData('/data/services-content.json');if(!x?.sections?.workshops)throw Error('Missing community content');data.value=x;failed.value=false;}catch(e){failed.value=true;}}
  onMounted(load);
  return ()=>{
    if(failed.value)return el('section',{class:'ts-page'},[t('Research Community'),p('Content unavailable. Reload to try again.','ts-error'),el('button',{type:'button',class:'ts-retry',onClick:load},'Retry')]);
    if(!data.value)return el('section',{class:'ts-page','aria-busy':'true'},[p('Loading research community activities…','ts-meta')]);
    const d=data.value;
    return el('div',{class:'ts-page ts-services ts-community-page'},[
      el('header',{class:'ts-page-header'},[p('MSEI LAB · COMMUNITY & COLLABORATION','ts-eyebrow'),el('h1',{class:'ts-page-title'},d.metadata.title),p(d.intro,'ts-intro')]),
      el('nav',{class:'ts-nav','aria-label':'Research community sections'},[
        ['community-workshops','Workshops'],['community-exchanges','Research exchanges'],['community-resources','Open resources'],['personal-service','Dandan Zhang']
      ].map(([id,label])=>el('a',{href:'#'+id},label))),
      el('section',{class:'ts-section',id:'community-workshops'},[
        t('Selected international workshop contributions'),
        p('Original organiser graphics for selected workshops; no personal portrait or lab group photograph.','ts-meta'),
        el('div',{class:'ts-service-figure-grid'},d.featuredFigures.map(photo)),
        t(d.sections.workshops.title),p(d.sections.workshops.description,'ts-meta'),entries(d.sections.workshops)
      ]),
      sections('community-exchanges',d.sections.exchanges),
      sections('community-resources',d.sections.resources),
      el('section',{class:'ts-section ts-personal-service-box',id:'personal-service'},[
        p('INDIVIDUAL ACADEMIC SERVICE','ts-eyebrow'),t(d.personalService.title),p(d.personalService.description),
        a(d.personalService.url,'View Dandan Zhang’s academic-service profile on Wix')
      ]),
      el('footer',{class:'ts-page-footer'},[
        p('Research-group community record updated November 2026. Individual editorial appointments, reviewing and doctoral examinations are maintained on the linked Wix profile.','ts-meta'),
        el('div',{class:'ts-links'},[a('/msei_website/research','Research'),a('/msei_website/group-photo','Lab photo gallery'),a('/msei_website/talks','Invited talks')])
      ])
    ]);
  };
}};
