import { MouseEventHandler } from 'react'
import SectionHeader from '@/components/SectionHeader/SectionHeader'
import Dogs from '@/components/Dogs/Dogs'
import styles from './DogSearch.module.css'
import { DogData } from '@/utils/types'

type DogSearchProps = {
  dogData: DogData
  loading: boolean
  breeds: string[]
  handleBreedValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleOrderValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  sortOrderValue: string
  sortBreedValue: string
  favoriteDogIds: string[]
  setFavoriteDogIds: React.Dispatch<React.SetStateAction<string[]>>
  pagination: (url: string) => void
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
  buttonStyles: string
  handlePagination: MouseEventHandler<HTMLButtonElement>
}

export default function DogSearch({
  dogData,
  loading,
  breeds,
  handleBreedValueChange,
  handleOrderValueChange,
  sortOrderValue,
  sortBreedValue,
  favoriteDogIds,
  setFavoriteDogIds,
  pagination,
}: DogSearchProps) {
  const previousButtonStyles = dogData.previous
    ? `${styles.navButton}`
    : `${styles.navButton} ${styles.disabled}`

  const nextButtonStyles = dogData.next
    ? `${styles.navButton}`
    : `${styles.navButton} ${styles.disabled}`

  return (
    <>
      <SectionHeader text="Click Below To Find Your New Best Friend!" />
      {/* <ul>
        <li>Use filters to find your favorite dogs</li>
        <li>Select your favorite by clicking dog photos</li>
        <li>Click &quot;Find Match&quot; to see your match!</li>
      </ul> */}
      <div className={styles.wrapper}>
        <NavigationButton
          text="Previous"
          buttonStyles={previousButtonStyles}
          handlePagination={() => pagination(dogData.previous)}
        />
        <Filters
          dogData={dogData}
          handleBreedValueChange={handleBreedValueChange}
          handleOrderValueChange={handleOrderValueChange}
          sortOrderValue={sortOrderValue}
          sortBreedValue={sortBreedValue}
          breeds={breeds}
        />
        <NavigationButton
          text="Next"
          buttonStyles={nextButtonStyles}
          handlePagination={() => pagination(dogData.next)}
        />
      </div>
      <Dogs
        loading={loading}
        dogs={dogData?.dogs}
        favoriteDogIds={favoriteDogIds}
        setFavoriteDogIds={setFavoriteDogIds}
      />
    </>
  )
}

function Filters({
  dogData,
  handleBreedValueChange,
  handleOrderValueChange,
  sortOrderValue,
  sortBreedValue,
  breeds,
}: FiltersProps) {
  return (
    <div className={styles.filterContainer}>
      {dogData.dogs?.length > 0 && (
        <>
          <div className={styles.filter}>
            <label htmlFor="breed">Breed:</label>
            <select
              id="breed"
              className={styles.select}
              onChange={handleBreedValueChange}
              value={sortBreedValue}
            >
              <option value="All Breeds">All Breeds</option>
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filter}>
            <label htmlFor="sort">Sort:</label>
            <input
              type="radio"
              id="asc"
              name="sort"
              value="asc"
              checked={sortOrderValue === 'asc'}
              onChange={handleOrderValueChange}
            />
            <label htmlFor="asc">asc</label>
            <input
              type="radio"
              id="desc"
              name="sort"
              value="desc"
              checked={sortOrderValue === 'desc'}
              onChange={handleOrderValueChange}
            />
            <label htmlFor="desc">desc</label>
          </div>
        </>
      )}
    </div>
  )
}

function NavigationButton({
  text,
  buttonStyles,
  handlePagination,
}: NavigationButtonProps) {
  return (
    <button className={buttonStyles} onClick={handlePagination}>
      {text}
    </button>
  )
}
