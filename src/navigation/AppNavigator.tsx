import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TransactionDetailScreen } from '../screens/TransactionDetailScreen';
import { TransactionListScreen } from '../screens/TransactionListScreen';
import { RootStackParamList } from './types';
import { WelcomeScreen } from '../screens/WelcomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransactionList"
        component={TransactionListScreen}
        options={{
          title: 'Transactions',
        }}
      />

      <Stack.Screen
        name="TransactionDetail"
        component={TransactionDetailScreen}
        options={{
          title: 'Transaction Details',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack.Navigator>
  );
};
