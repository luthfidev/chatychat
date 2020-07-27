import React, {useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {logout} from '../../redux/actions/auth';

const Setting = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let user = auth().currentUser;
  const [avatar, setAvatar] = useState(
    'http://www.hidoctor.ir/wp-content/uploads/2014/02/Model-lebas-parastar-24.jpg',
  );
  const {dataUser} = useSelector((state) => state.user);

/*   const onLogout = () => {
    try {
      dispatch(logout());
    } catch (error) {
      Alert.alert('logout error');
    }
  }; */

  const renderItemSetting = ({item}) => {
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

  let imageRef = storage().ref('avatar/' + user.uid);
  imageRef
    .getDownloadURL()
    .then((url) => {
      //from url you can fetched the uploaded image easily
      setAvatar(url);
    })
    .catch((e) => console.log('getting downloadURL of image error => ', e));

  const keyExtractor = (item, index) => index.toString();
  const renderItemProfile = ({item}) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => navigation.navigate('editavatar')}>
        <ListItem
          title={item.fullname}
          subtitle={item.phone}
          leftAvatar={{
            source: {
              uri: avatar,
            },
          }}
          bottomDivider
        />
      </TouchableHighlight>
    );
  };
  return (
    <View>
      <View>
        <FlatList
          keyExtractor={keyExtractor}
          data={[dataUser]}
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
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Setting;

const list = [
  {
    name: 'editprofile',
    title: 'Profile',
    icon: 'person',
  },
  {
    name: 'map',
    title: 'Map',
    icon: 'map',
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
