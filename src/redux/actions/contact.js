import firestore from '@react-native-firebase/firestore';
let collections = 'chatychats';

export const getcontact = () => {
  return {
    type: 'GET_CONTACT',
    payload: firestore()
      .collection(collections)
      .orderBy('fullname')
      .get()
      .then((snapshot) => {
        const user = [];
        snapshot.docs.forEach((doc) => {
          user.push(doc.data());
        });
      }),
  };
};
