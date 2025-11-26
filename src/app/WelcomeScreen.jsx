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
import { CommonStyles } from "../utils/styles/CommonStyle";
import { ButtonStyle } from "../utils/styles/ButtonStyle";

const { width } = Dimensions.get("window");

function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={styles.backgroundSolid}>
        <View style={CommonStyles.circleTopLeft} />
        <View style={CommonStyles.circleTopRight} />
        <View style={CommonStyles.circleBottomRight} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo/logo-1.png")}
              style={styles.dumbbellIcon}
            />
            {/* <Text style={styles.logoText}>Temploy</Text> */}
          </View>

          <Text style={styles.welcomeText}>Welcome to Temploy</Text>

          <TouchableOpacity
            style={ButtonStyle.signInButton_2}
            onPress={() => navigation.navigate("Auth", { screen: "Login" })}
          >
            <Text style={ButtonStyle.signInButtonText_2}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ButtonStyle.signUpButton}
            onPress={() => navigation.navigate("Auth", { screen: "Signup" })}
          >
            <Text style={ButtonStyle.signUpButtonText}>SIGN UP</Text>
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
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundSolid: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },

  // --- Logo Section ---
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  dumbbellIcon: {
    width: 150,
    height: 80,
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
