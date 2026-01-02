
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/constants/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonStyles } from '../../utils/styles/CommonStyle';
import { getData } from '../../utils/helper/HttpHelper';
import HeaderWithBackButton from '../../components/Header/HeaderWithBackButton';
import { HeaderStyles } from '../../utils/styles/HeaderStyle';
import { useSystemNavigateSpace } from '../../utils/helper/Helper';

function CurrencyScreen() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const bottomPadding = useSystemNavigateSpace(40);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrencies = async () => {
    try {
      setLoading(true);
      setError(null);
      await getData("/api/v1/currency", {}, false).then((response) => {
        setCurrencies(response?.data);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery.trim()) return currencies;
    const query = searchQuery.toLowerCase();
    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query) ||
        currency.symbol.includes(query)
    );
  }, [searchQuery, currencies]);

  const handleCurrencySelect = (code) => {
    setSelectedCurrency(code);
    // You can add logic here to save the selected currency
  };

  const renderCurrencyItem = ({ item }) => {
    const isSelected = selectedCurrency === item.code;
    return (
      <TouchableOpacity
        style={[styles.currencyItem, isSelected && styles.selectedItem]}
        onPress={() => handleCurrencySelect(item.code)}
        activeOpacity={0.7}
      >
        <View style={styles.currencyInfo}>
          <View style={styles.currencyDetails}>
            <Text style={[styles.currencyCode, isSelected && styles.selectedText]}>
              {item.code} ({item.symbol})
            </Text>
            <Text style={styles.currencyName}>{item.name}</Text>
          </View>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color={Colors.primary_1} />
        )}
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary_1} />
          <Text style={styles.loadingText}>Loading currencies...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Ionicons name="cloud-offline-outline" size={48} color={Colors.gray_100} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchCurrencies}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredCurrencies}
        keyExtractor={(item) => item.code}
        renderItem={renderCurrencyItem}
        contentContainerStyle={{
          ...styles.listContainer,
          paddingBottom: bottomPadding
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color={Colors.gray_100} />
            <Text style={styles.emptyText}>No currencies found</Text>
          </View>
        }
      />
    );
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={CommonStyles.container}>
        {/* Search Bar */}
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Currency Selection" />
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.dark_gray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search currency..."
              placeholderTextColor={Colors.gray_500}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={Colors.gray_500} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Current Selection Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Select the currency you'd like to use for payments and transactions
          </Text>
        </View>

        {/* Currency List */}
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.dark,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.gray_600,
    lineHeight: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  selectedItem: {
    backgroundColor: Colors.light_gray,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  currencyDetails: {
    flex: 1,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 2,
  },
  selectedText: {
    color: Colors.primary_1,
  },
  currencyName: {
    fontSize: 14,
    color: Colors.gray_600,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray_100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray_400,
    marginTop: 12,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.gray_600,
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.gray_600,
    marginTop: 12,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.primary_1,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CurrencyScreen;
