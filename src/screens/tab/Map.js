import React, {useState, useEffect} from 'react';
import {View, Platform, ActivityIndicator} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request} from 'react-native-permissions';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {updateprofile} from '../../redux/actions/user';
const collections = 'chatychats';

const initialState = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const Map = () => {
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(initialState);
  const [contacts, setContacts] = useState([]);

  const getContact = () => {
    firestore()
      .collection(collections)
      .orderBy('fullname')
      .get()
      .then((snapshot) => {
        const user = [];
        snapshot.docs.forEach((doc) => {
          user.push(doc.data());
        });
        setContacts(user);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        }),
      );
      Geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          setCurrentPosition({
            ...currentPosition,
            latitude: latitude,
            longitude: longitude,
          });
          dispatch(updateprofile(latitude, longitude));
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
      getContact();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return currentPosition.latitude ? (
    <View style={{flex: 1}}>
      <MapView style={{flex: 1}} initialRegion={currentPosition}>
        {contacts.map((friend, index) => (
          <>
            <Marker
              key={friend.uuid.toString()}
              coordinate={{
                latitude: friend.latitude,
                longitude: friend.longitude,
              }}
              title={friend.fullname}
              description={friend.phone}
              draggable
            />
          </>
        ))}
      </MapView>
    </View>
  ) : (
    <ActivityIndicator style={{flex: 1}} animating size="large" />
  );
};

export default Map;
