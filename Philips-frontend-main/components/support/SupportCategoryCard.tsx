// components/support/SupportCategoryCard.tsx
"use client";

import React from "react";

export interface Category {
  title: string;
  description: string;
  icon: string; // path under /public/icons
}

interface CategoryCardProps {
  category: Category;
}

export default function SupportCategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-center">
      <img
        src={category.icon}
        alt={`${category.title} icon`}
        className="mx-auto h-12 w-12 mb-4"
      />
      <h3 className="text-xl font-semibold text-[#005EB8] mb-2">
        {category.title}
      </h3>
      <p className="text-gray-600">{category.description}</p>
    </div>
  );
}
