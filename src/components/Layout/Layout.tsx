import { useAuth } from '@/hooks/useAuth'
import Header from '../Header/Header'
import styles from './Layout.module.css'

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const { loading } = useAuth() as { loading: boolean }

  // TODO: style loading state
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Header />
          <main className={styles.mainContent}>{children}</main>
          <footer className={styles.footer}>
            <p>
              <a href="https://joshnussbaum.io" target="_blank">
                Josh Nussbaum
              </a>{' '}
              © {new Date().getFullYear()}
            </p>
          </footer>
        </>
      )}
    </>
  )
}
