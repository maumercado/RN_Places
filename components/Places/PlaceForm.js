import { useCallback, useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { Colors } from '../../constants/colors'

import Button from '../ui/Button'

import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'

function PlaceForm () {
  const [selectedImage, setSelectedImage] = useState()
  const [pickedLocation, setPickedLocation] = useState()
  const [enteredTitle, setEnteredTitle] = useState('')

  function changeTitleHandler (enteredText) {
    setEnteredTitle(enteredText)
  }

  function savePlaceHandler () {

  }

  function takeImageHandler (imageUri) {
    setSelectedImage(imageUri)
  }

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location)
  }, [])

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />

      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
})

export default PlaceForm
