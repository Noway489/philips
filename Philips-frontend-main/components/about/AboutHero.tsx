// components/about/AboutHero.tsx
"use client";

import React from "react";

export default function AboutHero() {
  return (
    <section
      className="h-96 bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('/about-hero.jpg')" }}
    >
      <div className="max-w-4xl mx-auto text-center text-white px-4">
        <h1 className="text-5xl font-bold drop-shadow-lg">
          About Philips India
        </h1>
        <p className="mt-4 text-lg drop-shadow-md">
          Innovating for a healthier, more sustainable world.
        </p>
      </div>
    </section>
  );
}
