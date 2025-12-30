import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "../../../utils/constants/Color";
import HeaderWithBackButton from "../../../components/Header/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import JobsData from "../../../utils/data/JobsData";
import CoverLetterTips from "../../../components/Card/Tips/CoverLetterTips";
import JobDescription from "../../../components/JobDescription";
import TermCard from "../../../components/Card/TermCard";
import { CommonStyles } from "../../../utils/styles/CommonStyle";
import { HeaderStyles } from "../../../utils/styles/HeaderStyle";

function SubmitProposalScreen({ route }) {
  const navigation = useNavigation();
  const { jobId } = route?.params || {};
  const jobdata = JobsData;
  const job = jobdata.find((j) => j._id === jobId);

  // Form state
  const [bidAmount, setBidAmount] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [youWillReceive, setYouWillReceive] = useState(0);
  const [coverLetter, setCoverLetter] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBidAmount = (value) => {
    // Allow only numbers and decimal point
    const regex = /^\d*\.?\d*$/;
    if (value === "" || regex.test(value)) {
      setBidAmount(value);

      const bid = parseFloat(value) || 0;
      const fee = bid * 0.1;
      const receive = bid - fee;
    setServiceFee(-fee);
      setYouWillReceive(receive);
    }
  };

  const handleSubmitProposal = () => {
    if (validateForm()) {
      // Here you would typically make an API call to submit the proposal
      console.log("Proposal submitted:", {
        bidAmount,
        serviceFee,
        youWillReceive,
        coverLetter,
        attachments,
      });

      // Show success message and navigate back
      navigation.goBack();
    }
  };

  const handleAddAttachment = () => {
    // Implement file picker functionality
    console.log("Add attachment");
  };

  useEffect(() => {
    handleBidAmount(job?.budget?.toString() || "");
  }, []);

  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      <View style={CommonStyles.container_3}>
        {/* Header */}
      <View style={HeaderStyles.header}>
        <HeaderWithBackButton title="Submit Proposal" />
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAwareScrollView
        style={CommonStyles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        {/* Job Details Section */}
        {job && (
          <View style={styles.jobDetailsSection}>
            <Text style={styles.mainSectionTitle}>Job Details</Text>
            <View style={styles.jobDetailsCard}>
              <Text style={CommonStyles.title_dark_20} numberOfLines={3}>
                {job.title}
              </Text>
              <View style={styles.jobMetaRow}>
                <View style={styles.jobMetaItem}>
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={Colors.primary_1}
                  />
                  <Text style={styles.jobMetaText}>{job.duration}</Text>
                </View>
              </View>
              <JobDescription description={job.description} />
            </View>
          </View>
        )}

        {/* Terms Section */}
        <View style={styles.termsSection}>
          <Text style={styles.mainSectionTitle}>Terms</Text>

          {/* Bid Amount */}
          <View style={styles.termsCard}>
            <Text style={styles.termsLabel}>
              How much do you want to bid for this project?
            </Text>
            <Text style={styles.termsSubLabel}>
              This includes all milestones, and is the amount your client will
              see
            </Text>

            <View style={styles.bidInputContainer}>
              <Text style={CommonStyles.form_label}>Bid</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputPrefix}>$</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.bidInput,
                    errors.bidAmount && styles.inputError,
                  ]}
                  placeholder="0.00"
                  placeholderTextColor={Colors.gray_400}
                  keyboardType="decimal-pad"
                  value={bidAmount}
                  onChangeText={handleBidAmount}
                />
              </View>
            </View>
            {errors.bidAmount && (
              <Text style={styles.errorText}>{errors.bidAmount}</Text>
            )}

            <View style={CommonStyles.divider} />

            <View style={styles.bidInputContainer}>
              <Text style={CommonStyles.form_label}>
                10% Temploy Service Fee
              </Text>
               <Text style={styles.feeDescription}>
                This helps us run the platform and provide services like payment
                protection and customer support.
              </Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputPrefix}>$</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.bidInput,
                    errors.bidAmount && styles.inputError,
                  ]}
                  placeholder="0.00"
                  placeholderTextColor={Colors.gray_400}
                  keyboardType="decimal-pad"
                  value={serviceFee.toFixed(2)}
                  onChangeText={handleBidAmount}
                  editable={false}
                />
              </View>
            </View>

            <View style={CommonStyles.divider} />

            <View style={styles.bidInputContainer}>
              <Text style={CommonStyles.form_label}>You'll Receive</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputPrefix}>$</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.bidInput,
                    errors.bidAmount && styles.inputError,
                  ]}
                  placeholder="0.00"
                  placeholderTextColor={Colors.gray_400}
                  keyboardType="decimal-pad"
                  value={youWillReceive.toFixed(2)}
                  onChangeText={handleBidAmount}
                  editable={false}
                />
              </View>
            </View>
            {errors.bidAmount && (
              <Text style={styles.errorText}>{errors.bidAmount}</Text>
            )}
          </View>
        </View>

        {/* Additional Details Section */}
        <View style={styles.additionalDetailsSection}>
          <Text style={styles.mainSectionTitle}>Additional Details</Text>

          {/* Cover Letter */}
          <View style={styles.additionalCard}>
            <View style={styles.coverLetterHeader}>
              <Text style={styles.fieldLabel}>Proposal Note</Text>
              <Text style={styles.requiredBadge}>Required</Text>
            </View>
            <Text style={styles.fieldDescription}>
              Introduce yourself and explain why you're the best fit for this
              job
            </Text>

            <View style={styles.coverLetterContainer}>
              <TextInput
                style={[
                  styles.input,
                  styles.coverLetterInput,
                  errors.coverLetter && styles.inputError,
                ]}
                placeholder="Dear hiring manager,&#10;&#10;I am writing to express my interest in your project. With my experience in..."
                placeholderTextColor={Colors.gray_400}
                multiline
                numberOfLines={10}
                textAlignVertical="top"
                value={coverLetter}
                onChangeText={setCoverLetter}
              />
              <View style={styles.characterCount}>
                <Ionicons
                  name={
                    coverLetter.length >= 50
                      ? "checkmark-circle"
                      : "information-circle-outline"
                  }
                  size={14}
                  color={
                    coverLetter.length >= 50 ? Colors.success : Colors.gray_400
                  }
                />
                <Text
                  style={[
                    styles.characterCountText,
                    coverLetter.length >= 50 && styles.characterCountValid,
                  ]}
                >
                  {coverLetter.length} characters (minimum 50)
                </Text>
              </View>
            </View>
            {errors.coverLetter && (
              <Text style={styles.errorText}>{errors.coverLetter}</Text>
            )}

            <CoverLetterTips />
          </View>

          {/* Attachments */}
          <View style={styles.additionalCard}>
            <View style={styles.attachmentHeader}>
              <Text style={styles.fieldLabel}>Attachments</Text>
              <Text style={styles.optionalBadge}>Optional</Text>
            </View>
            <Text style={styles.fieldDescription}>
              Showcase your work or add files that support your proposal
            </Text>

            <TouchableOpacity
              style={styles.addAttachmentButton}
              onPress={handleAddAttachment}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={24}
                color={Colors.primary_1}
              />
              <Text style={styles.addAttachmentText}>Upload File</Text>
              <Text style={styles.attachmentLimit}>Max 25MB</Text>
            </TouchableOpacity>

            {attachments.length > 0 && (
              <View style={styles.attachmentsList}>
                {attachments.map((attachment, index) => (
                  <View key={index} style={styles.attachmentItem}>
                    <Ionicons
                      name="document-outline"
                      size={22}
                      color={Colors.primary_1}
                    />
                    <Text style={styles.attachmentName} numberOfLines={1}>
                      {attachment.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setAttachments(
                          attachments.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <Ionicons
                        name="close-circle"
                        size={22}
                        color={Colors.danger}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Terms Agreement Notice */}
        <TermCard text="By submitting this proposal, you agree to Temploy's Terms of Service and acknowledge that you have read the job description carefully." />
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitProposal}
          >
            <Text style={styles.submitButtonText}>Submit Proposal</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },

  // Job Details Section
  jobDetailsSection: {
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingBottom: 24,
    marginBottom: 8,
  },
  mainSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  jobDetailsCard: {
    paddingHorizontal: 16,
  },
  jobMetaRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 12,
  },
  jobMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  jobMetaText: {
    fontSize: 15,
    color: Colors.gray_700,
    fontWeight: "600",
  },

  // Terms Section
  termsSection: {
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingBottom: 24,
    marginBottom: 8,
  },
  termsCard: {
    paddingHorizontal: 16,
  },
  termsLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 8,
  },
  termsSubLabel: {
    fontSize: 14,
    color: Colors.gray_600,
    lineHeight: 20,
    marginBottom: 20,
  },
  bidInputContainer: {
    marginBottom: 4,
  },
  bidLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray_700,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.gray_100,
    borderRadius: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  inputPrefix: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    color: Colors.dark,
    paddingVertical: 14,
    textAlign: "left",
  },
  bidInput: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "right",
  },
  inputError: {
    borderColor: Colors.danger,
  },
  errorText: {
    fontSize: 13,
    color: Colors.danger,
    marginTop: 8,
    marginLeft: 2,
  },

  // Fee Section
  feeDescription: {
    fontSize: 12,
    color: Colors.gray_600,
    lineHeight: 20,
    marginBottom: 8,
  },

  // Additional Details Section
  additionalDetailsSection: {
    backgroundColor: Colors.white,
    paddingTop: 20,
    paddingBottom: 24,
    marginBottom: 8,
  },
  additionalCard: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  coverLetterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  attachmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
  },
  requiredBadge: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.danger,
    backgroundColor: Colors.light,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  optionalBadge: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.gray_600,
    backgroundColor: Colors.gray_50,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fieldDescription: {
    fontSize: 14,
    color: Colors.gray_600,
    lineHeight: 20,
    marginBottom: 16,
  },
  coverLetterContainer: {
    position: "relative",
    marginBottom: 12,
  },
  coverLetterInput: {
    borderWidth: 2,
    borderColor: Colors.gray_100,
    borderRadius: 8,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 50,
    minHeight: 200,
    fontSize: 15,
    lineHeight: 22,
  },
  characterCount: {
    position: "absolute",
    bottom: 14,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  characterCountText: {
    fontSize: 12,
    color: Colors.gray_400,
    fontWeight: "500",
  },
  characterCountValid: {
    color: Colors.success,
  },

  addAttachmentButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.gray_100,
    borderStyle: "dashed",
    backgroundColor: Colors.gray_50,
  },
  addAttachmentText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary_1,
  },
  attachmentLimit: {
    fontSize: 12,
    color: Colors.gray_500,
  },
  attachmentsList: {
    marginTop: 16,
    gap: 10,
  },
  attachmentItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray_100,
  },
  attachmentName: {
    flex: 1,
    fontSize: 14,
    color: Colors.gray_700,
    fontWeight: "500",
  },

  bottomBar: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray_100,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.gray_400,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray_700,
  },
  submitButton: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary_1,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.white,
  },
});

export default SubmitProposalScreen;
