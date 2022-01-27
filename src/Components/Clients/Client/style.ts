import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  id: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#aaa',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    fontSize: 14,
    minWidth: '80%',
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
  },
});

export default styles;
