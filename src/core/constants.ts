import { palette } from 'core/styles';

export const lists = [
  {
    id: 1,
    title: 'Drink 8 glasses of water',
    tag: 'Health',
    tagBackground: palette.LIGHT_PURPLE,
    tagColor: palette.PURPLE,
    subLists: [
      { id: 1, title: 'Fill a glass of water' },
      { id: 2, title: 'Drink the glass of water' },
      { id: 3, title: 'Repeat 8 times' },
    ],
  },
  {
    id: 2,
    title: 'Edit the PDF',
    tag: 'Work',
    tagBackground: palette.LIGHT_GREEN,
    tagColor: palette.GREEN,
    subLists: [
      { id: 1, title: 'Open the PDF' },
      { id: 2, title: 'Edit the PDF' },
      { id: 3, title: 'Save the PDF' },
    ],
  },
  {
    id: 3,
    title: 'Write in a graduate journal',
    tag: 'Mental Health',
    tagBackground: palette.LIGHT_PINK,
    tagColor: palette.PINK,
    subLists: [
      { id: 1, title: 'Get a notebook' },
      { id: 2, title: 'Write down your thoughts' },
      { id: 3, title: 'Write down your goals' },
    ],
  },
  {
    id: 4,
    title: 'Stretch everyday for 15 mins',
    tag: 'Health',
    tagBackground: palette.LIGHT_PURPLE,
    tagColor: palette.PURPLE,
    subLists: [
      { id: 1, title: 'Stretch your arms' },
      { id: 2, title: 'Stretch your legs' },
      { id: 3, title: 'Repeat 15 times' },
    ],
  },
];

export const TASKS = [
  {
    id: 1,
    title: 'Drink 8 glasses of water',
    startTime: 6,
    duration: 1,
    category: 'Health',
    color: palette.PURPLE,
    backgroundColor: palette.LIGHT_PURPLE,
    subLists: [
      { id: 1, title: 'Fill a glass of water' },
      { id: 2, title: 'Drink the glass of water' },
      { id: 3, title: 'Repeat 8 times' },
    ],
  },
  {
    id: 2,
    title: 'Get a notebook',
    startTime: 9,
    duration: 1,
    category: 'Mental Health',
    color: palette.PINK,
    backgroundColor: palette.LIGHT_PINK,
    subLists: [
      { id: 1, title: 'Get a notebook' },
      { id: 2, title: 'Write down your thoughts' },
      { id: 3, title: 'Write down your goals' },
    ],
  },
  {
    id: 3,
    title: 'Work',
    startTime: 10,
    duration: 4,
    category: 'Work',
    color: palette.GREEN,
    backgroundColor: palette.LIGHT_GREEN,
    subLists: [
      { id: 1, title: 'Get a notebook' },
      { id: 2, title: 'Write down your thoughts' },
      { id: 3, title: 'Write down your goals' },
    ],
  },
];
