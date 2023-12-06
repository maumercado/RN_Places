import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AllPlaces from './screens/AllPlaces'
import AddPlace from './screens/AddPlace'
import IconButton from './components/ui/IconButton'
import { Colors } from './constants/colors'
import Map from './screens/Map'

const Stack = createNativeStackNavigator()

export default function App () {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700
            }
          }}
        >
          <Stack.Screen
            name='AllPlaces' component={AllPlaces} options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => {
                return (
                  <View>
                    <IconButton
                      icon='add' color={tintColor} size={24}
                      onPress={() => {
                        navigation.navigate('AddPlace')
                      }}
                    />
                  </View>
                )
              }
            })}
          />
          <Stack.Screen title='Add New Place' name='AddPlace' component={AddPlace} />
          <Stack.Screen name='Map' component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
