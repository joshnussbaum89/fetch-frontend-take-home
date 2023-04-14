import Link from 'next/link'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { useAuth } from '@/hooks/useAuth'

interface AuthProps {
  login: Function
  logout: Function
  isLoggedIn: boolean
}

export default function Entry() {
  const auth = useAuth() as AuthProps

  return (
    <>
      <SectionHeader text="Welcome To Pup Finder" />
      {auth.isLoggedIn ? (
        <Link className="fetch-cta button-primary" href="/dogs">
          Enter
        </Link>
      ) : (
        <Link className="fetch-cta button-primary" href="/login">
          Log in to get started
        </Link>
      )}
    </>
  )
}
