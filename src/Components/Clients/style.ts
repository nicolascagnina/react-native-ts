import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    width,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#004d7f',
  },
  button: {
    marginTop: 30,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: '#009aff',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  item: {
    marginTop: 24,
    padding: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#7fccff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.8,
  },
  textInputsContainer: {
    paddingBottom: 5,
    borderBottomWidth: 0.4,
  },
  textInput: {
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 30,
    margin: 5,
  },
});

export default styles;
