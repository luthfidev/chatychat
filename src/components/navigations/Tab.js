import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import ChatScreen from '../../screens/tab/Chat';
import ContactScreen from '../../screens/tab/Contact';
import ProfileScreen from '../../screens/tab/Setting';
import MapScreen from '../../screens/tab/Map';

const BottomTab = createBottomTabNavigator();

const Tab = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        options={{
          title: 'Chat',
          tabBarIcon: ({color, size}) => (
            <Icon name="chatbubbles-outline" color={color} size={size} />
          ),
        }}
        component={ChatScreen}
        name="chat"
      />
      <BottomTab.Screen
        options={{
          title: 'Contact',
          tabBarIcon: ({color, size}) => (
            <Icon name="call-outline" color={color} size={size} />
          ),
        }}
        component={ContactScreen}
        name="contact"
      />

      <BottomTab.Screen
        options={{
          title: 'map',
          tabBarIcon: ({color, size}) => (
            <Icon name="map-outline" solid color={color} size={size} />
          ),
        }}
        component={MapScreen}
        name="map"
      />

      <BottomTab.Screen
        options={{
          title: 'setting',
          tabBarIcon: ({color, size}) => (
            <Icon name="settings-outline" solid color={color} size={size} />
          ),
        }}
        component={ProfileScreen}
        name="setting"
      />
    </BottomTab.Navigator>
  );
};

export default Tab;
