import { Item } from "@/lib/type_def"
export const priceLowToHigh=({data}:{data:Item[]})=>{
  const newData = [...data].sort((a,b)=>(a.price as number)-(b.price as number))
  return newData;
}

export const priceHighTolow=({data}:{data:Item[]})=>{
  const newData = [...data].sort((a, b) => (b.price as number)- (a.price as number));
  return newData;
}

export const priceNewestFirst=({data}:{data:Item[]})=>{
  const newData = [...data].sort((a,b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  return newData;
}