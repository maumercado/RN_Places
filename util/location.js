const GOOGLE_API_KEY = 'AIzaSyAHL6TX8loAi_iUrr4PwkemovjOnRwRqfQ'

export function getMapPreviewImage (lat, lng) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${GOOGLE_API_KEY}`
}
