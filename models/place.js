import crypto from 'node:crypto';

class Place {
  constructor(title, imageUri, address, location) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location; // {lat: ..., lng: ...}
  }
}

export default Place;
