import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../utils/constants/Color";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundSolid}>
        {/* Decorative Circles */}
        <View style={styles.circleTopLeft} />
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomRight} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: "https://placehold.co/60x40/ffffff/ffffff?text=H",
              }}
              style={styles.dumbbellIcon}
            />
            <Text style={styles.logoText}>Temploy</Text>
          </View>

          <Text style={styles.welcomeText}>Welcome to Temploy</Text>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => navigation.navigate("Auth", { screen: "Login" })}
          >
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate("Auth", { screen: "Signup" })}
          >
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableOpacity>

          {/* Social Media Login */}
          <Text style={styles.socialMediaPrompt}>Login with Social Media</Text>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>
                <AntDesign name="google" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>
                <AntDesign name="x" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>
                <FontAwesome5 name="facebook" size={24} color="black" />
              </Text>{" "}
              {/* Facebook */}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light grey background outside the main block
  },
  backgroundSolid: {
    flex: 1,
    backgroundColor: Colors.success_2,
    borderRadius: 0,
    overflow: "hidden",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },

  // --- Decorative Circles ---
  circleTopLeft: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ffffff1a",
    top: -50,
    left: -50,
    zIndex: 0,
  },
  circleTopRight: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffffff1a",
    top: 50,
    right: -20,
    zIndex: 0,
  },
  circleBottomRight: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ffffff1a",
    bottom: -80,
    right: -80,
    zIndex: 0,
  },

  // --- Header/Menu Dots ---
  menuDots: {
    position: "absolute",
    top: 30,
    right: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  menuDotsText: {
    fontSize: 30,
    color: "white",
    lineHeight: 25,
  },

  // --- Logo Section ---
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  dumbbellIcon: {
    width: 60,
    height: 40,
    resizeMode: "contain",
    tintColor: "white",
    marginBottom: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },

  // --- Welcome Text ---
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 50,
  },

  // --- Action Buttons ---
  signInButton: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  signInButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  signUpButtonText: {
    color: Colors.success_2,
    fontSize: 18,
    fontWeight: "bold",
  },

  // --- Social Media Login ---
  socialMediaPrompt: {
    fontSize: 16,
    color: "white",
    opacity: 0.7,
    marginBottom: 20,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
  socialIcon: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  socialIconText: {
    fontSize: 24,
    color: Colors.success_2,
  },
});

export default WelcomeScreen;
