import { Item } from "./type_def";
import { getAllQueries } from "./query";

export async function getAttribute(){
    try {
        const data = await getAllQueries()
        const occasions = [...new Set(data?.map(p=>p.occasion))]
        const oneItemPerOccasion:Item[] = occasions.sort((a, b) => b.localeCompare(a)).map(p=>data?.find(item => item.occasion===p)).filter((item): item is Item => item !== undefined)
        const fabrics = [...new Set(data?.map(p=>p.fabric))]
        const oneItemPerFabric = fabrics.sort((a,b)=>b.localeCompare(a)).map(p=>data?.find((item)=> item.fabric === p)).filter((item): item is Item => item !== undefined)
        const styles = [...new Set(data?.map(p=>p.style))]
        const oneItemPerStyle = styles.sort((a,b)=> b.localeCompare(a)).map(p=>data?.find((item)=>item.style === p)).filter((item):item is Item=>item !== undefined);
        const fit = [...new Set(data?.map(p=>p.fit))]
        const oneItemPerFit = styles.sort((a,b)=> b.localeCompare(a)).map(p=>data?.find((item)=>item.fit === p)).filter((item):item is Item=>item !== undefined);
        return {
            oneItemPerFabric, oneItemPerOccasion, oneItemPerStyle,oneItemPerFit,styles,fit,fabrics,occasions
        }
    } catch (error) {
        console.error('Database Error:',error)
        throw new Error('Failed to load data')
    }
}