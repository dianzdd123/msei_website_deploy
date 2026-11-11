import { r as ref, o as onMounted, D as onBeforeUnmount, G as resolveComponent, K as createVNode } from './vendor-DnaV-8Px.js';
import { node as el } from './ResearchUI.20261106a.js';

const applications = [
  ['Microrobotics', '/research/microrobotics'],
  ['Dexterous manipulation', '/research/dexterous-manipulation'],
  ['Medical robotics', '/research/medical-robotics'],
  ['Scientific instrumentation', '/research/scientific-instrumentation']
];
const studyGuides = [
  ['PhD applications', '/opportunities/phd'],
  ['MRes applications', '/opportunities/mres']
];
const pages = [
  ['Team', '/team'], ['Publications', '/publications'], ['Talks', '/talks'],
  ['Teaching', '/teaching'], ['Services', '/services'],
  ['Opportunities', '/opportunities'], ['Group photos', '/group-photo']
];

export default {
  name: 'NavigationEditorial',
  __scopeId: 'data-v-4fca7da3',
  setup() {
    const mobileOpen = ref(false), researchOpen = ref(false), opportunitiesOpen = ref(false);
    let navigation = null, researchButton = null, opportunitiesButton = null;
    const close = () => { mobileOpen.value = false; researchOpen.value = false; opportunitiesOpen.value = false; };
    const outsideClick = event => { if (navigation && !navigation.contains(event.target)) close(); };
    const escape = event => {
      if (event.key !== 'Escape') return;
      if (researchOpen.value) researchButton?.focus();
      if (opportunitiesOpen.value) opportunitiesButton?.focus();
      close();
    };
    onMounted(() => {
      document.addEventListener('click', outsideClick);
      document.addEventListener('keydown', escape);
    });
    onBeforeUnmount(() => {
      document.removeEventListener('click', outsideClick);
      document.removeEventListener('keydown', escape);
    });
    return () => {
      const RouterLink = resolveComponent('router-link');
      const pageLink = (label, path, className = 'navbar-link') => createVNode(RouterLink, { to: path, class: className, onClick: close }, { default: () => label });
      return el('nav', { class: 'navbar', 'aria-label': 'Main navigation', ref: node => { navigation = node; } }, [
        el('div', { class: 'navbar-left' }, [
          pageLink('MSEI Lab', '/', 'navbar-lab'),
          el('div', { class: 'navbar-links desktop-nav' }, [
            el('div', { class: 'research-nav-group' }, [
              pageLink('Research', '/research'),
              el('button', {
                type: 'button', class: 'research-nav-toggle',
                'aria-label': 'Research application pages', 'aria-expanded': researchOpen.value,
                'aria-controls': 'research-navigation-pages',
                ref: node => { researchButton = node; },
                onClick: () => { researchOpen.value = !researchOpen.value; opportunitiesOpen.value = false; }
              }, el('span', { 'aria-hidden': 'true' }, '⌄')),
              researchOpen.value ? el('div', { id: 'research-navigation-pages', class: 'research-nav-dropdown' }, [
                el('p', { class: 'research-nav-label' }, 'Explore by application'),
                ...applications.map(([label, path]) => pageLink(label, path, 'research-nav-sublink')),
                pageLink('Research overview →', '/research', 'research-nav-overview')
              ]) : null
            ]),
            ...pages.map(([label, path]) => path === '/opportunities' ? el('div', { class: 'research-nav-group opportunities-nav-group' }, [
              pageLink(label, path),
              el('button', {
                type: 'button', class: 'research-nav-toggle',
                'aria-label': 'PhD and MRes application guides', 'aria-expanded': opportunitiesOpen.value,
                'aria-controls': 'opportunities-navigation-pages',
                ref: node => { opportunitiesButton = node; },
                onClick: () => { opportunitiesOpen.value = !opportunitiesOpen.value; researchOpen.value = false; }
              }, el('span', { 'aria-hidden': 'true' }, '⌄')),
              opportunitiesOpen.value ? el('div', { id: 'opportunities-navigation-pages', class: 'research-nav-dropdown' }, [
                el('p', { class: 'research-nav-label' }, 'Plan your research pathway'),
                ...studyGuides.map(([guide, url]) => pageLink(guide, url, 'research-nav-sublink')),
                pageLink('All opportunities →', '/opportunities', 'research-nav-overview')
              ]) : null
            ]) : pageLink(label, path))
          ])
        ]),
        el('div', { class: 'navbar-right' }, el('button', {
          type: 'button', class: `hamburger-btn${mobileOpen.value ? ' active' : ''}`,
          'aria-label': 'Toggle navigation menu', 'aria-expanded': mobileOpen.value,
          'aria-controls': 'mobile-navigation',
          onClick: () => { mobileOpen.value = !mobileOpen.value; researchOpen.value = false; opportunitiesOpen.value = false; }
        }, [0, 1, 2].map(() => el('span', { class: 'hamburger-line', 'aria-hidden': 'true' })))),
        el('div', { id: 'mobile-navigation', class: `mobile-menu${mobileOpen.value ? ' open' : ''}`, inert: mobileOpen.value ? undefined : '', 'aria-hidden': !mobileOpen.value },
          el('div', { class: 'mobile-menu-content' }, [
            pageLink('Research overview', '/research', 'mobile-nav-link'),
            el('div', { class: 'mobile-research-pages', 'aria-label': 'Research applications' }, applications.map(([label, path]) => pageLink(label, path, 'mobile-research-link'))),
            ...pages.flatMap(([label, path]) => path === '/opportunities' ? [
              pageLink(label, path, 'mobile-nav-link'),
              el('div', { class: 'mobile-research-pages', 'aria-label': 'Application guides' }, studyGuides.map(([guide, url]) => pageLink(guide, url, 'mobile-research-link')))
            ] : [pageLink(label, path, 'mobile-nav-link')])
          ])
        )
      ]);
    };
  }
};
