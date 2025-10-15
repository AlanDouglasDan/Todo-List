import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView } from 'react-native';

// Time slots from 00:00 to 23:00 (full day)
export const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => i);

export const useCalendarLogic = () => {
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
        setTimeout(tryScroll, 500);
      }
    };
    tryScroll();
  }, [dates, today]);

  //   // Scroll agenda to current time on mount
  //   useEffect(() => {
  //     const currentHour = today.getHours();
  //     let attempts = 0;
  //     const tryScrollAgenda = () => {
  //       attempts += 1;
  //       const y = timeSlotPositions.current[currentHour];
  //       if (typeof y === 'number' && agendaScrollRef.current) {
  //         agendaScrollRef.current.scrollTo({
  //           y: Math.max(y - 100, 0),
  //           animated: true,
  //         });
  //       } else if (attempts < 10) {
  //         setTimeout(tryScrollAgenda, 50);
  //       }
  //     };
  //     setTimeout(tryScrollAgenda, 300);
  //   }, [today]);

  return {
    today,
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
  };
};

export default useCalendarLogic;
