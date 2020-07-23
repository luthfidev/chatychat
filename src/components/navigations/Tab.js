import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';
import {connect} from 'react-redux';

import ChatScreen from '../../screens/tab/Chat';
import ContactScreen from '../../screens/tab/Contact';
import ProfileScreen from '../../screens/tab/Setting';

const BottomTab = createBottomTabNavigator();

const Tab = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        options={{
          title: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Icon name="chatbubbles" color={color} size={size} />
          ),
        }}
        component={ChatScreen}
        name="chat"
      />
      <BottomTab.Screen
        options={{
          title: 'Contact',
          tabBarIcon: ({color, size}) => (
            <Icon name="call" color={color} size={size} />
          ),
        }}
        component={ContactScreen}
        name="contact"
      />

      <BottomTab.Screen
        options={{
          title: 'setting',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" solid color={color} size={size} />
          ),
        }}
        component={ProfileScreen}
        name="setting"
      />
    </BottomTab.Navigator>
  );
};

export default Tab;
