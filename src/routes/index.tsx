import { createFileRoute } from "@tanstack/react-router";
import { Page, pageHead } from "@/components/spe-site";

export const Route = createFileRoute("/")({
  component: () => <Page page="home" />,
  head: () => pageHead("home"),
});