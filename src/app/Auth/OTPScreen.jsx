import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';

const { width } = Dimensions.get('window');

const PRIMARY_ORANGE = '#FF5722';
const BACKGROUND_CREAM = '#FFF8E1';

// --- OTP Input Component (Unchanged, relies on parent props) ---
const OtpInput = React.forwardRef(({ value, onKeyPress, onChangeText }, ref) => (
  <TextInput
    ref={ref}
    mode="outlined"
    outlineColor='#E0E0E0'
    activeOutlineColor={PRIMARY_ORANGE}
    keyboardType="number-pad"
    maxLength={1}
    value={value}
    onKeyPress={onKeyPress}
    onChangeText={onChangeText}
    selectionColor={PRIMARY_ORANGE}
    textAlign="center"
    style={styles.otpInputPaper}
    theme={{
      colors: { text: '#333', primary: PRIMARY_ORANGE },
      roundness: 8,
    }}
  />
));

// --- Main Screen Component ---
function OTPScreen() {
  // Initialize with empty strings to properly handle input
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const inputs = useRef([]);

  const phoneNumber = '+8801774280874';

  const focusNextInput = (index, value) => {
    
    // 1. Create a copy of the state array
    const newOtp = [...otp];
    
    // 2. Update the specific digit in the copy
    newOtp[index] = value;
    
    // 3. Update the state
    setOtp(newOtp);

    // 4. Handle auto-advance logic
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const focusPrevInput = (index, key) => {
    // If Backspace is pressed and the current field is empty, move focus back
    if (key === 'Backspace' && index > 0 && !otp[index]) {
        inputs.current[index - 1].focus();
    }
    
    // If Backspace is pressed and the current field HAS a value, clearing it should NOT move focus.
    // The focus will stay on the cleared box, ready for new input.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Go back')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign up</Text>
      </View>
      
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <Text style={styles.otpHeading}>OTP Verification</Text>
          <Text style={styles.otpSubtext}>
            Enter the code from the sms we sent to <Text style={styles.phoneNumber}>{phoneNumber}</Text>
          </Text>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>02:32</Text>
          </View>

          {/* OTP Input Fields */}
          <View style={styles.otpInputRow}>
            {otp.map((digit, index) => (
              <OtpInput
                key={index}
                ref={el => inputs.current[index] = el}
                value={digit}
                // Handle manual backspace: move to prev input if current is empty
                onKeyPress={({ nativeEvent }) => focusPrevInput(index, nativeEvent.key)} 
                // Handle input change: update state and move to next input
                onChangeText={(value) => focusNextInput(index, value)}
              />
            ))}
          </View>
          
          {/* Resend Link */}
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendText}>Don't receive the OTP? RESEND</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={() => console.log('Submit OTP', otp.join(''))}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// --- Stylesheet (Unchanged) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    fontSize: 24,
    color: '#333',
    marginRight: 15,
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_CREAM,
  },
  scrollContent: {
    flexGrow: 1,           // <-- 1. STRETCH VERTICALLY
    justifyContent: 'center', // <-- 2. CENTER VERTICALLY
    // alignItems: 'center',    // <-- 3. CENTER HORIZONTALLY
    paddingHorizontal: 25,
    // paddingTop: 40,
  },
  
  otpHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  otpSubtext: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  phoneNumber: {
    fontWeight: 'bold',
    color: PRIMARY_ORANGE,
  },
  
  timerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_ORANGE,
  },

  otpInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInputPaper: {
    width: width / 8.5,
    height: 55,
    padding: 0, 
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    backgroundColor: 'white',
  },

  resendButton: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize: 14,
    color: PRIMARY_ORANGE,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: PRIMARY_ORANGE,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: PRIMARY_ORANGE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPScreen;
