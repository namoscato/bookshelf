import { RoughSVG } from "react-rough-fiber";
import { Fragment } from "react/jsx-runtime";
import type { BookshelfData } from "~/books/utils/types";

interface Props {
  data: BookshelfData;
}

export function Bookshelf({ data }: Props) {
  return (
    <RoughSVG>
      <svg
        viewBox={`0 0 ${data.width} ${data.height}`}
        width={data.width}
        height={data.height}
      >
        {data.shelves.map((shelf) => {
          return (
            <Fragment key={shelf.key}>
              {shelf.books.map((book) => (
                <rect
                  key={book.key}
                  x={book.x}
                  y={book.y}
                  width={book.width}
                  height={book.height}
                  stroke="currentColor"
                  fill="none"
                />
              ))}
              <line
                x1={0}
                y1={shelf.y}
                x2={data.width}
                y2={shelf.y}
                stroke="currentColor"
              />
            </Fragment>
          );
        })}
      </svg>
    </RoughSVG>
  );
}
