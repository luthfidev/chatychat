/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Avatar, Badge, SearchBar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
const collections = 'chatychats';
import ContactStyle from '../../theme/contact/ContactStyle';

const Contact = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [isOnline, setIsOnline] = useState([]);
  const [avatarFill, setAvatarFill] = useState(null);
  const userId = auth().currentUser.uid;
  useEffect(() => {
    Online();
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
  }, []);

  const Online = () => {
    database()
      .ref('/online/')
      .once('value')
      .then((snapshot) => {
        setIsOnline(snapshot.val());
      });
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    /*     let imageRef = storage().ref('avatar/' + item.uuid);
    imageRef
      .getDownloadURL()
      .then((url) => {
        //from url you can fetched the uploaded image easily
        setAvatarFill(url);
      })
      .catch((e) => console.log('getting downloadURL of image error => ', e)); */
    return (
      <View style={ContactStyle.rectButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('chatpersonal', item)}>
          <View style={ContactStyle.wrapChat}>
            <View>
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: 'https://muhilibrary.alipal.pw/uploads/default.png',
                }}
              />
              {/*        {isOnline && item.uuid === userId ? (
                <Badge
                  status="success"
                  containerStyle={{position: 'absolute', top: 2, right: 6}}
                />
              ) : (
                <Badge
                  status="error"
                  containerStyle={{position: 'absolute', top: 2, right: 6}}
                />
              )} */}
              <Badge
                status={isOnline ? 'success' : 'error'}
                containerStyle={{position: 'absolute', top: 2, right: 6}}
              />
            </View>
            <View style={ContactStyle.wrapMessage}>
              <Text style={ContactStyle.fromText}>{item.fullname}</Text>
              <Text numberOfLines={2} style={ContactStyle.messageText}>
                {item.phone}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <SearchBar platform="ios" placeholder="Type Here..." />
      <FlatList
        keyExtractor={keyExtractor}
        data={contacts}
        ItemSeparatorComponent={() => <View style={ContactStyle.separator} />}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Contact;
