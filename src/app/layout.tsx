import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "FinWiz - Your Magical Money Companion",
  description: "Smart money management with AI-powered insights. Track spending, save smarter, and achieve your financial goals with FinWiz.",
  keywords: ["fintech", "money management", "budgeting", "savings", "financial planning"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-surface-base">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
