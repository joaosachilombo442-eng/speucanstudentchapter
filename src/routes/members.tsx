import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/spe-site";
import { pageHead } from "@/lib/spe-site-metadata";

export const Route = createFileRoute("/members")({
  component: () => <Page page="members" />,
  head: () => pageHead("members"),
});
