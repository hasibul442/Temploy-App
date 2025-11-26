import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { Colors } from "../../utils/constants/Color";
import { ButtonStyle } from "../../utils/styles/ButtonStyle";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const OtpInput = forwardRef(({ value, onKeyPress, onChangeText }, ref) => (
  <TextInput
    ref={ref}
    mode="outlined"
    outlineColor={Colors.white}
    activeOutlineColor={Colors.basil_orange_800}
    keyboardType="number-pad"
    maxLength={1}
    value={value}
    onKeyPress={onKeyPress}
    onChangeText={onChangeText}
    selectionColor={Colors.basil_orange_800}
    textAlign="center"
    style={styles.otpInputPaper}
    theme={{
      colors: { text: Colors.dark },
      roundness: 8,
    }}
  />
));

// --- Main Screen Component ---
function OTPScreen({ route }) {
  // Initialize with empty strings to properly handle input
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const navigation = useNavigation();
  const [time, setTime] = useState(150);

  const email = route?.params?.email || "your email";

  const focusNextInput = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const focusPrevInput = (index, key) => {
    if (key === "Backspace" && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOTPSubmit = () => {
    const enteredOtp = otp.join("");
    // Here you can add your OTP verification logic
    console.log("Entered OTP:", enteredOtp);
    // For demonstration, we'll just navigate to a "Home" screen
    navigation.navigate("Home");
  }

  useEffect(() => {
    let timer;
    if (time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [time]);

  return (
    <SafeAreaView style={CommonStyles.safeArea}>
      <View style={styles.backgroundSolid}>
        <View style={CommonStyles.circleTopLeft} />
        <View style={CommonStyles.circleTopRight} />
        <View style={CommonStyles.circleBottomRight} />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign up</Text>
        </View>

        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.otpHeading}>OTP Verification</Text>
            <Text style={styles.otpSubtext}>
              Enter the code from the sms we sent to
              <Text style={styles.phoneNumber}> {email}</Text>
            </Text>

            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{formatTime(time)}</Text>
            </View>

            {/* OTP Input Fields */}
            <View style={styles.otpInputRow}>
              {otp.map((digit, index) => (
                <OtpInput
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  value={digit}
                  // Handle manual backspace: move to prev input if current is empty
                  onKeyPress={({ nativeEvent }) =>
                    focusPrevInput(index, nativeEvent.key)
                  }
                  // Handle input change: update state and move to next input
                  onChangeText={(value) => focusNextInput(index, value)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.resendButton}>
              <Text style={styles.resendText}>
                Don't receive the OTP? RESEND
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={ButtonStyle.signInButton_2}
              onPress={handleOTPSubmit}
            >
              <Text style={ButtonStyle.signInButtonText_2}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- Stylesheet (Unchanged) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  backgroundSolid: {
    flex: 1,
    position: "relative",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  backButton: {
    fontSize: 24,
    color: Colors.white,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.white,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  otpHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 10,
    textAlign: "center",
  },
  otpSubtext: {
    fontSize: 16,
    color: Colors.white,
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "center",
  },
  phoneNumber: {
    fontWeight: "bold",
    color: Colors.white,
    textAlign: "center",
  },

  timerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.white,
  },

  otpInputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInputPaper: {
    width: width / 8.5,
    height: 55,
    padding: 0,
    fontSize: 24,
    fontWeight: "600",
    color: Colors.dark,
    backgroundColor: Colors.white,
  },

  resendButton: {
    alignItems: "center",
    marginBottom: 40,
  },
  resendText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: "600",
  },
});

export default OTPScreen;
