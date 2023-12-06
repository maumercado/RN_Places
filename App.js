import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen';


import { init } from './util/database'

import AllPlaces from './screens/AllPlaces'
import AddPlace from './screens/AddPlace'
import PlaceDetails from './screens/PlaceDetails'
import IconButton from './components/ui/IconButton'
import { Colors } from './constants/colors'
import Map from './screens/Map'

const Stack = createNativeStackNavigator()

export default function App () {
  const [dbInitialized, setDbInitialized] = useState()

  useEffect(() => {
    // This is a good place to initialize the database
    init().then(() => {
      setDbInitialized(true)
    })
      .catch(err => {
        console.log('Database initialization failed.')
        console.log(err)
      })
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [dbInitialized])

  if (!dbInitialized) {
    return null
  }

  return (
    <>
      <StatusBar style='dark' />
      <View
        onLayout={onLayoutRootView}
        style={{ flex: 1 }}
      >
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
            <Stack.Screen name='PlaceDetails' component={PlaceDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  )
}
