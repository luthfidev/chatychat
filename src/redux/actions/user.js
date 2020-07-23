import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getprofile = (email) => {
  return {
    type: 'GET_PROFILE',
    payload: firestore().collection('chatychats').doc('users').get(),
  };
};

export const updateprofile = (data) => {
  return {
    type: 'UPDATE_PROFILE',
    payload: auth().createUserWithEmailAndPassword(),
  };
};
