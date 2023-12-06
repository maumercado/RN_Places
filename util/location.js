const GOOGLE_API_KEY = 'AIzaSyAHL6TX8loAi_iUrr4PwkemovjOnRwRqfQ'

export function getMapPreviewImage (lat, lng) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
}

export async function getAddressFromLocation (lat, lng) {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`)
  if (!response.ok) {
    throw new Error('Failed to fetch address!')
  }

  const data = await response.json()
  return data.results[0].formatted_address
}
