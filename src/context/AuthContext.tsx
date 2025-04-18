
import React, { createContext, useContext, useState } from "react";

interface DummyUser {
  id: string;
  email: string;
  name: string;
}

interface AuthContextProps {
  user: DummyUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const dummyUsers = [
  { id: '1', email: 'john@example.com', password: 'password123', name: 'John Doe' },
  { id: '2', email: 'jane@example.com', password: 'password123', name: 'Jane Smith' }
];

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signIn: async () => {},
  signOut: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DummyUser | null>(null);

  const signIn = async (email: string, password: string) => {
    const dummyUser = dummyUsers.find(u => u.email === email && u.password === password);
    if (dummyUser) {
      const { password: _, ...userWithoutPassword } = dummyUser;
      setUser(userWithoutPassword);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

