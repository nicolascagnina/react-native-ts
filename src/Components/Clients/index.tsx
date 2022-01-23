import React, {useContext} from 'react';
import styles from './style';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import ClientItem from './Client';
import {RootStackParamList} from '../../Helpers/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ClientContext} from '../../Context/ClientsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Clients'>;

const Clients = ({route, navigation}: Props) => {
  const clientContext = useContext(ClientContext);

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

  return (
    <View>
      <FlatList
        data={clientContext?.clients}
        style={styles.wrapper}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              onLongPress={() => clientContext?.deleteClient(item?.id)}
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

export default Clients;
