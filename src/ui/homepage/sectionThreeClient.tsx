"use client"
// src/ui/homepage/SectionOneClient.tsx
import useEmblaCarousel from 'embla-carousel-react'
import { quicksand } from '../fonts'
import { motion } from 'framer-motion' 
import { useCallback } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { Item } from '@/lib/type_def'

export default function SectionThreeClient({ data }: { data: Item[] }) {

   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
 
   const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
   const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
    return (
    <motion.div
      className="w-full h-[470px] bg-maroon px-2 md:px-10 text-white "
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h1 className='text-2xl font-geistMono py-2'>Shop By Style</h1>
      <div className="w-full bg-maroon px-8 py-8">
        <div className="relative">
      {/* Embla container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {data.map((item, index) => (
            <div className="w-96 h-[350px] px-10 py-2 relative aspect-video" key={index}>
              <Link href={`/shop/style/${item.style}`}>
                 <div className={`w-full h-72 overflow-hidden `}>
                    <Image
                    src={item.image ? item.image.replace(/^(\.\.\/)?public/, '') : '/default-image.jpg'}
                    alt={`Slide ${index}`}
                    width={350}
                    height={400}
                    className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                   /> 
                </div>
              </Link>
                <h1 className={`${quicksand.className} font-medium text-center sm:text-left text-lg`}>{item.style}</h1>
                <p className={`${quicksand.className} font-light text-center sm:text-left`}>From Rs.{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 px-3 py-2 rounded text-black"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 px-3 py-2 rounded text-black"
      >
        ›
      </button>
    </div>
    </div>
    </motion.div>
  )
}
