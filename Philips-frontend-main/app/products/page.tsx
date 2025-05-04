"use client";

import { useState } from "react";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Philips Air Purifier",
    description: "Keep your indoor air fresh and clean.",
    image: "/images/product1.jpg",
  },
  {
    id: 2,
    name: "Philips LED TV",
    description: "Experience stunning visuals with our latest LED TVs.",
    image: "/images/product2.jpg",
  },
  {
    id: 3,
    name: "Philips Electric Shaver",
    description: "Precision grooming for every style.",
    image: "/images/product3.jpg",
  },
];

export default function ProductsPage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Base context for the products page.
  let pageContext = "User visited the Products page on Philips India.";
  if (selectedProduct) {
    pageContext += ` They selected ${selectedProduct.name}: ${selectedProduct.description}`;
  } else {
    pageContext += " Exploring innovative products like Air Purifiers, LED TVs, and Electric Shavers.";
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setFeedbackOpen(true);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Philips India Products</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Discover the innovative range of Philips products designed for India.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="border p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* FeedbackButton as an alternative entry point */}
      <FeedbackButton onClick={() => setFeedbackOpen(true)} />
      <FeedbackDialog
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        pageContext={pageContext}
      />
    </main>
  );
}
