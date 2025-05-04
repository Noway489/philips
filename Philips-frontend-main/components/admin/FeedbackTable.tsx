// components/admin/FeedbackTable.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchFeedback } from "@/services/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export interface FeedbackEntry {
  id: number;
  timestamp: string;
  page_context: string;
  sentiment_label: string;
  sentiment_score: number;
  user_response: string;
}

export default function FeedbackTable() {
  const [data, setData] = useState<FeedbackEntry[] | null>(null);

  useEffect(() => {
    fetchFeedback().then(setData);
  }, []);

  if (!data) return <LoadingSpinner />;

  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left">Time</th>
          <th className="px-4 py-2 text-left">Context</th>
          <th className="px-4 py-2">Sentiment</th>
          <th className="px-4 py-2">Score</th>
          <th className="px-4 py-2">Excerpt</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={entry.id} className="border-t">
            <td className="px-4 py-2">{new Date(entry.timestamp).toLocaleString()}</td>
            <td className="px-4 py-2">{entry.page_context}</td>
            <td className="px-4 py-2 text-center">{entry.sentiment_label}</td>
            <td className="px-4 py-2 text-center">
              {(entry.sentiment_score * 100).toFixed(0)}%
            </td>
            <td className="px-4 py-2">
              {entry.user_response.slice(0, 50)}…
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
