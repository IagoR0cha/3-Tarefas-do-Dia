import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import IssuesPage from '../pages/IssuesPage';
import IssuePage from '../pages/IssuePage';
import CamPage from '../pages/CamPage';
import { theme } from '../global/styles/theme';
import { useAuth } from '../hooks/auth';

const { Navigator, Screen } = createStackNavigator();

export default function AuthRoutes() {

  const { clearUserData } = useAuth();

  function signOut() {
    AsyncStorage.clear();
    clearUserData();
  }

  function signOutButton() {
    return (
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={signOut}
      >
        <Entypo name="log-out" size={24} color={theme.textLightColor} />
      </TouchableOpacity>
    );
  }

  return (
    <Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent'
        },
        headerTintColor: theme.textLightColor,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.primaryColor,
        }
      }}
    >
      <Screen
        name="IssuesPage"
        component={IssuesPage}
        options={{
          title: 'Tarefas',
          headerRight: signOutButton
        }}
      />
      <Screen
        name="IssuePage"
        component={IssuePage}
        options={{
          headerStyle: { elevation: 0, backgroundColor: theme.primaryColor }
        }}
      />
      <Screen
        name="Cam"
        component={CamPage}
        options={{
          headerShown: false
        }}
      />
    </Navigator>
  )
}