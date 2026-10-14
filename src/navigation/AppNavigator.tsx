import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TransactionDetailScreen } from '../screens/TransactionDetailScreen';
import { TransactionListScreen } from '../screens/TransactionListScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
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
