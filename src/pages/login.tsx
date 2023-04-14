import LoginForm from '@/components/LoginForm/LoginForm'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { useAuth } from '@/hooks/useAuth'
import { AuthProps } from '@/utils/types'

export default function Login() {
  const auth = useAuth() as AuthProps

  return auth.isLoggedIn ? <SectionHeader text="Logged In!" /> : <LoginForm />
}
