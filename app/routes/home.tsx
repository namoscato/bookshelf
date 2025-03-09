import { useWindowWidth } from "@react-hook/window-size";
import { loadBookData, type BookData } from "../books/loadBookData";
import { Bookshelf } from "../components/Bookshelf";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Giovanni's Bookshelf" },
    {
      name: "description",
      content: "Visualizing a week of reading with Giovanni",
    },
  ];
}

export async function loader(): Promise<BookData> {
  return await loadBookData();
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const windowWidth = useWindowWidth();

  return (
    <Bookshelf
      data={loaderData}
      config={{
        width: windowWidth,
        padding: 16,
        bookHeight: [50, 100],
      }}
    />
  );
}
