import SectionHeader from '../SectionHeader/SectionHeader'
import Link from 'next/link' 

export default function Restricted() {
  return (
    <>
      <SectionHeader text="You must be logged in to view this page" />
      <Link href="/login" className="fetch-cta button-primary">
        Log In
      </Link>
    </>
  )
}
