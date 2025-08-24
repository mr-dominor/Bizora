import SectionTwoClient from "./sectionTwoClient";
import { getAttribute } from "@/lib/data";
import { Item } from "@/lib/type_def";
export default async function SectionTwo(){
    const {oneItemPerFabric} = await getAttribute()
    return <SectionTwoClient data={oneItemPerFabric} />
}