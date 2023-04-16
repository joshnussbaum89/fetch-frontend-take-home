import Link from 'next/link'
import DogSearch from '@/components/DogSearch/DogSearch'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { useAuth } from '@/hooks/useAuth'
import { AuthProps } from '@/utils/types'

export default function Dogs() {
  const auth = useAuth() as AuthProps

  return (
    <>
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
