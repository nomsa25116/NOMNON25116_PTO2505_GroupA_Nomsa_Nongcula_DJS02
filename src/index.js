import { podcasts } from "./data.js";
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";
import "./components/podcast-preview.js";

/**
 * Initializes the podcast application.
 *
 * @principle SRP - Only responsible for application startup logic like event binding and rendering initial grid.
 */
function init() {
  document
    .getElementById('closeModal')
    .addEventListener('click', createModal.close);
  const grid = createGrid();
  grid.render(podcasts);

  // Add event listener for podcast-click events
  document
    .getElementById('podcastGrid')
    .addEventListener('podcast-click', (e) => {
      createModal.open(e.detail);
    });
}

init();