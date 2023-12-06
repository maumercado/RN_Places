import * as SQLite from 'expo-sqlite'
import Place from '../models/place'

const DB_NAME = 'places.db'
const db = SQLite.openDatabase(DB_NAME)

export function init () {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
          `CREATE TABLE IF NOT EXISTS places (
              id INTEGER PRIMARY KEY NOT NULL,
              title TEXT NOT NULL,
              imageUri TEXT NOT NULL,
              address TEXT NOT NULL,
              lat REAL NOT NULL,
              lng REAL NOT NULL
            );`,
          [],
          () => { resolve() },
          (_, err) => { reject(err) }
      )
    })
  })
}

export function insertPlace (place) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng)
          VALUES ( ?, ?, ?, ?, ?);`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng
        ],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      )
    })
  })
}

export function fetchPlaces () {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          const places = []
          for (const row of result.rows._array) {
            places.push(new Place(
              row.title,
              row.imageUri,
              { address: row.address, lat: row.lat, lng: row.lng },
              row.id
            ))
          }
          resolve(places)
        },
        (_, err) => reject(err)
      )
    })
  })
}

export function fetchPlaceDetails (id) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
          if (result.rows.length === 0) {
            reject(new Error('Place not found'))
          } else {
            const row = result.rows.item(0)
            const place = new Place(
              row.title,
              row.imageUri,
              { address: row.address, lat: row.lat, lng: row.lng },
              row.id
            )
            resolve(place)
          }
        },
        (_, err) => reject(err)
      )
    })
  })
}
