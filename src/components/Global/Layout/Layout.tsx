import Header from '../Header/Header'

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
