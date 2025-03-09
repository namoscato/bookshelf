import { RoughSVG } from "react-rough-fiber";
import { Fragment } from "react/jsx-runtime";
import type { BookData } from "~/books/loadBookData";
import { BookRect } from "./BookRect";
import type { BookshelfConfig } from "./utils/types";

interface Props {
  data: BookData;
  config: BookshelfConfig;
}

export function Bookshelf({ data, config }: Props) {
  const bookWidth = (config.width - 2 * config.padding) / data.maxTime;

  const maxBookHeight = config.bookHeight[1];
  const height =
    (1 + data.days.length) * config.padding + data.days.length * maxBookHeight;

  return (
    <RoughSVG>
      <svg
        viewBox={`0 0 ${config.width} ${height}`}
        width={config.width}
        height={height}
      >
        {data.days.map((day, index) => {
          const date = day.date.toDateString();
          const shelfY =
            (1 + index) * config.padding + (1 + index) * maxBookHeight;

          return (
            <Fragment key={date}>
              {day.readings.map((reading) => (
                <BookRect
                  key={`${date}-${reading.time}`}
                  config={config}
                  x={config.padding + reading.time * bookWidth}
                  y={shelfY}
                  width={bookWidth}
                />
              ))}
              <line
                x1={0}
                y1={shelfY}
                x2={config.width}
                y2={shelfY}
                stroke="currentColor"
              />
            </Fragment>
          );
        })}
      </svg>
    </RoughSVG>
  );
}
