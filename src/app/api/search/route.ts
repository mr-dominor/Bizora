import { NextResponse } from "next/server";
import { searchSuggestion } from "@/lib/query";
export async function GET(req:Request){
    try {
        const {searchParams} = new URL(req.url)
        const term = searchParams.get("q");
        console.log("Term in route is:",term)
        if (!term) {
          return NextResponse.json(
            { error: "Term is required" },
            { status: 400 }
          );
        }
        const res = await searchSuggestion({term})
        if (!res) throw new Error("Cant fetch search data");
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json(
          { error: (error as Error).message || "failed" },
          { status: 400 }
        );
    }
}