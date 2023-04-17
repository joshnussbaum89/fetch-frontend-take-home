import Head from 'next/head'
import LoginForm from '@/components/LoginForm/LoginForm'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { useAuth } from '@/hooks/useAuth'
import { AuthProps } from '@/utils/types'

export default function Login() {
  const auth = useAuth() as AuthProps

  return (
    <>
      <Head>
        <title>Pup Finder | Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Find your perfect pup" />
        <meta property="og:title" content="Pup Finder | Login" />
        <meta property="og:image" content="/happy.png" />
        <meta property="og:description" content="Find your perfect pup" />
        <meta
          property="og:url"
          content="https://fetch-frontend-take-home.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </Head>
      {auth.isLoggedIn ? <SectionHeader text="Logged In!" /> : <LoginForm />}
    </>
  )
}
