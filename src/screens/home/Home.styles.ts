import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { palette, typography } from '../../core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 22,
  },
  innerContainer: {
    flex: 1,
  },
  header36: {
    ...typography.header36,
    color: palette.BLACK,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 32,
    gap: 8,
  },
  categoryCard: {
    width: wp('50%') - 22 - 4,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
  },
  semiheader18: {
    ...typography.semiheader18,
    color: palette.BLACK,
    fontWeight: 500,
  },
  categoryCount: {
    ...typography.text14,
    color: palette.GREY,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 45,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: palette.DARK_BROWN,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
});
