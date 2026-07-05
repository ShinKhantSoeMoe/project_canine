import cover from '../assets/cover.svg';

/**
 * ---------------------------------------------------------------
 * COMIC INFO — the only data you ever edit by hand.
 * ---------------------------------------------------------------
 * Chapters are NOT listed here. They are discovered automatically
 * from the folders in src/chapters/ (see src/data/chapters.js).
 */
export default {
  title: 'Canine',
  author: 'Kelvin',
  description:
    'A stray dog with a mysterious past navigates a sprawling neon city, ' +
    'searching for the family he lost — and uncovering something much bigger.',
  cover,
  status: 'Ongoing', // e.g. Ongoing | Completed | Hiatus
  tags: ['Action', 'Adventure'],
};
