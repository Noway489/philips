// components/admin/SentimentChart.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchStats } from "@/services/api";
import { Line, Pie } from "react-chartjs-2";

interface SentimentChartProps {
  type: "line" | "pie";
  title: string;
  data: any[]; // placeholder if you want to pass in
}

export default function SentimentChart({ type, title }: SentimentChartProps) {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchStats({ type }).then((stats) => {
      // stats shape depends on your API
      setChartData(stats);
    });
  }, [type]);

  if (!chartData) return <p>Loading {title}...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      {type === "line" ? (
        <Line data={chartData} />
      ) : (
        <Pie data={chartData} />
      )}
    </div>
  );
}
