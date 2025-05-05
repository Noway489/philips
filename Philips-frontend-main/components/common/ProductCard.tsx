// components/common/ProductCard.tsx
"use client";

import React from "react";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      <div className="aspect-[4/3] w-full mb-4 overflow-hidden rounded">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-lg font-semibold text-philips-blue mb-2">
        {product.name}
      </h3>
      <p className="text-gray-600 flex-1 mb-4">{product.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xl font-bold">{product.price}</span>
        <button className="px-4 py-2 bg-philips-light-blue text-philips-blue font-medium rounded hover:bg-philips-blue hover:text-white transition">
          View
        </button>
      </div>
    </div>
  );
}
