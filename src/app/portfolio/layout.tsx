import ProjectViewer from "@/components/ProjectViewer";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProjectViewer>{children}</ProjectViewer>;
}