import readings from "./readings.json";
import { Bookshelf } from "./utils/Bookshelf";
import type { BookshelfConfig, BookshelfData } from "./utils/types";

export async function loadBookshelfData(
  config: BookshelfConfig,
): Promise<BookshelfData> {
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

  const bookshelf = new Bookshelf({ earliestTime, latestTime, config });

  readings.forEach((reading) => {
    bookshelf.addReading(reading);
  });

  return bookshelf.toJSON();
}
