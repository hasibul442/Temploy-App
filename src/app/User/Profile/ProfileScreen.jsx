import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { CommonStyles } from "../../../utils/styles/CommonStyle";

const { width } = Dimensions.get('window');

const EarningCard = ({ title, value, color }) => (
  <View style={styles.earningCard}>
    <Text style={[styles.earningValue, { color: color || '#333' }]}>• {value}</Text>
    <Text style={styles.earningTitle}>{title}</Text>
  </View>
);

const StandardCard = ({ title, percentage, description, color }) => {
  const radius = 25; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.standardCard}>
      <View style={styles.circularProgressContainer}>
        <View style={[styles.circularProgressRing, { borderColor: color || '#4CAF50' }]}>
          <Text style={styles.circularProgressText}>{percentage}%</Text>
        </View>
      </View>

      <View style={styles.standardDetails}>
        <Text style={styles.standardTitle}>{title}</Text>
        <Text style={[styles.standardDescription, { color: color || '#4CAF50' }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};


function ProfileScreen() {
  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent} 
      >
        <View style={styles.headerBlock}>
          <View style={styles.headerTopRow}>
            <Image
              source={{ uri: 'https://plus.unsplash.com/premium_photo-1690579805307-7ec030c75543?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D' }} // Replace with actual image source
              style={styles.profileImage}
            />
            <AntDesign name="more" size={24} color="white" />
          </View>
          <Text style={styles.userName}>Hi Hasibul Hasan</Text>
          <Text style={styles.userDetails}>Bangladesh - Seller Level 1</Text>
        </View>

        <View style={styles.progressCard}>
          <AntDesign name="star" size={16} color="#FFC107" style={styles.progressStarIcon}/>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.progressText}>70% to Level 2</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#9E9E9E"/>
        </View>

        <View style={styles.contentCardBlock}>
          <View style={styles.earningHeader}>
            <Text style={styles.sectionTitle}>Your Earning</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreLink}>See more</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.earningGrid}>
            <EarningCard title="Personal balance" value="$ 1670" color="#4CAF50" />
            <EarningCard title="Earning in October" value="$ 700" color="#FF9800" />
            <EarningCard title="Avg. selling price" value="$ 200" color="#FF9800" />
            <EarningCard title="Active order" value="1 ($ 160)" color="#FF9800" />
          </View>

          <Text style={styles.standardsMaintainTitle}>Standards to maintain</Text>
          
          <StandardCard 
            title="Response rate" 
            percentage={80} 
            description="Increase 12% from previous month" 
            color="#4CAF50" 
          />
          <StandardCard 
            title="Order completion" 
            percentage={78} 
            description="Increase 7% from previous month" 
            color="#4CAF50" 
          />
          <StandardCard 
            title="Order completion" 
            percentage={50} 
            description="Increase 7% from previous month" 
            color="#4CAF50"
          />
          <StandardCard 
            title="Order completion" 
            percentage={30} 
            description="Increase 7% from previous month" 
            color="#4CAF50" 
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
  scrollViewContent: {
    paddingBottom: 80, // Space for the bottom navigation bar
  },
  
  // --- BLOCK 1: Header (Green) ---
  headerBlock: {
    backgroundColor: '#4CAF50', // Main Green color
    padding: 20,
    paddingTop: 10, 
    minHeight: 200, 
    borderBottomLeftRadius: 30, // Subtle curve, though mostly hidden by progress card
    borderBottomRightRadius: 30, // Subtle curve
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userDetails: {
    fontSize: 14,
    color: '#D4E8D4', // Lighter green text
  },
  
  // --- OVERLAPPING PROGRESS CARD ---
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginTop: -35, // Pulls the card up into the header
    zIndex: 2, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  progressStarIcon: {
    marginRight: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '70%', 
    height: '100%',
    backgroundColor: '#FF9800', // Orange color
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
    fontWeight: '500',
  },
  // --- BLOCK 2: Content Card (Main White Section) ---
  contentCardBlock: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 10, 
    flex: 1,
  },
  
  // --- Earning Section Styles ---
  earningHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15, 
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeMoreLink: {
    color: '#4CAF50', // Green link
    fontWeight: '600',
  },
  earningGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  earningCard: {
    width: '48%', 
    backgroundColor: '#FAFAFA', 
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    minHeight: 100,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 4, 
    elevation: 3, 
  },
  earningValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  earningTitle: {
    fontSize: 13,
    color: '#666',
  },
  
  // --- Standards Section Styles ---
  standardsMaintainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 15,
  },
  standardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 3, 
    elevation: 2, 
  },
  circularProgressContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginRight: 15,
  },
  circularProgressRing: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0', // Default light grey for the ring
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProgressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50', // Green color
  },
  standardDetails: {
    flex: 1,
  },
  standardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  standardDescription: {
    fontSize: 13,
  },
});

export default ProfileScreen;
