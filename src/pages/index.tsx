import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import LoginForm from '@/components/Global/LoginForm/LoginForm'
import SectionHeader from '@/components/Global/SectionHeader/SectionHeader'

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
      {!auth.isLoggedIn && <LoginForm />}
      {auth.isLoggedIn && <SectionHeader text="Logged In!" />}
    </>
  )
}
