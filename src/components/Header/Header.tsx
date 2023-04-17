import Link from 'next/link'
import Navigation from '@/components/Navigation/Navigation'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1>
          <Link href="/">Pup Finder</Link>
        </h1>
        <Navigation />
      </div>
    </header>
  )
}
