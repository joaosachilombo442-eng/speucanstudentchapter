import { createFileRoute } from "@tanstack/react-router";
import { Page, pageHead } from "@/components/spe-site";

export const Route = createFileRoute("/members")({
  component: () => <Page page="members" />,
  head: () => pageHead("members"),
});