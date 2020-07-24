import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {Header, Input, Card, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import EditStyle from '../../theme/profile/EditProfile';
import {addprofile, getprofile} from '../../redux/actions/user';

const AddProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm();
  const user = auth().currentUser;
  const onSubmit = (data) => {
    try {
      dispatch(addprofile(user._user.email, data));
      dispatch(getprofile(user._user.email));
    } catch (error) {
      Alert.alert('Add profile failed');
    }
  };

  function trim(s) {
    return s.replace(/^\s+|\s+$/g, ' ');
  }
  return (
    <SafeAreaView style={EditStyle.container}>
      <KeyboardAvoidingView behavior="position">
        <View style={EditStyle.header}>
          <Header />

          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}>
              Profile
            </Text>
          </View>
          <Card>
            <View style={EditStyle.WrapperForm}>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Input
                    type="text"
                    underlineColorAndroid="transparent"
                    placeholder="Fullname"
                    placeholderTextColor="#00a8ff"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={(fullname) => onChange(trim(fullname))}
                  />
                )}
                name="fullname"
                rules={{
                  required: {
                    value: true,
                    message: 'Required',
                  },
                }}
                defaultValue=""
              />
              {errors.fullname && (
                <Text style={EditStyle.errormsg}>
                  {errors.fullname.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Input
                    type="text"
                    underlineColorAndroid="transparent"
                    placeholder="Phone"
                    placeholderTextColor="#00a8ff"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={(phone) => onChange(phone)}
                  />
                )}
                name="phone"
                rules={{
                  required: {
                    value: true,
                    message: 'Required',
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: 'Not valid',
                  },
                }}
                defaultValue=""
              />
              {errors.phone && (
                <Text style={EditStyle.errormsg}>{errors.phone.message}</Text>
              )}
              <Button
                /*  loading={isLoading}*/
                onPress={handleSubmit(onSubmit)}
                title="Save"
              />
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default AddProfile;
