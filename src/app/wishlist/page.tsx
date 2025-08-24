import postgres from "postgres";
import { DeleteIcon } from "lucide-react";
import { currencyConverter } from "@/utils/utils";

const sql = postgres(process.env.LOCAL_DATABASE_URL!);

export default async function Wishlist() {
  const wishlist = await sql`SELECT * FROM wishlist;`; // ✅ Keeping your query

  return (
    <div className="min-h-screen w-screen text-black">
      <div className="w-screen h-20 bg-maroon fixed top-0" />
      <h1 className="text-xl text-black pt-24">MY WISHLIST</h1>

      <div className="h-auto w-full flex flex-col justify-center items-center py-4">
        {wishlist.length === 0 ? (
          <h1 className="text-xl">Your wishlist is empty</h1>
        ) : (
          wishlist.map((item: any) => {
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
                    {item.title || "Untitled Product"}
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
                      Move to Cart
                    </button>
                    <button className="w-[50%] h-full flex flex-col justify-center items-center bg-amber-200 hover:bg-amber-400 hover:text-white">
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
