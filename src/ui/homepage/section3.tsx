import SectionThreeClient from "./sectionThreeClient";
import { getAttribute } from "@/lib/data";
import { Item } from "@/lib/type_def";
export default async function SectionThree(){
   const {oneItemPerStyle} = await getAttribute()
    return <SectionThreeClient data={oneItemPerStyle} />
}