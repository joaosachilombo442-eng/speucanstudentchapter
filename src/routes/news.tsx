import { createFileRoute } from "@tanstack/react-router";
import { Page, pageHead } from "@/components/spe-site";

export const Route = createFileRoute("/news")({
  component: () => <Page page="news" />,
  head: () => pageHead("news"),
});
