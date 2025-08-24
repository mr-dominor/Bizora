'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { quicksand } from '../fonts'
export default function BannerOne() {
  return (
    <motion.div
      className="w-full bg-maroon text-black"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2">
        
        {/* Image side: Give height on mobile to match taller text */}
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <Image
            src="/slide/pexels-ryanlans-32420126.jpg"
            alt="xyz"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Text side */}
        <div className={`w-full flex flex-col items-center justify-center px-6 py-8 text-white bg-maroon sm:h-[400px] ${quicksand.className}`}>
          <h1 className="text-xl md:text-2xl leading-tight tracking-wide uppercase">
            Command the Room.
          </h1>
          <p className="pt-2 text-md md:text-xl font-medium max-w-md text-center">
            Tailored for distinction. Designed to lead. Built to leave an impression that never fades.
          </p>
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-white hover:text-maroon transition"
          >
            Shop the Look →
          </button>
        </div>

      </div>
    </motion.div>
  )
}
