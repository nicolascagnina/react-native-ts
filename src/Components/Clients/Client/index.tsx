import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Client} from '../../../Helpers/types';

interface Props {
  style: object;
  item: Client;
  onPressCB: Function;
}
const ClientItem = (props: Props) => {
  return (
    <View style={props.style}>
      <Text style={styles.id}>{props.item.id}</Text>
      <View style={styles.section}>
        <View style={{flexDirection: 'column', paddingHorizontal: 30}}>
          <Text style={styles.text}>{props.item.name}</Text>
          <Text style={styles.text}>{props.item.email}</Text>
        </View>
        <AntDesign
          style={{
            paddingLeft: 60,
            paddingTop: 10,
          }}
          name="edit"
          size={30}
          onPress={() => props.onPressCB()}
        />
      </View>
    </View>
  );
};

export default ClientItem;

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
