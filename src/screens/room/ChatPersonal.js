import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {Header} from 'react-native-elements';
import MsgBar from '../../components/room/msgbar';

export default class ChatPersonal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          placement="left"
          leftComponent={{
            onPress: () => this.props.navigation.goBack(),
            icon: 'arrow-back',
            color: '#fff',
          }}
        />
        <FlatList
          ref={(instance) => (this._chats = instance)}
          style={{flexGrow: 1}}
          data={this.state.messages}
          keyExtractor={(item, index) => item.key}
          onContentSizeChange={() => this._chats.scrollToEnd({animated: true})}
          // onScrollBeginDrag={this.onScrollBeginDrag}
          // onScrollEndDrag={this.onScrollEndDrag}
        />
        <MsgBar />
      </View>
    );
  }
}
