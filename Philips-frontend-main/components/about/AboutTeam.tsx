// components/about/AboutTeam.tsx
"use client";

import React from "react";

const TEAM = [
  {
    name: "Rajiv Mehta",
    role: "Country Manager",
    photo: "/team/rajiv.jpg",
  },
  {
    name: "Anjali Kumar",
    role: "Head of R&D India",
    photo: "/team/anjali.jpg",
  },
  {
    name: "Vikram Singh",
    role: "VP Marketing",
    photo: "/team/vikram.jpg",
  },
  {
    name: "Neha Sharma",
    role: "Head of Sustainability",
    photo: "/team/neha.jpg",
  },
];

export default function AboutTeam() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[#005EB8] mb-8">
          Leadership Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-lg shadow p-6 text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
