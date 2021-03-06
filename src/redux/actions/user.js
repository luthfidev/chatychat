import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
let user = auth().currentUser;
let collections = 'chatychats';

export const getprofile = (email) => {
  return {
    type: 'GET_PROFILE',
    payload: firestore().collection(collections).doc(email).get(),
  };
};

export const addprofile = (email, data) => {
  const setData = {
    uuid: user.uid,
    email: user._user.email,
    fullname: data.fullname,
    phone: data.phone,
    latitude: 0,
    longitude: 0,
  };
  return {
    type: 'ADD_PROFILE',
    payload: firestore().collection(collections).doc(email).set(setData),
  };
};

export const updateprofile = (data) => {
  return {
    type: 'UPDATE_PROFILE',
    payload: firestore()
      .collection(collections)
      .doc(user._user.email)
      .update(data),
  };
};

export const uploadavatar = (image) => {
  return {
    type: 'UPLOAD_IMAGE',
    payload: storage().ref(`avatar/${user.uid}`).putFile(image),
  };
};

export const updatelocation = (latitude, longitude) => {
  return {
    type: 'UPDATE_LOCATION',
    payload: firestore()
      .collection(collections)
      .doc(user._user.email)
      .update({latitude: latitude, longitude: longitude}),
  };
};
