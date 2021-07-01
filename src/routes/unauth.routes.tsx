import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../pages/SignIn';
import { theme } from '../global/styles/theme';

const { Navigator, Screen } = createStackNavigator();

export default function AuthRoutes() {

  return (
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent',
        },
        headerStyle: {
          backgroundColor: theme.backgroundColor
        }
      }}
    >
      <Screen
        name="SigIn"
        component={SignIn}
        options={{
          headerTransparent: true
        }}
      />
    </Navigator>
  )
}