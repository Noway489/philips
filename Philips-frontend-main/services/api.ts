// services/api.ts
import { FeedbackEntry } from "@/components/admin/FeedbackTable";

// Fetch raw feedback
export async function fetchFeedback(): Promise<FeedbackEntry[]> {
  const res = await fetch("/api/admin/feedback");
  if (!res.ok) throw new Error("Failed to fetch feedback");
  return res.json();
}

// Fetch dashboard stats for charts
export async function fetchStats(params: { type: "line" | "pie" }) {
  const res = await fetch(`/api/admin/stats?type=${params.type}`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
