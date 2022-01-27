import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: 'white',
  },
  formContainer: {
    marginVertical: height * 0.2,
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleContainer: {
    marginHorizontal: width * 0.15,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#007ACC',
    fontSize: 35,
    width: 200,
  },
  textInputsContainer: {
    paddingBottom: 5,
    borderBottomWidth: 0.4,
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 90,
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#007ACC',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  textInput: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 30,
    margin: 5,
  },
  errorMsg: {
    color: 'red',
    paddingHorizontal: 30,
  },
});

export default styles;
