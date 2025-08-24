import { NextResponse } from "next/server";
import { addToCart,deleteFromCart,getFromCart } from "@/server/handlers/cartHandlers";


export async function POST(req:Request){
    try {
        const {title,image,id,price,userId} =await req.json();
        const result = await addToCart({title,image,id,price,userId});
        return NextResponse.json(
            {message:"Added Successfully"}
        );
    } catch (err) {
            return NextResponse.json(
            { error: (err as Error).message || "Login failed" },
            { status: 400 }
       );
    }
}

export async function DELETE(req:Request){
    try {
        const {id} =await req.json();
        const result = await deleteFromCart({id});
        return NextResponse.json(
            {message:"Added Successfully"}
        );
    } catch (err) {
            return NextResponse.json(
            { error: (err as Error).message || "Delete failed" },
            { status: 400 }
       );
    }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url, `http://${req.headers.get("host")}`);
    const userId = searchParams.get("userId");
    console.log("UserId in route is:",userId)
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const result = await getFromCart({id:userId});
    console.log(result)
    if (!result) throw new Error("Cant fetch cart data");

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || "Delete failed" },
      { status: 400 }
    );
  }
}
