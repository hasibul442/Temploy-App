import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  Image,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, HelperText } from "react-native-paper";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/constants/Color";
import { CommonStyles } from "../../../utils/styles/CommonStyle";
import { ButtonStyle } from "../../../utils/styles/ButtonStyle";
import { useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get("window");

function ProfileInfoUpdateScreen() {
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    country: user?.country || "Bangladesh",
    bio: user?.bio || "",
    profileImage: user?.profileImage || null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image picker
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        ToastAndroid.show('Permission to access gallery denied', ToastAndroid.SHORT);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        handleInputChange('profileImage', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      ToastAndroid.show('Failed to pick image', ToastAndroid.SHORT);
    }
  };

  // Handle form submission
  const handleUpdate = async () => {
    if (!validateForm()) {
      ToastAndroid.show("Please fix all errors", ToastAndroid.SHORT);
      return;
    }

    setLoading(true);

    try {
      // TODO: Make API call to update profile
      // const response = await putData('/api/v1/user/profile', formData);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        ToastAndroid.show("Profile updated successfully", ToastAndroid.LONG);
        navigation.goBack();
      }, 1500);
    } catch (error) {
      setLoading(false);
      ToastAndroid.show(
        error?.message || "Failed to update profile",
        ToastAndroid.SHORT
      );
    }
  };

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
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            {formData.profileImage ? (
              <Image
                source={{ uri: formData.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <MaterialIcons name="person" size={60} color={Colors.gray_400} />
              </View>
            )}
            <TouchableOpacity
              style={styles.editImageButton}
              onPress={pickImage}
            >
              <MaterialIcons name="camera-alt" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.imageSectionText}>Change Profile Photo</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              mode="outlined"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
              placeholder="Enter your full name"
              style={styles.input}
              outlineColor={Colors.gray_400}
              activeOutlineColor={Colors.success_2}
              error={!!errors.fullName}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="person"
                      size={20}
                      color={Colors.gray_500}
                    />
                  )}
                />
              }
            />
            <HelperText type="error" visible={!!errors.fullName}>
              {errors.fullName}
            </HelperText>
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              mode="outlined"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              outlineColor={Colors.gray_400}
              activeOutlineColor={Colors.success_2}
              error={!!errors.email}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="email"
                      size={20}
                      color={Colors.gray_500}
                    />
                  )}
                />
              }
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email}
            </HelperText>
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              mode="outlined"
              value={formData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              style={styles.input}
              outlineColor={Colors.gray_400}
              activeOutlineColor={Colors.success_2}
              error={!!errors.phone}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="phone"
                      size={20}
                      color={Colors.gray_500}
                    />
                  )}
                />
              }
            />
            <HelperText type="error" visible={!!errors.phone}>
              {errors.phone}
            </HelperText>
          </View>

          {/* Country */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              mode="outlined"
              value={formData.country}
              onChangeText={(text) => handleInputChange("country", text)}
              placeholder="Enter your country"
              style={styles.input}
              outlineColor={Colors.gray_400}
              activeOutlineColor={Colors.success_2}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="location-on"
                      size={20}
                      color={Colors.gray_500}
                    />
                  )}
                />
              }
            />
          </View>

          {/* Bio */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              mode="outlined"
              value={formData.bio}
              onChangeText={(text) => handleInputChange("bio", text)}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={4}
              style={[styles.input, styles.textArea]}
              outlineColor={Colors.gray_400}
              activeOutlineColor={Colors.success_2}
              left={
                <TextInput.Icon
                  icon={() => (
                    <MaterialIcons
                      name="description"
                      size={20}
                      color={Colors.gray_500}
                    />
                  )}
                />
              }
            />
            <Text style={styles.characterCount}>
              {formData.bio.length}/500 characters
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={handleUpdate}
            disabled={loading}
          >
            <Text style={styles.updateButtonText}>
              {loading ? "Updating..." : "Update Profile"}
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

  // Image Section Styles
  imageSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: Colors.white,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.success_2,
  },
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.gray_100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: Colors.success_2,
  },
  editImageButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.success_2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  imageSectionText: {
    fontSize: 14,
    color: Colors.success_2,
    fontWeight: "600",
  },

  // Form Styles
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  characterCount: {
    fontSize: 12,
    color: Colors.gray_500,
    textAlign: "right",
    marginTop: 4,
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

export default ProfileInfoUpdateScreen;
