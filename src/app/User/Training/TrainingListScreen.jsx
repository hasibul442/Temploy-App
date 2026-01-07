import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../utils/constants/Color';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HeaderWithBackButton from '../../../components/Header/HeaderWithBackButton';
import { getLevelColor, getStatusColor, getStatusText, useSystemNavigateSpace } from '../../../utils/helper/Helper';
import { CommonStyles } from '../../../utils/styles/CommonStyle';
import { HeaderStyles } from '../../../utils/styles/HeaderStyle';

function TrainingListScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all');

  // Sample training data
  const trainings = [
    {
      id: 1,
      title: 'Customer Service Excellence',
      description: 'Learn how to provide exceptional customer service and handle difficult situations professionally.',
      duration: '2 hours',
      level: 'Beginner',
      progress: 100,
      status: 'completed',
      category: 'Soft Skills',
      completedDate: '2025-12-15',
    },
    {
      id: 2,
      title: 'Advanced Communication Skills',
      description: 'Master the art of effective communication in professional environments.',
      duration: '1.5 hours',
      level: 'Intermediate',
      progress: 65,
      status: 'in-progress',
      category: 'Soft Skills',
      completedDate: null,
    },
    {
      id: 3,
      title: 'Time Management & Productivity',
      description: 'Learn proven strategies to manage your time effectively and boost productivity.',
      duration: '1 hour',
      level: 'Beginner',
      progress: 0,
      status: 'not-started',
      category: 'Professional Development',
      completedDate: null,
    },
    {
      id: 4,
      title: 'Workplace Safety & Compliance',
      description: 'Essential workplace safety protocols and compliance requirements.',
      duration: '3 hours',
      level: 'Beginner',
      progress: 100,
      status: 'completed',
      category: 'Safety',
      completedDate: '2025-11-20',
    },
    {
      id: 5,
      title: 'Leadership Fundamentals',
      description: 'Develop essential leadership skills to guide and inspire your team.',
      duration: '4 hours',
      level: 'Advanced',
      progress: 0,
      status: 'not-started',
      category: 'Leadership',
      completedDate: null,
    },
    {
      id: 6,
      title: 'Digital Marketing Basics',
      description: 'Introduction to digital marketing strategies and social media management.',
      duration: '2.5 hours',
      level: 'Beginner',
      progress: 40,
      status: 'in-progress',
      category: 'Marketing',
      completedDate: null,
    },
  ];

  // Filter trainings based on active tab
  const filteredTrainings = trainings.filter((training) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'completed') return training.status === 'completed';
    if (activeTab === 'in-progress') return training.status === 'in-progress';
    if (activeTab === 'not-started') return training.status === 'not-started';
    return true;
  });

  const TrainingCard = ({ training }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("OtherPages", { screen: "TrainingDetails", params: { id: training.id } });
      }}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(training.status) }]}>
          <Text style={styles.statusText}>{getStatusText(training.status)}</Text>
        </View>
        <View style={[styles.levelBadge, { borderColor: getLevelColor(training.level) }]}>
          <Text style={[styles.levelText, { color: getLevelColor(training.level) }]}>
            {training.level}
          </Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.cardTitle} numberOfLines={2}>
        {training.title}
      </Text>

      {/* Description */}
      <Text style={styles.cardDescription} numberOfLines={2}>
        {training.description}
      </Text>

      {/* Meta Info */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={16} color={Colors.gray_500} />
          <Text style={styles.metaText}>{training.duration}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons name="tag-outline" size={16} color={Colors.gray_500} />
          <Text style={styles.metaText}>{training.category}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      {training.progress > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${training.progress}%`,
                  backgroundColor: getStatusColor(training.status),
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>{training.progress}%</Text>
        </View>
      )}

      {/* Completed Date */}
      {training.completedDate && (
        <View style={styles.completedInfo}>
          <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
          <Text style={styles.completedText}>
            Completed on {new Date(training.completedDate).toLocaleDateString()}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={CommonStyles.safeArea}>      
      {/* Header */}
      <View style={HeaderStyles.header}>
        <HeaderWithBackButton title="Training List" />
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All ({trainings.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed ({trainings.filter((t) => t.status === 'completed').length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'in-progress' && styles.activeTab]}
            onPress={() => setActiveTab('in-progress')}
          >
            <Text style={[styles.tabText, activeTab === 'in-progress' && styles.activeTabText]}>
              In Progress ({trainings.filter((t) => t.status === 'in-progress').length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'not-started' && styles.activeTab]}
            onPress={() => setActiveTab('not-started')}
          >
            <Text style={[styles.tabText, activeTab === 'not-started' && styles.activeTabText]}>
              Not Started ({trainings.filter((t) => t.status === 'not-started').length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Training List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{...styles.scrollViewContent, paddingBottom: useSystemNavigateSpace(80) }}
        showsVerticalScrollIndicator={false}
      >
        {filteredTrainings.length > 0 ? (
          filteredTrainings.map((training) => (
            <TrainingCard key={training.id} training={training} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={80}
              color={Colors.gray_400}
            />
            <Text style={styles.emptyText}>No trainings found</Text>
            <Text style={styles.emptySubText}>
              {activeTab === 'all'
                ? 'No trainings available at the moment'
                : `No ${activeTab.replace('-', ' ')} trainings`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray_50,
  },
  activeTab: {
    backgroundColor: Colors.primary_2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray_600,
  },
  activeTabText: {
    color: Colors.white,
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.gray_50,
  },
  scrollViewContent: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.gray_600,
    lineHeight: 20,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: Colors.gray_500,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.gray_100,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray_600,
    minWidth: 40,
    textAlign: 'right',
  },
  completedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray_100,
  },
  completedText: {
    fontSize: 13,
    color: Colors.success,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.gray_600,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.gray_500,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default TrainingListScreen;