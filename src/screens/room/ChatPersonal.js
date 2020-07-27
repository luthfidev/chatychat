/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {View} from 'react-native';
import {Header} from 'react-native-elements';
import {GiftedChat} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import uid from '../../helpers/guidGenerator';

const ChatPersonal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [messages, setMessages] = useState([]);

  const {uuid, fullname} = route.params;
  const sendFriendId = uuid;
  const userId = auth().currentUser.uid;

  useEffect(() => {
    const onChildAdd = receiveMessage((message) =>
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message),
      ),
    );
    return () =>
      database()
        .ref(`/chat/${sendFriendId}/${userId}`)
        .off('child_added', onChildAdd);
  }, []);

  const receiveMessage = (callback) => {
    database()
      .ref(`/chat/${sendFriendId}/${userId}`)
      .limitToLast(20)
      .on('child_added', (snapshot) => callback(parse(snapshot)));
  };

  const parse = (snapshot) => {
    const {timestamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const message = {
      _id,
      createdAt: timestamp,
      text,
      user,
    };
    return message;
  };

  const sendMessage = useCallback((messages = []) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        _id: uid(),
        text,
        user,
        timestamp: new Date().getTime(),
      };
      const send = database().ref(`/chat/${userId}/${sendFriendId}`).push();
      const receive = database().ref(`/chat/${sendFriendId}/${userId}`).push();
      send.set(message);
      receive.set(message);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        leftComponent={{
          onPress: () => navigation.goBack(),
          icon: 'arrow-back',
          color: '#fff',
        }}
        centerComponent={{text: fullname, style: {color: '#fff'}}}
      />
      <GiftedChat
        showUserAvatar
        messages={messages}
        onSend={(messages) => sendMessage(messages)}
        user={{
          _id: userId,
          name: 'avatar',
          avatar:
            'http://www.hidoctor.ir/wp-content/uploads/2014/02/Model-lebas-parastar-24.jpg',
        }}
      />
    </View>
  );
};

export default ChatPersonal;
