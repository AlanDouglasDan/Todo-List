export const formatHeaderDate = (date: Date) => {
  const day = date.getDate();
  const mon = date.toLocaleString('en-US', { month: 'short' });
  return `${day} ${mon}`;
};
