import React, { FC, useState, useRef, useEffect, useMemo } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppStackNavParams } from 'navigation/AppStackNav';
import { TASKS } from 'core/constants';
import { palette, spacing } from 'core/styles';
import styles from './Calendar.styles';

// Time slots from 00:00 to 23:00 (full day)
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => i);

const Calendar: FC<NativeStackScreenProps<AppStackNavParams, 'Calendar'>> = ({
  navigation,
}) => {
  const today = useMemo(() => new Date(), []);

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const scrollViewRef = useRef<ScrollView>(null);
  const agendaScrollRef = useRef<ScrollView>(null);
  const dayPositions = useRef<{ [key: string]: number }>({});
  const timeSlotPositions = useRef<{ [key: number]: number }>({});

  // Generate dates from first day of current month to last day of next month
  const dates = useMemo(() => {
    const datesList: Date[] = [];
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // First day of current month
    const startDate = new Date(currentYear, currentMonth, 1);

    // Last day of next month
    const endDate = new Date(currentYear, currentMonth + 2, 0);

    // Generate all dates in range
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      datesList.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesList;
  }, [today]);

  // Format day of week (3 letters)
  const formatDayOfWeek = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Format header date
  const formatHeaderDate = (date: Date) => {
    const day = date.getDate();
    const mon = date.toLocaleString('en-US', { month: 'short' });
    return `${day} ${mon}`;
  };

  // Check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Stable local key for a date (avoid timezone/time-of-day issues)
  const dateKey = (date: Date) =>
    `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  // Format time with leading zero
  const formatTime = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  // Scroll to current day on mount
  useEffect(() => {
    const targetKey = dateKey(today);
    let attempts = 0;
    const tryScroll = () => {
      attempts += 1;
      const x = dayPositions.current[targetKey];
      if (typeof x === 'number' && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: Math.max(x - 50, 0),
          animated: true,
        });
      } else if (attempts < 10) {
        setTimeout(tryScroll, 50);
      }
    };
    tryScroll();
  }, [dates, today]);

  // Scroll agenda to current time on mount
  useEffect(() => {
    const currentHour = today.getHours();
    let attempts = 0;
    const tryScrollAgenda = () => {
      attempts += 1;
      const y = timeSlotPositions.current[currentHour];
      if (typeof y === 'number' && agendaScrollRef.current) {
        agendaScrollRef.current.scrollTo({
          y: Math.max(y - 100, 0),
          animated: true,
        });
      } else if (attempts < 10) {
        setTimeout(tryScrollAgenda, 50);
      }
    };
    setTimeout(tryScrollAgenda, 300);
  }, [today]);

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
                      <View
                        key={task.id}
                        style={[
                          styles.taskCard,
                          {
                            backgroundColor: task.backgroundColor,
                            height: totalHeight,
                          },
                        ]}
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
                      </View>
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
