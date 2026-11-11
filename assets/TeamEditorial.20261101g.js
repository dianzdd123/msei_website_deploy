import { r as ref, o as onMounted } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261101g.js';
import { node as el, route, link, eyebrow, heading, focusHash } from './ResearchUI.20261101g.js';

const members = section => (section?.subsections || []).map(item => item.data);
const tagList = values => values?.length ? el('ul', { class: 'tm-topics', 'aria-label': 'Research interests' }, values.map(value => el('li', null, value))) : null;
const profileLinks = person => el('div', { class: 'tm-profile-links' }, [
  ...(person.links || []).map(item => link(`${item.label}${item.url.startsWith('https:') ? ' ↗' : ''}`, item.url, 'rd-text-link')),
  person.application ? link(`${person.applicationLabel} →`, person.application, 'rd-text-link') : null
]);
const profile = (person, options = {}) => el('article', { class: `tm-profile${options.featured ? ' tm-featured' : ''}` }, [
  el('div', { class: 'tm-profile-head' }, [
    person.avatar ? el('img', { class: 'tm-portrait', src: person.avatar, alt: person.name.replace(/^Dr /, ''), width: 126, height: 148, loading: options.featured ? 'eager' : 'lazy', decoding: 'async' }) : null,
    el('div', { class: 'tm-profile-name' }, [el(options.featured ? 'h2' : 'h3', null, person.name), el('p', { class: 'tm-role' }, person.role), person.roleDetail ? el('p', { class: 'tm-role-detail' }, person.roleDetail) : null, person.period ? el('p', { class: 'tm-period' }, person.period) : null, person.affiliation ? el('p', { class: 'tm-affiliation' }, person.affiliation) : null])
  ]),
  el('div', { class: 'tm-profile-body' }, [
    person.research ? el('p', { class: 'tm-research-focus' }, person.research) : null,
    person.description ? el('p', { class: 'tm-bio' }, person.description) : null,
    person.project ? el('dl', { class: 'tm-project-focus' }, [el('dt', null, options.alumni ? 'Research during the visit' : 'Doctoral project'), el('dd', null, person.project)]) : null,
    person.supervision ? el('p', { class: 'tm-supervision' }, [el('span', null, 'Supervision '), person.supervision]) : null,
    tagList(person.topics),
    (person.links?.length || person.application) ? profileLinks(person) : null
  ])
]);
const projectCard = person => el('article', { class: 'tm-project-card' }, [
  el('div', { class: 'tm-project-heading' }, [el('h3', null, person.name), el('p', { class: 'tm-period' }, person.period)]),
  person.project ? el('p', { class: 'tm-project-title' }, person.project) : null,
  person.supervisors?.length ? el('p', { class: 'tm-project-mentors' }, [el('strong', null, 'Project supervision '), person.supervisors.join(' · ')]) : null,
  person.support?.length ? el('p', { class: 'tm-project-mentors' }, [el('strong', null, 'Research support '), person.support.join(' · ')]) : null
]);

