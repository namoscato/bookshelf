import type {
  BookshelfConfig,
  BookshelfData,
  BookshelfDataShelf,
} from "./types";

interface Dependencies {
  earliestTime: number;
  latestTime: number;
  config: BookshelfConfig;
}

export class Bookshelf {
  private readonly config: BookshelfConfig;
  private readonly earliestHour: Date;
  private readonly bookWidth: number;

  private readonly shelves: BookshelfDataShelf[] = [];

  private get currentShelf(): BookshelfDataShelf | undefined {
    return this.shelves[this.shelves.length - 1];
  }

  constructor({ earliestTime, latestTime, config }: Dependencies) {
    const maxTime = (latestTime - earliestTime) / 1000 / 60;

    this.config = config;
    this.earliestHour = new Date(earliestTime);
    this.bookWidth = (config.width - 2 * config.padding) / maxTime;
  }

  addReading(reading: Reading): void {
    const date = new Date(reading.date);
    let shelf = this.currentShelf;

    if (date.toDateString() !== shelf?.date.toDateString()) {
      shelf = this.addShelf(reading);
    }

    const time = (date.getTime() - shelf.date.getTime()) / 1000 / 60;
    const height = // TODO: derive book height
      Math.random() * (this.config.bookHeight[1] - this.config.bookHeight[0]) +
      this.config.bookHeight[0];

    shelf.books.push({
      key: `${shelf.date.toDateString()}-${time}`,
      book: reading.book,
      width: this.bookWidth,
      height,
      x: this.config.padding + time * this.bookWidth - this.bookWidth,
      y: shelf.y - height,
    });
  }

  toJSON(): BookshelfData {
    const height =
      (1 + this.shelves.length) * this.config.padding +
      this.shelves.length * this.config.bookHeight[1];

    return {
      shelves: this.shelves,
      width: this.config.width,
      height,
    };
  }

  private addShelf(reading: Reading): BookshelfDataShelf {
    const date = this.createDateAtEarliestHour(reading.date);
    const y =
      (1 + this.shelves.length) * this.config.padding +
      (1 + this.shelves.length) * this.config.bookHeight[1];

    const shelf: BookshelfDataShelf = {
      key: date.toDateString(),
      date,
      books: [],
      y,
    };

    this.shelves.push(shelf);

    return shelf;
  }

  private createDateAtEarliestHour(date: string): Date {
    return new Date(
      new Date(date).setHours(
        this.earliestHour.getHours(),
        this.earliestHour.getMinutes(),
        this.earliestHour.getSeconds(),
        this.earliestHour.getMilliseconds(),
      ),
    );
  }
}

interface Reading {
  date: string;
  book: string;
}
