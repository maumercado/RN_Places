import { useState } from 'react'
import { Alert, Image, StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location'
import { Colors } from '../../constants/colors'
import { getMapPreviewImage } from '../../util/location'
import OutlinedButton from '../ui/OutlinedButton'

function LocationPicker () {
  const navigation = useNavigation()
  const [pickedLocation, setPickedLocation] = useState()
  const [locationPermissionInfo, requestPermission] = useForegroundPermissions(false)

  async function verifyPermissions () {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED && locationPermissionInfo.canAskAgain) {
      const permissionResponse = await requestPermission()
      return permissionResponse.granted
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      )
      return false
    }
    return true
  }

  async function getLocationHandler () {
    const hasPermission = await verifyPermissions()
    if (!hasPermission) {
      return
    }
    const location = await getCurrentPositionAsync()
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude
    })
  }

  function pickonMapHandler () {
    navigation.navigate('Map')
  }

  let locationPreview = <Text>No location chosen yet!</Text>
  if (pickedLocation) {
    locationPreview = <Image style={styles.image} source={{ uri: getMapPreviewImage(pickedLocation.lat, pickedLocation.lng) }} />
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
        <OutlinedButton icon='map' onPress={pickonMapHandler}>Pick on Map</OutlinedButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4
  }
})

export default LocationPicker
