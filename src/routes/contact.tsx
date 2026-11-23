import { createFileRoute } from "@tanstack/react-router";
import { Page, pageHead } from "@/components/spe-site";

export const Route = createFileRoute("/contact")({
  component: () => <Page page="contact" />,
  head: () => pageHead("contact"),
});
