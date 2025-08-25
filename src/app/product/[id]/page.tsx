import { getProduct } from "@/lib/query";
import Detail from "@/ui/details/detail";

export default async function Product({
  params,
}: {
  params: { id: string };
}) {
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
}
