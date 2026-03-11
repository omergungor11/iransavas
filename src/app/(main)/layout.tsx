import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BreakingNewsBanner } from "@/components/layout/breaking-news-banner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BreakingNewsBanner />
    </div>
  );
}
