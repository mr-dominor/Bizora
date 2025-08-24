"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [load,setLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setSuggestions(data));
    }, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    console.log(suggestions)
  }, [suggestions])

  const handleClick = ()=>{
    const encoded = encodeURIComponent(JSON.stringify(suggestions));
    router.push(`/searchShop?data=${encoded}`);
  }
  
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={load?"Searching":"Search products..."}
        className="text-black h-[50px] px-5 w-[200px] sm:w-[300px] md:w-[400px] rounded-md"
      />
      {(query && suggestions.length === 0) && <div className="bg-white text-black rounded-md">Nothing found!</div> }
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border text-black">
          <li onClick={()=>{
            handleClick()
            setSuggestions([])
            }}>{query}</li>
          {suggestions.map(s => (
            <li
              key={s?.id}
              onClick={() =>{ 
                setSuggestions([])
                router.push(`/product/${s?.id}`)}}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {s?.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
