import { useAuth } from '@/hooks/useAuth'
import { Oval } from 'react-loader-spinner'
import Header from '@/components/Header/Header'
import styles from './Layout.module.css'

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const { loading } = useAuth() as { loading: boolean }

  return (
    <>
      {loading && (
        <div className={styles.loading}>
          <Oval
            height={100}
            width={100}
            color="#2e1679"
            secondaryColor="#a47ad1"
            visible={true}
            ariaLabel="oval-loading"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
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
  )
}
