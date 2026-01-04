import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../utils/constants/Color";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { HeaderStyles } from "../../utils/styles/HeaderStyle";
import HeaderWithBackButton from "../../components/Header/HeaderWithBackButton";
import { useSystemNavigateSpace } from "../../utils/helper/Helper";

const jobTypes = [
  "One-time",
  "Part-time",
  "Full-time",
  "Contract",
  "Recurring",
];
const experienceLevels = ["Beginner", "Intermediate", "Expert"];
const workModes = ["On-site", "Remote", "Hybrid"];

function CreateJobScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    budgetType: "fixed",
    budgetMin: "",
    budgetMax: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    skills: "",
    deadline: "",
  });

  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedWorkMode, setSelectedWorkMode] = useState("");
  const [budgetType, setBudgetType] = useState("fixed");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      Alert.alert("Required Field", "Please enter a job title to continue");
      return;
    }
    if (!formData.description.trim()) {
      Alert.alert("Required Field", "Please describe the work you need done");
      return;
    }
    if (!formData.budgetMin.trim()) {
      Alert.alert("Required Field", "Please set your budget for this job");
      return;
    }

    Alert.alert(
      "Job Posted!",
      "Your job has been posted on Temploy. You'll receive proposals from freelancers soon.",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      <View style={HeaderStyles.header}>
        <HeaderWithBackButton title="Post a Job" />
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: useSystemNavigateSpace(80) }]}
      >
        {/* Job Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Job Title <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Need a Plumber for Bathroom Repair"
            placeholderTextColor={Colors.gray_400}
            value={formData.title}
            onChangeText={(text) => handleInputChange("title", text)}
          />
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Service Category</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Home Services, Cleaning, Electrical"
            placeholderTextColor={Colors.gray_400}
            value={formData.category}
            onChangeText={(text) => handleInputChange("category", text)}
          />
        </View>

        {/* Job Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Job Description <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe what you need done, when you need it, and any specific requirements. The more details you provide, the better proposals you'll receive..."
            placeholderTextColor={Colors.gray_400}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
        </View>

        {/* Requirements */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Special Requirements</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any specific qualifications, tools, or certifications the worker should have..."
            placeholderTextColor={Colors.gray_400}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.requirements}
            onChangeText={(text) => handleInputChange("requirements", text)}
          />
        </View>

        {/* Budget Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Payment Type <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.budgetTypeContainer}>
            <TouchableOpacity
              style={[
                styles.budgetTypeButton,
                budgetType === "fixed" && styles.budgetTypeButtonActive,
              ]}
              onPress={() => setBudgetType("fixed")}
            >
              <Ionicons
                name="cash-outline"
                size={20}
                color={budgetType === "fixed" ? Colors.white : Colors.gray_600}
              />
              <Text
                style={[
                  styles.budgetTypeText,
                  budgetType === "fixed" && styles.budgetTypeTextActive,
                ]}
              >
                Fixed Price
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.budgetTypeButton,
                budgetType === "hourly" && styles.budgetTypeButtonActive,
              ]}
              onPress={() => setBudgetType("hourly")}
            >
              <Ionicons
                name="time-outline"
                size={20}
                color={budgetType === "hourly" ? Colors.white : Colors.gray_600}
              />
              <Text
                style={[
                  styles.budgetTypeText,
                  budgetType === "hourly" && styles.budgetTypeTextActive,
                ]}
              >
                Hourly Rate
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Budget Range */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Budget (BDT) <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.budgetRow}>
            <TextInput
              style={[styles.input, styles.budgetInput]}
              placeholder="Min"
              placeholderTextColor={Colors.gray_400}
              keyboardType="numeric"
              value={formData.budgetMin}
              onChangeText={(text) => handleInputChange("budgetMin", text)}
            />
            <Text style={styles.budgetSeparator}>to</Text>
            <TextInput
              style={[styles.input, styles.budgetInput]}
              placeholder="Max"
              placeholderTextColor={Colors.gray_400}
              keyboardType="numeric"
              value={formData.budgetMax}
              onChangeText={(text) => handleInputChange("budgetMax", text)}
            />
          </View>
          <Text style={styles.helperText}>
            Set a realistic budget to attract quality workers
          </Text>
        </View>

        {/* Job Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Job Duration</Text>
          <View style={styles.chipContainer}>
            {jobTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  selectedJobType === type && styles.chipActive,
                ]}
                onPress={() => setSelectedJobType(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedJobType === type && styles.chipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Work Mode */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Work Mode</Text>
          <View style={styles.chipContainer}>
            {workModes.map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.chip,
                  selectedWorkMode === mode && styles.chipActive,
                ]}
                onPress={() => setSelectedWorkMode(mode)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedWorkMode === mode && styles.chipTextActive,
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Experience Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Worker Experience Level</Text>
          <View style={styles.chipContainer}>
            {experienceLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.chip,
                  selectedExperience === level && styles.chipActive,
                ]}
                onPress={() => setSelectedExperience(level)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedExperience === level && styles.chipTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Skills */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Required Skills</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Plumbing, Electrical Work, Carpentry"
            placeholderTextColor={Colors.gray_400}
            value={formData.skills}
            onChangeText={(text) => handleInputChange("skills", text)}
          />
          <Text style={styles.helperText}>Separate skills with commas</Text>
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Job Location</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Dhanmondi, Dhaka"
            placeholderTextColor={Colors.gray_400}
            value={formData.location}
            onChangeText={(text) => handleInputChange("location", text)}
          />
          <Text style={styles.helperText}>
            Workers nearby will be prioritized
          </Text>
        </View>

        {/* Deadline */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>When do you need this done?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Within 3 days, January 15, 2026"
            placeholderTextColor={Colors.gray_400}
            value={formData.deadline}
            onChangeText={(text) => handleInputChange("deadline", text)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Post Job on Temploy</Text>
        </TouchableOpacity>

        {/* Draft Button */}
        <TouchableOpacity style={styles.draftButton}>
          <Text style={styles.draftButtonText}>Save as Draft</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          By posting, you agree to Temploy's Terms of Service and will receive
          proposals from verified workers.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray_800,
    marginBottom: 8,
  },
  required: {
    color: Colors.danger,
  },
  input: {
    backgroundColor: Colors.gray_50,
    borderWidth: 1,
    borderColor: Colors.gray_100,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.dark,
  },
  textArea: {
    minHeight: 120,
    paddingTop: 14,
  },
  helperText: {
    fontSize: 12,
    color: Colors.gray_500,
    marginTop: 6,
  },
  budgetTypeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  budgetTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray_100,
    backgroundColor: Colors.gray_50,
  },
  budgetTypeButtonActive: {
    backgroundColor: Colors.success_2,
    borderColor: Colors.success_2,
  },
  budgetTypeText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.gray_600,
  },
  budgetTypeTextActive: {
    color: Colors.white,
  },
  budgetRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  budgetInput: {
    flex: 1,
  },
  budgetSeparator: {
    fontSize: 14,
    color: Colors.gray_500,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray_100,
    backgroundColor: Colors.gray_50,
  },
  chipActive: {
    backgroundColor: Colors.success_2,
    borderColor: Colors.success_2,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.gray_600,
  },
  chipTextActive: {
    color: Colors.white,
  },
  submitButton: {
    backgroundColor: Colors.success_2,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  draftButton: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.gray_100,
  },
  draftButtonText: {
    color: Colors.gray_600,
    fontSize: 16,
    fontWeight: "600",
  },
  footerNote: {
    fontSize: 12,
    color: Colors.gray_500,
    textAlign: "center",
    marginTop: 20,
    lineHeight: 18,
  },
});

export default CreateJobScreen;
