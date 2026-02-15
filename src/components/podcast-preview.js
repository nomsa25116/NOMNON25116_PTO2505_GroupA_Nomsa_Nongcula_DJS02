import { GenreService } from '../utils/GenreService.js';

/**
 * A custom HTML element that displays a podcast preview.
 * @extends HTMLElement
 */
class PodcastPreview extends HTMLElement {
  /**
   * Creates an instance of PodcastPreview.
   * Used Shadow DOM for encapsulation and initializes the component.
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.addEventListeners();
  }

  /**
   * Defines the observed attributes for reactivity.
   * @returns {string[]}
   */
  static get observedAttributes() {
    return ['image', 'title', 'genres', 'seasons', 'updated', 'id'];
  }

  /**
   * Attribute changes and re-renders the component.
   * @param {string} name - The name of the changed attribute.
   * @param {string} oldValue - The previous value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  /**
   * Renders the component's HTML and CSS within the Shadow DOM.
   */
  render() {
    const image = this.getAttribute('image') || '';
    const title = this.getAttribute('title') || 'Unknown Title';
    const genres =
      this.getAttribute('genres')
        ?.split(',')
        .map((g) => parseInt(g.trim())) || [];
    const seasons = parseInt(this.getAttribute('seasons')) || 0;
    const updated = this.getAttribute('updated') || '';

    const genreNames = GenreService.getNames(genres);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 300px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s;
          font-family: 'Inter', sans-serif;
        }

        :host(:hover) {
          transform: translateY(-4px);
        }

        .card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .content {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .seasons {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          background: #f0f0f0;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
          color: #333;
        }

        .updated-text {
          margin: 0;
          font-size: 0.8rem;
          color: #999;
        }

        @media (max-width: 600px) {
          :host {
            max-width: 100%;
          }
        }
      </style>
      <div class="card">
        <img src="${image}" alt="${title} cover">
        <div class="content">
          <h3>${title}</h3>
          <p class="seasons">${seasons} season${seasons !== 1 ? 's' : ''}</p>
          <div class="tags">
            ${genreNames.map((g) => `<span class="tag">${g}</span>`).join('')}
          </div>
          <p class="updated-text">${this.formatDate(updated)}</p>
        </div>
      </div>
    `;
  }

  /**
   * Formats an ISO date string into a human-readable format.
   * @param {string} dateStr - ISO date string.
   * @returns {string} Formatted date string.
   */
  formatDate(dateStr) {
    if (!dateStr) return 'Unknown Date';
    const date = new Date(dateStr);
    return `Updated ${date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`;
  }

  /**
   * Adds click event listener to dispatch a custom event.
   */
  addEventListeners() {
    this.addEventListener('click', () => {
      const detail = {
        id: this.getAttribute('id'),
        title: this.getAttribute('title'),
        image: this.getAttribute('image'),
        genres: this.getAttribute('genres')
          ?.split(',')
          .map((g) => parseInt(g.trim())),
        seasons: parseInt(this.getAttribute('seasons')),
        updated: this.getAttribute('updated'),
      };
      const event = new CustomEvent('podcast-click', {
        detail,
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    });
  }
}

// Register the custom element
customElements.define('podcast-preview', PodcastPreview);