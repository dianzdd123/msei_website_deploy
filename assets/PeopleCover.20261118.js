import { node, route, link, eyebrow } from './ResearchUI.20261111privacy.js';

export function peopleCover(intro) {
  return node('section', { class: 'lp-hero lp-team-hero', 'aria-labelledby': 'people-title' },
    node('div', { class: 'lp-wrap lp-hero-inner' }, [
      node('div', { class: 'lp-hero-copy' }, [
        eyebrow('MSEI LAB · PEOPLE'),
        node('h1', { id: 'people-title' }, 'The research team.'),
        node('p', { class: 'lp-lede' }, intro || 'Researchers and students exploring intelligence across scales.'),
        node('div', { class: 'lp-actions' }, [
          link('Research', route + '/research', 'lp-action'),
          link('Opportunities', route + '/opportunities', 'lp-action lp-action-secondary')
        ])
      ]),
      node('figure', { class: 'lp-team-art' }, [
        node('div', { class: 'lp-team-illustrations' }, [
          node('img', {
            class: 'lp-team-bench',
            src: '/assets/illustrations/people-dandan-robotics-cartoon.webp',
            alt: 'Cartoon of Dandan Zhang and a colleague testing a tabletop robot gripper.',
            width: 1200, height: 800, decoding: 'async', fetchpriority: 'high'
          }),
          node('img', {
            class: 'lp-team-microscope',
            src: '/assets/illustrations/people-dandan-microscopy-cartoon.webp',
            alt: 'Cartoon of Dandan Zhang positioning a microscope slide while a female PhD researcher adjusts the stage.',
            width: 720, height: 480, decoding: 'async'
          })
        ])
      ])
    ])
  );
}
