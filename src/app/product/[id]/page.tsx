import { getProduct } from "@/lib/query"
import Detail from "@/ui/details/detail";
type Props = {
    params:{id:string}
}
export default async function Product({params}:Props){
    const {id} = params
    const data = await getProduct({id});
    return <>
    <Detail data={data} />
    </>
}