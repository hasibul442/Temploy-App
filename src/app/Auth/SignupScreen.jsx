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
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/constants/Color";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { TextInput } from "react-native-paper";
import { ButtonStyle } from "../../utils/styles/ButtonStyle";
import { CommonValidation } from "../../utils/validation/CommonValidation";
import { ErrorAlert } from "../../utils/helper/AlertHelper";
import { postData } from "../../utils/helper/HttpHelper";
import { useDispatch } from "react-redux";
import { loginUser } from "../../slices/authSlice";

const { width, height } = Dimensions.get("window");

function SignupScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ field: "", message: "" });

  const handleSignUp = async () => {
    // Sign Up Logic Here
    const validationError = CommonValidation({
      fname,
      lname,
      phone,
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

    try {
      await postData(
        "/api/v1/auth/user/register",
        {
          f_name: fname,
          l_name: lname,
          phone: phone,
          email: email,
          password: password,
        },
        false
      ).then(async (response) => {
        if (response?.status == 200) {
          await dispatch(
            loginUser({
              token: response?.token?.token,
              user: response?.user || null,
            })).unwrap();
        } else {
          ErrorAlert(response?.message || "An error occurred during signup.");
          Alert.alert("Signup Failed", response?.message || "An error occurred during signup. Please try again.");
        }
      });
    } catch (error) {
      console.error("Signup Error:", error);
      Alert.alert("Signup Error", "An error occurred during signup. Please try again.");
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
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="First Name"
                  placeholder="Please Insert First Name"
                  outlineColor={
                    error.field === "fname" ? Colors.danger : Colors.dark
                  }
                  activeOutlineColor={Colors.success}
                  value={fname}
                  onChangeText={setFname}
                  textColor={
                    error.field === "email" ? Colors.danger : Colors.black
                  }
                  style={{ backgroundColor: Colors.white, width: "100%" }}
                  theme={{ colors: { background: Colors.white } }}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Last Name"
                  placeholder="Please Insert Last Name"
                  outlineColor={
                    error.field === "lname" ? Colors.danger : Colors.dark
                  }
                  activeOutlineColor={Colors.success}
                  value={lname}
                  onChangeText={setLname}
                  textColor={
                    error.field === "lname" ? Colors.danger : Colors.black
                  }
                  style={{ backgroundColor: Colors.white, width: "100%" }}
                  theme={{ colors: { background: Colors.white } }}
                />
              </View>
            </View>
            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Phone"
                  placeholder="(123) 456-7890"
                  keyboardType="phone-pad"
                  outlineColor={
                    error.field === "phone" ? Colors.danger : Colors.dark
                  }
                  activeOutlineColor={Colors.success}
                  textColor={
                    error.field === "phone" ? Colors.danger : Colors.black
                  }
                  style={{ backgroundColor: Colors.white, width: "100%" }}
                  theme={{ colors: { background: Colors.white } }}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Email"
                  placeholder="Please Insert Email"
                  keyboardType="email-address"
                  outlineColor={
                    error.field === "email" ? Colors.danger : Colors.dark
                  }
                  activeOutlineColor={Colors.success}
                  textColor={
                    error.field === "email" ? Colors.danger : Colors.black
                  }
                  style={{ backgroundColor: Colors.white, width: "100%" }}
                  theme={{ colors: { background: Colors.white } }}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label="Password"
                  placeholder="Please Insert Password"
                  outlineColor={
                    error.field === "password" ? Colors.danger : Colors.dark
                  }
                  activeOutlineColor={Colors.success}
                  value={password}
                  onChangeText={setPassword}
                  textColor={
                    error.field === "password" ? Colors.danger : Colors.black
                  }
                  style={{ backgroundColor: Colors.white, width: "100%" }}
                  theme={{ colors: { background: Colors.white } }}
                  secureTextEntry={!showPassword}
                />
              </View>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity
              style={ButtonStyle.signInButton}
              onPress={handleSignUp}
            >
              <Text style={ButtonStyle.signInButtonText}>SIGN UP</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.signUpLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
        {/* </View> */}
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
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: "100%",
    alignSelf: "center",
    padding: 32,
    paddingTop: 36,
    paddingBottom: 60,
    // zIndex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 20,
  },

  // --- Input Styles ---
  inputGroup: {
    marginBottom: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
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
