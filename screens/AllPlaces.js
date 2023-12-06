import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import PlacesList from '../components/Places/PlacesList'
import { fetchPlaces } from '../util/database'

function AllPlaces () {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    async function loadPlaces () {
      const result = await fetchPlaces()
      setLoadedPlaces(result)
    }
    if (isFocused) {
      loadPlaces()
    }
  }, [isFocused])

  return <PlacesList places={loadedPlaces} />
}

export default AllPlaces
