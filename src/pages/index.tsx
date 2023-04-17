import Head from 'next/head'
import Entry from '@/components/Entry/Entry'

export default function Home() {
  return (
    <>
      <Head>
        <title>Pup Finder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Find your perfect pup" />
        <meta property="og:title" content="Pup Finder" />
        <meta property="og:image" content="/happy.png" />
        <meta property="og:description" content="Find your perfect pup" />
        <meta
          property="og:url"
          content="https://fetch-frontend-take-home.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </Head>
      <Entry />
    </>
  )
}
