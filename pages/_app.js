import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {

  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}