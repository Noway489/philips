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
  questions: string[];
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
          <th className="px-4 py-2 text-left">Date</th>
          <th className="px-4 py-2 text-left">Time</th>
          <th className="px-4 py-2 text-left">Context</th>
          <th className="px-4 py-2 text-left">Questions</th>
          <th className="px-4 py-2 text-center">Sentiment</th>
          <th className="px-4 py-2 text-center">Score</th>
          <th className="px-4 py-2 text-left">Responses</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={entry.id} className="border-t">
            <td className="px-4 py-2">
              {new Date(entry.timestamp).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </td>
            <td className="px-4 py-2">
              {new Date(entry.timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td className="px-4 py-2">{entry.page_context}</td>
            <td className="px-4 py-2">
              <ul className="list-disc pl-5">
                {entry.questions && entry.questions.map((question, i) => (
                  <li key={i} className="text-sm text-gray-700">{question}</li>
                ))}
              </ul>
            </td>
            <td className="px-4 py-2 text-center">
              {entry.sentiment_label}
            </td>
            <td className="px-4 py-2 text-center">
              {(entry.sentiment_score * 100).toFixed(0)}%
            </td>
            <td className="px-4 py-2">
              <ul className="list-decimal pl-5">
                {entry.user_response
                  .replace(/[{}]/g, "")
                  .split(",")
                  .map((response, i) => (
                    <li key={i} className="text-sm text-gray-700">{response.trim()}</li>
                  ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
