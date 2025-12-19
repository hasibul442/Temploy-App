import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../utils/constants/Color";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { ButtonStyle } from "../../utils/styles/ButtonStyle";
import { TextInput } from "react-native-paper";
import { ErrorAlert } from "../../utils/helper/AlertHelper";
import { CommonValidation } from "../../utils/validation/CommonValidation";

const { width } = Dimensions.get("window");

function ForgetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ field: "", message: "" });

  const handleSubmitButton = () => {
    const validationError = CommonValidation({
      email,
    });
    if (validationError) {
      setError(validationError);
      ErrorAlert(validationError.message);
      return;
    }

    setError({ field: "", message: "" });
    navigation.navigate("OTPScreen", { email });
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={styles.backgroundSolid}>
        <View style={CommonStyles.circleTopLeft} />
        <View style={CommonStyles.circleTopRight} />
        <View style={CommonStyles.circleBottomRight} />

        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          extraHeight={180}
          enableOnAndroid={true}
          enableAutomaticScroll={true}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            {/* <Image
              source={require("../assets/logo/logo-1.png")}
              style={styles.dumbbellIcon}
            /> */}
            {/* <Text style={styles.logoText}>Temploy</Text> */}
          </View>

          <Text style={styles.title}>Forget Password</Text>
          <Text style={styles.subtitle}>
            Please enter your email address to reset your password.
          </Text>

          <TextInput
            mode="flat"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            placeholder="Please Insert Email"
            value={email}
            onChangeText={setEmail}
            outlineColor={error.field === "email" ? Colors.danger : Colors.dark}
            activeOutlineColor={Colors.success}
            textColor={error.field === "email" ? Colors.danger : Colors.black}
            style={{
              backgroundColor: Colors.white,
              width: "100%",
              marginBottom: 20,
            }}
            error={error.field === "email"}
            theme={{ colors: { background:Colors.white } }}
          />

          <TouchableOpacity
            style={ButtonStyle.signInButton_2}
            onPress={handleSubmitButton}
          >
            <Text style={ButtonStyle.signInButtonText_2}>Continue</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't remember your email? Contact us at{" "}
              <TouchableOpacity>
                <Text style={styles.signUpLink}>help@temploy.com</Text>
              </TouchableOpacity>
            </Text>
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
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
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
    tintColor: Colors.white,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.white,
    letterSpacing: 2,
  },

  // --- Welcome Text ---
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 30,
    textAlign: "center",
  },

  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    flexWrap: "wrap",
  },
  signUpText: {
    fontSize: 13.5,
    color: Colors.white,
    letterSpacing: 0.2,
    textAlign: "center",
  },
  signUpLink: {
    fontSize: 13.5,
    color: Colors.white,
    textDecorationLine: "underline",
    textDecorationColor: Colors.white,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
});

export default ForgetPasswordScreen;
