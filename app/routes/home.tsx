import { loadBookshelfData, type BookshelfData } from "../books/loadBookData";
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

export async function loader(): Promise<BookshelfData> {
  return await loadBookshelfData({
    width: 1500,
    padding: 16,
    bookHeight: [50, 100],
  });
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Bookshelf data={loaderData} />;
}
