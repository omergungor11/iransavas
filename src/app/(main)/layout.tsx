import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { LiveStats } from "@/components/home/live-stats";
import { BreakingNewsBanner } from "@/components/layout/breaking-news-banner";
import { DonationPopup } from "@/components/layout/donation-popup";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <LiveStats />
      <Breadcrumb />
      <main className="flex-1">{children}</main>
      <Footer />
      <BreakingNewsBanner />
      <DonationPopup />
    </div>
  );
}
