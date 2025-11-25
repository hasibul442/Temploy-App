import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/constants/Color";

const { width, height } = Dimensions.get("window");

function SignupScreen() {
  const navigation = useNavigation();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundSolid}>
        {/* Decorative circles */}
        <View style={styles.circleTopLeft} />
        <View style={styles.circleTopRight} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header */}
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.helloText}>Create Your</Text>
              <Text style={styles.signInText}>Account</Text>
            </View>
          </View>

          {/* Main White Card */}
          <View style={styles.loginCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>First Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="John"
                  placeholderTextColor="#999"
                  value={fname}
                  onChangeText={setFname}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Doe"
                  placeholderTextColor="#999"
                  value={lname}
                  onChangeText={setLname}
                />
              </View>
            </View>
            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="(123) 456-7890"
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Joydeo@gmail.com"
                  keyboardType="email-address"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeIcon}>
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.signInButtonText}>SIGN UP</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Auth", { screen: "Login" })}
              >
                <Text style={styles.signUpLink}>Sign in</Text>
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
    // flexGrow: 1,
    // paddingBottom: 40,
    justifyContent: "space-between",
    minHeight: height,
  },

  // --- Decorative Circles ---
  circleTopLeft: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#ffffff1a",
    top: -40,
    left: -40,
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
    height: "70%",
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
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 5,
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
    // borderBottomWidth: 1.5,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
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

export default SignupScreen;
