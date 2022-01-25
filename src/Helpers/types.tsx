export interface Client {
  id: number;
  name: string;
  email: string;
}
export interface Credentials {
  user: string;
  password: string;
}
export interface iClientContext {
  clients: Client[] | null;
  deleteClient: (id: number | undefined) => void;
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
}

export type RootStackParamList = {
  SignIn:
    | {setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>}
    | undefined;
  SignUp: undefined;
  Home: undefined;
  List: undefined;
  Clients: undefined;
  ClientForm:
    | {
        client: Client;
      }
    | undefined;
};
