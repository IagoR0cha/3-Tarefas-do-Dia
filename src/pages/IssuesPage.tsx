import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';

import Background from '../components/Background';
import ItemIssue from '../components/ItemIssue';
import { theme } from '../global/styles/theme';
import { useAuth } from '../hooks/auth';
import { DataAccess } from '../interfaces/dataAccess';

export default function IssuesPage() {

  const { user } = useAuth();
  const navigation = useNavigation();

  const ISSUES_LIST = [
    {
      id: 1,
      title: 'Análise do interna do produto',
      description: 'Realize a análise dos componentes internos do produto, durante o processo de montagem'
    },
    {
      id: 2,
      title: 'Análise do externa do produto',
      description: 'Realize a análise do produto após a montagem do mesmo'
    },
    {
      id: 3,
      title: 'Análise da embalágem do produto',
      description: 'Realize a análise do produto já embalado. Verifique se contém a nota fiscal e a etiqueta com as informações do produto'
    },
  ]

  function configUserName(email: string) {
    const result = email.match(/(.*)@/);
    return result && result[1];
  }

  function accessItem(data: DataAccess) {
    navigation.navigate('IssuePage', { data })
  }

  function headerFunction() {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bem vindo,</Text>
        <Text style={styles.nameText}>{ configUserName(user.email) }</Text>
      </View>
    );
  }

  return (
    <Background styleBody={styles.container}>
      <SafeAreaView>
        <FlatList
          data={ISSUES_LIST}
          renderItem={({ item }) => <ItemIssue data={item} onPress={accessItem} />}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={headerFunction()}
        />
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  welcomeContainer: {
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 5
  },
  welcomeText: {
    fontSize: 14,
    color: theme.textDarkColor,
    marginBottom: -5,
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: 2,
    color: theme.textDarkPrimaryColor
  }
});