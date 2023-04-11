import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import SectionHeader from '@/components/Global/SectionHeader/SectionHeader'

import styles from '@/styles/Home.module.css'

interface AuthProps {
  login: Function
  logout: Function
  isLoggedIn: boolean
}

export default function Home() {
  const auth = useAuth() as AuthProps

  return (
    <>
      <Head>
        <title>Pup Finder</title>
        <meta name="description" content="Find your perfect pup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      {!auth.isLoggedIn ? (
        <>
          <SectionHeader text="Welcome To Pup Finder" />
          <Link className={`fetch-cta ${styles.login}`} href="/login">
            Login to get started
          </Link>
        </>
      ) : (
        <>
          <SectionHeader text="Find Your New Best Friend!" />
          <p>Logged In!</p>
        </>
      )}
    </>
  )
}
