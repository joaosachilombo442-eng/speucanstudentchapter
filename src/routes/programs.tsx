import { createFileRoute } from "@tanstack/react-router";
import { Page, pageHead } from "@/components/spe-site";

export const Route = createFileRoute("/programs")({
  component: () => <Page page="programs" />,
  head: () => pageHead("programs"),
});