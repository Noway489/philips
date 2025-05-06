// components/common/ProductCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/assets/product_placeholder.jpeg";

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
  const imgSrc = product.image || placeholderImage;

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="h-full bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
        <div className="aspect-[4/3] w-full mb-4 overflow-hidden rounded">
          <Image
            src={placeholderImage}
            alt={product.name}
            width={400}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="text-lg font-semibold text-philips-blue mb-2">
          {product.name}
        </h3>
        <p className="text-gray-700 flex-1 mb-4">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold">{product.price}</span>
          <span className="text-sm font-medium text-philips-blue hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
