import { r as ref, c as computed, o as onMounted, N as useRoute, W as useRouter } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261109d.js';
import { node as el, route as baseRoute, link, eyebrow, focusHash } from './ResearchUI.20261109d.js';

const normalise = value => String(value || '').toLowerCase().replace(/[–—‐-]/g, ' ').replace(/\s+/g, ' ').trim();
const primaryLink = paper => ['DOI', 'arXiv', 'PDF', 'Project'].map(type => (paper.links || []).find(item => item.type === type)).find(Boolean) || (paper.links || [])[0];
const resourceKind = item => {
  const type = normalise(item.type);
  if (type === 'dataset' || type === 'data') return 'dataset';
  if (type === 'video' || type === 'movie' || item.mediaType === 'video') return 'video';
  if (['github', 'code', 'software'].includes(type)) {
    try { return new URL(item.url).hostname.toLowerCase() === 'github.com' ? 'github' : 'code'; } catch { return 'code'; }
  }
  return 'paper';
};
const resourceIdentity = item => {
  try {
    const url = new URL(item.url);
    if (url.hostname === 'youtu.be') return `youtube:${url.pathname.slice(1)}`;
    if (/(^|\.)youtube\.com$/.test(url.hostname) && url.searchParams.get('v')) return `youtube:${url.searchParams.get('v')}`;
    return `${url.origin}${url.pathname.replace(/\/$/, '')}${url.search}${url.hash}`;
  } catch { return item.url; }
};
const resourceLinks = paper => {
  const links = [...(paper.links || [])];
  if (paper.videoId) links.push({ type: 'Video', url: `https://www.youtube.com/watch?v=${paper.videoId}` });
  const seen = new Set();
  return links.filter(item => {
    if (!item.url) return false;
    const key = resourceIdentity(item);
    if (seen.has(key)) return false;
    seen.add(key); return true;
  }).map(item => ({ ...item, kind: resourceKind(item) })).sort((a, b) => ({ paper: 0, github: 1, code: 1, dataset: 2, video: 3 }[a.kind] - { paper: 0, github: 1, code: 1, dataset: 2, video: 3 }[b.kind]));
};
const resourceLabel = item => item.label || ({ github: 'GitHub', dataset: 'Dataset', video: 'Video', code: 'Code' }[item.kind] || item.type);
const resourceLink = (item, paper) => link([el('span', null, resourceLabel(item)), el('span', { 'aria-hidden': 'true' }, '↗')], item.url, `pub-resource-link pub-resource-${item.kind}`, { 'aria-label': `${resourceLabel(item)} for ${paper.title}`, ...(item.description ? { title: item.description } : {}) });
const isPaperFigure = figure => Boolean(figure?.src && ['paper', 'project'].includes(figure.kind));
const figureNode = (figure, title) => isPaperFigure(figure) ? el('figure', { class: 'pub-figure pub-source-figure' }, [
  el('a', { href: figure.src, target: '_blank', rel: 'noopener noreferrer', class: 'pub-figure-image-link', 'aria-label': `Open the figure for ${title}` }, el('img', { src: figure.src, alt: figure.alt || title, loading: 'lazy', decoding: 'async', width: figure.width || 800, height: figure.height || 500 })),
  el('figcaption', null, [el('span', null, figure.caption), figure.credit ? el('span', { class: 'pub-figure-credit' }, figure.credit) : null, el('span', { class: 'pub-figure-links' }, [link('Open figure ↗', figure.src, 'pub-figure-source', { target: '_blank', rel: 'noopener noreferrer' }), figure.sourceUrl ? link('Figure source ↗', figure.sourceUrl, 'pub-figure-source') : null, figure.licenseUrl ? link(`${figure.licenseLabel || 'Figure licence'} ↗`, figure.licenseUrl, 'pub-figure-source') : null])])
]) : null;

