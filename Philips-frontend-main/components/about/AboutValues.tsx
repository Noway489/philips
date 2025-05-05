// components/about/AboutValues.tsx
"use client";

import React from "react";

const VALUES = [
  {
    title: "Customer Centricity",
    desc: "We put customers at the heart of everything we do.",
    icon: "/icons/value-customer.svg",
  },
  {
    title: "Sustainability",
    desc: "We are committed to reducing our environmental footprint.",
    icon: "/icons/value-sustainability.svg",
  },
  {
    title: "Collaboration",
    desc: "We work together to deliver innovation and impact.",
    icon: "/icons/value-collaboration.svg",
  },
  {
    title: "Quality",
    desc: "We adhere to the highest standards in everything we create.",
    icon: "/icons/value-quality.svg",
  },
];

export default function AboutValues() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[#005EB8] mb-8">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-lg shadow p-6 text-center"
            >
              <img
                src={v.icon}
                alt={`${v.title} icon`}
                className="mx-auto h-12 w-12 mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
