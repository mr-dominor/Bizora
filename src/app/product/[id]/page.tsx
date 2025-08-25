import { getProduct } from "@/lib/query";
import Detail from "@/ui/details/detail";

<<<<<<< HEAD
export default async function Product({ params }: any) {
  const data = await getProduct({ id: params.id });
  return <Detail data={data} />;
=======
export default async function Product({
  params,
}: any) {
  try {
    const data = await getProduct({ id: params.id });

    if (!data) {
      return <div>Product not found</div>;
    }

    return <Detail data={data} />;
  } catch (error) {
    console.error("❌ Failed to fetch product:", error);
    return <div>Something went wrong while loading the product.</div>;
  }
>>>>>>> 097b8694f78bd73caffd75799f3e3e7bbd5ed08b
}
