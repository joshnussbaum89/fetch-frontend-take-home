/**
 * This file contains all the types used in the app.
 */
type Dog = {
  id: string
  age: number
  name: string
  breed: string
  img: string
  zip_code: string
}

type DogData = {
  next: string
  previous: string
  resultIds: string[]
  dogs: Dog[]
}

type AuthProps = {
  login: Function
  logout: Function
  isLoggedIn: boolean
}

export type { Dog, DogData, AuthProps }
