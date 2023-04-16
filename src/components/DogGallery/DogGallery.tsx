import { useRef } from 'react'
import Image from 'next/image'
import styles from './DogGallery.module.css'
import { DogGalleryProps } from '@/utils/types'

export default function DogGallery({
  dogs,
  favoriteDogIds,
  setFavoriteDogIds,
}: DogGalleryProps) {
  const dogRef = useRef<HTMLDivElement>(null)

  /**
   * Collect favorite dog IDs in state to find match
   */
  const handleAddToFavoriteDogs = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const id = event.currentTarget.getAttribute('data-dog-id')
    const idExistsAndIsNotAlreadyInFavorites =
      id && !favoriteDogIds.includes(id)

    if (idExistsAndIsNotAlreadyInFavorites) {
      setFavoriteDogIds((prev) => [...prev, id])
    }
  }

  return (
    <article className={styles.dogs}>
      {dogs.map((dog) => (
        <div
          key={dog.id}
          ref={dogRef}
          className={styles.dog}
          data-dog-id={dog.id}
          onClick={handleAddToFavoriteDogs}
        >
          <div className={styles.imageContainer}>
            <Image src={dog.img} alt={`${dog.breed} named ${dog.name}`} fill />
          </div>
          <div>
            <h3>{dog.name}</h3>
            <p>breed: {dog.breed}</p>
            <p>age: {dog.age}</p>
            <p>zip code: {dog.zip_code}</p>
          </div>
        </div>
      ))}
    </article>
  )
}
