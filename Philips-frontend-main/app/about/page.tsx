// app/about/page.tsx
"use client";
import React from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutValues from "@/components/about/AboutValues";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutTeam from "@/components/about/AboutTeam";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";
import { useState } from "react";

export default function AboutPage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  return (
    <>
      <Header />

      <main className="pt-20">
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutTimeline />
      </main>
      <FeedbackButton onClick={() => setFeedbackOpen(true)} />
      <FeedbackDialog 
        open={feedbackOpen} 
        onOpenChange={setFeedbackOpen} 
        pageContext="User visited the About page. They are interested in learning about the company's mission, values, and history. Add some generic feedback questions as well."
      />
      <Footer />
    </>
  );
}
