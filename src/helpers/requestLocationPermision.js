import {Alert} from 'react-native';
import {RESULTS, PERMISSIONS, request} from 'react-native-permissions';
export async function requestLocationPermission() {
  try {
    const granted = await request(PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Example App',
      message: 'Example App access to your location ',
    });
    if (granted === RESULTS.GRANTED) {
      console.log('You can use the location');
      Alert.alert('You can use the location');
    } else {
      console.log('location permission denied');
      Alert.alert('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
