import { node as el, link, route, eyebrow } from './ResearchUI.20261111privacy.js';
export default {
  name:'LabPersonalReferral',
  props:{kind:{type:String,required:true}},
  setup(props) {
    return () => {
      const talks=props.kind==='talks';
      const title=talks?'Invited Talks & Seminars':'Teaching & Supervision';
      const personal=talks
        ?'https://www.intelligentrobotics-acrossscales.com/talks-overview'
        :'https://www.intelligentrobotics-acrossscales.com/teaching';
      const description=talks
        ?'Dandan Zhang’s invited talks, keynotes, seminar archive and speaker information are maintained on her personal academic website. This lab website focuses on the underlying research programme and its evidence.'
        :'Dandan Zhang’s courses, lecture resources, supervision philosophy and guest lectures are maintained on her personal academic website. This lab website focuses on research-team training and opportunities.';
      return el('div',{class:'lp-site lp-referral'},[
        el('section',{class:'lp-hero'},el('div',{class:'lp-wrap lp-referral-head'},[
          eyebrow('MSEI LAB · '+(talks?'SPEAKING':'EDUCATION')),
          el('h1',null,title),
          el('p',{class:'lp-lede'},description),
          el('div',{class:'lp-actions'},[
            link('Visit Dandan Zhang’s personal website ↗',personal,'lp-action'),
            link(talks?'Explore the research programme →':'See research opportunities →',
              talks?route+'/research':route+'/opportunities','lp-action lp-action-secondary')
          ])
        ])),
        el('section',{class:'lp-wrap lp-referral-info'},[
          el('h2',null,talks?'Research underpinning the talks':'Research training in the group'),
          el('p',null,talks
            ?'The MSEI research programme connects sensing, transferable learning, adaptive control and physical design across scales.'
            :'Prospective researchers can explore PhD and MRes application routes, current openings and research areas through the laboratory Opportunities pages.'),
          link(talks?'Research themes and evidence →':'Research opportunities →',
            talks?route+'/research':route+'/opportunities','lp-card-link')
        ])
      ]);
    };
  }
};
