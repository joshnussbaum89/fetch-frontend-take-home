import Layout from '@/components/Layout/Layout'
import { Varela_Round } from 'next/font/google'
import { AuthProvider } from '@/hooks/useAuth'
import { DogsProvider } from '@/hooks/useDogs'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'

// Optimization for font loading
const varelaRound = Varela_Round({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DogsProvider>
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
      </DogsProvider>
    </AuthProvider>
  )
}
