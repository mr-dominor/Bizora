import { getProduct } from "@/lib/query";
import Detail from "@/ui/details/detail";

type ProductPageProps = {
  params: { id: string | string[] };
};

export default async function Product({ params }: ProductPageProps) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const data = await getProduct({ id });
  return <Detail data={data} />;
}
