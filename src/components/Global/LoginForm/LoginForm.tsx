import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
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

  // Get login function and isLoggedIn state from useAuth hook
  const auth = useAuth() as AuthProps

  // Submit form
  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault()
    auth.login(name, email)
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
          type="text"
          id="name"
          value={name}
          placeholder="John Doe"
          onChange={handleNameChange}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
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
