import { FlatList, View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import PlaceItem from './PlaceItem'
import { Colors } from '../../constants/colors'

function PlacesList ({ places }) {
  const navigation = useNavigation()
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places found. Maybe add one?</Text>
      </View>
    )
  }

  function selectPlaceHandler (id) {
    navigation.navigate('PlaceDetails', {
      placeId: id
    })
  }

  return (
    <FlatList style={styles.list} data={places} key={(item) => item.id} renderItem={({ item }) => <PlaceItem place={item} onSelect={selectPlaceHandler} />} />
  )
}

const styles = StyleSheet.create({
  list: {
    margin: 24
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200
  }
})

export default PlacesList
