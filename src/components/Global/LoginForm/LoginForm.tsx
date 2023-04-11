import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import SectionHeader from '../SectionHeader/SectionHeader'
import styles from './LoginForm.module.css'

// TODO: add to global Types file
interface AuthProps {
  login: Function
  logout: Function
  isLoggedIn: boolean
}

export default function LoginForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Get auth context
  const auth = useAuth() as AuthProps
  const router = useRouter()

  // Login user and redirect to home page
  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()

    await auth.login(name, email).then(() => {
      router.push('/')
    })
  }

  // Handle name changes
  const handleNameChange = (event: React.FormEvent<EventTarget>) => {
    setName((event.target as HTMLInputElement).value)
  }

  // Handle email changes
  const handleEmailChange = (event: React.FormEvent<EventTarget>) => {
    setEmail((event.target as HTMLInputElement).value)
  }
  return (
    <>
      <SectionHeader text="Login" />
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          placeholder="John Doe"
          onChange={handleNameChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="johndoe@gmail.com"
          onChange={handleEmailChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
