import React, { FC } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackNavParams } from 'navigation/AppStackNav';
import useCalendarLogic, { TIME_SLOTS } from './useCalendarLogic';
import { formatHeaderDate } from 'core/utils';
import { TASKS } from 'core/constants';
import { palette, spacing } from 'core/styles';
import styles from './Calendar.styles';

const Calendar: FC<NativeStackScreenProps<AppStackNavParams, 'Calendar'>> = ({
  navigation,
}) => {
  const {
    selectedDate,
    setSelectedDate,
    scrollViewRef,
    agendaScrollRef,
    dayPositions,
    timeSlotPositions,
    dates,
    formatDayOfWeek,
    isSameDay,
    dateKey,
    formatTime,
  } = useCalendarLogic();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <Text style={styles.header36}>
          Calendar{' '}
          <Text style={{ color: palette.GREY }}>
            {formatHeaderDate(selectedDate)}
          </Text>
        </Text>

        <View style={spacing.marginTop32}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.calendarContainer}
          >
            {dates.map((date, index) => {
              const isSelected = isSameDay(date, selectedDate);
              const key = dateKey(date);

              return (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.dayElement,
                    isSelected && styles.dayElementSelected,
                    index > 0 && styles.dayElementSpacing,
                  ]}
                  onPress={() => setSelectedDate(date)}
                  onLayout={e => {
                    dayPositions.current[key] = e.nativeEvent.layout.x;
                  }}
                >
                  <Text
                    style={[
                      styles.dayOfWeek,
                      isSelected && styles.dayOfWeekSelected,
                    ]}
                  >
                    {formatDayOfWeek(date)}
                  </Text>
                  <Text
                    style={[
                      styles.dayOfMonth,
                      isSelected && styles.dayOfMonthSelected,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Agenda List */}
        <ScrollView
          ref={agendaScrollRef}
          style={styles.agendaContainer}
          showsVerticalScrollIndicator={false}
        >
          {TIME_SLOTS.map(hour => {
            // Check if this hour is the start of any task
            const tasksStartingHere = TASKS.filter(
              task => task.startTime === hour,
            );

            // Check if this hour is occupied by a continuing task (not its start hour)
            const isOccupiedByTask = TASKS.some(
              task =>
                hour > task.startTime && hour < task.startTime + task.duration,
            );

            // Skip rendering this row if it's occupied by a continuing task
            if (isOccupiedByTask) {
              return null;
            }

            const isEmpty = tasksStartingHere.length === 0;

            return (
              <View
                key={hour}
                style={[styles.timeSlotRow, isEmpty && styles.timeSlotRowEmpty]}
                onLayout={e => {
                  timeSlotPositions.current[hour] = e.nativeEvent.layout.y;
                }}
              >
                <Text style={styles.timeLabel}>{formatTime(hour)}</Text>
                <View style={styles.taskColumn}>
                  {tasksStartingHere.map(task => {
                    // Calculate height based on actual time span
                    const rowHeight = 60;
                    const gap = 12;

                    // Calculate total height including rows this task spans
                    let totalHeight = 0;
                    for (let i = 0; i < task.duration; i++) {
                      const currentHour = task.startTime + i;
                      // Check if this hour would have been empty
                      const wouldBeEmpty = !TASKS.some(
                        t =>
                          t !== task &&
                          currentHour >= t.startTime &&
                          currentHour < t.startTime + t.duration,
                      );
                      totalHeight += wouldBeEmpty ? rowHeight : rowHeight;
                      if (i < task.duration - 1) {
                        totalHeight += gap;
                      }
                    }

                    return (
                      <TouchableOpacity
                        key={task.id}
                        style={[
                          styles.taskCard,
                          {
                            backgroundColor: task.backgroundColor,
                            height: totalHeight,
                          },
                        ]}
                        onPress={() => navigation.navigate('Task', { task })}
                      >
                        <View style={styles.taskContent}>
                          <View style={styles.taskHeader}>
                            <View
                              style={[
                                styles.taskDot,
                                { backgroundColor: task.color },
                              ]}
                            />
                            <Text style={styles.taskTitle}>{task.title}</Text>
                          </View>

                          <Text style={styles.taskDuration}>
                            {task.duration}h
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Calendar;
