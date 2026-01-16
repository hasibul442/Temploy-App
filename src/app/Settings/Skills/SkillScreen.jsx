import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../utils/constants/Color';
import { CommonStyles } from '../../../utils/styles/CommonStyle';
import HeaderWithBackButton from '../../../components/Header/HeaderWithBackButton';
import { HeaderStyles } from '../../../utils/styles/HeaderStyle';

const { width, height } = Dimensions.get('window');

// Sample predefined skills categories
const PREDEFINED_SKILLS = {
  'Design': [
    'UI/UX Design',
    'Graphic Design',
    'Web Design',
    'Logo Design',
    'Illustration',
    'Figma',
    'Adobe Photoshop',
    'Adobe Illustrator',
  ],
  'Development': [
    'React Native',
    'React.js',
    'Node.js',
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'PHP',
    'Flutter',
    'Swift',
  ],
  'Marketing': [
    'Digital Marketing',
    'SEO',
    'Social Media Marketing',
    'Content Marketing',
    'Email Marketing',
    'Google Ads',
    'Facebook Ads',
  ],
  'Writing': [
    'Content Writing',
    'Copywriting',
    'Technical Writing',
    'Blog Writing',
    'Creative Writing',
    'Proofreading',
    'Translation',
  ],
  'Business': [
    'Project Management',
    'Business Analysis',
    'Data Analysis',
    'Excel',
    'Financial Analysis',
    'Market Research',
  ],
  'Video & Audio': [
    'Video Editing',
    'Audio Editing',
    'Animation',
    'Motion Graphics',
    'Voice Over',
    'Sound Design',
  ],
};

