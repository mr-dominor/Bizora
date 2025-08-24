import { Quicksand, Shadows_Into_Light,Playwrite_MX } from "next/font/google";

export const quicksand = Quicksand({  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // adjust as needed
  variable: '--font-quicksand'
});

export const shadow = Shadows_Into_Light({
  subsets: ['latin'],
  weight: ['400'], // adjust as needed
  variable: '--font-quicksand'
})

export const player = Playwrite_MX({
  weight: ['400'], // adjust as needed
  variable: '--font-quicksand'
})