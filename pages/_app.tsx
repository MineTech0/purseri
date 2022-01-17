import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'reflect-metadata'
import { NextUIProvider } from '@nextui-org/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
