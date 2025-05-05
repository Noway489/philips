// components/support/SupportHero.tsx
"use client";

import React, { useState } from "react";

export default function SupportHero() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with real search handling
    alert(`Searching for: ${query}`);
  };

  return (
    <section
      className="bg-[#005EB8] mt-10 text-white py-16 px-4"
      aria-label="Support Search"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-xl mx-auto"
          role="search"
        >
          <input
            type="search"
            placeholder="Search support articles, FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            aria-label="Search support"
          />
          <button
            type="submit"
            className="bg-[#CCE5FF] text-[#005EB8] px-6 py-3 rounded-r-lg font-semibold hover:bg-white transition"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
