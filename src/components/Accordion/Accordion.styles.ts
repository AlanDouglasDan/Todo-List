import { StyleSheet } from 'react-native';

import { palette, typography } from 'core/styles';

export default StyleSheet.create({
  badgeContainer: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginTop: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  semiheader12: {
    ...typography.semiheader12,
  },
  accordionContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  gap: {
    gap: 12,
  },
  text18: {
    ...typography.text18,
    color: palette.BLACK,
  },
});
