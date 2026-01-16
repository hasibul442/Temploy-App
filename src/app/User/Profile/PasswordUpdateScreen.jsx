import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, HelperText } from "react-native-paper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/constants/Color";
import { CommonStyles } from "../../../utils/styles/CommonStyle";
import { useSelector } from "react-redux";
import moment from "moment";

const { width, height } = Dimensions.get("window");

function PasswordUpdateScreen() {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  // Password last updated date (mock data - replace with actual from user object)
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "",
    color: "",
  });

  useEffect(() => {
    // TODO: Fetch last password update date from user profile
    // For now using mock data
    setLastUpdated(user?.passwordUpdatedAt || "2025-12-15T10:30:00Z");
  }, [user]);

  // Calculate password strength
  useEffect(() => {
    if (formData.newPassword) {
      const strength = calculatePasswordStrength(formData.newPassword);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, label: "", color: "" });
    }
  }, [formData.newPassword]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    if (score <= 2) {
      return { score, label: "Weak", color: Colors.danger };
    } else if (score <= 3) {
      return { score, label: "Fair", color: Colors.warning };
    } else if (score <= 4) {
      return { score, label: "Good", color: Colors.info };
    } else {
      return { score, label: "Strong", color: Colors.success };
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase and lowercase letters";
    } else if (!/(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = async () => {
    if (!validateForm()) {
      ToastAndroid.show("Please fix all errors", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      // TODO: Make API call to update password
      // const response = await putData('/api/v1/user/password', {
      //   currentPassword: formData.currentPassword,
      //   newPassword: formData.newPassword
      // });

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        ToastAndroid.show(
          "Password updated successfully",
          ToastAndroid.LONG
        );
        // Reset form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setLastUpdated(new Date().toISOString());
        navigation.goBack();
      }, 1500);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(
        error?.message || "Failed to update password",
        ToastAndroid.SHORT
      );
    }
  };

  const getLastUpdatedText = () => {
    if (!lastUpdated) return "Never updated";
    
    const now = moment();
    const updated = moment(lastUpdated);
    const daysDiff = now.diff(updated, "days");

    if (daysDiff === 0) {
      return "Updated today";
    } else if (daysDiff === 1) {
      return "Updated yesterday";
    } else if (daysDiff < 7) {
      return `Updated ${daysDiff} days ago`;
    } else if (daysDiff < 30) {
      const weeks = Math.floor(daysDiff / 7);
      return `Updated ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (daysDiff < 365) {
      const months = Math.floor(daysDiff / 30);
      return `Updated ${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      return `Updated on ${updated.format("MMM DD, YYYY")}`;
    }
  };

  const getPasswordSecurityLevel = () => {
    if (!lastUpdated) return "high";
    
    const daysSinceUpdate = moment().diff(moment(lastUpdated), "days");
    
    if (daysSinceUpdate > 180) return "high"; // 6 months
    if (daysSinceUpdate > 90) return "medium"; // 3 months
    return "low";
  };

  const securityLevel = getPasswordSecurityLevel();

  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Last Updated Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardHeader}>
            <MaterialIcons
              name="lock-clock"
              size={24}
              color={Colors.success_2}
            />
            <Text style={styles.infoCardTitle}>Password Security</Text>
          </View>
          
          <View style={styles.lastUpdatedContainer}>
            <Text style={styles.lastUpdatedLabel}>Last Updated</Text>
            <Text style={styles.lastUpdatedValue}>
              {getLastUpdatedText()}
            </Text>
            {lastUpdated && (
              <Text style={styles.lastUpdatedDate}>
                {moment(lastUpdated).format("MMM DD, YYYY [at] hh:mm A")}
              </Text>
            )}
          </View>

          {/* Security Level Indicator */}
          <View style={[
            styles.securityLevelContainer,
            securityLevel === "high" && styles.securityLevelHigh,
            securityLevel === "medium" && styles.securityLevelMedium,
            securityLevel === "low" && styles.securityLevelLow,
          ]}>
            <MaterialIcons
              name={
                securityLevel === "high"
                  ? "warning"
                  : securityLevel === "medium"
                  ? "info"
                  : "check-circle"
              }
              size={18}
              color={
                securityLevel === "high"
                  ? Colors.danger
                  : securityLevel === "medium"
                  ? Colors.warning
                  : Colors.success
              }
            />
            <Text style={[
              styles.securityLevelText,
              securityLevel === "high" && styles.securityLevelTextHigh,
              securityLevel === "medium" && styles.securityLevelTextMedium,
              securityLevel === "low" && styles.securityLevelTextLow,
            ]}>
              {securityLevel === "high"
                ? "Consider updating your password"
                : securityLevel === "medium"
                ? "Your password could use an update"
                : "Your password is up to date"}
            </Text>
          </View>
        </View>

        {/* Password Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Password Requirements:</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color={Colors.gray_500} />
              <Text style={styles.tipText}>At least 8 characters long</Text>
            </View>
            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color={Colors.gray_500} />
              <Text style={styles.tipText}>Mix of uppercase and lowercase letters</Text>
            </View>
            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color={Colors.gray_500} />
              <Text style={styles.tipText}>At least one number</Text>
            </View>
            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color={Colors.gray_500} />
              <Text style={styles.tipText}>Special characters recommended</Text>
            </View>
          </View>
        </View>

        {/* Password Update Form */}
        <View style={styles.formContainer}>
          {/* Current Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Password *</Text>
            <TextInput
              mode="outlined"
              value={formData.currentPassword}
              onChangeText={(text) =>
                handleInputChange("currentPassword", text)
              }
              placeholder="Enter current password"
              secureTextEntry={!showPasswords.current}
              style={styles.input}
              outlineColor={Colors.gray_400}
              activeOutlineColor={Colors.success_2}
              error={!!errors.currentPassword}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="lock-outline"
                      size={20}
                      color={Colors.gray_500}
                    />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  icon={showPasswords.current ? "eye-off" : "eye"}
                  onPress={() => togglePasswordVisibility("current")}
                />
              }
            />
            <HelperText type="error" visible={!!errors.currentPassword}>
              {errors.currentPassword}
            </HelperText>
          </View>

          {/* New Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password *</Text>
            <TextInput
              mode="outlined"
              value={formData.newPassword}
              onChangeText={(text) => handleInputChange("newPassword", text)}
              placeholder="Enter new password"
              secureTextEntry={!showPasswords.new}
              style={styles.input}
              outlineColor={Colors.gray_400}
              activeOutlineColor={Colors.success_2}
              error={!!errors.newPassword}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="lock"
                      size={20}
                      color={Colors.gray_500}
                    />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  icon={showPasswords.new ? "eye-off" : "eye"}
                  onPress={() => togglePasswordVisibility("new")}
                />
              }
            />
            <HelperText type="error" visible={!!errors.newPassword}>
              {errors.newPassword}
            </HelperText>

            {/* Password Strength Indicator */}
            {formData.newPassword && !errors.newPassword && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBars}>
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <View
                      key={bar}
                      style={[
                        styles.strengthBar,
                        bar <= passwordStrength.score && {
                          backgroundColor: passwordStrength.color,
                        },
                      ]}
                    />
                  ))}
                </View>
                <Text
                  style={[
                    styles.strengthLabel,
                    { color: passwordStrength.color },
                  ]}
                >
                  {passwordStrength.label}
                </Text>
              </View>
            )}
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password *</Text>
            <TextInput
              mode="outlined"
              value={formData.confirmPassword}
              onChangeText={(text) =>
                handleInputChange("confirmPassword", text)
              }
              placeholder="Re-enter new password"
              secureTextEntry={!showPasswords.confirm}
              style={styles.input}
              outlineColor={Colors.gray_400}
              activeOutlineColor={Colors.success_2}
              error={!!errors.confirmPassword}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="lock"
                      size={20}
                      color={Colors.gray_500}
                    />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  icon={showPasswords.confirm ? "eye-off" : "eye"}
                  onPress={() => togglePasswordVisibility("confirm")}
                />
              }
            />
            <HelperText type="error" visible={!!errors.confirmPassword}>
              {errors.confirmPassword}
            </HelperText>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={handleUpdatePassword}
            disabled={loading}
          >
            <MaterialIcons name="lock-reset" size={20} color={Colors.white} />
            <Text style={styles.updateButtonText}>
              {loading ? "Updating..." : "Update Password"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header Styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.success_2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.white,
  },

  // Info Card Styles
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: Colors.gray_100,
  },
  infoCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.dark,
    marginLeft: 12,
  },
  lastUpdatedContainer: {
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  lastUpdatedLabel: {
    fontSize: 12,
    color: Colors.gray_500,
    fontWeight: "600",
    marginBottom: 4,
  },
  lastUpdatedValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 4,
  },
  lastUpdatedDate: {
    fontSize: 13,
    color: Colors.gray_600,
  },
  securityLevelContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.gray_50,
  },
  securityLevelHigh: {
    backgroundColor: Colors.danger + "15",
  },
  securityLevelMedium: {
    backgroundColor: Colors.warning + "15",
  },
  securityLevelLow: {
    backgroundColor: Colors.success + "15",
  },
  securityLevelText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 8,
    flex: 1,
  },
  securityLevelTextHigh: {
    color: Colors.danger,
  },
  securityLevelTextMedium: {
    color: Colors.warning,
  },
  securityLevelTextLow: {
    color: Colors.success,
  },

  // Tips Card Styles
  tipsCard: {
    backgroundColor: Colors.light_blue,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 12,
  },
  tipsList: {
    gap: 8,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipText: {
    fontSize: 13,
    color: Colors.gray_700,
    marginLeft: 8,
    flex: 1,
  },

  // Form Styles
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.white,
    fontSize: 14,
  },

  // Password Strength Styles
  strengthContainer: {
    marginTop: 8,
  },
  strengthBars: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.gray_200,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
  },

  // Button Styles
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: Colors.success_2,
    elevation: 3,
    shadowColor: Colors.success_2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  updateButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.gray_400,
  },
  cancelButtonText: {
    color: Colors.gray_600,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PasswordUpdateScreen;
