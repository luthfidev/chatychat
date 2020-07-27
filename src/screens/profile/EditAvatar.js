import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Avatar, Header} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import storage from '@react-native-firebase/storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
let user = auth().currentUser;
import {uploadavatar} from '../../redux/actions/user';

const EditAvatar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(null);
  const [avatarFill, setAvatarFill] = useState(null);
  const handleChoosePhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response;

        setAvatar(source);
      }
    });
  };

  const handleUploadAvatar = () => {
    if (avatar.fileSize <= 1500000 && avatar.type === 'image/jpeg') {
      dispatch(uploadavatar(avatar.uri)).then(() => {
        Alert.alert('Success upload image');
      });
    } else {
      Alert.alert('Please select image less than 1,5 mb');
    }
  };

  let imageRef = storage().ref('avatar/' + user.uid);
  imageRef
    .getDownloadURL()
    .then((url) => {
      //from url you can fetched the uploaded image easily
      setAvatarFill(url);
    })
    .catch((e) => console.log('getting downloadURL of image error => ', e));

  return (
    <SafeAreaView style={profileStyle.container}>
      <View style={profileStyle.header}>
        <Header
          leftComponent={{
            onPress: () => navigation.goBack(),
            icon: 'arrow-back',
            color: '#fff',
          }}
        />
        <View style={profileStyle.WrapperAvatar}>
          {avatar && (
            <>
              <Avatar
                showEditButton
                onPress={handleChoosePhoto}
                rounded
                size={125}
                source={{
                  uri: avatar.uri,
                }}
              />
              <TouchableOpacity onPress={handleUploadAvatar}>
                <Text style={profileStyle.btnupload}>SAVE</Text>
              </TouchableOpacity>
            </>
          )}
          {!avatar && (
            <Avatar
              showEditButton
              onPress={handleChoosePhoto}
              rounded
              size={125}
              source={{
                uri: avatarFill,
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditAvatar;

const profileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#2289DC',
    height: 250,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    shadowColor: '#dcdde1',
    elevation: 6,
    marginBottom: 25,
  },
  WrapperAvatar: {
    marginTop: 15,
    alignItems: 'center',
  },
  wrapperBiodata: {
    alignItems: 'center',
    marginTop: 10,
    width: 250,
    backgroundColor: '#dfe4ea',
    borderRadius: 10,
    shadowColor: '#dcdde1',
    elevation: 5,
  },
  BiodataText: {},
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperLogout: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  btnupload: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
