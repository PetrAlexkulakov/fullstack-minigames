import { createContext, useState } from 'react';

export const UserContext = createContext<{
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}>({
  name: '',
  setName: () => {},
});

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  // const [LoggedUser, setLoggedUser] = useState<AnyUser>(defaultLoggedUser);
  const [name, setName] = useState<string>('')

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
};
