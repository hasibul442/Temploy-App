import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../utils/constants/Color';
import { CommonStyles } from '../../utils/styles/CommonStyle';
import EvilIcons from '@expo/vector-icons/evil-icons';
import Notifications from '../../utils/data/Notifications';

function NotificationScreen() {
  const notificationData = Notifications;

  // Helper function to calculate relative time
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now - created;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const handleNotificationPress = (notification) => {
    if (notification.action) {
      // Navigate to the action screen
      // Assuming navigation is available, e.g., const navigation = useNavigation();
      // navigation.navigate(notification.action.screen, notification.action.params);
      console.log('Navigate to', notification.action.screen, notification.action.params);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      <View style={CommonStyles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
          {notificationData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.notificationItem, !item.is_read && styles.unreadItem]}
              onPress={() => handleNotificationPress(item)}
            >
              <View style={styles.iconContainer}>
                <EvilIcons name="bell" size={24} color={Colors.primary_2} />
                {!item.is_read && <View style={styles.unreadDot} />}
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.time}>{getRelativeTime(item.createdAt)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light,
    backgroundColor: Colors.white,
  },
  unreadItem: {
    backgroundColor: Colors.light_3,
  },
  iconContainer: {
    marginRight: 12,
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.danger,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...CommonStyles.title_16_bold,
    marginBottom: 4,
  },
  description: {
    ...CommonStyles.text_14_regular,
    marginBottom: 4,
  },
  time: {
    ...CommonStyles.text_12_regular,
  },
});

export default NotificationScreen;
