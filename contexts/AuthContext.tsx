import { useRouter } from 'expo-router';
import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

// Define o formato das informações do usuário
interface User {
  id: number;
  email: string;
  fullName: string; // Adicionado
  phoneNumber: string; // Adicionado
  role: 'volunteer' | 'admin'; // Adicionado para a Parte 2
}

// Define o que o nosso contexto vai fornecer
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Cria o Contexto
const AuthContext = createContext<AuthContextType | null>(null);

// Cria o Provedor, que vai gerenciar o estado
export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // Após o logout, volta para a tela inicial
    router.replace('/(tabs)');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Cria um "hook" customizado para facilitar o uso do contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}