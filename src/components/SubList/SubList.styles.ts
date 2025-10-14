import { StyleSheet } from 'react-native';

import { palette, typography } from '../../core/styles';

export default StyleSheet.create({
  flexedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text18: {
    ...typography.text18,
    color: palette.BLACK,
  },
});
