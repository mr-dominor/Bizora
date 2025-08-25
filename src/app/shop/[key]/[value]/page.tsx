import { getItemsByAttribute } from "@/lib/query"
import { Item } from "@/lib/type_def"
import SpecifiedCatalog from "@/ui/catalog/specified"

export default async function Shop({ params }: any) {
  const { key, value } = params

  const data = await getItemsByAttribute({ key, value })

  return <SpecifiedCatalog data={data as Item[]} />
}
