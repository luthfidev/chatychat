import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import {Logo} from '../components/Logo';
import LoginStyle from '../theme/auth/login';
import {login} from '../redux/actions/auth';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm();
  const isLoading = useSelector((state) => state.auth.isLoading);

  const onSubmit = (data) => {
    try {
      dispatch(login(data.email, data.password));
      Alert.alert('Login Success');
    } catch (error) {
      Alert.alert('Login Failed');
    }
  };
  const user = auth().currentUser;
  console.log(user);
  return (
    <DismissKeyboard>
      <View style={LoginStyle.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={LoginStyle.wrapLogo}>
            <Logo />
          </View>
          <View style={LoginStyle.form}>
            <View style={LoginStyle.field}>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInput
                    type="text"
                    style={LoginStyle.input}
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
                <Text style={LoginStyle.errormsg}>{errors.email.message}</Text>
              )}
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInput
                    type="text"
                    style={LoginStyle.input}
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
                <Text style={LoginStyle.errormsg}>
                  {errors.password.message}
                </Text>
              )}
            </View>
            <Button
              title="Login"
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />
            <View style={LoginStyle.wrapBtn}>
              <TouchableHighlight
                onPress={() => navigation.navigate('register')}
                activeOpacity={0.6}
                underlayColor="#DDDDDD">
                <View style={LoginStyle.btnJoin}>
                  <Text style={LoginStyle.textBtnJoin}>JOIN CHAT</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboard>
  );
};

export default Login;
