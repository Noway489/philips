"use client";

import { useState } from "react";
import ProductCard, { Product } from "@/components/common/ProductCard";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";
import Headers from "@/components/common/Header";

const products: Product[] = [
  {
    id: 1,
    name: "Viva Collection Air Fryer",
    image: "https://via.placeholder.com/300x200?text=Air+Fryer",
    price: "₹8,999",
    description: "Crispy fries with rapid air technology — up to 90% less fat.",
  },
  {
    id: 2,
    name: "Daily Collection Electric Kettle",
    image: "https://via.placeholder.com/300x200?text=Kettle",
    price: "₹1,299",
    description: "1.5L fast-boil kettle with auto shut-off and boil-dry protection.",
  },
  {
    id: 3,
    name: "Premium Collection Mixer Grinder",
    image: "https://via.placeholder.com/300x200?text=Mixer+Grinder",
    price: "₹3,499",
    description: "Powerful 750W motor with 3 stainless-steel jars for all recipes.",
  },
  {
    id: 4,
    name: "Steam & Go Handheld Garment Steamer",
    image: "https://via.placeholder.com/300x200?text=Garment+Steamer",
    price: "₹2,299",
    description: "Quick wrinkle removal for garments and fabrics on the go.",
  },
  {
    id: 5,
    name: "Puricare Air Purifier 3000i",
    image: "https://via.placeholder.com/300x200?text=Air+Purifier",
    price: "₹19,999",
    description: "HEPA filter captures 99.97% of particles as small as 0.3 microns.",
  },
  {
    id: 6,
    name: "Daily Collection Hand Blender",
    image: "https://via.placeholder.com/300x200?text=Hand+Blender",
    price: "₹2,199",
    description: "Easy-to-use 600W blender with whisk and chopper attachments.",
  },
  {
    id: 7,
    name: "Digital Steam Iron",
    image: "./assets/product_placeholder.jpeg",
    price: "₹1,799",
    description: "Ceramic soleplate with precision tip and anti-drip technology.",
  },
  {
    id: 8,
    name: "PerformancePlus Toaster",
    image: "",
    price: "₹1,499",
    description: "4-slot toaster with browning control and defrost function.",
  },
];

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const pageContext = "User visited the Domestic Appliances products page. They browsed a variety of Philips appliances such as air fryers, kettles, mixer grinders, garment steamers, air purifiers, hand blenders, irons, and toasters etc. The user is expected to provide feedback on product details, images, pricing, and overall shopping experience.";

  return (
    <>
    <Headers />
    <div className="max-w-7xl mt-10 mx-auto px-4 py-16">
      <h1 className="text-3xl font-semibold text-philips-blue mb-8">
        Domestic Appliances
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <FeedbackButton onClick={() => setOpen(true)} />
        <FeedbackDialog
        open={open}
        onOpenChange={setOpen}
        pageContext={pageContext}
      />
      </div>
    </div>
    </>
  );
}
