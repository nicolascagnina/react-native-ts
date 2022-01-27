import React, {useContext} from 'react';
import styles from './style';
import {FlatList, Text, View, TouchableOpacity} from 'react-native';
import ClientItem from './Client';
import {RootStackParamList} from '../../Helpers/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ClientContext} from '../../Context/ClientsContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientsScreen'>;

const Clients = ({route, navigation}: Props) => {
  const clientContext = useContext(ClientContext);

  const Header = () => {
    return (
      <View>
        <Text style={styles.title}>Client List</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ClientForm')}>
          <AntDesign name="home" size={30} />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={clientContext?.clients}
        style={styles.wrapper}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              onLongPress={() => clientContext?.deleteClient(item?.id)}>
              <ClientItem
                item={item}
                style={styles.item}
                onPressCB={() =>
                  navigation.navigate('ClientForm', {
                    client: item,
                  })
                }
              />
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
