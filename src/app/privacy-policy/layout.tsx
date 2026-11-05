import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy – Quadbreak Studios",
  description:
    "Read how Quadbreak Studios collects, uses, and protects information submitted through our website and project inquiries.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
