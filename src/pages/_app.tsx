import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'
import { Varela_Round } from 'next/font/google'
import { AuthProvider } from '@/hooks/useAuth'

import type { AppProps } from 'next/app'

const varelaRound = Varela_Round({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <style jsx global>{`
        body {
          font-family: ${varelaRound.style.fontFamily};
        }

        button,
        select {
          font-family: ${varelaRound.style.fontFamily};
          letter-spacing: 1px;
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}
