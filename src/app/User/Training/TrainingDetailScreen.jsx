import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../utils/constants/Color';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import HeaderWithBackButton from '../../../components/Header/HeaderWithBackButton';
import { getStatusColor } from '../../../utils/helper/Helper';
import Video from 'react-native-video';
import StatusBadge from '../../../components/StatusBadge';

const { width, height } = Dimensions.get('window');

function TrainingDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const videoRef = useRef(null);

  // Sample training data - replace with actual data from API/route params
  const training = {
    id: 1,
    title: 'Getting Started with Temploy App',
    description:
      'Learn how to effectively use the Temploy platform to find jobs, submit proposals, manage orders, and grow your freelance career. This comprehensive guide covers all essential features and best practices for success on Temploy.',
    duration: '1.5 hours',
    level: 'Beginner',
    progress: 65,
    status: 'in-progress',
    category: 'App Tutorial',
    completedDate: null,
    instructor: 'System Admin',
    rating: 4.8,
    totalStudents: 1234,
    language: 'English',
    certificate: true,
    whatYouWillLearn: [
      'How to create and optimize your profile for maximum visibility',
      'Finding and applying for jobs that match your skills',
      'Creating winning proposals and managing offers',
      'Communicating effectively with clients through the messaging system',
      'Managing orders, tracking earnings, and withdrawing funds',
      'Understanding the rating system and building your reputation',
    ],
    requirements: [
      'A registered Temploy account',
      'Basic smartphone or computer skills',
      'No prior freelancing experience required',
    ],
    modules: [
      {
        id: 1,
        title: 'Welcome to Temploy',
        duration: '10 min',
        lessons: 3,
        completed: true,
        locked: false,
      },
      {
        id: 2,
        title: 'Setting Up Your Profile',
        duration: '15 min',
        lessons: 4,
        completed: true,
        locked: false,
      },
      {
        id: 3,
        title: 'Finding & Applying for Jobs',
        duration: '20 min',
        lessons: 5,
        completed: false,
        locked: false,
        current: true,
      },
      {
        id: 4,
        title: 'Creating Winning Proposals',
        duration: '18 min',
        lessons: 4,
        completed: false,
        locked: false,
      },
      {
        id: 5,
        title: 'Managing Orders & Communication',
        duration: '20 min',
        lessons: 5,
        completed: false,
        locked: true,
      },
      {
        id: 6,
        title: 'Earnings & Withdrawals',
        duration: '17 min',
        lessons: 3,
        completed: false,
        locked: true,
      },
    ],
  };

  const handleStartContinue = () => {
    // Navigate to training module or continue from where left off
    console.log('Start/Continue training');
  };

  const handleDownloadCertificate = () => {
    // Download certificate logic
    console.log('Download certificate');
  };

  const handleOpenModule = (module) => {
    if (!module.locked) {
      setSelectedModule(module);
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setSelectedModule(null);
    }, 300);
  };

  const ModuleItem = ({ module, index }) => (
    <TouchableOpacity
      style={[
        styles.moduleCard,
        module.current && styles.currentModuleCard,
        module.locked && styles.lockedModuleCard,
      ]}
      activeOpacity={module.locked ? 1 : 0.7}
      onPress={() => handleOpenModule(module)}
    >
      <View style={styles.moduleLeft}>
        <View
          style={[
            styles.moduleIcon,
            module.completed && styles.moduleIconCompleted,
            module.current && styles.moduleIconCurrent,
            module.locked && styles.moduleIconLocked,
          ]}
        >
          {module.completed ? (
            <Ionicons name="checkmark" size={20} color={Colors.white} />
          ) : module.locked ? (
            <Ionicons name="lock-closed" size={18} color={Colors.gray_400} />
          ) : (
            <Text style={styles.moduleNumber}>{index + 1}</Text>
          )}
        </View>
        <View style={styles.moduleInfo}>
          <Text style={styles.moduleTitle} numberOfLines={2}>
            {module.title}
          </Text>
          <View style={styles.moduleMetaRow}>
            <Ionicons name="time-outline" size={14} color={Colors.gray_500} />
            <Text style={styles.moduleMetaText}>{module.duration}</Text>
            <Text style={styles.moduleDot}>•</Text>
            <MaterialCommunityIcons name="file-document-outline" size={14} color={Colors.gray_500} />
            <Text style={styles.moduleMetaText}>{module.lessons} lessons</Text>
          </View>
        </View>
      </View>
      <View style={styles.moduleRight}>
        {module.current && (
          <View style={styles.currentBadge}>
            <Text style={styles.currentBadgeText}>Current</Text>
          </View>
        )}
        {!module.locked && !module.completed && !module.current && (
          <Ionicons name="play-circle-outline" size={24} color={Colors.primary_2} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary_2} />

      {/* Header */}
      <View style={styles.header}>
        <HeaderWithBackButton title="Training Details" />
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={() => setIsBookmarked(!isBookmarked)}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Training Header */}
        <View style={styles.trainingHeader}>
          <View style={styles.badgeRow}>
            <StatusBadge status={training.status} />
            <StatusBadge level={training.level} />

            {/* <View style={[styles.statusBadge, { backgroundColor: getStatusColor(training.status) }]}>
              <Text style={styles.statusText}>{getStatusText(training.status)}</Text>
            </View> */}
          </View>

          <Text style={styles.title}>{training.title}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={Colors.secondary_2} />
            <Text style={styles.ratingText}>{training.rating}</Text>
            <Text style={styles.studentCount}>({training.totalStudents} students)</Text>
          </View>

          {/* Progress Bar */}
          {training.progress > 0 && training.status !== 'completed' && (
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Your Progress</Text>
                <Text style={styles.progressPercentage}>{training.progress}%</Text>
              </View>
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
            </View>
          )}
        </View>

        {/* Meta Information */}
        <View style={styles.metaSection}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={20} color={Colors.primary_2} />
            <View>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{training.duration}</Text>
            </View>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="certificate" size={20} color={Colors.primary_2} />
            <View>
              <Text style={styles.metaLabel}>Certificate</Text>
              <Text style={styles.metaValue}>{training.certificate ? 'Yes' : 'No'}</Text>
            </View>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="tag-outline" size={20} color={Colors.primary_2} />
            <View>
              <Text style={styles.metaLabel}>Category</Text>
              <Text style={styles.metaValue}>{training.category}</Text>
            </View>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="language-outline" size={20} color={Colors.primary_2} />
            <View>
              <Text style={styles.metaLabel}>Language</Text>
              <Text style={styles.metaValue}>{training.language}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This Training</Text>
          <Text style={styles.description}>{training.description}</Text>
        </View>

        {/* What You'll Learn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You'll Learn</Text>
          {training.whatYouWillLearn.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          {training.requirements.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <MaterialCommunityIcons name="arrow-right-circle" size={20} color={Colors.info} />
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Training Modules */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training Modules</Text>
          <Text style={styles.sectionSubtitle}>
            {training.modules.length} modules • {training.duration} total
          </Text>
          {training.modules.map((module, index) => (
            <ModuleItem key={module.id} module={module} index={index} />
          ))}
        </View>

      </ScrollView>

      {/* Video Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={1}>
                {selectedModule?.title}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={28} color={Colors.dark} />
              </TouchableOpacity>
            </View>

            {/* Video Player */}
            <View style={styles.videoContainer}>
              <Video
                ref={videoRef}
                style={styles.video}
                source={{
                  uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                }}
                resizeMode="contain"
                controls={true}
                paused={false}
                playInBackground={false}
                playWhenInactive={false}
              />
            </View>

            {/* Module Info */}
            <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.moduleDetailsSection}>
                <View style={styles.moduleMetaInfo}>
                  <View style={styles.moduleMetaBadge}>
                    <Ionicons name="time-outline" size={16} color={Colors.primary_2} />
                    <Text style={styles.moduleMetaBadgeText}>{selectedModule?.duration}</Text>
                  </View>
                  <View style={styles.moduleMetaBadge}>
                    <MaterialCommunityIcons name="file-document-outline" size={16} color={Colors.primary_2} />
                    <Text style={styles.moduleMetaBadgeText}>{selectedModule?.lessons} lessons</Text>
                  </View>
                </View>

                <Text style={styles.moduleDescription}>
                  This module covers essential topics to help you master {selectedModule?.title.toLowerCase()}. 
                  Watch the video tutorial and follow along to learn the best practices.
                </Text>

                {/* Module Lessons List */}
                <View style={styles.lessonsList}>
                  <Text style={styles.lessonsTitle}>What's Included</Text>
                  {[...Array(selectedModule?.lessons || 0)].map((_, index) => (
                    <View key={index} style={styles.lessonItem}>
                      <Ionicons name="play-circle" size={20} color={Colors.success} />
                      <Text style={styles.lessonText}>Lesson {index + 1}</Text>
                      <Text style={styles.lessonDuration}>
                        {Math.floor(Math.random() * 10) + 3} min
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleCloseModal}
                activeOpacity={0.8}
              >
                <Text style={styles.secondaryButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => {
                  // Mark as completed logic
                  console.log('Mark as completed');
                  handleCloseModal();
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
                <Text style={styles.completeButtonText}>Mark Complete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Action Button */}
      <View style={styles.bottomBar}>
        {training.status === 'completed' && training.certificate ? (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleDownloadCertificate}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="download" size={20} color={Colors.white} />
            <Text style={styles.primaryButtonText}>Download Certificate</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleStartContinue}
            activeOpacity={0.8}
          >
            <Ionicons
              name={training.status === 'in-progress' ? 'play' : 'play-circle'}
              size={20}
              color={Colors.white}
            />
            <Text style={styles.primaryButtonText}>
              {training.status === 'in-progress' ? 'Continue Training' : 'Start Training'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary_2,
  },
  header: {
    backgroundColor: Colors.primary_2,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  trainingHeader: {
    padding: 20,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 12,
    lineHeight: 32,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
  },
  studentCount: {
    fontSize: 14,
    color: Colors.gray_500,
  },
  progressSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary_2,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.gray_200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  metaSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    backgroundColor: Colors.gray_50,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: (width - 56) / 2,
  },
  metaLabel: {
    fontSize: 12,
    color: Colors.gray_500,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray_500,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.gray_600,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  listItemText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: Colors.gray_600,
  },
  moduleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray_100,
    marginBottom: 12,
  },
  currentModuleCard: {
    borderColor: Colors.primary_2,
    borderWidth: 2,
    backgroundColor: Colors.light_3,
  },
  lockedModuleCard: {
    opacity: 0.6,
  },
  moduleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  moduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.gray_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleIconCompleted: {
    backgroundColor: Colors.success,
  },
  moduleIconCurrent: {
    backgroundColor: Colors.primary_2,
  },
  moduleIconLocked: {
    backgroundColor: Colors.gray_100,
  },
  moduleNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray_600,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 6,
  },
  moduleMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moduleMetaText: {
    fontSize: 13,
    color: Colors.gray_500,
  },
  moduleDot: {
    fontSize: 13,
    color: Colors.gray_400,
  },
  moduleRight: {
    marginLeft: 12,
  },
  currentBadge: {
    backgroundColor: Colors.primary_2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  currentBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.white,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray_100,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary_2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.95,
    maxHeight: height * 0.9,
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
    backgroundColor: Colors.white,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
    flex: 1,
    marginRight: 12,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray_50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: width * 0.95 * (9 / 16), // 16:9 aspect ratio
    backgroundColor: Colors.black,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  modalScrollView: {
    maxHeight: height * 0.35,
  },
  moduleDetailsSection: {
    padding: 16,
  },
  moduleMetaInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  moduleMetaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.light_3,
    borderRadius: 8,
  },
  moduleMetaBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary_2,
  },
  moduleDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.gray_600,
    marginBottom: 20,
  },
  lessonsList: {
    marginTop: 8,
  },
  lessonsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 12,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.gray_50,
    borderRadius: 8,
    marginBottom: 8,
  },
  lessonText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.dark,
    marginLeft: 12,
  },
  lessonDuration: {
    fontSize: 13,
    color: Colors.gray_500,
  },
  modalActions: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray_100,
    backgroundColor: Colors.white,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray_100,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark,
  },
  completeButton: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.success,
    gap: 8,
  },
  completeButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});

export default TrainingDetailScreen;