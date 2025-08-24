import { NextResponse } from "next/server";
import { getProduct } from "@/lib/query";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url, `http://${req.headers.get("host")}`);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const result = await getProduct({ id });
    if (!result || !result.length) throw new Error("Can't fetch the data");

    return NextResponse.json(result); // send single product
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || "Fetch failed" },
      { status: 400 }
    );
  }
}
