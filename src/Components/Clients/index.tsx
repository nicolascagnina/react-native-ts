import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClientItem from './Client';
import {Client} from '../../Helpers/types';
import {RootStackParamList} from '../../Helpers/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/native';

const {width} = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Clients'>;

const Clients = ({route, navigation}: Props) => {
  const isFocused = useIsFocused();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getClientsList();
  }, [isFocused]);

  const Header = () => {
    return (
      <View>
        <Text style={styles.title}>Client List</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ClientForm')}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getClientsList = async () => {
    try {
      const clientsList = await AsyncStorage.getItem('clients');
      setClients(JSON.parse(clientsList ?? ''));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClient = async (client: Client) => {
    try {
      const clientsList = await AsyncStorage.getItem('clients');
      const parsedClients = (clientsList && JSON.parse(clientsList)) ?? [];
      const filteredClients = parsedClients.filter(
        (element: Client) => element.id !== client.id,
      );
      console.log(filteredClients);
      await AsyncStorage.removeItem('clients');
      await AsyncStorage.setItem(
        'clients',
        JSON.stringify(filteredClients),
      ).then(getClientsList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <FlatList
        keyExtractor={item => item?.id}
        data={clients}
        style={styles.wrapper}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              onLongPress={() => deleteClient(item)}
              onPress={() =>
                navigation.navigate('ClientForm', {
                  client: item,
                })
              }>
              <ClientItem item={item} style={styles.item} />
            </TouchableOpacity>
          </>
        )}
        ListHeaderComponent={Header}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, width: '100%', backgroundColor: 'pink'}} />
        )}
      />
    </View>
  );
};

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

export default Clients;
