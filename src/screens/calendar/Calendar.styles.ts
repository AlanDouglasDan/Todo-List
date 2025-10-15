import { StyleSheet } from 'react-native';

import { palette, typography } from 'core/styles';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  contentContainer: {
    flex: 1,
    padding: 22,
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
    color: palette.BLACK,
    fontWeight: '500',
  },
  calendarContainer: {
    paddingVertical: 8,
  },
  dayElement: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.GREY,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  dayElementSelected: {
    borderColor: palette.BROWN2,
    backgroundColor: palette.GREY2,
  },
  dayElementSpacing: {
    marginLeft: 8,
  },
  dayOfWeek: {
    fontSize: 12,
    color: 'rgba(18, 18, 18, 0.5)',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  dayOfWeekSelected: {
    color: palette.BLACK,
  },
  dayOfMonth: {
    fontSize: 17,
    fontWeight: '600',
    color: 'rgba(18, 18, 18, 0.5)',
  },
  dayOfMonthSelected: {
    color: palette.BLACK,
  },
  agendaContainer: {
    flex: 1,
    marginTop: 32,
  },
  timeSlotRow: {
    flexDirection: 'row',
    minHeight: 60,
    marginBottom: 12,
  },
  timeSlotRowEmpty: {
    minHeight: 30,
  },
  timeLabel: {
    fontSize: 14,
    color: 'rgba(18, 18, 18, 0.5)',
    width: 60,
    paddingTop: 2,
  },
  taskColumn: {
    flex: 1,
    // marginLeft: 8,
  },
  taskCard: {
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskHeader: {
    flexDirection: 'row',
    flex: 1,
  },
  taskDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 17,
    color: palette.BLACK,
    flex: 1,
  },
  taskDuration: {
    fontSize: 14,
    color: 'rgba(18, 18, 18, 0.5)',
    // marginTop: 8,
  },
});
