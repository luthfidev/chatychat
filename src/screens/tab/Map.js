import React, {useState, useEffect} from 'react';
import {View, Alert, Platform, ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request} from 'react-native-permissions';

const initialState = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(initialState);

  request(
    Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    }),
  );

  useEffect(() => {
    Geolocation.getCurrentPosition((position) => {
      const {latitude, longitude} = position.coords;
      setCurrentPosition({
        ...currentPosition,
        latitude: latitude,
        longitude: longitude,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return currentPosition.latitude ? (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} initialRegion={currentPosition}>
        <MapView.Marker
          coordinate={currentPosition}
          title={'title'}
          description={'description'}
        />
      </MapView>
    </View>
  ) : (
    <ActivityIndicator style={{flex: 1}} animating size="large" />
  );
};

export default Map;
