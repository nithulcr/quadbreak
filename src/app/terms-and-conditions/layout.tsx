import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions – Quadbreak Studios",
  description:
    "Review the terms and conditions that apply to Quadbreak Studios game art production services, project agreements, and website use.",
  path: "/terms-and-conditions",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
