"use client";

import React, { useEffect, useState, Fragment } from "react";
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
  insights: {
    summary: string;
    theme: string;
    action_items: string[];
  };
}

const PHILIPS_BLUE = "#005EB8";
const PHILIPS_LIGHT_BLUE = "#CCE5FF";

export default function FeedbackTable() {
  const [data, setData] = useState<FeedbackEntry[] | null>(null);
  const [openInsightId, setOpenInsightId] = useState<number | null>(null);

  useEffect(() => {
    fetchFeedback().then(setData);
  }, []);

  if (!data) return <LoadingSpinner />;

  const toggleInsight = (id: number) => {
    setOpenInsightId((prev) => (prev === id ? null : id));
  };

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
          <th className="px-4 py-2 text-center">Insights</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <Fragment key={entry.id}>
            <tr className="border-t">
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
                  {entry.questions &&
                    entry.questions.map((question, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        {question}
                      </li>
                    ))}
                </ul>
              </td>
              <td className="px-4 py-2 text-center">{entry.sentiment_label}</td>
              <td className="px-4 py-2 text-center">
                {(entry.sentiment_score * 100).toFixed(0)}%
              </td>
              <td className="px-4 py-2">
                <ul className="list-decimal pl-5">
                  {entry.user_response
                    .replace(/[{}]/g, "")
                    .split(",")
                    .map((response, i) => (
                      <li key={i} className="text-sm text-gray-700">
                        {response.trim()}
                      </li>
                    ))}
                </ul>
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => toggleInsight(entry.id)}
                  className="px-2 py-1 border rounded hover:bg-blue-100 transition-colors"
                  style={{ borderColor: PHILIPS_BLUE, color: PHILIPS_BLUE }}
                >
                  {openInsightId === entry.id ? "Hide" : "View"} Insights
                </button>
              </td>
            </tr>
            {openInsightId === entry.id && (
              <tr>
                <td colSpan={8} className="p-4 bg-blue-50">
                  <div className="border rounded-lg p-4 shadow-sm" style={{ borderColor: PHILIPS_BLUE }}>
                    <h3 className="text-lg font-bold mb-2" style={{ color: PHILIPS_BLUE }}>
                      Insights
                    </h3>
                    <p className="mb-2">
                      <span className="font-semibold">Summary:</span> {entry.insights.summary}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Theme:</span> {entry.insights.theme}
                    </p>
                    <div>
                      <span className="font-semibold">Action Items:</span>
                      <ul className="list-disc pl-5 mt-1 text-sm text-gray-700">
                        {entry.insights?.action_items?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
