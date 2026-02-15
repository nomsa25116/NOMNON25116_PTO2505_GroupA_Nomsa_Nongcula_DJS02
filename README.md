# DJS02 Web Component: Podcast Preview

This project is a **Vanilla JavaScript application** where I'm building a **modular app** using custom Web Components.

In this project, I focused on:

- Using Shadow DOM
- Creating custom elements
- Working with custom events

## Features

- Shows a responsive grid of podcast cards
- Each card is a reusable <podcast-card> Web Component
- Uses utility services for formatting dates and resolving genre names

## Project structure

/src
│
├── /components
│ ├── PodcastCard.js
│ └── createModal.js
│ └── podcast-preview.js
│
├── /utils
│ ├── DateUtils.js
│ └── GenreService.js
│
├── /views
│ └── createGrid.js
│
├── data.js
└── index.js

## What each folder does

1. components

- PodcastCard.js → Contains the custom Web Component
- createModal.js → Controls opening and closing the modal
- podcast-preview.js → Web Component that renders individual podcast cards with Shadow DOM encapsulation; handles reactivity and emits click events

2. utils

- DateUtils.js → Formats podcast dates
- GenreService.js → Converts genre IDs into readable genre names

1. views

- createGrid.js → Creates and displays multiple <podcast-card> elements on the page

4. index.js → Main entry point of the app

5. data.js → Contains sample podcast data

## How to run

1. Clone or download the project.
2. Open index.html in your browser.
3. You will see a list of podcast cards.
4. Click on a card to open the modal with more details.
5. Close the modal to go back to the grid.

## Learning goals

- Web Components help make reusable UI pieces.
- Shadow DOM protects component styles.
- Custom events are useful for communication between parts of an app.