'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { quicksand } from '../fonts'

export default function BannerTwo() {
    return (
        <motion.div
            className="w-full h-80 bg-beige text-black flex justify-center items-center"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <div className="w-full h-72 px-4 md:px-8 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4">
                
                {/* TEXT SECTION */}
                <div className="h-full flex flex-col justify-center items-center space-y-4">
                    <h2 className={`text-xl md:text-3xl font-semibold leading-snug ${quicksand.className}`}>
                        Our handpicked moments,<br className="hidden md:block" /> framed just for you.
                    </h2>
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-6 py-2 rounded-full w-fit transition">
                        Explore
                    </button>
                </div>

                {/* IMAGE SECTION */}
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                        src="/slide/5f7a6055-06fd-4ccd-a164-66920867e2da_igdownloader.com_2892698339942802712.avif"
                        alt="xyz"
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                </div>
            </div>
        </motion.div>
    );
}
