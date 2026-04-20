import { DM_Serif_Display, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'

export const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

/**
 * Satoshi placeholder: this is Plus Jakarta Sans standing in until
 * you download Satoshi from fontshare.com and self-host it.
 *
 * To swap in Satoshi:
 *   1. Download Satoshi-Regular.woff2, Satoshi-Medium.woff2, Satoshi-Bold.woff2
 *   2. Place them in /public/fonts/
 *   3. Replace this export with:
 *
 *   import localFont from 'next/font/local'
 *   export const satoshi = localFont({
 *     src: [
 *       { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400' },
 *       { path: '../public/fonts/Satoshi-Medium.woff2',  weight: '500' },
 *       { path: '../public/fonts/Satoshi-Bold.woff2',    weight: '700' },
 *     ],
 *     variable: '--font-sans',
 *     display: 'swap',
 *   })
 *
 *   4. Update layout.tsx to use `satoshi` instead of `plusJakartaSans`
 */
export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const jetbrainsMono = JetBrains_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})
