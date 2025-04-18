
import React, { createContext, useContext, useState } from "react";

interface DummyUser {
  id: string;
  email: string;
  name: string;
  user_metadata: {
    name?: string;
  };
}

interface AuthContextProps {
  user: DummyUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const dummyUsers = [
  { 
    id: '1', 
    email: 'john@example.com', 
    password: 'password123', 
    name: 'John Doe',
    user_metadata: { name: 'John Doe' } 
  },
  { 
    id: '2', 
    email: 'jane@example.com', 
    password: 'password123', 
    name: 'Jane Smith',
    user_metadata: { name: 'Jane Smith' } 
  }
];

const AuthContext = createContext<AuthContextProps>({
  user: null,
  signIn: async () => {},
  signOut: () => {},
  isLoading: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DummyUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real implementation, this would be replaced with a Spring Boot API call
      // Example: const response = await axios.post('/api/auth/login', { email, password });
      
      const dummyUser = dummyUsers.find(u => u.email === email && u.password === password);
      if (dummyUser) {
        const { password: _, ...userWithoutPassword } = dummyUser;
        setUser(userWithoutPassword);
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    // In a real implementation, this would be replaced with a Spring Boot API call
    // Example: await axios.post('/api/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
