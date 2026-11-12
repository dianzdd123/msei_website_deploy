import { r as ref, o as onMounted, D as onBeforeUnmount, G as resolveComponent, K as createVNode } from './vendor-DnaV-8Px.js';
import { node as el } from './ResearchUI.20261111privacy.js';

const entries = [
  ['Research', '/research'],
  ['Projects', '/projects'],
  ['Capabilities', '/capabilities'],
  ['Impact', '/impact'],
  ['People', '/people'],
  ['Outputs', '/outputs'],
  ['Opportunities', '/opportunities'],
  ['Contact', '/contact']
];
const dropdowns = {
  Research: [
    ['Overview', '/research'],
    ['Microrobotics', '/research/microrobotics'],
    ['Dexterous manipulation', '/research/dexterous-manipulation'],
    ['Medical robotics', '/research/medical-robotics'],
    ['Scientific automation', '/research/scientific-instrumentation']
  ],
  Projects: [
    ['Evidence portfolio', '/projects'],
    ['Selected publications', '/publications'],
    ['Open-source resources', '/outputs#resources']
  ],
  Capabilities: [
    ['Experimental platforms', '/capabilities#platforms'],
    ['Research methods', '/capabilities#methods']
  ],
  Impact: [
    ['Applications', '/impact#pathways'],
    ['Partnerships', '/impact#partnerships'],
    ['Support', '/impact#support']
  ],
  People: [
    ['Research team', '/people'],
    ['Lab life', '/group-photo']
  ],
  Outputs: [
    ['Overview', '/outputs'],
    ['Publications', '/publications'],
    ['Code and datasets', '/outputs#resources']
  ],
  Opportunities: [
    ['Overview', '/opportunities'],
    ['PhD', '/opportunities/phd'],
    ['MRes', '/opportunities/mres'],
    ['Current vacancies', '/vacancies']
  ]
};

export default {
  name:'NavigationEditorial',
  __scopeId:'data-v-4fca7da3',
  setup() {
    const mobileOpen=ref(false);
    const expanded=ref('');
    let navigation=null;
    const close=()=>{mobileOpen.value=false;expanded.value='';};
    const outside=event=>{if(navigation&&!navigation.contains(event.target))expanded.value='';};
    const escape=event=>{
      if(event.key==='Escape'){close();navigation?.querySelector('.hamburger-btn')?.focus();}
    };
    onMounted(()=>{
      document.addEventListener('click',outside);
      document.addEventListener('keydown',escape);
    });
    onBeforeUnmount(()=>{
      document.removeEventListener('click',outside);
      document.removeEventListener('keydown',escape);
    });
    return ()=>{
      const RouterLink=resolveComponent('router-link');
      const pageLink=(label,path,className='navbar-link')=>
        createVNode(RouterLink,{to:path,class:className,onClick:close},{default:()=>label});
      const subMenu=name=>el('div',{
        id:'lab-submenu-'+name.toLowerCase(),
        class:'research-nav-dropdown lp-site-dropdown',
        role:'group','aria-label':name+' subpages'
      },[
        el('p',{class:'research-nav-label'},'Explore '+name.toLowerCase()),
        ...(dropdowns[name]||[]).map(([label,path])=>pageLink(label,path,'research-nav-sublink'))
      ]);
      const group=(name,path)=>
        el('div',{class:'research-nav-group lp-site-nav-group'},[
          pageLink(name,path),
          el('button',{
            type:'button',class:'research-nav-toggle',
            'aria-label':'Show '+name+' subpages',
            'aria-expanded':expanded.value===name,
            'aria-controls':'lab-submenu-'+name.toLowerCase(),
            onClick:()=>{expanded.value=expanded.value===name?'':name;}
          },el('span',{'aria-hidden':'true'},'⌄')),
          expanded.value===name?subMenu(name):null
        ]);
      const mobileEntry=([name,path])=>
        el('div',{class:'lp-mobile-section'},[
          pageLink(name,path,'mobile-nav-link'),
          dropdowns[name] ? el('div',{class:'mobile-research-pages','aria-label':name+' subpages'},
            dropdowns[name].filter(([label,url])=>label!=='Overview').map(([label,url])=>
              pageLink(label,url,'mobile-research-link'))) : null
        ]);
      return el('nav',{class:'navbar lp-main-navbar','aria-label':'Main navigation',ref:node=>navigation=node},[
        el('div',{class:'navbar-left'},[
          pageLink('MSEI Lab','/','navbar-lab'),
          el('div',{class:'navbar-links desktop-nav'},
            entries.map(([name,path])=>dropdowns[name]?group(name,path):pageLink(name,path))
          )
        ]),
        el('div',{class:'navbar-right'},
          el('button',{
            type:'button',class:'hamburger-btn'+(mobileOpen.value?' active':''),
            'aria-label':mobileOpen.value?'Close navigation menu':'Open navigation menu',
            'aria-expanded':mobileOpen.value,
            'aria-controls':'mobile-navigation',
            onClick:()=>{mobileOpen.value=!mobileOpen.value;expanded.value='';}
          },[0,1,2].map(()=>el('span',{class:'hamburger-line','aria-hidden':'true'})))
        ),
        el('div',{
          id:'mobile-navigation',class:'mobile-menu'+(mobileOpen.value?' open':''),
          inert:mobileOpen.value?undefined:'',
          'aria-hidden':!mobileOpen.value
        },el('div',{class:'mobile-menu-content'},[
          pageLink('Home','/','mobile-nav-link'),
          ...entries.map(mobileEntry)
        ]))
      ]);
    };
  }
};
