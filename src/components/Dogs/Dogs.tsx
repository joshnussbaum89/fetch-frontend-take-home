import { useRef } from 'react'
import Image from 'next/image'
import styles from './Dogs.module.css'
import { Dog } from '@/utils/types'

type DogsProps = {
  loading: boolean
  dogs: Dog[]
  favoriteDogIds: string[]
  setFavoriteDogIds: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Dogs({
  loading,
  dogs,
  favoriteDogIds,
  setFavoriteDogIds,
}: DogsProps) {
  const dogRef = useRef<HTMLDivElement>(null)

  /**
   * Collect favorite dog IDs in state to find match
   */
  const handleAddToFavoriteDogs = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const id = event.currentTarget.getAttribute('data-dog-id')

    if (id && !favoriteDogIds.includes(id)) {
      setFavoriteDogIds((prev) => [...prev, id])
    }
  }

  return (
    <article className={styles.dogs}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        dogs.map((dog) => (
          <div
            key={dog.id}
            className={styles.dog}
            data-dog-id={dog.id}
            ref={dogRef}
            onClick={handleAddToFavoriteDogs}
          >
            <div className={styles.imageContainer}>
              <Image
                src={dog.img}
                alt={`${dog.breed} named ${dog.name}`}
                fill
              />
            </div>
            <div>
              <h3>{dog.name}</h3>
              <p>breed: {dog.breed}</p>
              <p>age: {dog.age}</p>
              <p>zip code: {dog.zip_code}</p>
            </div>
          </div>
        ))
      )}
    </article>
  )
}
