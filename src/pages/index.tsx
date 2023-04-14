import Head from 'next/head'
import Entry from '@/components/Entry/Entry'

export default function Home() {
  return (
    <>
      <Head>
        <title>Pup Finder</title>
        <meta name="description" content="Find your perfect pup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Entry />
    </>
  )
}
