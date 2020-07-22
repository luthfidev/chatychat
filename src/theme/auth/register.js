import {StyleSheet} from 'react-native';
const RegisterStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F3',
    alignItems: 'center',
  },
  wrapLogo: {
    marginBottom: 50,
  },
  logotext: {
    marginLeft: 25,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#e84118',
    textDecorationLine: 'underline',
  },
  form: {
    alignItems: 'center',
  },
  field: {
    width: 300,
  },
  input: {
    margin: 10,
    height: 45,
    borderColor: '#0097e6',
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 15,
  },
  errormsg: {
    color: 'red',
    fontSize: 15,
  },
  wrapBtn: {
    marginTop: 50,
  },
  btnJoin: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    backgroundColor: '#002C3E',
    borderRadius: 20,
  },
  textBtnJoin: {
    color: 'white',
    letterSpacing: 5,
    fontWeight: 'bold',
  },
});

export default RegisterStyle;
