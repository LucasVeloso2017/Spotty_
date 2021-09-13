import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import CreateSpot from '../pages/CreateSpot';
import Main from '../pages/Main';
import Profile from '../pages/Profile';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator()

const AppRoutes: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="CreateSpot" component={CreateSpot} />
        </Stack.Navigator>

    );
}

export default AppRoutes;