export default {
  name: 'PublicationsEditorial',
  setup() {
    const content = ref(null), failed = ref(false), search = ref(''), selectedTheme = ref('all'), selectedYear = ref('all'), selectedType = ref('all'), videoOnly = ref(false);
    const route = useRoute(), router = useRouter();
    const papers = computed(() => (content.value?.sections || []).filter(p => p.title && p.year));
    const themes = computed(() => content.value?.themes || []);
    const legacyKeywords = computed(() => (Array.isArray(route.query.keyword) ? route.query.keyword.join(',') : String(route.query.keyword || '')).split(',').map(x => x.trim()).filter(Boolean));
    const years = computed(() => [...new Set(papers.value.map(p => p.year))].sort((a, b) => Number(b) - Number(a)));
    const types = computed(() => [...new Set(papers.value.map(p => p.type))].sort());
    const themeById = id => themes.value.find(theme => theme.id === id);
    const filtered = computed(() => {
      const terms = normalise(search.value).split(' ').filter(Boolean), keywords = legacyKeywords.value.map(normalise);
      return papers.value.filter(p => {
        if (selectedTheme.value !== 'all' && p.primaryTheme !== selectedTheme.value) return false;
        if (selectedYear.value !== 'all' && p.year !== selectedYear.value) return false;
        if (selectedType.value !== 'all' && p.type !== selectedType.value) return false;
        if (videoOnly.value && !resourceLinks(p).some(item => item.kind === 'video')) return false;
        if (keywords.length && !(p.keywords || []).some(k => keywords.includes(normalise(k)))) return false;
        const searchable = normalise([p.title, (p.authors || []).join(' '), p.venue, p.year, p.summary, ...(p.keywords || []), themeById(p.primaryTheme)?.title, ...(p.relatedThemes || []).map(id => themeById(id)?.title)].join(' '));
        return terms.every(term => searchable.includes(term));
      }).sort((a, b) => Number(b.year) - Number(a.year));
    });
    const grouped = computed(() => {
      const groups = themes.value.map(theme => ({ ...theme, papers: filtered.value.filter(p => p.primaryTheme === theme.id) })).filter(group => group.papers.length);
      const extra = filtered.value.filter(p => !themes.value.some(t => t.id === p.primaryTheme));
      if (extra.length) groups.push({ id: 'additional-work', title: 'Additional work', description: 'Further contributions across the research programme.', papers: extra });
      return groups;
    });
    const hasFilters = computed(() => search.value.trim() || selectedTheme.value !== 'all' || selectedYear.value !== 'all' || selectedType.value !== 'all' || videoOnly.value || legacyKeywords.value.length);
    const removeKeyword = () => { const query = { ...route.query }; delete query.keyword; router.replace({ path: '/publications', query, hash: route.hash }); };
    const clearFilters = () => { search.value = ''; selectedTheme.value = 'all'; selectedYear.value = 'all'; selectedType.value = 'all'; videoOnly.value = false; if (legacyKeywords.value.length) removeKeyword(); };
    const chooseTheme = id => {
      selectedTheme.value = id;
      requestAnimationFrame(() => document.getElementById('publication-filters')?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
    };
    onMounted(async () => {
      document.title = 'Publications by research theme | MSEI Lab | Dandan Zhang';
      try { content.value = await dataService.getData('/data/publications-content.json'); focusHash(); }
      catch { failed.value = true; }
    });
    const paperCard = paper => {
      const main = primaryLink(paper), theme = themeById(paper.primaryTheme), related = (paper.relatedThemes || []).map(themeById).filter(Boolean);
      return el('article', { class: `pub-paper${isPaperFigure(paper.figure) ? '' : ' pub-paper-text-only'}`, id: paper.id, 'aria-labelledby': `${paper.id}-title` }, [
        figureNode(paper.figure, paper.title),
        el('div', { class: 'pub-paper-content' }, [
          el('div', { class: 'pub-paper-meta' }, [el('span', { class: 'pub-year' }, paper.year), el('span', { class: `pub-status${paper.type === 'Preprint' ? ' pub-status-preprint' : ''}` }, paper.type), theme ? el('span', { class: 'pub-primary-theme' }, theme.shortTitle) : null]),
          el('h3', { id: `${paper.id}-title` }, main ? link(paper.title, main.url) : paper.title),
          el('p', { class: 'pub-summary' }, paper.summary),
          el('p', { class: 'pub-authors' }, (Array.isArray(paper.authors) ? paper.authors : [paper.authors]).flatMap((author, index) => [index ? ', ' : '', String(author || '').trim() === 'Dandan Zhang' ? el('strong', null, 'Dandan Zhang') : String(author || '').trim()])),
          el('p', { class: 'pub-venue' }, paper.venue),
          el('ul', { class: 'pub-keywords', 'aria-label': 'Research keywords' }, (paper.keywords || []).map(keyword => el('li', null, keyword))),
          el('nav', { class: 'pub-paper-links', 'aria-label': `Resources for ${paper.title}` }, resourceLinks(paper).map(item => resourceLink(item, paper))),
          related.length ? el('p', { class: 'pub-related' }, [el('span', null, 'Also connects to '), ...related.flatMap((t, index) => [index ? ' · ' : '', el('button', { type: 'button', onClick: () => chooseTheme(t.id) }, t.shortTitle)])]) : null
        ])
      ]);
    };
    return () => {
      if (failed.value) return el('div', { class: 'rd-container rd-load', role: 'alert' }, [el('h1', null, 'Publications'), el('p', null, 'The publication list could not load. Please refresh to try again.'), link('Dandan Zhang on Google Scholar ↗', 'https://scholar.google.com/citations?user=233I39oAAAAJ&hl=en', 'rd-text-link')]);
      if (!content.value) return el('p', { class: 'rd-container rd-load', role: 'status' }, 'Loading publications…');
      const d = content.value;
      return el('div', { class: 'rd-research pub-page' }, [
        el('section', { class: 'pub-header', 'aria-labelledby': 'publications-title' }, el('div', { class: 'rd-container' }, [
          eyebrow('PUBLICATIONS'),
          el('h1', { id: 'publications-title' }, 'Publications by research theme'),
          el('p', { class: 'pub-lead' }, 'Selected journal and conference papers, clearly labelled preprints, and accompanying code, datasets and videos.'),
          el('nav', { class: 'pub-header-links', 'aria-label': 'Publication resources' }, [link('Research overview →', `${baseRoute}/research/`), link('Google Scholar ↗', d.intro.scholarUrl)])
        ])),
        el('section', { class: 'rd-container pub-browse', id: 'publication-filters', 'aria-label': 'Find publications' }, [
          el('form', { class: 'pub-filter-form', role: 'search', 'aria-label': 'Filter publications', onSubmit: event => event.preventDefault() }, [
            el('div', { class: 'pub-search-field' }, [el('label', { for: 'publication-search' }, 'Search publications'), el('input', { id: 'publication-search', type: 'search', value: search.value, onInput: event => { search.value = event.target.value; }, placeholder: 'Title, author, method or keyword', autocomplete: 'off' })]),
            el('div', { class: 'pub-filter-field' }, [el('label', { for: 'publication-theme' }, 'Research theme'), el('select', { id: 'publication-theme', value: selectedTheme.value, onChange: event => { selectedTheme.value = event.target.value; } }, [el('option', { value: 'all' }, 'All themes'), ...themes.value.map(theme => el('option', { value: theme.id }, theme.title))])]),
            el('div', { class: 'pub-filter-field' }, [el('label', { for: 'publication-year' }, 'Year'), el('select', { id: 'publication-year', value: selectedYear.value, onChange: event => { selectedYear.value = event.target.value; } }, [el('option', { value: 'all' }, 'All years'), ...years.value.map(year => el('option', { value: year }, year))])]),
            el('div', { class: 'pub-filter-field' }, [el('label', { for: 'publication-type' }, 'Publication type'), el('select', { id: 'publication-type', value: selectedType.value, onChange: event => { selectedType.value = event.target.value; } }, [el('option', { value: 'all' }, 'All types'), ...types.value.map(type => el('option', { value: type }, type))])]),
            el('div', { class: 'pub-filter-options' }, [el('label', { class: 'pub-video-filter' }, [el('input', { type: 'checkbox', checked: videoOnly.value, onChange: event => { videoOnly.value = event.target.checked; } }), el('span', null, 'Papers with video')]), el('button', { type: 'button', class: 'pub-clear-button', disabled: !hasFilters.value, onClick: clearFilters }, 'Clear filters')])
          ]),
          legacyKeywords.value.length ? el('div', { class: 'pub-legacy-filter' }, [el('p', null, `Keyword filter from the research page: ${legacyKeywords.value.join(', ')}`), el('button', { type: 'button', onClick: removeKeyword }, 'Remove keyword filter')]) : null,
          el('div', { class: 'pub-results-line' }, [el('p', { id: 'publication-results-count', role: 'status', 'aria-live': 'polite' }, `${filtered.value.length} of ${papers.value.length} publications${hasFilters.value ? ' match your filters' : ' · grouped by primary research theme'}`), el('p', null, 'Newest first within each theme')]),
          el('nav', { class: 'pub-group-jumps', 'aria-label': 'Visible publication themes' }, grouped.value.map(group => link(`${group.title} (${group.papers.length})`, `#theme-${group.id}`)))
        ]),
        el('div', { class: 'rd-container pub-results', id: 'publication-results' }, [
          !filtered.value.length ? el('section', { class: 'pub-empty', 'aria-labelledby': 'no-publications-title' }, [el('h2', { id: 'no-publications-title' }, 'No publications match these filters.'), el('p', null, 'Try a broader term, another year or a different research theme.'), el('button', { type: 'button', class: 'rd-button rd-primary', onClick: clearFilters }, 'Show all publications')]) : null,
          ...grouped.value.map(group => el('section', { class: 'pub-theme-section', id: `theme-${group.id}`, 'aria-labelledby': `theme-${group.id}-title` }, [
            el('div', { class: 'pub-theme-heading' }, [el('div', null, [eyebrow(`${group.papers.length} ${group.papers.length === 1 ? 'PUBLICATION' : 'PUBLICATIONS'}`), el('h2', { id: `theme-${group.id}-title` }, group.title), group.question ? el('p', { class: 'pub-theme-question' }, group.question) : null]), el('div', null, [el('p', { class: 'pub-theme-description' }, group.description), link('Explore this research theme →', `${baseRoute}/research/#${group.id}`, 'rd-text-link'), link('Back to filters ↑', '#publication-filters', 'pub-back-link')])]),
            el('div', { class: 'pub-paper-list' }, group.papers.map(paperCard))
          ]))
        ]),
        el('footer', { class: 'rd-container pub-footer-note' }, [link('Research applications →', `${baseRoute}/research/#applications`), link('Full publication record on Google Scholar ↗', d.intro.scholarUrl)])
      ]);
    };
  }
};
