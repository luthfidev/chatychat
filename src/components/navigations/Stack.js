import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

// Auth
import LoginScreen from '../../screens/Login';
import RegisterScreen from '../../screens/Register';

import EditAvatarScreen from '../../screens/profile/EditAvatar';
import ChatPersonalScreen from '../../screens/room/ChatPersonal';
import EditProfileScreen from '../../screens/profile/EditProfile';

// Bottom Tab
import Tab from './Tab';

const Stacks = createStackNavigator();
class Stack extends Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <Stacks.Navigator headerMode="float" animation="fade">
            <>
              <Stacks.Screen
                component={LoginScreen}
                options={{
                  headerShown: false,
                }}
                name={'login'}
              />
              <Stacks.Screen
                component={RegisterScreen}
                options={{
                  title: 'Register',
                  headerShown: false,
                  gestureEnabled: true,
                  gestureDirection: 'vertical',
                  cardStyleInterpolator:
                    CardStyleInterpolators.forModalPresentationIOS,
                }}
                name={'register'}
              />

              <Stacks.Screen
                options={{title: 'Home', headerShown: false}}
                component={Tab}
                name={'home'}
              />

              <Stacks.Screen
                options={{title: 'Edit Avatar', headerShown: false}}
                component={EditAvatarScreen}
                name={'editavatar'}
              />
              <Stacks.Screen
                options={{title: 'Chat', headerShown: false}}
                component={ChatPersonalScreen}
                name={'chatpersonal'}
              />
              <Stacks.Screen
                options={{title: 'Edit Profile', headerShown: false}}
                component={EditProfileScreen}
                name={'editprofile'}
              />
            </>
          </Stacks.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

export default Stack;
