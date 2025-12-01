import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/constants/Color";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { ButtonStyle } from "../../utils/styles/ButtonStyle";
import { ErrorAlert } from "../../utils/helper/AlertHelper";
import { CommonValidation } from "../../utils/validation/CommonValidation";
import { postData } from "../../utils/helper/HttpHelper";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/authSlice';

const { width, height } = Dimensions.get("window");

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ field: "", message: "" });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignIn = async() => {
    const validationError = CommonValidation({
      email,
      password,
    });

    if (validationError) {
      setError(validationError);
      ErrorAlert(validationError.message);
      Alert.alert("Validation Error", validationError.message);
      return;
    }
    setError({ field: "", message: "" });

    try{
      await postData("/api/v1/auth/user/login", {
        email,
        password,
      }, false).then(async (response)=>{
        if(response?.status == 200){
          await dispatch(loginUser({
            token: response?.token?.token,
            user: response?.user || null
          })).unwrap();
        }else{
          ErrorAlert(response?.message || "An error occurred during login.");
          Alert.alert("Login Failed", response?.message || "An error occurred during login.");
        }
      });
    } catch (error) {
      ErrorAlert("An error occurred during login. Please try again.");
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred during login. Please try again.");
    }
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      <View style={styles.backgroundSolid}>
        <View style={CommonStyles.circleTopLeft} />
        <View style={CommonStyles.circleTopRight} />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          extraHeight={180}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.helloText}>Hello</Text>
              <Text style={styles.signInText}>Sign in!</Text>
            </View>
          </View>

          <View style={styles.loginCard}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  outlineColor={error.field === "email" ? Colors.danger : Colors.dark}
                  activeOutlineColor={Colors.success}
                  textColor={error.field === "email" ? Colors.danger : Colors.black}
                  style={{ backgroundColor: Colors.white, width: "100%" }}
                  error={error.field === "email"}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  outlineColor={error.field === "password" ? "#DC0000" : Colors.dark}
                  activeOutlineColor={Colors.success}
                  textColor={error.field === "password" ? Colors.danger : Colors.black}
                  style={{ backgroundColor: Colors.white, width: "100%" }}
                  error={error.field === "password"}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={ButtonStyle.signInButton}
              onPress={handleSignIn}
            >
              <Text style={ButtonStyle.signInButtonText}>SIGN IN</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Signup")}
              >
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundSolid: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-end",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },

  // --- Header Content ---
  headerContent: {
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 120,
    zIndex: 1,
  },
  helloText: {
    fontSize: 32,
    fontWeight: "600",
    color: Colors.white,
    letterSpacing: 0.5,
  },
  signInText: {
    fontSize: 42,
    fontWeight: "bold",
    color: Colors.white,
    marginTop: 2,
    letterSpacing: 0.5,
  },

  // --- Main Login Card ---
  loginCard: {
    backgroundColor: Colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: "100%",
    alignSelf: "center",
    padding: 32,
    paddingTop: 36,
    paddingBottom: 80,
    // zIndex: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
  },

  // --- Input Styles ---
  inputGroup: {
    marginBottom: 24,
  },

  inputContainer: {
    flexDirection: "column",
    paddingBottom: 8,
  },

  // --- Forgot Password ---
  forgotPasswordButton: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 13.5,
    color: "#757575",
    letterSpacing: 0.2,
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
