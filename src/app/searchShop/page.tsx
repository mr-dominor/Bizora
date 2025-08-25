import { Suspense } from "react";
import SearchShopClient from "./searchShopClient";

export default function SearchShopPage() {
  return (
    <Suspense fallback={<h1>Loading search...</h1>}>
      <SearchShopClient />
    </Suspense>
  );
}
