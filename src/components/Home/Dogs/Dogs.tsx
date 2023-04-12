import Image from 'next/image'
import styles from './Dogs.module.css'

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export default function Dogs({ dogs }: { dogs: Dog[] }) {
  return (
    <section className={styles.dogs}>
      {dogs.map((dog: Dog) => (
        <div key={dog.id} className={styles.dog} data-dog-id={dog.id}>
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
    </section>
  )
}
