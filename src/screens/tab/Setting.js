import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/auth';

const keyExtractor = (item, index) => index.toString();
const renderItemProfile = ({item}) => (
  <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={() => this.props.navigation.navigate('editavatar')}>
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{source: {uri: item.avatar_url}}}
      bottomDivider
    />
  </TouchableHighlight>
);
const renderItemSetting = ({item}) => (
  <TouchableHighlight
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
    onPress={() => this.props.navigation.navigate('editprofile')}>
    <ListItem
      title={item.title}
      leftIcon={{name: item.icon}}
      bottomDivider
      chevron
    />
  </TouchableHighlight>
);

const Setting = () => {
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      Alert.alert('logout error');
    }
  };
  return (
    <View>
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={profile}
          renderItem={renderItemProfile}
        />
      </View>
      <View style={settingStyle.space} />
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={list}
          renderItem={renderItemSetting}
        />
      </View>
      <View style={settingStyle.space} />
      <View style={settingStyle.btnLogout}>
        <TouchableOpacity onPress={onLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Setting;

const profile = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
];
const list = [
  {
    name: 'profile',
    title: 'Profile',
    icon: 'person',
  },
  {
    title: 'Chat',
    icon: 'chat',
  },
];

const settingStyle = StyleSheet.create({
  space: {
    marginTop: 15,
    marginBottom: 15,
  },
  btnLogout: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
