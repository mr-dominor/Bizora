import { supabase } from "@/lib/supabase";

interface CartProps {
  title:string;
  image: string;
  id: string;       // product id
  price: number;
  userId: string;
}

export async function addToCart({ title,image, id, price, userId }: CartProps) {
  try {
    const { data, error } = await supabase
      .from("cart")
      .insert([
        {
          title,
          image,
          productid: id,
          price,
          userid: userId
        }
      ])
      .select(); // returns inserted rows

    if (error) throw error;
    if (!data || data.length === 0) throw new Error("Failed adding to cart");

    return data;
  } catch (error) {
    throw new Error(`Error occurred while adding to cart: ${(error as Error).message}`);
  }
}

export async function deleteFromCart({ id }: { id: string }) {
  try {
    const { data, error } = await supabase
      .from("cart")
      .delete()
      .eq("id", id)
      .select(); // to get the deleted row back

    if (error) throw error;
    if (!data || data.length === 0) throw new Error("Failed deleting from cart");

    return data;
  } catch (error) {
    throw new Error(`Error occurred while deleting from cart: ${(error as Error).message}`);
  }
}

export async function getFromCart({ id }: { id: string }) {
  try {
    const { data, error } = await supabase
      .from("cart")
      .select("*")
      .eq("userid", id);

    if (error) throw error;
    if (!data || data.length === 0) throw new Error("Cart is empty");

    return data||[];
  } catch (error) {
    throw new Error(`Error occurred while fetching cart: ${(error as Error).message}`);
  }
}
