/**
 * ---------------------------------------------------------------
 * COMIC CATALOG — this is the single place you edit to add content.
 * ---------------------------------------------------------------
 *
 * To add a new comic:
 *   1. Drop its page images into  public/comics/<comic-id>/<chapter-id>/
 *   2. Add an entry to the array below.
 *
 * To add a new chapter to an existing comic:
 *   1. Drop its images into  public/comics/<comic-id>/<new-chapter-id>/
 *   2. Add a chapter object to that comic's `chapters` array.
 *
 * `pages` is a list of image paths, in reading order.
 * Later, if you move to a backend/CMS, only src/services/comicService.js
 * needs to change — the rest of the app reads data through it.
 */

const comics = [
  {
    id: 'canine',
    title: 'Canine',
    author: 'Kelvin',
    description:
      'A stray dog with a mysterious past navigates a sprawling neon city, ' +
      'searching for the family he lost — and uncovering something much bigger.',
    cover: '/comics/canine/cover.svg',
    status: 'Ongoing', // e.g. Ongoing | Completed | Hiatus
    tags: ['Action', 'Adventure'],
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'The Stray',
        releaseDate: '2026-06-01',
        pages: [
          '/comics/canine/ch-1/01.svg',
          '/comics/canine/ch-1/02.svg',
          '/comics/canine/ch-1/03.svg',
          '/comics/canine/ch-1/04.svg',
        ],
      },
      {
        id: 'ch-2',
        number: 2,
        title: 'Neon Alleys',
        releaseDate: '2026-06-15',
        pages: [
          '/comics/canine/ch-2/01.svg',
          '/comics/canine/ch-2/02.svg',
          '/comics/canine/ch-2/03.svg',
          '/comics/canine/ch-2/04.svg',
        ],
      },
    ],
  },
  {
    id: 'sample-comic',
    title: 'Sample Comic',
    author: 'Guest Artist',
    description:
      'A second comic to show how the library scales. Delete this entry ' +
      'once you have real content.',
    cover: '/comics/sample-comic/cover.svg',
    status: 'Completed',
    tags: ['Slice of Life'],
    chapters: [
      {
        id: 'ch-1',
        number: 1,
        title: 'One and Only',
        releaseDate: '2026-05-20',
        pages: [
          '/comics/sample-comic/ch-1/01.svg',
          '/comics/sample-comic/ch-1/02.svg',
          '/comics/sample-comic/ch-1/03.svg',
        ],
      },
    ],
  },
];

export default comics;
