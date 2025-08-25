import { getProduct } from "@/lib/query";
import Detail from "@/ui/details/detail";

type ProductPageProps = {
  params: { id: string | string[] };
};

export default async function Product({ params }: ProductPageProps) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  try {
    const data = await getProduct({ id });

    if (!data) {
      // optional: handle missing product gracefully
      // e.g. show notFound page
      // import { notFound } from "next/navigation";
      // return notFound();
      return <div>Product not found</div>;
    }

    return <Detail data={data} />;
  } catch (error) {
    console.error("❌ Failed to fetch product:", error);
    return <div>Something went wrong while loading the product.</div>;
  }
  }
