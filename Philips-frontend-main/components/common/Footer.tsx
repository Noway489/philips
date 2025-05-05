// components/common/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 px-4">
        {["Products", "Support", "About", "E-Store", "News"].map((col) => (
          <div key={col}>
            <h4 className="text-white font-semibold mb-2">{col}</h4>
            <ul className="space-y-1">
              {["Link 1", "Link 2", "Link 3"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
