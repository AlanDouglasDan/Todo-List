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
];
