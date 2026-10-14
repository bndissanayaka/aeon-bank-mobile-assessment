import React, { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { TransactionItem } from '../components/TransactionItem';
import { useTransactionStore } from '../store/transactionStore';

export const TransactionListScreen = () => {
  const {
    transactions,
    isLoading,
    isRefreshing,
    error,
    fetchTransactions,
    refreshTransactions,
  } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  type TransactionListNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'TransactionList'
  >;
  const navigation = useNavigation<TransactionListNavigationProp>();

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.statusText}>Loading transactions...</Text>
      </View>
    );
  }

  if (error && transactions.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorTitle}>Something went wrong</Text>

        <Text style={styles.statusText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={item => item.refId}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={() =>
              navigation.navigate('TransactionDetail', {
                transactionId: item.refId,
              })
            }
          />
        )}
        refreshing={isRefreshing}
        onRefresh={refreshTransactions}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Recent Transactions</Text>

            <Text style={styles.subtitle}>Your latest account activity</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No transactions found</Text>

            <Text style={styles.statusText}>
              Your recent transactions will appear here.
            </Text>
          </View>
        }
        contentContainerStyle={
          transactions.length === 0 ? styles.emptyListContent : undefined
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B6B6B',
  },
  statusText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B6B6B',
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#C62828',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
