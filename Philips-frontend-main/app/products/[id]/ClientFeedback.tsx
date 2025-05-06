"use client";

import { useState } from "react";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { FeedbackDialog } from "@/components/feedback/FeedbackDialog";
import { Product } from "@/components/common/ProductCard";

interface Props {
  product: Product;
}

export default function ClientFeedback({ product }: Props) {
  const [open, setOpen] = useState(false);

  const pageContext = `User visited the product detail page for "${product.name}". They viewed the product image, description, and price of ${product.price}. They may provide feedback on the product display, clarity of information, pricing, and overall shopping experience.`;

  return (
    <>
      <div className="mt-8">
        <FeedbackButton onClick={() => setOpen(true)} />
        <FeedbackDialog
          open={open}
          onOpenChange={setOpen}
          pageContext={pageContext}
        />
      </div>
    </>
  );
}