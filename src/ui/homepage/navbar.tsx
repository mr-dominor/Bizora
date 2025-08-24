"use client"
import {Bars3Icon,UserIcon, HeartIcon,ShoppingCartIcon, MagnifyingGlassIcon,HomeIcon} from '@heroicons/react/24/solid';
import { quicksand } from '../fonts';
import { useState } from 'react';
import SheetingClient from '../general/sheetingClient';
import Link from 'next/link';
import SearchBar from '../general/search';
import { useRouter } from 'next/navigation';
type NavBarProps = {
    occasions: string[];
    fabrics: string[];
    fit: string[];
    styles: string[];
};

export default function NavBar({occasions,styles,fit,fabrics }:NavBarProps){
    const [sideBar, setSideBar] = useState(false);
    const [search,setSearch] = useState(false);
    const router = useRouter()
    return <nav className="fixed top-0 left-0 right-0 z-50 w-full py-4 flex items-center justify-between ${backdrop-blur-md bg-white/10} text-white animate-slideDown">
        <div className='flex items-center gap-2 p-2' onClick={()=>setSideBar(!sideBar)}><Bars3Icon className="h-6 w-6 cursor-pointer text-white rounded-md hover:text-blue-400 transition-transform duration-300 ease-in-out hover:scale-125" />
        <p className='hidden lg:block'>More</p>
        </div>
        <div className='flex items-center gap-2 px-4'><HomeIcon className="h-6 w-6 cursor-pointer text-white rounded-md hover:text-blue-400 transition-transform duration-300 ease-in-out hover:scale-125" onClick={()=>router.push("/")} />
        <p className='hidden lg:block'>Home</p>
        </div>
        <div className='flex items-center gap-2 px-4'><MagnifyingGlassIcon className="h-6 w-6 cursor-pointer text-white rounded-md hover:text-blue-400 transition-transform duration-300 ease-in-out hover:scale-125" onClick={()=>setSearch(!search)} />
        <p className='hidden lg:block'>Search</p>
       {search && <div className='absolute top-full left-0 mt-2 w-[200px] sm:w-[300px] md:w-[400px] rounded-md p-2 z-50'>
          <SearchBar />
        </div>}
        </div>
        <div className='flex tracking-widest font-bold grow  justify-center '>
       { <span className={`${quicksand.className} text-md md:text-3xl font-bold`}>THE BIZORA</span>}
      </div>
      <div className="flex items-center pr-2 md:pr-8  gap-8 lg:gap-2 p-2 text-white">
          <Link href={`/signup`}><UserIcon className="h-6 w-6 cursor-pointer rounded-md hover:text-blue-400 transition-transform duration-300 ease-in-out hover:scale-125" /></Link><p className='hidden lg:block'>Profile</p>
          <Link href={`/wishlist`}><HeartIcon className="h-6 w-6 cursor-pointer rounded-md hover:text-blue-400 transition-transform duration-300 ease-in-out hover:scale-125" /></Link>
          <p className='hidden lg:block'>WishList</p>
          <Link href={`/cart`}>
          <ShoppingCartIcon className="h-6 w-6 cursor-pointer rounded-md hover:text-blue-400 transition-transform duration-300 ease-in-out hover:scale-125" /></Link>
          <p className='hidden lg:block'>Cart</p>
      </div>
      <SheetingClient
        open={sideBar}
        onOpenChange={setSideBar}
        occasionList={occasions}
        fabricList={fabrics}
        fitList={fit}
        styleList={styles}
      />
      </nav>
}
