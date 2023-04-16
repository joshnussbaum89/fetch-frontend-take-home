import React, { useState, useContext, createContext, useEffect } from 'react'
import { FETCH_URL } from '@/utils/constants'
import { LoadingProps, DogData } from '@/utils/types'
import { useAuth } from '@/hooks/useAuth'

const dogsContext = createContext({})

export function DogsProvider({ children }: React.PropsWithChildren<{}>) {
  const dogs = useProvideDogs()
  return <dogsContext.Provider value={dogs}>{children}</dogsContext.Provider>
}

export function useDogs() {
  return useContext(dogsContext)
}

function useProvideDogs() {
  const [breeds, setBreeds] = useState<string[]>([])
  const [sortValues, setSortValues] = useState({ breed: '', order: 'asc' })
  const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([])
  const [dogData, setDogData] = useState<DogData>({
    next: '',
    previous: '',
    resultIds: [],
    dogs: [],
  })

  // Loading state for application
  const { loading, setLoading } = useAuth() as LoadingProps

  useEffect(() => {
    const fetchAllAvailableBreeds = async () => {
      const URL = `${FETCH_URL}/dogs/breeds`
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      } as RequestInit

      try {
        const response = await fetch(URL, options)

        if (!response.ok) {
          throw new Error('Error fetching dog breeds!')
        }

        const data = await response.json()
        setBreeds(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllAvailableBreeds()
  }, [])

  useEffect(() => {
    const fetchDogsWhenIdsUpdate = async () => {
      setLoading(true)

      const URL = `${FETCH_URL}/dogs`
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(dogData.resultIds),
      } as RequestInit

      try {
        const response = await fetch(URL, options)

        if (!response.ok) {
          throw new Error('Error updating dog selection!')
        }

        const data = await response.json()

        setDogData((prevDogData) => {
          const newDogData = { ...prevDogData, dogs: data }
          return newDogData
        })
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchDogsWhenIdsUpdate()
  }, [dogData.resultIds, setLoading])

  // If user selects a breed, sort by selected breed. Otherwise, sort breeds alphabetically
  useEffect(() => {
    const fetchDogsWhenSorting = async () => {
      const URL =
        sortValues.breed !== ''
          ? `${FETCH_URL}/dogs/search?size=9&breeds=${sortValues.breed}`
          : `${FETCH_URL}/dogs/search?size=9&sort=breed:${sortValues.order}`

      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      } as RequestInit

      try {
        const response = await fetch(URL, options)

        if (!response.ok) {
          throw new Error('Error sorting dogs!')
        }

        const data = await response.json()

        setDogData((prevDogData) => {
          const newDogData = {
            ...prevDogData,
            next: data.next,
            previous: data.prev,
            resultIds: data.resultIds,
          }
          return newDogData
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchDogsWhenSorting()
  }, [sortValues.breed, sortValues.order])

  const pagination = async (path: string) => {
    const URL = `${FETCH_URL}${path}`
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    } as RequestInit

    try {
      const response = await fetch(URL, options)

      if (!response.ok) {
        throw new Error('Error navigating to the correct page!')
      }

      const data = await response.json()

      setDogData((prevDogData) => {
        const newDogData = {
          ...prevDogData,
          next: data.next,
          previous: data.prev,
          resultIds: data.resultIds,
        }
        return newDogData
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleFindMatch = async () => {
    const URL = `${FETCH_URL}/dogs/match`
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(favoriteDogIds),
    } as RequestInit

    try {
      setLoading(true)
      const response = await fetch(URL, options)

      if (!response.ok) {
        throw new Error('Error finding match!')
      }

      const data = await response.json()
      setDogData((prevDogData) => {
        const newDogData = { ...prevDogData, resultIds: [data.match] }
        return newDogData
      })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * If 'All Breeds' is selected, revert to alphabetical order. Otherwise, sort by selected breed.
   */
  const handleBreedValueChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortValues((prevSortValues) => {
      const newSortValues = {
        ...prevSortValues,
        breed: event.target.value === 'All Breeds' ? '' : event.target.value,
      }
      return newSortValues
    })
  }

  /**
   * Sort breeds in ascending or descending order.
   */
  const handleOrderValueChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSortValues((prevSortValues) => {
      const newSortValues = {
        ...prevSortValues,
        breed: '',
        order: event.target.value,
      }
      return newSortValues
    })
  }

  return {
    loading,
    breeds,
    sortValues,
    favoriteDogIds,
    dogData,
    pagination,
    handleFindMatch,
    handleBreedValueChange,
    handleOrderValueChange,
    setFavoriteDogIds,
  }
}
