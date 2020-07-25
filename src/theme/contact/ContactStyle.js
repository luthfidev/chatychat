import {StyleSheet} from 'react-native';
const ContactStyle = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  wrapChat: {
    flexDirection: 'row',
  },
  wrapMessage: {
    paddingLeft: 10,
    paddingRight: 50,
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 50,
    top: 2,
    bottom: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

export default ContactStyle;
