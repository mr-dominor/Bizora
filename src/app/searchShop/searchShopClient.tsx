"use client";

import SearchClient from "@/ui/general/searchClient";
import { Item } from "@/lib/type_def";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchShopClient() {
  const [data, setData] = useState<Item[]>([]);
  const [status, setStatus] = useState("Nothing Found");
  const searchParams = useSearchParams();
  const newData = searchParams.get("data");

  useEffect(() => {
    if (!newData) return;
    try {
      const arrayData: { id: string }[] = JSON.parse(
        decodeURIComponent(newData)
      );
      setData([]); // clear before fetching
      arrayData.forEach((a) => fetchData(a.id));
    } catch (e) {
      console.error("Failed to parse newData", e);
    }
  }, [newData]);

  const fetchData = async (id: string) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/searching?id=${id}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const fetched: Item[] = await res.json();
      setData((prev) => [...prev, ...fetched]);
    } catch (error) {
      console.error("error occurred", error);
    }
  };

  return (
    <>
      {data.length === 0 && <h1>{status}</h1>}
      <SearchClient data={data} />
    </>
  );
}
