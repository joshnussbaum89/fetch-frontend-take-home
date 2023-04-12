// 1. Filter by breed
// 2. Paginate results
// 3. Make sure results are sorted alphabetically
// 4. All dog info in Dog interface should be displayed
// 5. Users should be able to select their favorite dogs, then submit to /dogs/match for the no. 1 dawg
// 6. TODO: get AWSALB=... cookie from fetch and persist login state

import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useAuth } from '@/hooks/useAuth'
import Entry from '@/components/Home/Entry/Entry'
import DogSearch from '@/components/Home/DogSearch/DogSearch'

interface AuthProps {
  login: Function
  logout: Function
  isLoggedIn: boolean
}

interface DogData {
  next: string
  previous: string
  resultIds: string[]
  total: number
  dogs: Dog[]
}

interface Dog {
  id: string
  age: number
  name: string
  breed: string
  img: string
  zip_code: string
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [breeds, setBreeds] = useState<string[]>([])
  const [sortBreedValue, setSortBreedValue] = useState('Affenpinscher')
  const [sortOrderValue, setSortOrderValue] = useState('asc')
  const [dogData, setDogData] = useState<DogData>({
    next: '',
    previous: '',
    resultIds: [],
    total: 0,
    dogs: [],
  })

  const auth = useAuth() as AuthProps

  const handleBreedValueChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortBreedValue(event.target.value)
  }

  const handleOrderValueChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSortOrderValue(event.target.value)
  }

  const fetchAllAvailableBreeds = async () => {
    const URL = `${process.env.NEXT_PUBLIC_FETCH_URL}/dogs/breeds`
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

  const fetchDogsByIds = async () => {
    if (dogData.resultIds?.length === 0) return

    const URL = `${process.env.NEXT_PUBLIC_FETCH_URL}/dogs`
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
      setDogData({ ...dogData, dogs: data })
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowDogs = () => {
    if (breeds.length === 0) fetchAllAvailableBreeds()
    fetchDogsByIds()
  }

  useEffect(() => {
    const fetchDogData = async () => {
      const URL = `${process.env.NEXT_PUBLIC_FETCH_URL}/dogs/search?breeds=${sortBreedValue}&sort=breed:${sortOrderValue}`
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
        setDogData({
          ...dogData,
          resultIds: data.resultIds,
          next: data.next || '',
          previous: data.previous || '',
        })
      } catch (error) {
        console.log(error)
      }
    }

    if (auth.isLoggedIn) fetchDogData()
  }, [sortBreedValue, sortOrderValue, auth.isLoggedIn])

  return (
    <>
      <Head>
        <title>Pup Finder</title>
        <meta name="description" content="Find your perfect pup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {!auth.isLoggedIn ? (
        <Entry />
      ) : (
        <>
          <DogSearch
            dogData={dogData}
            breeds={breeds}
            loading={loading}
            handleShowDogs={handleShowDogs}
            handleBreedValueChange={handleBreedValueChange}
            handleOrderValueChange={handleOrderValueChange}
            sortOrderValue={sortOrderValue}
          />
          <div>
            {dogData.previous !== '' && (
              <button
                onClick={() => {
                  console.log('the previous link is', dogData.previous)

                  setDogData({
                    ...dogData,
                    previous: dogData.previous,
                  })
                }}
              >
                Previous Page
              </button>
            )}
            {dogData.next !== '' && (
              <button
                onClick={() => {
                  console.log('the next link is', dogData.next)

                  setDogData({
                    ...dogData,
                    next: dogData.next,
                  })
                }}
              >
                Next Page
              </button>
            )}
          </div>
        </>
      )}
    </>
  )
}
