import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';

import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { TransactionItem } from '../components/TransactionItem';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import { RootStackParamList } from '../navigation/types';
import { useTransactionStore } from '../store/transactionStore';
import { formatLastUpdated } from '../utils/formatLastUpdated';
import { groupTransactionsByDate } from '../utils/groupTransactionsByDate';

type TransactionListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'TransactionList'
>;

export const TransactionListScreen = () => {
  const navigation = useNavigation<TransactionListNavigationProp>();

  const [searchQuery, setSearchQuery] = useState('');

  const {
    transactions,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    fetchTransactions,
    refreshTransactions,
  } = useTransactionStore();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return transactions;
    }

    return transactions.filter(transaction => {
      return (
        transaction.recipientName.toLowerCase().includes(query) ||
        transaction.transferName.toLowerCase().includes(query) ||
        transaction.refId.toLowerCase().includes(query)
      );
    });
  }, [transactions, searchQuery]);

  const sections = useMemo(
    () => groupTransactionsByDate(filteredTransactions),
    [filteredTransactions],
  );

  if (isLoading) {
    return <LoadingState message={STRINGS.loadingTransactions} />;
  }

  if (error && transactions.length === 0) {
    return <ErrorState message={error} onRetry={fetchTransactions} />;
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
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
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        refreshing={isRefreshing}
        onRefresh={refreshTransactions}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Text style={styles.title}>{STRINGS.recentTransactions}</Text>

              <Text style={styles.subtitle}>
                {STRINGS.latestAccountActivity}
              </Text>

              {lastUpdated !== null && (
                <Text style={styles.lastUpdated}>
                  {STRINGS.lastUpdated}: {formatLastUpdated(lastUpdated)}
                </Text>
              )}
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={STRINGS.searchTransactions}
                placeholderTextColor={COLORS.textSubtle}
                style={styles.searchInput}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                accessibilityLabel={STRINGS.searchTransactions}
              />
            </View>
          </>
        }
        ListEmptyComponent={
          searchQuery.trim() ? (
            <EmptyState
              title={STRINGS.noMatchingTransactions}
              message={STRINGS.tryDifferentSearch}
            />
          ) : (
            <EmptyState />
          )
        }
        contentContainerStyle={[
          styles.listContent,
          sections.length === 0 && styles.emptyListContent,
        ]}
      />

      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  lastUpdated: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.textMuted,
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
  },

  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primaryDark,
    backgroundColor: COLORS.background,
  },

  listContent: {
    paddingBottom: 16,
  },

  emptyListContent: {
    flexGrow: 1,
  },

  footer: {
    height: 40,
    backgroundColor: COLORS.primaryLight,
  },
});
