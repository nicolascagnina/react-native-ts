import React, {useState, useEffect, createContext, FC} from 'react';
import {Client} from '../Helpers/types';
import {iClientContext} from '../Helpers/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ClientContext = createContext<iClientContext | null>(null);

const ClientContextProvider: FC = ({children}) => {
  const [clients, setClients] = useState<Client[] | []>([]);

  useEffect(() => {
    getClientsList();
  }, []);

  const getClientsList = async () => {
    const clientsList = await AsyncStorage.getItem('clients');
    setClients(JSON.parse(clientsList ?? ''));
  };

  const deleteClient = async (id: number | undefined): Promise<void> => {
    setClients(clients?.filter(client => client.id !== id));
    await AsyncStorage.removeItem('clients');
  };

  const addClient = async (client: Client): Promise<void> => {
    setClients([...clients, {...client, id: clients ? clients.length + 1 : 1}]);
    await AsyncStorage.setItem('clients', JSON.stringify(clients));
  };

  const updateClient = (client: Client): void => {
    const newClients = clients?.map(c => (c.id === client.id ? client : c));
    setClients(newClients);
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
