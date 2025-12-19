
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/constants/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Language from '../../utils/data/Language';

function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return Language;
    const query = searchQuery.toLowerCase();
    return Language.filter(
      (language) =>
        language.code.toLowerCase().includes(query) ||
        language.name.toLowerCase().includes(query) ||
        language.nativeName.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleLanguageSelect = (code) => {
    setSelectedLanguage(code);
    // You can add logic here to save the selected language
  };

  const renderLanguageItem = ({ item }) => {
    const isSelected = selectedLanguage === item.code;
    return (
      <TouchableOpacity
        style={[styles.languageItem, isSelected && styles.selectedItem]}
        onPress={() => handleLanguageSelect(item.code)}
        activeOpacity={0.7}
      >
        <View style={styles.languageInfo}>
          <View style={styles.flagContainer}>
            <Text style={styles.languageFlag}>{item.flag}</Text>
          </View>
          <View style={styles.languageDetails}>
            <Text style={[styles.languageCode, isSelected && styles.selectedText]}>
              {item.name}
            </Text>
            <Text style={styles.languageName}>{item.nativeName}</Text>
          </View>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color={Colors.primary_1} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.dark_gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search language..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Current Selection Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Select the language you'd like to use for the app
        </Text>
      </View>

      {/* Language List */}
      <FlatList
        data={filteredLanguages}
        keyExtractor={(item) => item.code}
        renderItem={renderLanguageItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No languages found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
    color: '#666',
    lineHeight: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  selectedItem: {
    backgroundColor: '#F0F8F4',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flagContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageDetails: {
    flex: 1,
  },
  languageCode: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 2,
  },
  selectedText: {
    color: Colors.primary_1,
  },
  languageName: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
});

export default LanguageScreen;
