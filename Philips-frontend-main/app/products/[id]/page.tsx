import Headers from "@/components/common/Header";
import ClientFeedback from "./ClientFeedback";
import { products } from "./products";
import ProductImage from "@/assets/product_placeholder.jpeg";

interface PageProps {
  params: { id: string };
}

export default function ProductPage({ params }: PageProps) {
  const productId = parseInt(params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Headers />
      <div className="max-w-4xl mt-36 mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={ProductImage.src}
              alt={product.name}
              className="object-cover w-full h-full rounded"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-philips-blue">
              {product.name}
            </h1>
            <p className="mt-4 text-gray-700">{product.description}</p>
            <p className="mt-4 text-xl font-semibold">{product.price}</p>
            {/* client-side feedback UI */}
            <ClientFeedback product={product} />
          </div>
        </div>
      </div>
    </>
  );
}

// Pre-render all product pages
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id.toString() }));
}