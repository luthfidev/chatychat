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
import {useNavigation} from '@react-navigation/native';
import {logout} from '../../redux/actions/auth';

const Setting = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onLogout = async () => {
    try {
      await dispatch(logout());
    } catch (error) {
      Alert.alert('logout error');
    }
  };
  const renderItemSetting = ({item}) => {
    console.log(item)
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => navigation.navigate(item.name)}>
        <ListItem
          title={item.title}
          leftIcon={{name: item.icon}}
          bottomDivider
          chevron
        />
      </TouchableHighlight>
    );
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItemProfile = ({item}) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => navigation.navigate('editavatar')}>
      <ListItem
        title={item.name}
        subtitle={item.subtitle}
        leftAvatar={{source: {uri: item.avatar_url}}}
        bottomDivider
      />
    </TouchableHighlight>
  );
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
    name: 'editprofile',
    title: 'Profile',
    icon: 'person',
  },
  {
    name: 'chat',
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
