// components/common/Hero.tsx
"use client";
import HeroImage from "@/assets/hero.jpg"; // Adjust the path as necessary
export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${HeroImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-4xl mx-auto text-center text-white px-4">
        <h1 className="text-5xl font-bold drop-shadow-lg">
        Innovation and You
        </h1>
        <p className="mt-4 text-lg drop-shadow-md">
          Discover our latest health and home solutions, crafted with you in mind.
        </p>  
        <button className="mt-8 px-8 py-3 bg-[#CCE5FF] text-[#005EB8] font-semibold rounded hover:bg-white transition">
          Explore Products
        </button>
      </div>
    </section>
  );
}
