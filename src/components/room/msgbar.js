import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';

import style from '../../theme/msgbar';
import colors from '../../theme/color';

export default class MsgBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View style={[style.container, this.props.style]}>
        <TextInput
          style={style.textInput}
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
          placeholder={'Type here..'}
        />
        <TouchableOpacity style={style.sendIcon} onPress={this.onSend}>
          <Icon name={'send'} color={colors.white} size={20} />
        </TouchableOpacity>
      </View>
    );
  }

  onSend = () => {
    if (this.state.text.trim() === '') {
      return;
    }
    const {conversationKey} = this.props;
    this.props.Chat.sendMessage(conversationKey, this.state.text.trim());
    this.setState({text: ''});
  };
}
