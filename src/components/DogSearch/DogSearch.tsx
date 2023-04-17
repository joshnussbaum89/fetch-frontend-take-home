import SectionHeader from '@/components/SectionHeader/SectionHeader'
import DogGallery from '@/components/DogGallery/DogGallery'
import { useDogs } from '@/hooks/useDogs'
import styles from './DogSearch.module.css'
import {
  DogSearchProps,
  FiltersProps,
  NavigationButtonProps,
} from '@/utils/types'

export default function DogSearch() {
  const {
    breeds,
    sortValues,
    favoriteDogIds,
    handleBreedValueChange,
    handleOrderValueChange,
    pagination,
    dogData,
    setFavoriteDogIds,
  } = useDogs() as DogSearchProps

  return (
    <>
      <SectionHeader text="Click Below To Find Your New Best Friend!" />
      <h3>Instructions:</h3>
      <ol className={styles.instructions}>
        <li>Sort dogs by one breed at a time, or all breeds alphabetically</li>
        <li>Click on a dog to your favorites</li>
        <li>You can choose as many as you like</li>
        <li>
          Click &quot;Find Your Match&quot; in the navigation bar to see your
          match!
        </li>
      </ol>
      <div className={styles.wrapper}>
        <NavigationButton
          text="Previous"
          isActive={dogData.previous !== undefined}
          handlePagination={() => pagination(dogData.previous)}
        />
        <Filters
          dogData={dogData}
          handleBreedValueChange={handleBreedValueChange}
          handleOrderValueChange={handleOrderValueChange}
          sortOrderValue={sortValues!.order}
          sortBreedValue={sortValues!.breed}
          breeds={breeds}
        />
        <NavigationButton
          text="Next"
          isActive={dogData.next !== undefined}
          handlePagination={() => pagination(dogData.next)}
        />
      </div>
      <DogGallery
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
              id="asc"
              type="radio"
              name="sort"
              value="asc"
              checked={sortOrderValue === 'asc'}
              onChange={handleOrderValueChange}
            />
            <label htmlFor="asc">asc</label>
            <input
              id="desc"
              type="radio"
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
  isActive,
  handlePagination,
}: NavigationButtonProps) {
  const buttonStyles = isActive
    ? `${styles.navButton}`
    : `${styles.navButton} ${styles.disabled}`

  return (
    <button className={buttonStyles} onClick={handlePagination}>
      {text}
    </button>
  )
}
