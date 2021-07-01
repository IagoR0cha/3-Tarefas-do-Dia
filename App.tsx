import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { theme } from './src/global/styles/theme';

import { AuthProvider } from './src/hooks/auth';
import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={theme.primaryColor} style="light" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({});
