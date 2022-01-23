import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
        <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
