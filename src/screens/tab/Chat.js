import React, {useEffect} from 'react';
import {StyleSheet, Text, View, I18nManager} from 'react-native';
import {FlatList, RectButton} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Badge, SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
//  To toggle LTR/RTL uncomment the next line
// I18nManager.allowRTL(true);

import AppleStyleSwipeableRow from '../../components/gesture/AppleStyleSwipeableRow';
import {getprofile} from '../../redux/actions/user';
const Chat = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = auth().currentUser;
  const {dataUser} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getprofile(user._user.email));
  }, []);

  if (!dataUser) {
    navigation.navigate('addprofile');
  } else {
    navigation.navigate('home');
  }

  const Row = ({item}) => (
    <RectButton
      style={styles.rectButton}
      onPress={() => navigation.navigate('chatpersonal', item.from)}>
      <View style={styles.wrapChat}>
        <View>
          <Avatar
            size="medium"
            rounded
            source={{
              uri: item.avatar,
            }}
          />
          <Badge
            status="success"
            containerStyle={{position: 'absolute', top: 2, right: 6}}
          />
        </View>
        <View style={styles.wrapMessage}>
          <Text style={styles.fromText}>{item.from}</Text>
          <Text numberOfLines={2} style={styles.messageText}>
            {item.message}
          </Text>
          <Text style={styles.dateText}>
            {item.when} {'❭'}
          </Text>
        </View>
      </View>
    </RectButton>
  );
  const SwipeableRow = ({item, index}) => {
    return (
      <AppleStyleSwipeableRow>
        <Row item={item} />
      </AppleStyleSwipeableRow>
    );
  };
  return (
    <>
      <SearchBar platform="ios" placeholder="Type Here..." />
      <FlatList
        data={DATA}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item, index}) => (
          <SwipeableRow item={item} index={index} />
        )}
        keyExtractor={(item, index) => `message ${index}`}
      />
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
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

const DATA = [
  {
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    from: "D'Artagnan",
    when: '3:11 PM',
    message:
      'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
  },
  {
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    from: 'Aramis',
    when: '11:46 AM',
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
  {
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    from: 'Athos',
    when: '6:06 AM',
    message:
      'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
  },
  {
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    from: 'Porthos',
    when: 'Yesterday',
    message:
      'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
  },
  {
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    from: 'Domestos',
    when: '2 days ago',
    message:
      'Aliquam imperdiet dolor eget aliquet feugiat. Fusce tincidunt mi diam. Pellentesque cursus semper sem. Aliquam ut ullamcorper massa, sed tincidunt eros.',
  },
  {
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    from: 'Cardinal Richelieu',
    when: '2 days ago',
    message:
      'Pellentesque id quam ac tortor pellentesque tempor tristique ut nunc. Pellentesque posuere ut massa eget imperdiet. Ut at nisi magna. Ut volutpat tellus ut est viverra, eu egestas ex tincidunt. Cras tellus tellus, fringilla eget massa in, ultricies maximus eros.',
  },
  {
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    from: "D'Artagnan",
    when: 'Week ago',
    message:
      'Aliquam non aliquet mi. Proin feugiat nisl maximus arcu imperdiet euismod nec at purus. Vestibulum sed dui eget mauris consequat dignissim.',
  },
  {
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    from: 'Cardinal Richelieu',
    when: '2 weeks ago',
    message:
      'Vestibulum ac nisi non augue viverra ullamcorper quis vitae mi. Donec vitae risus aliquam, posuere urna fermentum, fermentum risus. ',
  },
];
