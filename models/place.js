import * as Crypto from 'expo-crypto'

class Place {
  constructor (title, imageUri, location) {
    this.id = Crypto.randomUUID()
    this.title = title
    this.imageUri = imageUri
    this.address = location.address
    this.location = { lat: location.lat, lng: location.lng }
  }
}

export default Place
