import { StyleSheet } from 'react-native';

import { palette, typography } from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 22,
    paddingBottom: 0,
  },
  innerContainer: {
    flex: 1,
  },
  header36: {
    ...typography.header36,
    color: palette.BLACK,
  },
  semiheader18: {
    ...typography.semiheader18,
    color: palette.WHITE,
    fontWeight: 500,
  },
  subListContainer: {
    paddingHorizontal: 22,
  },
  buttonContainer: {
    padding: 22,
    paddingTop: 16,
    backgroundColor: palette.WHITE,
  },
  button: {
    ...typography.semiheader18,
    color: palette.WHITE,
    backgroundColor: palette.BROWN2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
});
