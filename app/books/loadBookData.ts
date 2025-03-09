import readings from "./readings.json";

export interface BookData {
  days: Day[];
  maxTime: number;
}

interface Day {
  date: Date;
  readings: Reading[];
}

interface Reading {
  /** relative minutes since earliest reading */
  time: number;
  book: string;
}

export async function loadBookData(): Promise<BookData> {
  const days: Day[] = [];

  const { earliestTime, latestTime } = readings.reduce<{
    earliestTime: number;
    latestTime: number;
  }>(
    ({ earliestTime, latestTime }, { date }) => {
      const relativeDate = new Date(date).setFullYear(2025, 0, 1);

      return {
        earliestTime: Math.min(earliestTime, relativeDate),
        latestTime: Math.max(latestTime, relativeDate),
      };
    },
    { earliestTime: Infinity, latestTime: 0 },
  );

  const earliestHour = new Date(earliestTime);

  let dayReadings: Reading[] = [];
  let currentDay = new Date(
    new Date(readings[0].date).setHours(
      earliestHour.getHours(),
      earliestHour.getMinutes(),
      earliestHour.getSeconds(),
      earliestHour.getMilliseconds(),
    ),
  );

  readings.forEach((reading) => {
    const date = new Date(reading.date);

    if (date.toDateString() !== currentDay.toDateString()) {
      days.push({ date: currentDay, readings: dayReadings });

      currentDay = new Date(
        new Date(date).setHours(
          earliestHour.getHours(),
          earliestHour.getMinutes(),
          earliestHour.getSeconds(),
          earliestHour.getMilliseconds(),
        ),
      );
      dayReadings = [];
    }

    dayReadings.push({
      time: (date.getTime() - currentDay.getTime()) / 1000 / 60,
      book: reading.book,
    });
  });

  days.push({ date: currentDay, readings: dayReadings });

  return {
    days,
    maxTime: (latestTime - earliestTime) / 1000 / 60,
  };
}
