import { FlatList, View, Text, StyleSheet } from 'react-native'

import PlaceItem from './PlaceItem'

function PlacesList ({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places found. Maybe add one?</Text>
      </View>
    )
  }

  return (
    <FlatList data={places} key={(item) => item.id} renderItem={({ item }) => <PlaceItem place={item} />} />
  )
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallbackText: {
    fontSize: 16
  }
})

export default PlacesList
