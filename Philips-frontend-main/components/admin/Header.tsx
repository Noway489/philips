// components/admin/Header.tsx
"use client";

import React from "react";

export default function Header({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <div>
        {/* Placeholder for search/profile */}
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Profile
        </button>
      </div>
    </header>
  );
}
