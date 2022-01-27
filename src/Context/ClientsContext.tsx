import React, {useState, useEffect, createContext, FC} from 'react';
import {Client} from '../Helpers/types';
import {iClientContext} from '../Helpers/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

export const ClientContext = createContext<iClientContext | null>(null);

const ClientContextProvider: FC = ({children}) => {
  const [clients, setClients] = useState<Client[] | []>([]);

  useEffect(() => {
    getClientsList();
  }, []);

  const getClientsList = async () => {
    const clientsList = await AsyncStorage.getItem('clients');
    clientsList && setClients(JSON.parse(clientsList));
  };

  const deleteClient = async (id: number | undefined): Promise<void> => {
    setClients(clients?.filter(client => client.id !== id));
    await AsyncStorage.removeItem('clients');
    Toast.show('Client deleted');
  };

  const addClient = async (client: Client): Promise<void> => {
    const newClients = [
      ...clients,
      {...client, id: clients.length ? clients[clients.length - 1].id + 1 : 1},
    ];
    setClients(newClients);
    await AsyncStorage.setItem('clients', JSON.stringify(newClients));
    Toast.show('Client created');
  };

  const updateClient = (client: Client): void => {
    const newClients = clients?.map(c => (c.id === client.id ? client : c));
    setClients(newClients);
    Toast.show('Client updated');
  };

  return (
    <ClientContext.Provider
      value={{
        clients,
        deleteClient,
        addClient,
        updateClient,
      }}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContextProvider;
