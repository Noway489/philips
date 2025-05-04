// components/admin/FilterControls.tsx
"use client";

import React from "react";
import { useDateRange } from "@/hooks/useDateRange";

export default function FilterControls() {
  const { from, to, setRange } = useDateRange();

  return (
    <div className="flex items-center space-x-4 mb-6">
      <label className="flex items-center space-x-2">
        <span>From:</span>
        <input
          type="date"
          value={from}
          onChange={(e) => setRange(e.target.value, to)}
          className="border rounded p-1"
        />
      </label>
      <label className="flex items-center space-x-2">
        <span>To:</span>
        <input
          type="date"
          value={to}
          onChange={(e) => setRange(from, e.target.value)}
          className="border rounded p-1"
        />
      </label>
      {/* You can add additional filters here (e.g. pageContext, sentiment) */}
    </div>
  );
}
