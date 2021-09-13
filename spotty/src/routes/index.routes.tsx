import React from 'react';
import { useAuth } from '../hooks/authHook';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { NavigationContainer } from '@react-navigation/native';
const Routes: React.FC = () => {
  const { user } = useAuth()

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}

export default Routes;