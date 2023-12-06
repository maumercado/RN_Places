import {ScrollView, Image, View, Text, StyleSheet} from 'react-native';
import OutlinedButton from '../components/ui/OutlinedButton';
import { Colors } from '../constants/colors';
import { useEffect } from 'react';

function PlaceDetails({ route, navigation }) {
  const { placeId: selectedPlaceId } = route.params;
  function showOnMapHandler() {
    navigation.navigate('Map')
  }

  useEffect(() => {

  },[selectedPlaceId])

  return (
    <ScrollView>
      <Image style={styles.image}/>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>Address</Text>
        </View>
        <OutlinedButton icon='map' onPress={showOnMapHandler}>Show on Map</OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    minHeight: 300,
    height: '35%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default PlaceDetails;
