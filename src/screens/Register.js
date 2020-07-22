import React from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {Logo} from '../components/Logo';
import RegisterStyle from '../theme/auth/register';
import {register} from '../redux/actions/auth';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Register = () => {
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = async (data) => {
    try {
      await dispatch(register(data.email, data.password));
      Alert.alert('Register Success');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      }
    }
  };

  return (
    <DismissKeyboard>
      <View style={RegisterStyle.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={RegisterStyle.wrapLogo}>
            <Logo />
          </View>
          <View style={RegisterStyle.form}>
            <View style={RegisterStyle.field}>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInput
                    type="text"
                    style={RegisterStyle.input}
                    underlineColorAndroid="transparent"
                    placeholder="Email"
                    placeholderTextColor="#00a8ff"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={(email) => onChange(email)}
                  />
                )}
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: 'Required',
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Enter a valid e-mail address',
                  },
                }}
                defaultValue=""
              />
              {errors.email && (
                <Text style={RegisterStyle.errormsg}>
                  {errors.email.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInput
                    type="text"
                    style={RegisterStyle.input}
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    placeholderTextColor="#00a8ff"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={(password) => onChange(password)}
                  />
                )}
                name="password"
                rules={{
                  required: {
                    value: true,
                    message: 'Required',
                  },
                }}
                defaultValue=""
              />
              {errors.password && (
                <Text style={RegisterStyle.errormsg}>
                  {errors.password.message}
                </Text>
              )}
            </View>
            <Button
              title="Register"
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  );
};

export default Register;
