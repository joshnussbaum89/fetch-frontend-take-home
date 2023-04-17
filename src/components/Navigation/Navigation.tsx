import Link from 'next/link'
import styles from './Navigation.module.css'
import { useAuth } from '@/hooks/useAuth'
import { useDogs } from '@/hooks/useDogs'
import { AuthProps } from '@/utils/types'

export default function Navigation() {
  const auth = useAuth() as AuthProps
  const { handleResetState } = useDogs() as { handleResetState: Function }

  const handleLogout = () => {
    auth.logout()
    handleResetState()
  }

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <Link className="fetch-cta" href="/">
            Home
          </Link>
        </li>
        <li className={styles.login}>
          {!auth.isLoggedIn ? (
            <Link className="fetch-cta" href="/login">
              Log in
            </Link>
          ) : (
            <Link className="fetch-cta" href="/" onClick={handleLogout}>
              Log out
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
