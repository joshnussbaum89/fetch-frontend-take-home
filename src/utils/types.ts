// Global Type File
import { MouseEventHandler } from 'react'

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

type DogGalleryProps = {
  dogs: Dog[]
  favoriteDogIds: string[]
  setFavoriteDogIds: React.Dispatch<React.SetStateAction<string[]>>
}

type DogSearchProps = {
  dogData: DogData
  breeds: string[]
  sortValues?: { breed: string; order: string }
  handleBreedValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleOrderValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  sortOrderValue: string
  sortBreedValue: string
  favoriteDogIds: string[]
  setFavoriteDogIds: React.Dispatch<React.SetStateAction<string[]>>
  pagination: (url: string) => void
  handleFindMatch: () => void
}

type FiltersProps = {
  dogData: DogData
  breeds: string[]
  handleBreedValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleOrderValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  sortOrderValue: string
  sortBreedValue: string
}

type NavigationButtonProps = {
  text: string
  isActive: boolean
  handlePagination: MouseEventHandler<HTMLButtonElement>
}

type AuthProps = {
  login: Function
  logout: Function
  isLoggedIn: boolean
}

type LoadingProps = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type {
  Dog,
  DogData,
  DogGalleryProps,
  DogSearchProps,
  FiltersProps,
  NavigationButtonProps,
  AuthProps,
  LoadingProps,
}
