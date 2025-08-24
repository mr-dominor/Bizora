
import dotenv from 'dotenv'
import { Item } from "./type_def";
dotenv.config()
import { supabase } from "./supabase";

export const getAllQueries = async () => {
  try {
    const { data, error } = await supabase
      .from("items")
      .select("*");

    if (error) throw error;

    return (data as Item[]) ?? [];
  } catch (err) {
    console.log("Unexpected error in getAllQueries:", err);
    return []; // fallback so layout doesn't break
  }
};

export const getItemsByAttribute = async ({
  key,
  value,
}: {
  key: "occasion" | "fabric" | "style"|"fit"|"color";
  value: string;
}) => {
  const allowedKeys = ["occasion", "fabric", "style","fit","color"];
  const decodedValue = decodeURIComponent(value as string)
  if (!allowedKeys.includes(key)) {
    throw new Error("No such attribute");
  }

  // Use sql.unsafe() to insert the validated column name
  try {
    const {data , error} = await supabase.from('items').select('*').eq(key,decodedValue)
    const result = data as Item[] | null;
    if (error) throw error;
    console.log('Items:', data)
    return result
  } catch (err) {
    console.log('Unexpected error:', err);
  }
};

export const getProduct = async({id}:{id:string})=>{
  if(!id) throw new Error("Id is undefined")
    try {
      const {data , error} = await supabase.from('items').select('*').eq('id',id)
      const result = data as Item[] | null;
      if (error) throw error;
      console.log('Items:', data)
      return result
    } catch (err) {
      console.log('Unexpected error:', err);
    }
}

export const searchSuggestion = async({term}:{term:string}) =>{
  if(!term) throw new Error("what to query")
    try {
      const { data, error } = await supabase
    .from("items")
    .select("id, title")
    .textSearch("search_vector", term, {
      type: "plain",
      config: "english",
    })
    .limit(10);
    if(error) throw error;
    console.log(data)
    return data
    } catch (error) {
      console.log('Unexpected error:', error);
    }
}