import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import React from 'react'
import { CssBaseline, GeistProvider } from '@geist-ui/core'

const Auth: React.FC<{}> = ({ children }) => {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (status == 'loading') return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, status])

  if (isUser) {
    return <>{children}</>
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}

const RESTRICTED_PATHS = ['/dashboard']
function MyApp({ Component, router: { route }, pageProps: { session, ...pageProps } }: AppProps) {
  const requireAuth = RESTRICTED_PATHS.some((path) => route.startsWith(path))
  return (
    <SessionProvider session={session}>
      {requireAuth ? (
        <Auth>
          <GeistProvider>
            <NextUIProvider>
              <Component {...pageProps} />
            </NextUIProvider>
          </GeistProvider>
        </Auth>
      ) : (
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      )}
    </SessionProvider>
  )
}

export default MyApp
