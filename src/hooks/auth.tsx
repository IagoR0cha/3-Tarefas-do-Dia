import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { LogBox } from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserData } from '../interfaces/userData';

LogBox.ignoreLogs(['Setting a timer']);

interface AuthContextData {
  user: UserData;
  signIn: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  messageError: string;
  clearUserData: () => void;
}

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<UserData>({} as UserData);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState('');

  async function signIn(email: string, password: string) {
    setIsLoading(true);
    setMessageError('');

    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(async (response) => {
        const token = await response.user?.getIdToken();
        const userId = response.user?.uid;
        if (token) {
          const userData: UserData = { email, password, token, userId };
          await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
          setIsLoading(false);
          setUser(userData);
        }
      }).catch(() => {
        setMessageError('Email ou senha incorretos');
        setIsLoading(false);
      });
    } catch (err) {
      setMessageError(err);
      setIsLoading(false);
    }
  }

  async function persistSignIn() {
    const response = await AsyncStorage.getItem('@user_data');

    if (response) {
      const userData: UserData = JSON.parse(response);
      setUser(userData);
    }
  }

  function clearUserData() {
    setUser({} as UserData);
  }

  useEffect(() => {
    persistSignIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, isLoading, messageError, clearUserData }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth }