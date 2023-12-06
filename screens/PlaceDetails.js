import { useState, useEffect } from 'react'
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native'
import OutlinedButton from '../components/ui/OutlinedButton'
import { Colors } from '../constants/colors'
import { fetchPlaceDetails } from '../util/database'

function PlaceDetails ({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState()
  const { placeId: selectedPlaceId } = route.params

  function showOnMapHandler () {
    navigation.navigate('Map', {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng
    })
  }

  useEffect(() => {
    async function loadPlaceData () {
      const place = await fetchPlaceDetails(selectedPlaceId)
      setFetchedPlace(place)
      navigation.setOptions({
        title: place.title
      })
    }
    loadPlaceData()
  }, [selectedPlaceId])

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Data...</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.imagePreviewContainer}>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon='map' onPress={showOnMapHandler}>Show on Map</OutlinedButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePreviewContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 4
  },
  image: {
    width: '100%',
    minHeight: 300,
    height: '35%',
    borderRadius: 4
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default PlaceDetails
