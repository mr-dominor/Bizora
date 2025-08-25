"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingCart, CreditCard } from "lucide-react";
import { currencyConverter } from "@/utils/utils";
import { Item } from "@/lib/type_def";
import Image from "next/image";
import PayButton from "@/ui/checkout/Button";
import Footer from "@/ui/homepage/footer";

export default function BuyPage() {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [error, setError] = useState("");
  const [total,setTotal] = useState(0)
  const [product, setProduct] = useState<Item | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/book?id=${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (data.length === 0 || !data) {
          setError("No data received");
        } else {
          setProduct(data[0]);
        }
      } catch (err:any) {
        setError(err?.message || "Not able to do so" );
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if(product){
      setTotal(quantity * (product?.price as number | 0));
    }
  }, [product,quantity]);

  const handleBuyNow = () => {
    alert(`Proceeding to payment for ${quantity} item(s), size ${size}.`);
  };



  return (
    <div className="min-h-screen w-full">
      <div className="h-24 w-full sticky top-0 z-30 shadow-2xl overflow-hidden bg-maroon"></div>

      <div className="min-h-screen w-full flex justify-center items-center bg-gray-50 p-6">
        <div className="bg-beige rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="md:w-1/2 flex justify-center bg-gray-100">
            <Image
              src={product?.image.replace(/^(\.\.\/)?public/, "") as string}
              alt={product?.title as string}
              width={384}
              height={400}
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-maroon">
                {product?.title}
              </h1>
              <p className="text-gray-600 mt-2">{product?.description}</p>
              <p className="text-2xl font-semibold text-green-600 mt-4">
                {currencyConverter({amt:typeof product?.price === "string"?parseFloat(product?.price):product?.price})}
              </p>

              {/* Size Selector */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <select
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(Number(e.target.value))
                  }}
                  className="border rounded-lg px-3 py-2"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-2xl font-semibold text-green-600 mt-4"><span className="text-maroon">Total:</span>
                {currencyConverter({amt:total})}
              </p>
            {/* Buttons */}
            <div className="mt-8 flex gap-4">
              <PayButton
                name={product?.title as string}
                price={Math.round((product?.price as number | 0))}
                quantity={quantity as number}
                classType={`flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg`}
               >
                <CreditCard /> Buy
               </PayButton>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
