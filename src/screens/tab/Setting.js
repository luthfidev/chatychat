import React, {Component} from 'react';
import {View, FlatList, StyleSheet, TouchableHighlight} from 'react-native';
import {ListItem} from 'react-native-elements';

export default class setting extends Component {
  keyExtractor = (item, index) => index.toString();
  renderItemProfile = ({item}) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => this.props.navigation.navigate('editavatar')}>
      <ListItem
        title={item.name}
        subtitle={item.subtitle}
        leftAvatar={{source: {uri: item.avatar_url}}}
        bottomDivider
      />
    </TouchableHighlight>
  );
  renderItemSetting = ({item}) => (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => this.props.navigation.navigate('editprofile')}>
      <ListItem
        title={item.title}
        leftIcon={{name: item.icon}}
        bottomDivider
        chevron
      />
    </TouchableHighlight>
  );
  render() {
    return (
      <View>
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={profile}
            renderItem={this.renderItemProfile}
          />
        </View>
        <View style={settingStyle.space} />
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={list}
            renderItem={this.renderItemSetting}
          />
        </View>
        <View style={settingStyle.space} />
        <View>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={list}
            renderItem={this.renderItemSetting}
          />
        </View>
      </View>
    );
  }
}
const profile = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
];
const list = [
  {
    title: 'Profile',
    icon: 'person',
  },
  {
    title: 'Chat',
    icon: 'chat',
  },
];

const settingStyle = StyleSheet.create({
  space: {
    marginTop: 15,
    marginBottom: 15,
  },
});
