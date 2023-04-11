import React, { useState, useContext, createContext } from 'react'

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

  const login = async (name: string, email: string) => {
    const URL = 'https://frontend-take-home-service.fetch.com/auth/login'
    const API_KEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'fetch-api-key': API_KEY,
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
    const URL = 'https://frontend-take-home-service.fetch.com/auth/logout'
    const API_KEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzgzMDU2MTF9.Ky49nXH6qgHJQ0CBsZGYsP7_Is2am3u5j3RAdEl457s'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'fetch-api-key': API_KEY,
      },
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
