import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ToastAndroid,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, HelperText } from 'react-native-paper';
import { Colors } from '../../../utils/constants/Color';
import { CommonStyles } from '../../../utils/styles/CommonStyle';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getData, postData } from '../../../utils/helper/HttpHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonValidation } from '../../../utils/validation/CommonValidation';

function ContactInfoScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    phone: '',
    alternatePhone: '',
    email: '',
    alternateEmail: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      // Replace with your API endpoint
      // const response = await getData('/api/user/contact', {}, true);
      // setFormData(response.data);
      
      // Mock data - remove when API is ready
      setTimeout(() => {
        setFormData({
          phone: '+1234567890',
          alternatePhone: '',
          email: 'user@example.com',
          alternateEmail: '',
          address: '123 Main Street',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          postalCode: '10001',
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching contact info:', error);
      setLoading(false);
      showMessage('Failed to load contact information');
    }
  };

  const showMessage = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Info', message);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSave = async () => {
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    const validationErrors = CommonValidation({
        phone: formData.phone,
        alternatePhone: formData.alternatePhone,
        email: formData.email,
        alternateEmail: formData.alternateEmail,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
        
    })

    if(validationErrors){
        setErrors(validationErrors);
        ToastAndroid.show(validationErrors.message, ToastAndroid.SHORT);
        return;
    }
    try {
      setSaving(true);

      // Replace with your API endpoint
      // const response = await postData('/api/user/contact', formData, true);
      
      // Mock success - remove when API is ready
      setTimeout(() => {
        setSaving(false);
        showMessage('Contact information updated successfully');
        navigation.goBack();
      }, 1500);
    } catch (error) {
      setSaving(false);
      console.error('Error saving contact info:', error);
      showMessage('Failed to update contact information');
    }
  };

  const renderInput = (label, field, options = {}) => {
    const {
      keyboardType = 'default',
      autoCapitalize = 'sentences',
      multiline = false,
      numberOfLines = 1,
      placeholder = '',
    } = options;

    return (
      <View style={styles.inputGroup}>
        <TextInput
          mode="outlined"
          label={label}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          onBlur={() => handleBlur(field)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          placeholder={placeholder}
          outlineColor={errors[field] && touched[field] ? Colors.danger : Colors.gray_400}
          activeOutlineColor={Colors.primary_2}
          textColor={Colors.dark}
          style={styles.input}
          error={errors[field] && touched[field]}
        />
        {errors[field] && touched[field] && (
          <HelperText type="error" visible={true} style={styles.errorText}>
            {errors[field]}
          </HelperText>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.primary_2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Information</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary_2} />
          <Text style={styles.loadingText}>Loading contact information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary_2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Information</Text>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAwareScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraHeight={120}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color={Colors.info} />
          <Text style={styles.infoText}>
            Keep your contact information up to date to receive important notifications.
          </Text>
        </View>

        {/* Phone Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone Numbers</Text>
          {renderInput('Phone Number *', 'phone', {
            keyboardType: 'phone-pad',
            autoCapitalize: 'none',
            placeholder: '+1 234 567 8900',
          })}
          {renderInput('Alternate Phone', 'alternatePhone', {
            keyboardType: 'phone-pad',
            autoCapitalize: 'none',
            placeholder: 'Optional',
          })}
        </View>

        {/* Email Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email Addresses</Text>
          {renderInput('Email *', 'email', {
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            placeholder: 'your.email@example.com',
          })}
          {renderInput('Alternate Email', 'alternateEmail', {
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            placeholder: 'Optional',
          })}
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          {renderInput('Street Address', 'address', {
            multiline: true,
            numberOfLines: 3,
            placeholder: '123 Main Street, Apt 4B',
          })}
          {renderInput('City', 'city', {
            placeholder: 'New York',
          })}
          {renderInput('State/Province', 'state', {
            placeholder: 'NY',
          })}
          {renderInput('Country', 'country', {
            placeholder: 'United States',
          })}
          {renderInput('Postal Code', 'postalCode', {
            placeholder: '10001',
          })}
        </View>

        {/* Required Fields Note */}
        <Text style={styles.requiredNote}>* Required fields</Text>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.gray_600,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.dark,
    marginLeft: 12,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.white,
  },
  errorText: {
    paddingHorizontal: 4,
  },
  requiredNote: {
    fontSize: 12,
    color: Colors.gray_600,
    fontStyle: 'italic',
    marginBottom: 24,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: Colors.primary_2,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
    marginLeft: 8,
  },
});

export default ContactInfoScreen;
