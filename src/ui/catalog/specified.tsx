'use client';

import { Item } from "@/lib/type_def";
import { useState, useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import BannerTwo from "../homepage/bannerTwo";
import NavBar from "../homepage/navbar";
import Image from "next/image";
import { quicksand } from "../fonts";
import { priceLowToHigh,priceHighTolow,priceNewestFirst } from "../utilities/select";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE = 20;

const sortOptions = [
  { id: 1, name: 'Price: Low to High' },
  { id: 2, name: 'Price: High to Low' },
  { id: 3, name: 'Newest' },
  { id: 4, name: 'Popular' },
];

export default function SpecifiedCatalog({ data }: { data: Item[]}) {
  const [modified, setModified] = useState<Item[]>([]);
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [navHeight, setNavHeight] = useState(0);

  // Scroll transforms
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);
  const opacity = useTransform(scrollY, [0, 200], [1, 1]);

  // Set initial state after mount to avoid hydration mismatch
  useEffect(() => {
    setModified(data);
    setVisibleItems(data?.slice(0, PAGE_SIZE));
  }, [data]);

  // Handle sort
  const handleSort = ({ sort }: { sort: string }) => {
    let sorted: Item[] = [];

    switch (sort) {
      case 'price: low to high':
        sorted = priceLowToHigh({ data });
        break;
      case 'price: high to low':
        sorted = priceHighTolow({data});
        break;
      case 'newest':
        sorted = priceNewestFirst({data});
        break;
      case 'popular':
        sorted = [...data]; // Placeholder logic
        break;
      default:
        sorted = [...data];
    }

    setModified(sorted);
    setCurrentPage(1);
    setVisibleItems(sorted.slice(0, PAGE_SIZE));
  };

  // Navbar height
  useEffect(() => {
    const updateNavHeight = () => {
      if (navbarRef.current) {
        setNavHeight(navbarRef.current.offsetHeight);
      }
    };

    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        if (visibleItems.length < modified.length) {
          const nextPage = currentPage + 1;
          const nextItems = modified.slice(0, PAGE_SIZE * nextPage);
          setCurrentPage(nextPage);
          setVisibleItems(nextItems);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleItems, currentPage, modified]);

  return (
    <div className="relative">
      <div
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 h-24 bg-maroon text-white flex items-center px-4 z-30"
      >

      </div>

      <div style={{ height: `${navHeight}px` }} />
      <BannerTwo />

      <motion.div
        className="bg-white z-40 border-b border-gray-200"
        style={{
          position: 'sticky',
          top: navHeight,
          scale,
          opacity,
        }}
      >
        <div className="flex justify-end px-2 py-3 w-full gap-6 mx-auto">
          <Select onValueChange={(value) => handleSort({ sort: value })}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sortOptions.map((p, key) => (
                  <SelectItem
                    key={key}
                    value={p.name.toLowerCase()}
                  >
                    {p.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="w-screen mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className="p-4 h-96 bg-beige border rounded shadow-sm hover:bg-white transition"
          >
            <Link href={`/product/${item.id}`}>
              <div className="w-full h-64 relative overflow-hidden rounded">
                <Image
                  src={item.image.replace(/^(\.\.\/)?public/, '')}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
            </div>
            </Link>
            <p className={`font-semibold text-md md:text-lg mb-2 ${quicksand.className}`}>{item.title}</p>
            <p className={`text-md ${quicksand.className}`}>Rs. {item.price}</p>
          </div>
        ))}
      </div>

      {visibleItems.length < modified.length && (
        <div className="text-center py-6 text-gray-500">Loading more products...</div>
      )}
    </div>
  );
}
