// components/admin/SentimentChart.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartOptions,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

// Register core Chart.js components
ChartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

// Philips brand palette
const PHILIPS_BLUE = "#005EB8";
const PHILIPS_LIGHT_BLUE = "#CCE5FF";
const PHILIPS_GREY = "#A8A8A8";

interface SentimentChartProps {
  type: "line" | "pie";
  title: string;
}

export default function SentimentChart({
  type,
  title,
}: SentimentChartProps) {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch(`/api/admin/stats?type=${type}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to fetch stats");
        }
        const data = await res.json();

        // Override server‐provided colors with Philips palette
        if (type === "pie") {
          data.datasets[0].backgroundColor = [
            PHILIPS_BLUE,
            PHILIPS_LIGHT_BLUE,
            PHILIPS_GREY,
          ];
        } else {
          data.datasets[0].borderColor = PHILIPS_BLUE;
          data.datasets[0].backgroundColor = PHILIPS_LIGHT_BLUE;
          data.datasets[0].fill = true;
        }

        setChartData(data);
      } catch (e: any) {
        setError(e.message);
      }
    }
    loadStats();
  }, [type]);

  // Shared options
  const commonOptions: ChartOptions<"line" | "pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: PHILIPS_GREY,
          padding: 20,
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: PHILIPS_BLUE,
        bodyColor: "#000",
        borderColor: "#ddd",
        borderWidth: 1,
        padding: 8,
      },
    },
  };

  // Extra options for line charts
  const lineOptions: ChartOptions<"line"> = {
    ...commonOptions,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: PHILIPS_GREY },
      },
      y: {
        grid: { color: "#f0f0f0" },
        ticks: { color: PHILIPS_GREY },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
  };

  // Extra options for pie charts
  const pieOptions: ChartOptions<"pie"> = {
    ...commonOptions,
    animation: {
      animateRotate: true,
      duration: 800,
    },
  };

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-red-500">Error loading {title}: {error}</p>
      </div>
    );
  }
  if (!chartData) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">Loading {title}…</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-10 max-h-96">
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: PHILIPS_BLUE }}
      >
        {title}
      </h2>
      <div className="h-full">
        {type === "pie" ? (
          <Pie data={chartData} options={pieOptions} />
        ) : (
          <Line data={chartData} options={lineOptions} />
        )}
      </div>
    </div>
  );
}
