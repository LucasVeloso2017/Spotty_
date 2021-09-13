import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';

import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator()

const AuthRoutes: React.FC = () => {
    return (


        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Signin" component={Signin} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>

    );
}

export default AuthRoutes;