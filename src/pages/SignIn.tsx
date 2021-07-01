import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';

import Background from '../components/Background';
import { theme } from '../global/styles/theme';
import { useAuth } from '../hooks/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, messageError, signIn } = useAuth();

  return (
    <Background styleBody={styles.container}>
      <Text style={styles.title}>
        <Text style={{ color: theme.primaryColor }}>3</Text> Tarefas do Dia
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          textContentType="password"
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          {!isLoading ?
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => signIn(email, password)}
            >
              <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
            :
            <ActivityIndicator size="large" color={theme.primaryColor} />
          }
        </View>
        <View style={styles.messageErrorContainer}>
          <Text style={styles.textError}>{messageError}</Text>
        </View>
      </View>
   </Background>
 );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    backgroundColor: theme.backgroundColorLight
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.secondaryColor,
    alignSelf: 'center',
    textAlign: 'center'
  },
  form: {
    marginTop: 70,
  },
  input: {
    marginBottom: 10,
    padding: 16,
    borderWidth: 1.2,
    borderRadius: 20,
    borderColor: theme.secondaryColor,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: theme.primaryColor,
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: '100%'
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.textLightColor
  },
  messageErrorContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  textError: {
    color: theme.dangerColor,
    textAlign: 'center',
  },
});