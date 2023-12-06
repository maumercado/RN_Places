import { useCallback, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import IconButton from '../components/ui/IconButton'

function Map ({ navigation, route }) {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  }
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  function selectLocationHandler (event) {
    if (initialLocation) {
      return
    }
    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude
    setSelectedLocation({
      lat,
      lng
    })
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location picked', 'Please pick a location on the map first!', [{ text: 'Okay' }])
      return
    }
    navigation.navigate('AddPlace', {
      pickedLocation: selectedLocation
    })
  }, [selectedLocation, navigation])

  useLayoutEffect(() => {
    if (initialLocation) {
      return
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save' color={tintColor} size={24}
          onPress={savePickedLocationHandler}
        />
      )
    })
  }, [navigation, savePickedLocationHandler, initialLocation])

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {
        selectedLocation && <Marker
          title='Picked Location'
          coordinate={
            {
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng
            }
          }
                            />
      }
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})

export default Map
