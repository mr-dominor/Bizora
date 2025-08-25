import { getProduct } from "@/lib/query";
import Detail from "@/ui/details/detail";

export default async function Product({ params }: any) {
  const data = await getProduct({ id: params.id });
  return <Detail data={data} />;
}
