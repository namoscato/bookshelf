export interface BookshelfConfig {
  width: number;
  padding: number;
  /** inclusive min and max height */
  bookHeight: [number, number];
}

export interface BookshelfData {
  shelves: BookshelfDataShelf[];
  width: number;
  height: number;
}

export interface BookshelfDataShelf {
  key: string;
  date: Date;
  books: BookshelfDataBook[];
  y: number;
}

export interface BookshelfDataBook {
  key: string;
  book: string;
  width: number;
  height: number;
  x: number;
  y: number;
}
