import { useDogs } from '@/hooks/useDogs'
import { DogSearchProps } from '@/utils/types'
import Navigation from '../Navigation/Navigation'
import styles from './Header.module.css'

export default function Header() {
  const { favoriteDogIds, handleFindMatch } = useDogs() as DogSearchProps

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1>Pup Finder</h1>
        {favoriteDogIds.length > 0 && (
          <button onClick={handleFindMatch}>Find A Match!</button>
        )}
        <Navigation />
      </div>
    </header>
  )
}
