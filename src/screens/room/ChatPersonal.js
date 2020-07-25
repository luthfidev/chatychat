/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {Text, View, FlatList} from 'react-native';
import {Header} from 'react-native-elements';
import {GiftedChat} from 'react-native-gifted-chat';
import {useNavigation} from '@react-navigation/native';
import MsgBar from '../../components/room/msgbar';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const ChatPersonal = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    ReceiveMessage();
  }, []);

  /*   const Online = () => {
    const userId = auth().currentUser.uid;
    database()
      .ref(`/chat/${userId}/1XbYLhfgtTVAZlqzEirRjhYPZ1m2`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const {timestamp, text, user} = doc.val();
          const {key: _id} = doc;
          const message = {
            _id,
            timestamp,
            text,
            user,
          };
          setMessages([message]);
        });
      });
  }; */
  const ReceiveMessage = () => {
    const userId = auth().currentUser.uid;
    database()
      .ref(`/chat/${userId}/1XbYLhfgtTVAZlqzEirRjhYPZ1m2`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const {timestamp, text, user} = doc.val();
          const {key: _id} = doc;
          const message = {_id, timestamp, text, user};
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, message),
          );
        });
      });
  };
  /*   const onSend = useCallback((messages = []) => {
    for (let i = 0; i < messages.length; i++) {
      const userId = auth().currentUser.uid;
      const reference = database().ref(
        `/chat/${userId}/1XbYLhfgtTVAZlqzEirRjhYPZ1m2/2`,
      );
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
      );
      reference.set(messages);
    }
  }, []); */

  const sendMessage = useCallback((messages = []) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const userId = auth().currentUser.uid;
      const message = {
        text,
        user,
        timestamp: new Date().getTime(),
      };
      const reference = database().ref(
        `/chat/${userId}/1XbYLhfgtTVAZlqzEirRjhYPZ1m2/${new Date().getTime()}`,
      );
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages),
      );
      reference.set(message);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header
        placement="left"
        leftComponent={{
          onPress: () => navigation.goBack(),
          icon: 'arrow-back',
          color: '#fff',
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => sendMessage(messages)}
        user={{
          _id: '1XbYLhfgtTVAZlqzEirRjhYPZ1m2',
        }}
      />
    </View>
  );
};

export default ChatPersonal;
