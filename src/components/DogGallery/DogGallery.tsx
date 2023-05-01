import Image from 'next/image'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import styles from './DogGallery.module.css'
import { DogGalleryProps } from '@/utils/types'

export default function DogGallery({
  dogs,
  favoriteDogIds,
  setFavoriteDogIds,
}: DogGalleryProps) {
  /**
   * Collect favorite dog IDs in state to find match
   */
  const handleDogSelection = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const id = event.currentTarget.getAttribute('data-dog-id')
    const idIsAlreadyInFavorites = id && favoriteDogIds.includes(id)
    const idIsNotAlreadyInFavorites = id && !favoriteDogIds.includes(id)

    if (idIsAlreadyInFavorites) {
      setFavoriteDogIds((prev) => prev.filter((dogId) => dogId !== id))
    }

    if (idIsNotAlreadyInFavorites) {
      setFavoriteDogIds((prev) => [...prev, id])
    }
  }

  return (
    <article className={styles.dogContainer}>
      {dogs.map((dog) => (
        <div
          key={dog.id}
          className={
            favoriteDogIds.includes(dog.id)
              ? `${styles.dog} ${styles.chosen}`
              : `${styles.dog}`
          }
          data-dog-id={dog.id}
          onClick={handleDogSelection}
        >
          <div className={styles.imageContainer}>
            <Image src={dog.img} alt={`${dog.breed} named ${dog.name}`} fill />
          </div>
          <div>
            <h3>{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Zip Code: {dog.zip_code}</p>
          </div>
          <IoIosCheckmarkCircle />
        </div>
      ))}
    </article>
  )
}
