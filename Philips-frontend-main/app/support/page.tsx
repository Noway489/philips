// app/support/page.tsx
"use client";
import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SupportHero from "@/components/support/SupportHero";
import SupportCategoryCard, { Category } from "@/components/support/SupportCategoryCard";
import SupportContact from "@/components/support/SupportContact";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";

const categories: Category[] = [
  {
    title: "Product FAQs",
    description: "Find answers to frequently asked questions about our products.",
    icon: "/icons/faq.svg",
  },
  {
    title: "Manuals & Documentation",
    description: "Download user manuals, guides, and specifications.",
    icon: "/icons/manuals.svg",
  },
  {
    title: "Software & Drivers",
    description: "Get the latest software updates and drivers for your device.",
    icon: "/icons/software.svg",
  },
  {
    title: "Repair & Warranty",
    description: "Schedule a repair service and check warranty status.",
    icon: "/icons/repair.svg",
  },
];

export default function SupportPage() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header />

      <SupportHero />

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-center text-[#005EB8] mb-8">
          Explore Support Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <SupportCategoryCard key={cat.title} category={cat} />
          ))}
        </div>
      </section>
      <FeedbackButton onClick={() => setOpen(true)} />
      <FeedbackDialog
        open={open}
        onOpenChange={setOpen}
        pageContext={"User visited the Support page. They are looking for help with product FAQs, manuals, software updates, and repair services."}
      />
      <SupportContact />
      <Footer />
    </>
  );
}
