import React, { useState, useContext, createContext } from 'react'
import { FETCH_URL, FETCH_API_KEY } from '../utils/constants'

const authContext = createContext({})

/**
 * Context provider
 */
export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

/**
 * Hook for child components to access auth context
 */
export function useAuth() {
  return useContext(authContext)
}

function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  const URL = `${FETCH_URL}/auth/login`

  /**
   * Login user with name and email
   */
  const login = async (name: string, email: string) => {
    setLoading(true)

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
    setLoading(false)
  }

  /**
   * Logout user
   */
  const logout = async () => {
    setLoading(true)

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
    setLoading(false)
  }

  return {
    login,
    logout,
    isLoggedIn,
    loading,
    setLoading,
  }
}
