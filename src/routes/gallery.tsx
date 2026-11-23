import { createFileRoute } from "@tanstack/react-router";
import { Page, pageHead } from "@/components/spe-site";

export const Route = createFileRoute("/gallery")({
  component: () => <Page page="gallery" />,
  head: () => pageHead("gallery"),
});
