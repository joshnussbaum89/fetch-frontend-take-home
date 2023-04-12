import SectionHeader from '@/components/Global/SectionHeader/SectionHeader'
import Dogs from '../Dogs/Dogs'
import styles from '@/styles/Home.module.css'

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

interface DogSearchProps {
  dogData: DogData
  loading: boolean
  breeds: string[]
  handleShowDogs: () => void
  handleBreedValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleOrderValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  sortOrderValue: string
}

export default function DogSearch({
  dogData,
  loading,
  breeds,
  handleShowDogs,
  handleBreedValueChange,
  handleOrderValueChange,
  sortOrderValue,
}: DogSearchProps) {
  return (
    <>
      <SectionHeader text="Find Your New Best Friend!" />
      <div className={styles.filterContainer}>
        <button
          className={`fetch-cta ${styles.button}`}
          onClick={handleShowDogs}
        >
          Show Results
        </button>

        {dogData.dogs?.length > 0 && (
          <>
            <div className={styles.filter}>
              <label htmlFor="breed">Breed:</label>
              <select
                id="breed"
                className={styles.select}
                onChange={handleBreedValueChange}
              >
                {breeds.map((breed) => {
                  return (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className={styles.filter}>
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
      {loading && <p>Loading...</p>}
      {!loading && dogData.dogs?.length > 0 && <Dogs dogs={dogData?.dogs} />}
    </>
  )
}
