import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { AppNavigator } from './src/navigation/AppNavigator';

function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
