
import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n/i18n';
import { Colors } from '../../utils/constants/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonStyles } from '../../utils/styles/CommonStyle';
import { useSystemNavigateSpace } from '../../utils/helper/Helper';
import HeaderWithBackButton from '../../components/Header/HeaderWithBackButton';
import { HeaderStyles } from '../../utils/styles/HeaderStyle';
import { getData } from '../../utils/helper/HttpHelper';

function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const bottomPadding = useSystemNavigateSpace(40);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      setError(null);
      await getData("/api/v1/languages?status=true", {}, false).then((response) => {
        setLanguages(response?.data);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLanguages();
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('appLanguage');
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading saved language:', error);
    }
  };

  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return languages;
    const query = searchQuery.toLowerCase();
    return languages.filter(
      (language) =>
        language.code.toLowerCase().includes(query) ||
        language.name.toLowerCase().includes(query) ||
        language.nativeName.toLowerCase().includes(query)
    );
  }, [searchQuery, languages]);

  const handleLanguageSelect = async (code) => {
    setSelectedLanguage(code);
    try {
      await AsyncStorage.setItem('appLanguage', code);
      i18n.changeLanguage(code);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
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
            <View style={styles.languageFlag}>
              <FontAwesome name="flag" size={24} color={Colors.success_2} />
            </View>

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
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={CommonStyles.container}>
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Language Selection" />
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.dark_gray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search language..."
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
            Select the language you'd like to use for the app
          </Text>
        </View>

        {/* Language List */}
        <FlatList
          data={filteredLanguages}
          keyExtractor={(item) => item.code}
          renderItem={renderLanguageItem}
          contentContainerStyle={{
            ...styles.listContainer,
            paddingBottom: bottomPadding
          }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color={Colors.gray_100} />
              <Text style={styles.emptyText}>No languages found</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: Colors.light_gray,
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
    backgroundColor: Colors.gray_50,
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
    color: Colors.gray_500,
    marginTop: 12,
  },
});

export default LanguageScreen;
