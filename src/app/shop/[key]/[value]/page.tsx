import { getItemsByAttribute } from "@/lib/query";
import SpecifiedCatalog from "@/ui/catalog/specified";

export default async function Shop({
  params,
}: {
  params: {
    key: "occasion" | "fabric" | "style" | "fit" | "color";
    value: string;
  };
}) {
  const { key, value } = params; // ✅ no await here
  console.log(typeof key);

  const data = await getItemsByAttribute({ key, value });

  return <SpecifiedCatalog data={data} />;
}