export default {
  name: 'Team',
  setup() {
    const content = ref(null), failed = ref(false);
    onMounted(async () => {
      document.title = 'Our Team | MSEI Lab | Dandan Zhang';
      try { content.value = await dataService.getData('/data/team-content.json'); focusHash(); }
      catch { failed.value = true; }
    });
    return () => {
      if (failed.value) return el('div', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Our team'), el('p', null, 'The team directory could not load. Please refresh to try again.')]);
      if (!content.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading our team…');
      const data = content.value, sections = data.sections || {}, projectResearchers = members(sections.msstudents), alumni = members(sections.alumni);
      const featuredAlumni = alumni.filter(person => person.avatar), alumniRecords = alumni.filter(person => !person.avatar);
      return el('div', { class: 'tm-page' }, [
        el('section', { class: 'tm-hero', 'aria-labelledby': 'team-title' }, el('div', { class: 'rd-container' }, [eyebrow('PEOPLE AND PERSPECTIVES'), el('h1', { id: 'team-title' }, 'Our team.'), el('p', { class: 'tm-intro' }, data.intro)])),
        el('nav', { class: 'tm-jumpnav', 'aria-label': 'Team directory sections' }, el('div', { class: 'rd-container' }, [link('Lab leadership', '#leadership'), link('Doctoral researchers', '#doctoral-researchers'), link('Visiting colleagues', '#visiting-researchers'), link('Project researchers', '#project-researchers'), link('Alumni', '#alumni')])),
        el('section', { class: 'rd-container tm-section tm-leadership', id: 'leadership', 'aria-label': 'Lab leadership' }, members(sections.principalinvestigator).map(person => profile(person, { featured: true }))),
        el('section', { class: 'tm-tinted tm-section', id: 'doctoral-researchers', 'aria-labelledby': 'doctoral-title' }, el('div', { class: 'rd-container' }, [heading('DOCTORAL RESEARCH', 'Research across scales.', 'Doctoral work connects tactile perception and robot learning with optical and magnetic microrobotics and medical AI, including co-supervised research.', 'doctoral-title'), el('div', { class: 'tm-profile-grid' }, members(sections.phdstudents).map(person => profile(person)))])),
        el('section', { class: 'rd-container tm-section', id: 'visiting-researchers', 'aria-labelledby': 'visiting-title' }, [heading('VISITING COLLEAGUES', 'Ideas in exchange.', 'Visiting researchers bring complementary expertise to our research.', 'visiting-title'), el('div', { class: 'tm-visitor-grid' }, members(sections.visitingresearchers).map(person => profile(person)))]),
        el('section', { class: 'tm-tinted tm-section', id: 'project-researchers', 'aria-labelledby': 'projects-title' }, el('div', { class: 'rd-container' }, [heading('PROJECT RESEARCHERS', 'The 2026 project cohort.', 'Explore individual and group projects across the MRes, MSc and MEng programmes. Each entry identifies the research topic and the project team where recorded.', 'projects-title'),
          el('div', { class: 'tm-programmes' }, (sections.projectprogrammes || []).map(group => el('details', { class: 'tm-programme', open: true }, [el('summary', null, [el('span', null, [el('strong', null, group.title), el('span', { class: 'tm-programme-description' }, group.description)]), el('span', { class: 'tm-disclosure-symbol', 'aria-hidden': 'true' }, '+')]), el('div', { class: 'tm-project-grid' }, projectResearchers.filter(person => person.programmeGroup === group.id).map(projectCard))]))),
          ...(sections.groupprojects || []).map(group => el('article', { class: 'tm-group-project' }, [eyebrow(group.programme), el('h3', null, group.name), el('p', { class: 'tm-project-title' }, group.project), el('p', { class: 'tm-project-mentors' }, [el('strong', null, 'Project supervision '), group.supervisors.join(' · ')]), el('h4', null, 'Project team'), el('ul', { class: 'tm-group-members' }, group.members.map(name => el('li', null, name)))])),
          el('div', { class: 'tm-interns' }, [el('h3', null, 'Interns'), el('ul', null, members(sections.interns).map(person => el('li', null, [el('strong', null, person.name), el('span', null, person.period)])))])
        ])),
        el('section', { class: 'rd-container tm-section', id: 'alumni', 'aria-labelledby': 'alumni-title' }, [heading('ALUMNI', 'Contributions that continue.', 'Former researchers and project students have contributed to tactile robotics, micromanipulation, medical robotics and AI. Explore their research and project topics below.', 'alumni-title'),
          el('div', { class: 'tm-profile-grid tm-alumni-profiles' }, featuredAlumni.map(person => profile(person, { alumni: true }))),
          el('div', { class: 'tm-alumni-grid' }, alumniRecords.map(person => el('article', { class: 'tm-alumni-record' }, [el('h3', null, person.name), el('p', { class: 'tm-period' }, [person.role.replace(/ alumnus$/, ''), person.period].filter(Boolean).join(' · ')), person.project ? el('p', null, person.project) : null])))
        ]),
        el('section', { class: 'tm-contact-band' }, el('div', { class: 'rd-container' }, [el('div', null, [eyebrow('WORK WITH US'), el('h2', null, 'Connect with the lab.'), el('p', null, 'Explore our research or get in touch about research opportunities and collaboration.')]), el('div', { class: 'rd-actions' }, [link('Explore research →', `${route}/research`, 'rd-button rd-light'), link('Research opportunities →', `${route}/vacancies`, 'rd-button rd-outline')])]))
      ]);
    };
  }
};
