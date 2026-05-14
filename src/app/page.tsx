import { getContent } from "@common/api";
import { PortfolioTuiContainer } from "@features/portfolio-tui/containers";

export default async function HomePage() {
  const content = await getContent();
  return <PortfolioTuiContainer initialContent={content} />;
}
