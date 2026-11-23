import { createFileRoute } from "@tanstack/react-router";
import { Page, pageHead } from "@/components/spe-site";

export const Route = createFileRoute("/about")({
  component: () => <Page page="about" />,
  head: () => pageHead("about"),
});
