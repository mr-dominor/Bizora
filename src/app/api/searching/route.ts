import { NextResponse } from "next/server";
import { getProduct } from "@/lib/query";
export async function GET(req:Request){
    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if(!id){
            return NextResponse.json(
            { error: "Id is required" },
            { status: 400 }
          );
        } 
        const res = await getProduct({id})
        if (!res) throw new Error("Cant fetch search data");
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json(
          { error: (error as Error).message || "failed" },
          { status: 400 }
        )
    }
}