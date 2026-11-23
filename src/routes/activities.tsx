import { createFileRoute } from "@tanstack/react-router";
import { Page, pageHead } from "@/components/spe-site";

export const Route = createFileRoute("/activities")({
  component: () => <Page page="activities" />,
  head: () => pageHead("activities"),
});
