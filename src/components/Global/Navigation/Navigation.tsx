import Link from 'next/link'
import styles from './Navigation.module.css'
import { useAuth } from '@/hooks/useAuth'

interface AuthProps {
  login: Function
  logout: Function
  isLoggedIn: boolean
}

export default function Navigation() {
  const auth = useAuth() as AuthProps

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link className="fetch-cta" href="/">
            Home
          </Link>
        </li>
        <li className={styles.login}>
          {!auth.isLoggedIn && (
            <Link className="fetch-cta" href="/login">
              Login
            </Link>
          )}
          {auth.isLoggedIn && (
            <Link className="fetch-cta" href="/" onClick={() => auth.logout()}>
              Logout
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
