import React, { useState, useContext, createContext } from 'react'
import { FETCH_URL, FETCH_API_KEY } from '../utils/constants'

const authContext = createContext({})

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export function useAuth() {
  return useContext(authContext)
}

function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const URL = `${FETCH_URL}/auth/login`

  const login = async (name: string, email: string) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'fetch-api-key': FETCH_API_KEY,
      },
      body: JSON.stringify({ name, email }),
      credentials: 'include',
    } as RequestInit

    try {
      const response = await fetch(URL, options)

      if (!response.ok) {
        throw new Error('Error logging in user!')
      }

      setIsLoggedIn(true)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    const URL = `${FETCH_URL}/auth/logout`

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    } as RequestInit

    try {
      const response = await fetch(URL, options)

      if (!response.ok) {
        throw new Error('Error logging out user!')
      }

      setIsLoggedIn(false)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    login,
    logout,
    isLoggedIn,
  }
}
