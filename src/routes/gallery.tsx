import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/spe-site";
import { pageHead } from "@/lib/spe-site-metadata";

export const Route = createFileRoute("/gallery")({
  component: () => <Page page="gallery" />,
  head: () => pageHead("gallery"),
});
