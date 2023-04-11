import LoginForm from '@/components/Global/LoginForm/LoginForm'
import SectionHeader from '@/components/Global/SectionHeader/SectionHeader'
import { useAuth } from '@/hooks/useAuth'

interface AuthProps {
  login: Function
  logout: Function
  isLoggedIn: boolean
}

export default function Login() {
  const auth = useAuth() as AuthProps

  return (
    <>
      {!auth.isLoggedIn && <LoginForm />}
      {auth.isLoggedIn && <SectionHeader text="Logged In!" />}
    </>
  )
}
