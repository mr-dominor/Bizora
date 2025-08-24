"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  '5f7a6055-06fd-4ccd-a164-66920867e2da_igdownloader.com_2892698339942802712.avif',
  'How-To-Wear-A-Suit-In-Hot-Weather.jpg',
  'pexels-ryanlans-32420126.jpg',
  'Pick-The-Right-Color.webp'
];

const AUTO_SET = 3000;

export default function SlideShow() {
  const [curInd, setCurInd] = useState(1);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurInd((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }, AUTO_SET);
      return () => clearInterval(timer);
    }, []);

  return (
    <div className="relative w-full h-[700px] py-6 bg-maroon overflow-hidden">
      {images.map((src, ind) => (
        <div
          key={ind}
          className={`absolute top-0 left-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
            ind === curInd ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={`/slide/${src}`}
            alt={`slide-${ind}`}
            fill
            className="object-cover"
            priority={ind === 0}
          />
          <div className="w-full h-full flex justify-center items-center absolute bg-slate-950 opacity-55 grow">
            <div className=" text-white flex flex-col justify-center items-center  w-full ">
              <p className={`text-2xl sm:text-4xl lg:text-5xl opacity-100 text-white font-sans animate-fadeInUp tracking-widest `} >Built To <strong>Lead</strong> Styled To <strong>Win</strong> </p>
              <button type="submit" className="text-xl h-10 w-28 border-solid border-white rounded-full hover:text-blue-400 hover:border-2 hover:border-blue-400 border-2 mt-5 transition-transform duration-300 ease-in-out hover:scale-110">Shop Now</button>
            </div>
          </div>
          
        </div>
      ))}
    </div>
  );
}
