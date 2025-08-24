"use client"
// src/ui/homepage/SectionOneClient.tsx

import useEmblaCarousel from 'embla-carousel-react'
import { quicksand } from '../fonts'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import Image from 'next/image'
import { Item } from '@/lib/type_def'
import Div from '../utilities/div'
import Link from 'next/link'
export default function SectionOneClient({ data }: { data: Item[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <motion.div
      className="w-full h-[700px] bg-beige px-2 md:px-10 text-black"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <h1 className="text-2xl font-geistMono py-2">Shop By Occasion</h1>
      <div className="w-full bg-beige px-8 py-8 text-black">
        <div className="relative">
          {/* Embla container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {data.map((p, index) => (
                <div
                  key={index}
                  className="min-w-full md:min-w-[50%] lg:min-w-[33.3333%]"
                >
                  <Link href={`/shop/occasion/${p.occasion}`}>
                    <Div className="relative h-[500px] bg-black text-white px-2 overflow-hidden">
                      <Image
                        src={p.image ? p.image.replace(/^(\.\.\/)?public/, '') : '/default-image.jpg'}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out hover:scale-[110%]"
                      />
                    </Div>
                  </Link>
                  
                  <h1
                    className={`text-xl md:text-2xl font-bold py-2 text-left ${quicksand.className}`}
                  >
                    {p.occasion}
                  </h1>
                  <p className={`text-left ${quicksand.className}`}>
                    From Rs.{p.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 px-3 py-2 rounded"
          >
            ‹
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 px-3 py-2 rounded"
          >
            ›
          </button>
        </div>
      </div>
    </motion.div>
  )
}
