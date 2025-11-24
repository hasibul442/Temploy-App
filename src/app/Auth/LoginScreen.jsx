import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Theme colors matching the design
const PRIMARY_COLOR = '#880E4F'; // Deep burgundy/maroon
const ACCENT_COLOR = '#E91E63';   // Bright pink for labels

function LoginScreen() {
  const [email, setEmail] = useState('Joydeo@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backgroundSolid}>
        {/* Decorative circles */}
        <View style={styles.circleTopLeft} />
        <View style={styles.circleBottomLeft} />
        <View style={styles.circleMidRight} />

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
              <Text style={styles.inputLabel}>Gmail</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Joydeo@gmail.com"
                  keyboardType="email-address"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                />
                <Text style={styles.checkIcon}>✓</Text>
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
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInButtonText}>SIGN IN</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Auth', { screen: 'Signup' })}>
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
    backgroundColor: PRIMARY_COLOR,
  },
  backgroundSolid: {
    flex: 1,
    // backgroundColor: PRIMARY_COLOR,
    position: 'relative',
  },
  scrollContent: {
    // flexGrow: 1,
    // paddingBottom: 40,
    justifyContent: 'space-between',
    minHeight: height
  },

  // --- Decorative Circles ---
  circleTopLeft: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: -40,
    left: -40,
    zIndex: 0,
  },
  circleBottomLeft: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(211, 47, 47, 0.3)',
    bottom: -100,
    left: -100,
    zIndex: 0,
  },
  circleMidRight: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(211, 47, 47, 0.3)',
    top: height * 0.4,
    right: -60,
    zIndex: 0,
  },

  // --- Header Content ---
  headerContent: {
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 1,
    marginBottom: 60,
  },
  helloText: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5,
  },
  signInText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 2,
    letterSpacing: 0.5,
  },

  // --- Main Login Card ---
  loginCard: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    width: "100%",
    height: 500,
    alignSelf: 'center',
    padding: 32,
    paddingTop: 36,
    paddingBottom: 60,
    zIndex: 1,
    shadowColor: '#000',
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
    color: ACCENT_COLOR,
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E8E8E8',
    paddingBottom: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingVertical: 0,
    height: 24,
  },
  checkIcon: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  eyeIcon: {
    fontSize: 18,
    marginLeft: 10,
  },

  // --- Forgot Password ---
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 35,
  },
  forgotPasswordText: {
    fontSize: 13.5,
    color: '#757575',
    letterSpacing: 0.2,
  },

  // --- Sign In Button ---
  signInButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },

  // --- Sign Up Link ---
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signUpText: {
    fontSize: 13.5,
    color: '#757575',
    letterSpacing: 0.2,
  },
  signUpLink: {
    fontSize: 13.5,
    color: '#333',
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
});

export default LoginScreen;
