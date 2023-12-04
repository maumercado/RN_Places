import { StyleSheet, View } from "react-native"
import { Colors } from "../../constants/colors"
import OutlinedButton from "../ui/OutlinedButton"

function LocationPicker () {
  function getLocationHandler () {

  }

  function pickonMapHandler () {

  }

  return <View>
    <View style={styles.mapPreview}></View>
    <View style={styles.actions}>
      <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
      <OutlinedButton icon="map" onPress={pickonMapHandler}>Pick on Map</OutlinedButton>
    </View>
  </View>
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
    alignItems: 'center',
  }
})

export default LocationPicker
