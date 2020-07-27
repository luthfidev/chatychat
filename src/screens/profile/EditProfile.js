/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {Header, Input, Card, Button} from 'react-native-elements';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import EditStyle from '../../theme/profile/EditProfile';
import {updateprofile, getprofile} from '../../redux/actions/user';
const EditProfile = () => {
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm();
  const {dataUser, isLoading} = useSelector((state) => state.user);
  const user = auth().currentUser;

  const onSubmit = (data) => {
    try {
      dispatch(updateprofile(data));
      dispatch(getprofile(user._user.email));
    } catch (error) {
      Alert.alert('Update profile failed');
    }
  };

  function trim(s) {
    return s.replace(/^\s+|\s+$/g, ' ');
  }

  return (
    <SafeAreaView style={EditStyle.container}>
      <KeyboardAvoidingView behavior="position">
        <View style={EditStyle.header}>
          <Header
            centerComponent={
              <TouchableOpacity>
                <View style={EditStyle.btnDown} />
              </TouchableOpacity>
            }
          />

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
                  minLength: {
                    value: 5,
                    message: 'min length is 5',
                  },
                }}
                defaultValue={dataUser.fullname}
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
                    onChangeText={(phone) => onChange(trim(phone))}
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
                  maxLength: {
                    value: 13,
                    message: 'min length is 13',
                  },
                }}
                defaultValue={dataUser.phone}
              />
              {errors.phone && (
                <Text style={EditStyle.errormsg}>{errors.phone.message}</Text>
              )}
              <Button
                loading={isLoading}
                onPress={handleSubmit(onSubmit)}
                title="Update"
              />
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default EditProfile;
