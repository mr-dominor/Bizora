/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { DeleteIcon } from "lucide-react";
import { currencyConverter } from "@/utils/utils";
import { Item } from "@/lib/type_def";
import { useEffect,useState } from "react";
import { useAuth } from "@/services/authContext";
import { useRouter } from "next/navigation";


export default function Cart() { // ✅ Keeping your query
  const {user} = useAuth();
  const router = useRouter();
  const [cart,setCart] = useState<Item[]>([])
  useEffect(() => {
    console.log(user)
  if (!user) return;            // wait until user is loaded
  if (!user?.id) {
    router.push("/signin");
    return;                     // stop execution after redirect
  }
    const getData = async()=>{
    try {
        const res = await fetch(`/api/cart?userId=${encodeURIComponent(user?.id)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.error || "Failed to add to cart");
        }
        setCart(data);
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : "Unexpected error");
    }
  }
  getData()
  },[user]);
  console.log(cart)
  
  
  const deleteItemFromCart = async(id:string)=>{

    if(!id) throw new Error("Cannot Delete Item");
    try {
        const res = await fetch("/api/cart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          throw new Error(data.error || "Failed to add to cart");
        }
    } catch (err) {
        throw new Error(err instanceof Error ? err.message : "Unexpected error");
    }
  }

  return (
    <div className="min-h-screen w-screen text-black">
      <div className="w-screen h-20 bg-maroon fixed top-0" />
      <h1 className="text-xl text-black pt-24">MY CART</h1>

      <div className="h-auto w-full flex flex-col justify-center items-center py-4">
        {cart.length === 0 ? (
          <h1 className="text-xl">There is nothing here</h1>
        ) : (
          cart.map((item: any) => {
            const price =
              typeof item.price === "string"
                ? parseFloat(item.price)
                : item.price ?? 0;
            const total = price * (item.quantity ?? 1);

            return (
              <div
                key={item.id}
                className="w-[400px] px-4 py-3 bg-beige border-2 border-solid flex items-start gap-4 mb-4"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title || "Product image"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">No Image</span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold">
                    {item?.title || "Untitled Product"}
                  </h2>
                  <p className="text-sm">
                    Price: {currencyConverter({ amt: price })}
                  </p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                  <p className="text-sm">
                    Total:{" "}
                    <span className="text-maroon font-bold">
                      {currencyConverter({ amt: total })}
                    </span>
                  </p>

                  <div className="w-full h-12 mt-2 border-solid border-t-2 flex">
                    <button className="w-[50%] h-full bg-amber-200 hover:bg-amber-400 hover:text-white">
                      Buy
                    </button>
                    <button className="w-[50%] h-full flex flex-col justify-center items-center bg-amber-200 hover:bg-amber-400 hover:text-white" onClick={()=>deleteItemFromCart(item?.id)}>
                      <DeleteIcon className="w-6 h-6" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
