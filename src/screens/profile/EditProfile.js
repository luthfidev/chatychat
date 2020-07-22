import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Input, Header} from 'react-native-elements';

export default class EditProfile extends Component {
  render() {
    return (
      <View>
        <Header />
        <Input placeholder="username" />
        <Input placeholder="Number" />
      </View>
    );
  }
}
