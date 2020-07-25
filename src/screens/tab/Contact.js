import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {Avatar, Badge, SearchBar} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
const collections = 'chatychats';
import ContactStyle from '../../theme/contact/ContactStyle';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
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
      .ref(`/online/${userId}`)
      .once('value')
      .then((snapshot) => {
        setIsOnline(snapshot.val());
      });
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => {
    return (
      <View style={ContactStyle.rectButton}>
        <View style={ContactStyle.wrapChat}>
          <View>
            <Avatar
              size="medium"
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
            {isOnline && item.uuid === userId ? (
              <Badge
                status="success"
                containerStyle={{position: 'absolute', top: 2, right: 6}}
              />
            ) : (
              <Badge
                status="error"
                containerStyle={{position: 'absolute', top: 2, right: 6}}
              />
            )}
          </View>
          <View style={ContactStyle.wrapMessage}>
            <Text style={ContactStyle.fromText}>{item.fullname}</Text>
            <Text numberOfLines={2} style={ContactStyle.messageText}>
              {item.phone}
            </Text>
          </View>
        </View>
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
