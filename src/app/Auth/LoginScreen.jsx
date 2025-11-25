import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/constants/Color";

const { width, height } = Dimensions.get("window");

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundSolid}>
        <View style={styles.circleTopLeft} />
        <View style={styles.circleTopRight} />
        {/* <View style={styles.circleMidRight} /> */}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header */}
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.helloText}>Hello</Text>
              <Text style={styles.signInText}>Sign in!</Text>
            </View>
          </View>

          {/* Main White Card */}
          <View style={styles.loginCard}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  placeholder="Please Insert Email"
                  value={email}
                  onChangeText={setEmail}
                  outlineColor="#333"
                  activeOutlineColor={Colors.success}
                  textColor="#000"
                  style={{ backgroundColor: 'white', width: '100%' }}
                  theme={{ colors: { background: 'white' } }}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  outlineColor="#333"
                  activeOutlineColor={Colors.success}
                  textColor="#000"
                  style={{ backgroundColor: 'white', width: '100%' }}
                  theme={{ colors: { background: 'white' } }}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.signInButtonText}>SIGN IN</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have account? </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Auth", { screen: "Signup" })
                }
              >
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.success_2,
  },
  backgroundSolid: {
    flex: 1,
    // backgroundColor: Colors.success_2,
    position: "relative",
  },
  scrollContent: {
    justifyContent: "space-between",
    minHeight: height,
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
  circleMidRight: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#d32f2f4d",
    top: height * 0.4,
    right: -60,
    zIndex: 0,
  },

  // --- Header Content ---
  headerContent: {
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 1,
    marginBottom: 60,
  },
  helloText: {
    fontSize: 32,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
  },
  signInText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    marginTop: 2,
    letterSpacing: 0.5,
  },

  // --- Main Login Card ---
  loginCard: {
    backgroundColor: "white",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: "100%",
    height: 500,
    alignSelf: "center",
    padding: 32,
    paddingTop: 36,
    paddingBottom: 60,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
    // marginBottom: 40,
  },

  // --- Input Styles ---
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 15,
    color: Colors.success,
    fontWeight: "600",
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#000",
    height: 40,
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
  },
  checkIcon: {
    fontSize: 16,
    color: Colors.success_2,
    marginLeft: 10,
    fontWeight: "bold",
  },
  eyeIcon: {
    fontSize: 18,
    marginLeft: 10,
  },

  // --- Forgot Password ---
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginTop: 8,
    marginBottom: 35,
  },
  forgotPasswordText: {
    fontSize: 13.5,
    color: "#757575",
    letterSpacing: 0.2,
  },

  // --- Sign In Button ---
  signInButton: {
    backgroundColor: Colors.success_2,
    borderRadius: 12,
    paddingVertical: 17,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    shadowColor: Colors.success_2,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },

  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  // --- Sign Up Link ---
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  signUpText: {
    fontSize: 13.5,
    color: "#757575",
    letterSpacing: 0.2,
  },
  signUpLink: {
    fontSize: 13.5,
    color: "#333",
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
});

export default LoginScreen;
