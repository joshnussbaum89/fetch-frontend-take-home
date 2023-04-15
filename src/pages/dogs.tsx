// 1. Users should be able to select their favorite dogs, then submit to /dogs/match for the no. 1 dawg

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import DogSearch from '@/components/DogSearch/DogSearch'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import { useAuth } from '@/hooks/useAuth'
import { FETCH_URL } from '@/utils/constants'
import { DogData, AuthProps } from '@/utils/types'

export default function Dogs() {
  const [loading, setLoading] = useState(false)
  const [breeds, setBreeds] = useState<string[]>([])
  const [dogData, setDogData] = useState<DogData>({
    next: '',
    previous: '',
    resultIds: [],
    dogs: [],
  })
  const [sortValues, setSortValues] = useState({ breed: '', order: 'asc' })
  const [favoriteDogIds, setFavoriteDogIds] = useState<string[]>([])

  const auth = useAuth() as AuthProps

  useEffect(() => {
    const fetchAllAvailableBreeds = async () => {
      console.log('fetchAllAvailableBreeds')
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
      console.log('fetchDogsWhenIdsUpdate')
      const URL = `${FETCH_URL}/dogs`
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(dogData.resultIds),
      } as RequestInit

      try {
        setLoading(true)
        const response = await fetch(URL, options)

        if (!response.ok) {
          throw new Error('Error fetching dogs!')
        }

        const data = await response.json()

        setDogData((prevDogData) => {
          const newDogData = { ...prevDogData, dogs: data }
          return newDogData
        })
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDogsWhenIdsUpdate()
  }, [dogData.resultIds])

  useEffect(() => {
    const fetchDogsWhenSorting = async () => {
      console.log('fetchDogsWhenSorting')

      // If a breed is selected, sort by breed, otherwise sort dogs alphabetically
      const URL =
        sortValues.breed !== ''
          ? `${FETCH_URL}/dogs/search?size=10&breeds=${sortValues.breed}`
          : `${FETCH_URL}/dogs/search?size=10&sort=breed:${sortValues.order}`

      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      } as RequestInit

      try {
        const response = await fetch(URL, options)

        if (!response.ok) {
          throw new Error('Error fetching dogs!')
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
    console.log('pagination')
    const URL = `${FETCH_URL}${path}`
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    } as RequestInit

    try {
      const response = await fetch(URL, options)

      if (!response.ok) {
        throw new Error('Error fetching dogs!')
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

  const handleBreedValueChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortValues((prevSortValues) => {
      // If 'All Breeds' is selected, revert to alphabetical order
      const newSortValues = {
        ...prevSortValues,
        breed: event.target.value === 'All Breeds' ? '' : event.target.value,
      }
      return newSortValues
    })
  }

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

  return (
    <>
      {auth.isLoggedIn ? (
        <DogSearch
          dogData={dogData}
          breeds={breeds}
          loading={loading}
          handleBreedValueChange={handleBreedValueChange}
          handleOrderValueChange={handleOrderValueChange}
          sortOrderValue={sortValues.order}
          sortBreedValue={sortValues.breed}
          favoriteDogIds={favoriteDogIds}
          setFavoriteDogIds={setFavoriteDogIds}
          pagination={pagination}
        />
      ) : (
        <>
          <SectionHeader text="You must be logged in to view this page" />
          <Link href="/login" className="fetch-cta button-primary">
            Log In
          </Link>
        </>
      )}
    </>
  )
}
