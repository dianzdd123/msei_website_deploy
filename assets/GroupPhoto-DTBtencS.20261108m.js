import { r as ref, o as onMounted, J as element } from './vendor-DnaV-8Px.js';
import { d as dataService } from './index-uZzEyxeI.20261108m.js';

const siteBase = new URL('../', import.meta.url);
const assetUrl = (path) => path ? new URL(path.replace(/^\/+/, ''), siteBase).href : '';

export default {
  name: 'GroupPhoto',
  setup() {
    const data = ref(null);
    const selectedYear = ref('');
    const currentPhoto = ref(null);
    const loading = ref(true);
    const error = ref(false);
    let dialog = null;

    async function loadGallery() {
      loading.value = true;
      error.value = false;
      try {
        const result = await dataService.getData('/data/group-photo-content.json');
        if (!result || !Array.isArray(result.albums) || !result.albums.length) {
          throw new Error('Gallery albums are unavailable.');
        }
        data.value = result;
        selectedYear.value = [...result.albums]
          .sort((a, b) => Number(b.year) - Number(a.year))[0].year;
      } catch {
        error.value = true;
      } finally {
        loading.value = false;
      }
    }

    function openPhoto(photo) {
      currentPhoto.value = photo;
      if (dialog && !dialog.open) dialog.showModal();
    }

    function closePhoto() {
      if (dialog && dialog.open) dialog.close();
    }

    function metadata(photo) {
      return element('p', { class: 'gp-meta' }, [
        photo.date ? element('time', { datetime: photo.dateISO && photo.dateISO.length > 4 ? photo.dateISO : undefined }, photo.date) : null,
        photo.date && photo.location ? element('span', { 'aria-hidden': 'true' }, ' · ') : null,
        photo.location ? element('span', null, photo.location) : null
      ]);
    }

    function photoCard(photo, index) {
      return element('figure', { class: 'gp-card', key: photo.url }, [
        element('button', {
          class: 'gp-image-button',
          type: 'button',
          'aria-label': `Enlarge photo: ${photo.title}`,
          'aria-haspopup': 'dialog',
          onClick: () => openPhoto(photo)
        }, [
          element('img', {
            src: assetUrl(photo.url),
            alt: photo.alt || photo.title,
            width: photo.width,
            height: photo.height,
            loading: index === 0 ? 'eager' : 'lazy',
            decoding: 'async'
          }),
          element('span', { class: 'gp-enlarge', 'aria-hidden': 'true' }, 'Enlarge photo ↗')
        ]),
        element('figcaption', { class: 'gp-card-caption' }, [
          metadata(photo),
          element('h3', null, photo.title),
          element('p', { class: 'gp-caption-text' }, photo.caption)
        ])
      ]);
    }

    onMounted(loadGallery);

    return () => {
      const albums = data.value ? [...data.value.albums].sort((a, b) => Number(b.year) - Number(a.year)) : [];
      const album = albums.find((item) => item.year === selectedYear.value);
      const photo = currentPhoto.value;

      return element('section', { class: 'gp-page', 'aria-labelledby': 'gp-title' }, [
        element('header', { class: 'gp-header' }, [
          element('p', { class: 'gp-eyebrow' }, 'People, collaboration & lab life'),
          element('h1', { id: 'gp-title' }, 'Group photos'),
          element('p', { class: 'gp-intro' }, data.value?.description || 'Moments from the Multi-Scale Embodied Intelligence Lab and our wider research community.')
        ]),
        loading.value ? element('p', { class: 'gp-status', role: 'status' }, 'Loading photo albums…') : null,
        error.value ? element('div', { class: 'gp-error', role: 'alert' }, [
          element('p', null, 'The photo albums could not be loaded. Please try again.'),
          element('button', { class: 'gp-retry', type: 'button', onClick: loadGallery }, 'Try again')
        ]) : null,
        !loading.value && !error.value ? element('div', { class: 'gp-gallery' }, [
          element('div', { class: 'gp-year-filter', role: 'group', 'aria-label': 'Choose a photo album by year' },
            albums.map((item) => element('button', {
              type: 'button',
              key: item.year,
              class: 'gp-year-button',
              'aria-pressed': item.year === selectedYear.value ? 'true' : 'false',
              'aria-controls': 'gp-album',
              onClick: () => { selectedYear.value = item.year; }
            }, item.year))
          ),
          album ? element('section', { id: 'gp-album', class: 'gp-album', 'aria-labelledby': 'gp-album-title' }, [
            element('div', { class: 'gp-album-heading' }, [
              element('div', null, [
                element('p', { class: 'gp-album-year', 'aria-live': 'polite', 'aria-atomic': 'true' }, `${album.year} album · ${album.photos.length} photos`),
                element('h2', { id: 'gp-album-title' }, album.title),
                element('p', { class: 'gp-album-description' }, album.description)
              ]),
              album.sourceUrl ? element('a', { class: 'gp-source-link', href: album.sourceUrl, target: '_blank', rel: 'noopener noreferrer' }, `${album.sourceLabel || 'Photo source'} ↗`) : null
            ]),
            element('div', { class: 'gp-photo-grid' }, album.photos.map(photoCard))
          ]) : null
        ]) : null,
        element('dialog', {
          class: 'gp-dialog',
          ref: (node) => { dialog = node; },
          'aria-labelledby': 'gp-dialog-title',
          onClose: () => { currentPhoto.value = null; },
          onClick: (event) => { if (event.target === dialog) closePhoto(); }
        }, [
          element('div', { class: 'gp-dialog-inner' }, [
            element('div', { class: 'gp-dialog-toolbar' }, [
              element('h2', { id: 'gp-dialog-title' }, photo?.title || 'Photo preview'),
              element('button', { type: 'button', class: 'gp-close', autofocus: true, onClick: closePhoto }, 'Close ×')
            ]),
            photo ? element('figure', { class: 'gp-dialog-figure' }, [
              element('img', { src: assetUrl(photo.url), alt: photo.alt || photo.title, width: photo.width, height: photo.height }),
              element('figcaption', null, [
                metadata(photo),
                element('p', null, photo.caption),
                photo.originalUrl ? element('a', { class: 'gp-source-link', href: assetUrl(photo.originalUrl), target: '_blank', rel: 'noopener noreferrer' }, 'Open original photograph ↗') : null,
                photo.sourceUrl ? element('a', { class: 'gp-source-link', href: photo.sourceUrl, target: '_blank', rel: 'noopener noreferrer' }, 'View photo source ↗') : null
              ])
            ]) : null
          ])
        ])
      ]);
    };
  }
};
