import auth from '@react-native-firebase/auth';

export const getprofile = (email, password) => {
  return {
    type: 'GET_PROFILE',
  };
};

export const updateprofile = (data) => {
  return {
    type: 'UPDATE_PROFILE',
    payload: auth().createUserWithEmailAndPassword(),
  };
};
