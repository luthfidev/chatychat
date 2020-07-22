import auth from '@react-native-firebase/auth';

export const login = (email, password) => {
  return {
    type: 'LOGIN',
    payload: auth().signInWithEmailAndPassword(email, password),
  };
};

export const register = (email, password) => {
  return {
    type: 'REGISTER',
    payload: auth().createUserWithEmailAndPassword(email, password),
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: auth().signOut(),
  };
};
