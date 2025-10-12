import { StyleSheet } from 'react-native';

import { palette, typography } from '../../core/styles';

export default StyleSheet.create({
  flexedRow: {
    flexDirection: 'row',
    gap: 16,
  },
  text18: {
    ...typography.text18,
    color: palette.BLACK,
    marginTop: -4,
  },
});
