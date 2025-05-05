// components/common/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/">
          {/* Replace '/logo.svg' with your Philips logo asset */}
          <h1 className="text-2xl font-extrabold text-[#005EB8]">PHILIPS</h1>
        </Link>
        <nav className="space-x-6 text-gray-700">
          {["Products", "Support", "About"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="hover:text-blue-700 transition"
            >
              {item}
            </Link>
          ))}
        </nav>
        <button className="px-4 py-2 bg-[#005EB8] text-white rounded hover:bg-[#004080] transition">
          Sign up
        </button>
      </div>
    </header>
  );
}
