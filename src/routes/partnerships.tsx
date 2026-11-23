import { createFileRoute } from "@tanstack/react-router";
import { Page, pageHead } from "@/components/spe-site";

export const Route = createFileRoute("/partnerships")({
  component: () => <Page page="partnerships" />,
  head: () => pageHead("partnerships"),
});
