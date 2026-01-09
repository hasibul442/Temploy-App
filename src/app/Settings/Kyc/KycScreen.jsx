import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../utils/constants/Color';
import { CommonStyles } from '../../../utils/styles/CommonStyle';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { getData, postData } from '../../../utils/helper/HttpHelper';
import HeaderWithBackButton from '../../../components/Header/HeaderWithBackButton';
import { HeaderStyles } from '../../../utils/styles/HeaderStyle';

const KYC_STATUS = {
  NONE: 'none',
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
};

function KycScreen() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [kycStatus, setKycStatus] = useState(KYC_STATUS.NONE);
  const [verificationType, setVerificationType] = useState('');
  const [kycData, setKycData] = useState({
    idFront: null,
    idBack: null,
  });
  const [uploadedDocs, setUploadedDocs] = useState({
    idFront: null,
    idBack: null,
  });

  useEffect(() => {
    fetchKycStatus();
  }, []);

  const fetchKycStatus = async () => {
    try {
      setLoading(true);
      // Replace with your API endpoint
      // const response = await getData('/api/kyc/status', {}, true);
      // setKycStatus(response.status);
      // setUploadedDocs(response.documents || {});
      
      // Mock data - remove this when API is ready
      setTimeout(() => {
        setKycStatus(KYC_STATUS.NONE); // Change to test different states
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching KYC status:', error);
      setLoading(false);
    }
  };

  const selectImageOption = (docType) => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(docType),
        },
        {
          text: 'Gallery',
          onPress: () => openGallery(docType),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  const openCamera = async (docType) => {
    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is required to take photos');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setKycData({ ...kycData, [docType]: result.assets[0] });
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera');
    }
  };

  const openGallery = async (docType) => {
    try {
      // Request media library permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Photo library permission is required');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setKycData({ ...kycData, [docType]: result.assets[0] });
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to open gallery');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setKycData({ ...kycData, document: result.assets[0] });
      }
    } catch (error) {
      console.error('Document picker error:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleSubmitKyc = async () => {
    // Validate verification type
    if (!verificationType) {
      Alert.alert('Verification Type Required', 'Please select a verification type');
      return;
    }
    
    // Validate that required documents are uploaded
    if (!kycData.idFront || !kycData.idBack) {
      Alert.alert('Missing Documents', 'Please upload both ID front and ID back');
      return;
    }

    try {
      setUploading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      
      formData.append('verificationType', verificationType);
      
      if (kycData.idFront) {
        formData.append('idFront', {
          uri: kycData.idFront.uri,
          type: kycData.idFront.type || 'image/jpeg',
          name: kycData.idFront.fileName || 'id_front.jpg',
        });
      }
      
      if (kycData.idBack) {
        formData.append('idBack', {
          uri: kycData.idBack.uri,
          type: kycData.idBack.type || 'image/jpeg',
          name: kycData.idBack.fileName || 'id_back.jpg',
        });
      }

      // Replace with your API endpoint
      // const response = await postData('/api/kyc/upload', formData, true);
      
      // Mock success - remove when API is ready
      setTimeout(() => {
        setUploading(false);
        Alert.alert('Success', 'KYC documents uploaded successfully. Under review.', [
          {
            text: 'OK',
            onPress: () => {
              setKycStatus(KYC_STATUS.PENDING);
              setUploadedDocs(kycData);
            },
          },
        ]);
      }, 2000);
    } catch (error) {
      setUploading(false);
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload KYC documents');
    }
  };

  const renderStatusBadge = () => {
    let statusConfig = {
      text: 'Not Submitted',
      color: Colors.gray_500,
      bgColor: Colors.gray_100,
      icon: 'info-outline',
    };

    switch (kycStatus) {
      case KYC_STATUS.PENDING:
        statusConfig = {
          text: 'Under Review',
          color: Colors.warning,
          bgColor: '#FFF8E1',
          icon: 'hourglass-empty',
        };
        break;
      case KYC_STATUS.VERIFIED:
        statusConfig = {
          text: 'Verified',
          color: Colors.success,
          bgColor: Colors.light_3,
          icon: 'verified',
        };
        break;
      case KYC_STATUS.REJECTED:
        statusConfig = {
          text: 'Rejected',
          color: Colors.danger,
          bgColor: '#FFEBEE',
          icon: 'cancel',
        };
        break;
    }

    return (
      <View style={[styles.statusBadge, { backgroundColor: statusConfig.bgColor }]}>
        <MaterialIcons name={statusConfig.icon} size={20} color={statusConfig.color} />
        <Text style={[styles.statusText, { color: statusConfig.color }]}>
          {statusConfig.text}
        </Text>
      </View>
    );
  };

  const renderDocumentUpload = (title, docType, icon) => {
    const hasDoc = kycData[docType] || uploadedDocs[docType];
    const isImage = docType !== 'document';

    return (
      <View style={styles.uploadCard}>
        <View style={styles.uploadHeader}>
          <View style={styles.uploadTitleRow}>
            <Ionicons name={icon} size={24} color={Colors.primary_2} />
            <Text style={styles.uploadTitle}>{title}</Text>
          </View>
          {hasDoc && (
            <MaterialIcons name="check-circle" size={24} color={Colors.success} />
          )}
        </View>

        {hasDoc ? (
          <View style={styles.previewContainer}>
            {isImage ? (
              <Image
                source={{ uri: kycData[docType]?.uri || uploadedDocs[docType] }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.documentPreview}>
                <Ionicons name="document-text" size={48} color={Colors.primary_2} />
                <Text style={styles.documentName} numberOfLines={1}>
                  {kycData[docType]?.name || 'Document uploaded'}
                </Text>
              </View>
            )}
            {kycStatus === KYC_STATUS.NONE && (
              <TouchableOpacity
                style={styles.changeButton}
                onPress={() => (isImage ? selectImageOption(docType) : pickDocument())}
              >
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => (isImage ? selectImageOption(docType) : pickDocument())}
            disabled={kycStatus === KYC_STATUS.PENDING || kycStatus === KYC_STATUS.VERIFIED}
          >
            <Ionicons name="cloud-upload-outline" size={32} color={Colors.primary_2} />
            <Text style={styles.uploadButtonText}>Tap to Upload</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="KYC Verification" />
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary_2} />
          <Text style={styles.loadingText}>Loading KYC status...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={HeaderStyles.header}>
        <HeaderWithBackButton title="KYC Verification" />
        <View style={{ width: 40 }} />
      </View>

      <View style={CommonStyles.container_3}>
        <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Status Card */}
        <View style={styles.statusCard}>
          <Text style={styles.statusCardTitle}>Verification Status</Text>
          {renderStatusBadge()}
          
          {kycStatus === KYC_STATUS.VERIFIED && (
            <Text style={styles.statusMessage}>
              Your KYC verification is complete. You have full access to all features.
            </Text>
          )}
          
          {kycStatus === KYC_STATUS.PENDING && (
            <Text style={styles.statusMessage}>
              Your documents are under review. This usually takes 1-2 business days.
            </Text>
          )}
          
          {kycStatus === KYC_STATUS.REJECTED && (
            <Text style={[styles.statusMessage, { color: Colors.danger }]}>
              Your KYC was rejected. Please resubmit with correct documents.
            </Text>
          )}
          
          {kycStatus === KYC_STATUS.NONE && (
            <Text style={styles.statusMessage}>
              Complete your KYC verification to unlock all features.
            </Text>
          )}
        </View>

        {/* Info Card */}
        {kycStatus !== KYC_STATUS.VERIFIED && (
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color={Colors.info} />
            <Text style={styles.infoText}>
              Please select verification type and upload clear photos of your document (both sides).
            </Text>
          </View>
        )}

        {/* Verification Type Selection */}
        {kycStatus !== KYC_STATUS.VERIFIED && (
          <View style={styles.verificationTypeCard}>
            <Text style={styles.verificationTypeTitle}>Select Verification Type</Text>
            <View style={styles.typeButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  verificationType === 'national_id' && styles.typeButtonActive,
                ]}
                onPress={() => setVerificationType('national_id')}
                disabled={kycStatus === KYC_STATUS.PENDING}
              >
                <Ionicons
                  name="card"
                  size={24}
                  color={verificationType === 'national_id' ? Colors.white : Colors.primary_2}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    verificationType === 'national_id' && styles.typeButtonTextActive,
                  ]}
                >
                  National ID
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  verificationType === 'passport' && styles.typeButtonActive,
                ]}
                onPress={() => setVerificationType('passport')}
                disabled={kycStatus === KYC_STATUS.PENDING}
              >
                <Ionicons
                  name="airplane"
                  size={24}
                  color={verificationType === 'passport' ? Colors.white : Colors.primary_2}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    verificationType === 'passport' && styles.typeButtonTextActive,
                  ]}
                >
                  Passport
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  verificationType === 'driver_license' && styles.typeButtonActive,
                ]}
                onPress={() => setVerificationType('driver_license')}
                disabled={kycStatus === KYC_STATUS.PENDING}
              >
                <Ionicons
                  name="car"
                  size={24}
                  color={verificationType === 'driver_license' ? Colors.white : Colors.primary_2}
                />
                <Text
                  style={[
                    styles.typeButtonText,
                    verificationType === 'driver_license' && styles.typeButtonTextActive,
                  ]}
                >
                  Driver's License
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Upload Sections */}
        {kycStatus !== KYC_STATUS.VERIFIED && verificationType && (
          <>
            {renderDocumentUpload('ID Front Side', 'idFront', 'card-outline')}
            {renderDocumentUpload('ID Back Side', 'idBack', 'card-outline')}

            {/* Submit Button */}
            {kycStatus !== KYC_STATUS.PENDING && (
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  uploading && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmitKyc}
                disabled={uploading}
              >
                {uploading ? (
                  <ActivityIndicator color={Colors.white} />
                ) : (
                  <Text style={styles.submitButtonText}>Submit for Verification</Text>
                )}
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  statusCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray_100,
    elevation: 2,
  },
  statusCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  statusMessage: {
    fontSize: 14,
    color: Colors.gray_600,
    lineHeight: 20,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  verificationTypeCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray_100,
  },
  verificationTypeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 16,
  },
  typeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    backgroundColor: Colors.light_3,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary_1,
  },
  typeButtonActive: {
    backgroundColor: Colors.primary_2,
    borderColor: Colors.primary_2,
  },
  typeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary_2,
    marginTop: 8,
    textAlign: 'center',
  },
  typeButtonTextActive: {
    color: Colors.white,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.dark,
    marginLeft: 12,
    lineHeight: 20,
  },
  uploadCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray_100,
  },
  uploadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  uploadTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginLeft: 8,
  },
  uploadButton: {
    backgroundColor: Colors.light_3,
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary_1,
    borderStyle: 'dashed',
  },
  uploadButtonText: {
    fontSize: 14,
    color: Colors.primary_2,
    fontWeight: '600',
    marginTop: 8,
  },
  previewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: Colors.gray_100,
  },
  documentPreview: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: Colors.light_3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentName: {
    fontSize: 14,
    color: Colors.dark,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  changeButton: {
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: Colors.primary_1,
    borderRadius: 20,
  },
  changeButtonText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: Colors.primary_2,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});

export default KycScreen;