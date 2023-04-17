import Head from 'next/head'
import Link from 'next/link'
import DogSearch from '@/components/DogSearch/DogSearch'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { useAuth } from '@/hooks/useAuth'
import { AuthProps } from '@/utils/types'

export default function Dogs() {
  const auth = useAuth() as AuthProps

  return (
    <>
      <Head>
        <title>Pup Finder | Dogs</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Find your perfect pup" />
        <meta property="og:title" content="Pup Finder | Dogs" />
        <meta property="og:image" content="/happy.png" />
        <meta property="og:description" content="Find your perfect pup" />
        <meta
          property="og:url"
          content="https://fetch-frontend-take-home.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </Head>
      {auth.isLoggedIn ? (
        <DogSearch />
      ) : (
        <>
          <SectionHeader text="You must be logged in to view this page" />
          <Link href="/login" className="fetch-cta button-primary">
            Log In
          </Link>
        </>
      )}
    </>
  )
}
