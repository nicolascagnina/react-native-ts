interface Client {
  id: string;
  name: string;
  email: string;
}
interface Credentials {
  user: string;
  password: string;
}

type RootStackParamList = {
  SignIn:
    | {setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>}
    | undefined;
  SignUp: undefined;
  List: undefined;
  Clients: undefined;
  ClientForm: {
    client: Client;
  };
};

export type {Client, Credentials, RootStackParamList};
