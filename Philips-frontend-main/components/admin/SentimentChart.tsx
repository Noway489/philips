"use client";

import { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(Tooltip, Legend, ArcElement, CategoryScale, LinearScale, PointElement, LineElement);

interface SentimentChartProps {
  type: "line" | "pie";
  title: string;
}

export default function SentimentChart({ type, title }: SentimentChartProps) {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchStats(type: string) {
    const res = await fetch(`/api/admin/stats?type=${type}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to fetch stats");
    }
    return res.json();
  }

  useEffect(() => {
    fetchStats(type)
      .then((data) => {
        setChartData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [type]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!chartData) return <p>Loading chart data...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {type === "pie" ? <Pie data={chartData} /> : <Line data={chartData} />}
    </div>
  );
}