function SkillScreen() {
  const navigation = useNavigation();
  const [mySkills, setMySkills] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [customSkill, setCustomSkill] = useState('');
  const [loading, setLoading] = useState(false);

  // Load user's skills on component mount
  useEffect(() => {
    loadUserSkills();
  }, []);

  const loadUserSkills = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await getData('/api/v1/user/skills');
      // setMySkills(response?.data || []);
      
      // Mock data for demonstration
      setTimeout(() => {
        setMySkills([
          'React Native',
          'JavaScript',
          'UI/UX Design',
          'Figma',
          'Node.js',
        ]);
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show('Failed to load skills', ToastAndroid.SHORT);
    }
  };

  const handleAddSkill = (skill) => {
    if (mySkills.includes(skill)) {
      ToastAndroid.show('Skill already added', ToastAndroid.SHORT);
      return;
    }

    if (mySkills.length >= 20) {
      ToastAndroid.show('Maximum 20 skills allowed', ToastAndroid.SHORT);
      return;
    }

    setMySkills([...mySkills, skill]);
    ToastAndroid.show('Skill added successfully', ToastAndroid.SHORT);
    
    // TODO: Save to backend
    // saveSkillToBackend(skill);
  };

  const handleAddCustomSkill = () => {
    const trimmedSkill = customSkill.trim();
    
    if (!trimmedSkill) {
      ToastAndroid.show('Please enter a skill name', ToastAndroid.SHORT);
      return;
    }

    if (trimmedSkill.length < 2) {
      ToastAndroid.show('Skill name must be at least 2 characters', ToastAndroid.SHORT);
      return;
    }

    if (trimmedSkill.length > 50) {
      ToastAndroid.show('Skill name too long', ToastAndroid.SHORT);
      return;
    }

    handleAddSkill(trimmedSkill);
    setCustomSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setMySkills(mySkills.filter(skill => skill !== skillToRemove));
    ToastAndroid.show('Skill removed', ToastAndroid.SHORT);
    
    // TODO: Remove from backend
    // removeSkillFromBackend(skillToRemove);
  };

  const handleSaveSkills = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // await postData('/api/v1/user/skills', { skills: mySkills });
      
      setTimeout(() => {
        setLoading(false);
        ToastAndroid.show('Skills saved successfully', ToastAndroid.LONG);
        navigation.goBack();
      }, 1000);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show('Failed to save skills', ToastAndroid.SHORT);
    }
  };

  // Filter predefined skills based on search and category
  const getFilteredSkills = () => {
    let allSkills = [];
    
    if (selectedCategory === 'All') {
      Object.values(PREDEFINED_SKILLS).forEach(skills => {
        allSkills = [...allSkills, ...skills];
      });
    } else {
      allSkills = PREDEFINED_SKILLS[selectedCategory] || [];
    }

    if (searchQuery.trim()) {
      allSkills = allSkills.filter(skill =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter out already added skills
    return allSkills.filter(skill => !mySkills.includes(skill));
  };

  const renderMySkillChip = ({ item }) => (
    <View style={styles.mySkillChip}>
      <Text style={styles.mySkillText} numberOfLines={1}>{item}</Text>
      <TouchableOpacity
        onPress={() => handleRemoveSkill(item)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <AntDesign name="close" size={16} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  const renderCategoryTab = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryTab,
        selectedCategory === category && styles.categoryTabActive
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryTabText,
          selectedCategory === category && styles.categoryTabTextActive
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderAvailableSkillChip = ({ item }) => (
    <TouchableOpacity
      style={styles.availableSkillChip}
      onPress={() => handleAddSkill(item)}
    >
      <Text style={styles.availableSkillText} numberOfLines={1}>{item}</Text>
      <AntDesign name="plus" size={16} color={Colors.success_2} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={[HeaderStyles.header, styles.header]}>
        <HeaderWithBackButton title="My Skills" />
      </View>

      <View style={styles.container}>
        {/* My Skills Section */}
        <View style={styles.mySkillsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              My Skills ({mySkills.length}/20)
            </Text>
            {mySkills.length > 0 && (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <MaterialIcons name="add-circle" size={28} color={Colors.success_2} />
              </TouchableOpacity>
            )}
          </View>

          {loading && mySkills.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.success_2} />
            </View>
          ) : mySkills.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <MaterialIcons name="lightbulb-outline" size={64} color={Colors.gray_400} />
              <Text style={styles.emptyStateTitle}>No Skills Added Yet</Text>
              <Text style={styles.emptyStateText}>
                Add your skills to help clients find you for the right jobs
              </Text>
              <TouchableOpacity
                style={styles.addFirstSkillButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.addFirstSkillButtonText}>Add Your First Skill</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={mySkills}
              renderItem={renderMySkillChip}
              keyExtractor={(item, index) => `my-skill-${index}`}
              numColumns={2}
              columnWrapperStyle={styles.skillRow}
              contentContainerStyle={styles.skillList}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {/* Info Card */}
        {mySkills.length > 0 && (
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color={Colors.info} />
            <Text style={styles.infoText}>
              Add skills that match your expertise. Maximum 20 skills allowed.
            </Text>
          </View>
        )}

        {/* Save Button */}
        {mySkills.length > 0 && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveSkills}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? 'Saving...' : 'Save Skills'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Add Skill Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Skills</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <AntDesign name="close" size={24} color={Colors.dark} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={Colors.gray_500} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search skills..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={Colors.gray_400}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <AntDesign name="closecircle" size={18} color={Colors.gray_400} />
                </TouchableOpacity>
              )}
            </View>

            {/* Add Custom Skill */}
            <View style={styles.customSkillContainer}>
              <TextInput
                style={styles.customSkillInput}
                placeholder="Or type a custom skill..."
                value={customSkill}
                onChangeText={setCustomSkill}
                placeholderTextColor={Colors.gray_400}
                maxLength={50}
              />
              <TouchableOpacity
                style={styles.addCustomButton}
                onPress={handleAddCustomSkill}
                disabled={!customSkill.trim()}
              >
                <AntDesign
                  name="pluscircle"
                  size={24}
                  color={customSkill.trim() ? Colors.success_2 : Colors.gray_400}
                />
              </TouchableOpacity>
            </View>

            {/* Category Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryTabs}
              contentContainerStyle={styles.categoryTabsContent}
            >
              {renderCategoryTab('All')}
              {Object.keys(PREDEFINED_SKILLS).map(category => renderCategoryTab(category))}
            </ScrollView>

            {/* Available Skills */}
            <ScrollView
              style={styles.availableSkillsContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.availableSkillsGrid}>
                {getFilteredSkills().length > 0 ? (
                  getFilteredSkills().map((skill, index) => (
                    <TouchableOpacity
                      key={`available-${index}`}
                      style={styles.availableSkillChip}
                      onPress={() => handleAddSkill(skill)}
                    >
                      <Text style={styles.availableSkillText} numberOfLines={1}>
                        {skill}
                      </Text>
                      <AntDesign name="plus" size={16} color={Colors.success_2} />
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.noResultsContainer}>
                    <MaterialIcons name="search-off" size={48} color={Colors.gray_400} />
                    <Text style={styles.noResultsText}>No skills found</Text>
                    <Text style={styles.noResultsSubtext}>
                      Try a different search or add a custom skill
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <Text style={styles.modalFooterText}>
                {mySkills.length} skill{mySkills.length !== 1 ? 's' : ''} selected
              </Text>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.success_2,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  // My Skills Section
  mySkillsSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
  },
  skillList: {
    paddingBottom: 20,
  },
  skillRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  mySkillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success_2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    flex: 0.48,
  },
  mySkillText: {
    flex: 1,
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },

  // Loading & Empty State
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.gray_500,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  addFirstSkillButton: {
    backgroundColor: Colors.success_2,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  addFirstSkillButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },

  // Info Card
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light_blue,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.dark,
    marginLeft: 12,
    lineHeight: 18,
  },

  // Save Button
  saveButton: {
    backgroundColor: Colors.success_2,
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: Colors.success_2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.85,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark,
  },

  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.dark,
    marginLeft: 8,
  },

  // Custom Skill Input
  customSkillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 16,
  },
  customSkillInput: {
    flex: 1,
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.dark,
    marginRight: 12,
  },
  addCustomButton: {
    padding: 4,
  },

  // Category Tabs
  categoryTabs: {
    maxHeight: 44,
    marginBottom: 16,
  },
  categoryTabsContent: {
    paddingHorizontal: 20,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray_50,
    marginRight: 8,
  },
  categoryTabActive: {
    backgroundColor: Colors.success_2,
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray_600,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },

  // Available Skills
  availableSkillsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  availableSkillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  availableSkillChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.success_2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginRight: 8,
  },
  availableSkillText: {
    color: Colors.success_2,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },

  // No Results
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginTop: 12,
  },
  noResultsSubtext: {
    fontSize: 13,
    color: Colors.gray_500,
    marginTop: 4,
    textAlign: 'center',
  },

  // Modal Footer
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray_100,
    marginTop: 16,
  },
  modalFooterText: {
    fontSize: 14,
    color: Colors.gray_600,
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: Colors.success_2,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  doneButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default SkillScreen;
