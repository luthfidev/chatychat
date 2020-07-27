import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
// Auth
import LoginScreen from '../../screens/Login';
import RegisterScreen from '../../screens/Register';

import EditAvatarScreen from '../../screens/profile/EditAvatar';
import ChatPersonalScreen from '../../screens/room/ChatPersonal';
import AddProfileScreen from '../../screens/profile/AddProfile';
import EditProfileScreen from '../../screens/profile/EditProfile';
import DetailContactScreen from '../../screens/profile/DetailContact';
import MapScreen from '../../screens/tab/Map';

// Bottom Tab
import Tab from './Tab';

const Stacks = createStackNavigator();
const Stack = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const onAuthStateChanged = (_user) => {
    setUser(_user);
    if (initializing) {
      setInitializing(false);
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (initializing) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stacks.Navigator headerMode="float" animation="fade">
          {!user && (
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
            </>
          )}
          {user && (
            <>
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
                options={{
                  title: 'Profile',
                  headerShown: false,
                  gestureEnabled: false,
                }}
                component={AddProfileScreen}
                name={'addprofile'}
              />
              <Stacks.Screen
                options={{
                  title: 'Profile',
                  headerShown: false,
                  gestureEnabled: true,
                  gestureDirection: 'vertical',
                  cardStyleInterpolator:
                    CardStyleInterpolators.forModalPresentationIOS,
                }}
                component={EditProfileScreen}
                name={'editprofile'}
              />
              <Stacks.Screen
                options={{title: 'Detail Contact', headerShown: false}}
                component={DetailContactScreen}
                name={'detailcontact'}
              />
              <Stacks.Screen
                options={{title: 'Map', headerShown: false}}
                component={MapScreen}
                name={'map'}
              />
            </>
          )}
        </Stacks.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Stack;
