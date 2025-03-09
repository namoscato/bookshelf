import type { BookshelfConfig } from "./utils/types";

interface Props {
  config: BookshelfConfig;
  /** right-aligned x position */
  x: number;
  /** bottom-aligned y position */
  y: number;
  width: number;
}

export const BookRect = ({ config, x, y, width }: Props) => {
  const minHeight = config.bookHeight[0];
  const maxHeight = config.bookHeight[1];
  const height = Math.random() * (maxHeight - minHeight) + minHeight; // TODO: derive book height

  return (
    <rect
      x={x - width}
      y={y - height}
      width={width}
      height={height}
      stroke="currentColor"
      fill="none"
    />
  );
};
