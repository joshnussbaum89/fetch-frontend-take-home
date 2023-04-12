import Link from 'next/link'
import SectionHeader from '@/components/Global/SectionHeader/SectionHeader'
import styles from '@/styles/Home.module.css'

export default function Entry() {
  return (
    <>
      <SectionHeader text="Welcome To Pup Finder" />
      <Link className={`fetch-cta ${styles.button}`} href="/login">
        Log in to get started
      </Link>
    </>
  )
}
