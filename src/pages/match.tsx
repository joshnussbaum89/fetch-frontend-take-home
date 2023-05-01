import SectionHeader from '@/components/SectionHeader/SectionHeader'
import DogGallery from '@/components/DogGallery/DogGallery'
import { useAuth } from '@/hooks/useAuth'
import { useDogs } from '../hooks/useDogs'
import { AuthProps, DogSearchProps } from '@/utils/types'
import Restricted from '@/components/Restricted/Restricted'

export default function Match() {
  const auth = useAuth() as AuthProps
  const { favoriteDogIds, dogData, setFavoriteDogIds, handleResetState } =
    useDogs() as DogSearchProps

  return auth.isLoggedIn ? (
    <>
      <SectionHeader
        text={`Say hi to ${dogData?.dogs[0].name}, your new pal`}
      />
      <DogGallery
        dogs={dogData?.dogs}
        favoriteDogIds={favoriteDogIds}
        setFavoriteDogIds={setFavoriteDogIds}
      />
    </>
  ) : (
    <Restricted />
  )
}
