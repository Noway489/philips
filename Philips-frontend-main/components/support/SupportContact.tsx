// components/support/SupportContact.tsx
"use client";

import React from "react";

export default function SupportContact() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#CCE5FF] rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-[#005EB8] mb-4">
          Still need help?
        </h2>
        <p className="text-gray-700 mb-6">
          Contact our support team via phone or email.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:1800123456"
            className="px-6 py-3 bg-[#005EB8] text-white rounded hover:bg-[#004080] transition"
          >
            Call Us: 1800-123-456
          </a>
          <a
            href="mailto:support@philips.com"
            className="px-6 py-3 bg-white text-[#005EB8] rounded hover:bg-gray-100 transition"
          >
            Email Support
          </a>
        </div>
      </div>
    </section>
  );
}
