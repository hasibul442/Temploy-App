import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../utils/constants/Color";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import LogoutButton from "../../components/LogoutButton";
import { useSelector } from "react-redux";

function MenuItem({ icon, title, onPress, showChevron }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color={Colors.dark} />
      )}
    </TouchableOpacity>
  );
}

function WorkerMenuOption() {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.sectionTitle}>My Temploy</Text>
      <MenuItem
        icon={<FontAwesome name="user-o" size={24} color={Colors.dark} />}
        title="My Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <MenuItem
        icon={<Ionicons name="heart-outline" size={24} color={Colors.dark} />}
        title="My Jobs"
        onPress={() => {}}
      />
      <MenuItem
        icon={<Ionicons name="cash-outline" size={24} color={Colors.dark} />}
        title="Earnings"
        onPress={() => navigation.navigate("OtherPages", { screen: "Earning" })}
      />
      <MenuItem
        icon={
          <Ionicons name="paper-plane-outline" size={24} color={Colors.dark} />
        }
        title="Invite friends"
        onPress={() => {}}
        showChevron={false}
      />

      {/* Settings Section */}
      <Text style={styles.sectionTitle}>Settings</Text>

      <MenuItem
        icon={
          <Ionicons name="settings-outline" size={24} color={Colors.dark} />
        }
        title="Preferences"
        onPress={() => navigation.navigate("OtherPages", { screen: "Preferences" })}
      />
      <MenuItem
        icon={
          <Ionicons
            name="person-circle-outline"
            size={24}
            color={Colors.dark}
          />
        }
        title="Account"
        onPress={() => {}}
      />

      {/* Resources Section */}
      <Text style={styles.sectionTitle}>Resources</Text>

      <MenuItem
        icon={
          <Ionicons name="help-circle-outline" size={24} color={Colors.dark} />
        }
        title="Support"
        onPress={() => {}}
      />
      <MenuItem
        icon={
          <Ionicons
            name="document-text-outline"
            size={24}
            color={Colors.dark}
          />
        }
        title="Terms of Service"
        onPress={() => navigation.navigate("OtherPages", { screen: "Terms" })}
      />
      <MenuItem
        icon={
          <Ionicons name="chatbubbles-outline" size={24} color={Colors.dark} />
        }
        title="FAQ"
        onPress={() => navigation.navigate("OtherPages", { screen: "FAQ" })}
      />
      <MenuItem
        icon={
          <Ionicons
            name="shield-checkmark-outline"
            size={24}
            color={Colors.dark}
          />
        }
        title="Privacy Policy"
        onPress={() => navigation.navigate("OtherPages", { screen: "Privacy" })}
      />
    </>
  );
}

function MenuScreen() {
  const { user } = useSelector((state) => state.auth);
  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons
              name="notifications-outline"
              size={28}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>

        {/* Fixed Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1690579805307-7ec030c75543?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D",
              }}
              style={styles.profileImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
          <View>
            <Text style={styles.profileName}>{user?.name || "User Name"}</Text>
            <Text
              style={{
                color: Colors.white,
                fontSize: 12,
                marginLeft: 15,
              }}
            >
              Personal Balance : 0.00
            </Text>
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <WorkerMenuOption />

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <LogoutButton />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: Colors.success_2,
  },
  notificationButton: {
    padding: 2,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.success_2,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: Colors.light_gray,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileName: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: "700",
    color: Colors.white,
  },
  sellerModeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light_gray,
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 18,
    borderRadius: 12,
  },
  sellerModeText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.dark,
    marginTop: 25,
    marginBottom: 15,
    marginLeft: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_gray,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
  },
  logoutContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default MenuScreen;
