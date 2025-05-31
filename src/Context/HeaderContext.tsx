import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderContextType {
  login: { isLoggin: boolean; name: string;  count: number, email:string};
  setLogin: (name: { isLoggin: boolean; name: string; count:number, email:string }) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [login, setLogin] = useState({
    isLoggin: false,
    name: 'User',
    count: 0,
    email: 'email',
  });

  return (
    <HeaderContext.Provider value={{ login, setLogin }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
