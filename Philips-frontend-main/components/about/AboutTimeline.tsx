// components/about/AboutTimeline.tsx
"use client";

import React from "react";

const MILESTONES = [
  { year: "1891", text: "Founded in Eindhoven, the Netherlands" },
  { year: "1958", text: "First Philips television launched" },
  { year: "1980", text: "Entered Indian market with hometown office" },
  { year: "2001", text: "Opened largest R&D center in Bangalore" },
  { year: "2015", text: "Expanded healthcare portfolio in India" },
  { year: "2021", text: "Committed to carbon-neutral operations" },
];

export default function AboutTimeline() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[#005EB8] mb-8">
          Our Journey
        </h2>
        <div className="relative border-l-2 border-[#005EB8] ml-4">
          {MILESTONES.map((m, idx) => (
            <div key={m.year} className="mb-8 pl-8 relative">
              <div className="absolute -left-5 top-0 w-4 h-4 bg-[#005EB8] rounded-full" />
              <span className="font-semibold text-[#005EB8]">{m.year}</span>
              <p className="mt-1 text-gray-700">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
