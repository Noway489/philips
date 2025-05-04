// components/admin/StatsCard.tsx
"use client";

import React from "react";

interface StatsCardProps {
  title: string;
  metric: string | number;
  delta?: string; // e.g. "+4.5%" or "-2.1%"
}

export default function StatsCard({ title, metric, delta }: StatsCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <dt className="text-sm font-medium text-gray-500">{title}</dt>
      <dd className="mt-1 text-2xl font-semibold text-gray-900">{metric}</dd>
      {delta && (
        <dd className="mt-2 text-sm text-gray-500">{delta} vs. last period</dd>
      )}
    </div>
  );
}
