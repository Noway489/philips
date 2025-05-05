"use client";

import React, { useEffect, useState } from "react";
import StatsCard from "@/components/admin/StatsCard";
import FilterControls from "@/components/admin/FilterControls";
import SentimentChart from "@/components/admin/SentimentChart";
import { fetchFeedback } from "@/services/api";
import { FeedbackEntry } from "@/components/admin/FeedbackTable";

export default function Page() {
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([]);

  useEffect(() => {
    fetchFeedback()
      .then((data) => setFeedbackEntries(data))
      .catch((err) => console.error(err));
  }, []);

  const totalFeedback = feedbackEntries.length;

  // Calculate average sentiment score from processed feedback (ignore pending)
  const processedFeedback = feedbackEntries.filter(
    (entry) => entry.sentiment_label !== "pending"
  );
  const avgSentimentScore =
    processedFeedback.length > 0
      ? processedFeedback.reduce((acc, cur) => acc + cur.sentiment_score, 0) /
        processedFeedback.length
      : 0;
  const avgSentimentFormatted =
    processedFeedback.length > 0 ? (avgSentimentScore * 100).toFixed(0) + "%" : "—";

  // Calculate the average (or most common) sentiment label (mode)
  const sentimentCounts = processedFeedback.reduce((acc, cur) => {
    acc[cur.sentiment_label] = (acc[cur.sentiment_label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const avgSentimentLabel =
    Object.entries(sentimentCounts).reduce(
      (prev, curr) => (curr[1] > prev[1] ? curr : prev),
      ["", 0] as [string, number]
    )[0] || "—";

  return (
    <div className="space-y-8">
      {/* Page title */}
      <h1 className="text-3xl text-[#005EB8] font-semibold">Dashboard Overview</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatsCard title="Total Feedback" metric={totalFeedback.toString()} />
        <StatsCard title="Avg. Sentiment Score" metric={avgSentimentFormatted} />
        <StatsCard title="Avg. Sentiment Label" metric={avgSentimentLabel} />
        <StatsCard title="Voice Usage" metric="38%" />
      </div>

      {/* Filters */}
      <FilterControls />

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <SentimentChart type="line" title="Submissions Over Time" />
        <SentimentChart type="pie" title="Sentiment Distribution" />
      </div>

    </div>
  );
}
