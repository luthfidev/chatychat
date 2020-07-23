import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
let user = auth().currentUser;
let collections = 'chatychats';

export const getprofile = (email) => {
  return {
    type: 'GET_PROFILE',
    payload: firestore().collection(collections).doc(email).get(),
  };
};

export const addprofile = (data) => {
  return {
    type: 'ADD_PROFILE',
    payload: firestore()
      .collection(collections)
      .doc(user._user.email)
      .set(data),
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
