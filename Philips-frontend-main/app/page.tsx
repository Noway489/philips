"use client";

import { useState } from "react";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";

export default function Home() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to Our Platform</h1>
        <p className="text-lg text-muted-foreground">
          This is a demo page showcasing our Smart Feedback Collector. Click the feedback button in the bottom right to try it out!
        </p>
      </div>

      <FeedbackButton onClick={() => setFeedbackOpen(true)} />
      <FeedbackDialog
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        pageContext="User visited the homepage and is interested in providing feedback."
      />
    </main>
  );
}