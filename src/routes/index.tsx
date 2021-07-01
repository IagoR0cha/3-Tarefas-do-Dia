import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';

import AuthRoutes from './auth.routes';
import UnauthRoutes from './unauth.routes'
import { useAuth } from '../hooks/auth';
import { firebaseConfig } from '../helpers/FirebaseConfig'


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.email ? <AuthRoutes /> : <UnauthRoutes />}
    </NavigationContainer>
  )
}