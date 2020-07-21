import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Avatar, colors, Header} from 'react-native-elements';
import Icon from 'react-native-ionicons';
import ImagePicker from 'react-native-image-picker';

class EditAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: null,
      progress: 0,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    /* ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({avatar: response});
      }
    }); */
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response;

        this.setState({
          avatar: source,
        });
      }
    });
  };

  handleUploadAvatar = async () => {
    const {id} = this.state.user;
    const {token} = this.props.auth;
    // const data = this.createFormData(this.state.avatar);
    const avatar = this.state.avatar;
    const data = new FormData();
    data.append('picture', {
      name: avatar.fileName,
      type: avatar.type,
      uri:
        Platform.OS === 'android'
          ? avatar.uri
          : avatar.uri.replace('file://', ''),
    });
    await this.props
      .uploadavatarprofile(token, id, data)
      .then((response) => {
        Alert.alert('Upload success!');
        this.setState({avatar: null});
      })
      .catch((error) => {
        Alert.alert('Upload failed!');
      });
  };

  render() {
    const {avatar} = this.state;
    return (
      <SafeAreaView style={profileStyle.container}>
        <View style={profileStyle.header}>
          <Header
            rightComponent={
              <Icon
                name="create"
                color="#fff"
                onPress={this.navigateEditProfile}
              />
            }
          />
          <View style={profileStyle.WrapperAvatar}>
            {avatar && (
              <>
                <Avatar
                  showEditButton
                  onPress={this.handleChoosePhoto}
                  rounded
                  size={125}
                  source={{
                    uri: avatar.uri,
                  }}
                />
                <TouchableOpacity onPress={this.handleUploadAvatar}>
                  <Text style={profileStyle.btnupload}>SAVE</Text>
                </TouchableOpacity>
              </>
            )}
            {!avatar && (
              <Avatar
                showEditButton
                onPress={this.handleChoosePhoto}
                rounded
                size={125}
                source={{
                  uri: this.state.picture,
                }}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

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

const CardStyle = StyleSheet.create({
  WrapperContent: {
    flexDirection: 'column',
  },
  wrapperButton: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    shadowColor: '#dcdde1',
    elevation: 6,
  },
  btnTitle: {
    marginTop: 10,
  },
});
