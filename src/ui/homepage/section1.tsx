import SectionOneClient from "./sectionOneClient";
import { getAttribute } from "@/lib/data";
import { Item } from "@/lib/type_def";
export default async function SectionOne(){
    const {oneItemPerOccasion} = await getAttribute()
    return <SectionOneClient data={oneItemPerOccasion} />
}