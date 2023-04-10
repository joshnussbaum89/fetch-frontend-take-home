import Navigation from '../Navigation/Navigation'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1>Pup Finder</h1>
        <Navigation />
      </div>
    </header>
  )
}
