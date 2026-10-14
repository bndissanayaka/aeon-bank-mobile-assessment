import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { TransactionItem } from '../components/TransactionItem';
import { RootStackParamList } from '../navigation/types';
import { useTransactionStore } from '../store/transactionStore';

type TransactionListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TransactionList'
>;

export const TransactionListScreen = () => {
  const navigation = useNavigation<TransactionListNavigationProp>();

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

  if (isLoading) {
    return <LoadingState message="Loading transactions..." />;
  }

  if (error && transactions.length === 0) {
    return <ErrorState message={error} onRetry={fetchTransactions} />;
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
        ListEmptyComponent={<EmptyState />}
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
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
