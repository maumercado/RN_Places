import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

function IconButton ({ onPress, icon, color, size }) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressed: {
    opacity: 0.7
  }
})

export default IconButton
