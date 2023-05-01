import Head from 'next/head'
import DogSearch from '@/components/DogSearch/DogSearch'
import Restricted from '@/components/Restricted/Restricted'
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
      {auth.isLoggedIn ? <DogSearch /> : <Restricted />}
    </>
  )
}
