"use client";

import { useState } from "react";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function AboutPage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  // Dynamic page context indicating the About page
  const pageContext = "User visited the About page on Philips India. They are learning about Philips' legacy, innovation, and values.";

  return (
    <>
    <Header />
    <main className="min-h-screen mt-14 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Philips India</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Philips India is dedicated to improving people’s lives through meaningful innovation, providing solutions that make life healthier, more sustainable, and accessible.
        </p>
      </div>
      <FeedbackButton onClick={() => setFeedbackOpen(true)} />
      <FeedbackDialog 
        open={feedbackOpen} 
        onOpenChange={setFeedbackOpen} 
        pageContext={pageContext} 
      />
    </main>
    <Footer />
    </>
  );
}