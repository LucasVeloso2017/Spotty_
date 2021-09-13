import React from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { StatusBar, Text } from "react-native";
import Hooks from './src/hooks';
import Routes from './src/routes/index.routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Lobster': require('./assets/fonts/Lobster-Regular.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    'Kanit': require('./assets/fonts/Kanit-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return <Text>Loading fonts</Text>
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Hooks>
        <Routes/>
      </Hooks>
    </>
  );
}

