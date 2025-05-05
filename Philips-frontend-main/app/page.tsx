// app/page.tsx
"use client";

import Header from "@/components/common/Header";
import Hero from "@/components/common/Hero";
import Features from "@/components/common/Features";
import Newsletter from "@/components/common/Newsletter";
import Footer from "@/components/common/Footer";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header />

      <main className="pt-20"> {/* top padding to offset fixed header */}
        <Hero />
        <Features />
        <Newsletter />
      </main>

      <Footer />

      <FeedbackButton onClick={() => setOpen(true)} />
      <FeedbackDialog
        open={open}
        onOpenChange={setOpen}
        pageContext="User visited the homepage"
      />
    </>
  );
}
