import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/constants/Color";
import {
  convertTimeStampToTimeAgo,
  getCurrencySymbol,
} from "../../utils/helper/Helper";
import JobsData from "../../utils/data/JobsData";
import HeaderWithBackButton from "../../components/Header/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import JobDescription from "../../components/JobDescription";
import SkillTag from "../../components/Card/Tag/SkillTag";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { HeaderStyles } from "../../utils/styles/HeaderStyle";
import PaymentVerified from "../../components/Card/Tag/PaymentVerified";

function JobsDetailsScreen({ route }) {
  const jobdata = JobsData;
  const { jobId } = route?.params || {};
  const [saved, setSaved] = useState(false);
  const navigation = useNavigation();
  const [currencySymbol, setCurrencySymbol] = useState("$");

  // Find the job from JobsData using jobId (index)
  const job = jobdata.find((j) => j._id === jobId);

  useEffect(() => {
    getCurrencySymbol().then(setCurrencySymbol);
  }, []);

  // If job not found, show error
  if (!job) {
    return (
      <SafeAreaView style={CommonStyles.container} edges={["top"]}>
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Job Details" />
          <View style={{ width: 40 }} />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="alert-circle-outline"
            size={60}
            color={Colors.gray_400}
          />
          <Text style={{ fontSize: 16, color: Colors.gray_600, marginTop: 12 }}>
            Job not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      <View style={CommonStyles.container}>
        {/* Header */}
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Job Details" />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setSaved(!saved)}
          >
            <Ionicons
              name={saved ? "heart" : "heart-outline"}
              size={24}
              color={saved ? Colors.white : Colors.white}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={CommonStyles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Posted Time */}
          <Text style={styles.postedTime}>
            {convertTimeStampToTimeAgo(job?.created_at)}
          </Text>

          {/* Title */}
          <Text style={CommonStyles.title_dark_20}>{job.title}</Text>

          {/* Job Meta Card */}
          <View style={styles.metaCard}>
            <View style={styles.metaItem}>
              <Ionicons
                name="cash-outline"
                size={22}
                color={Colors.primary_1}
              />
              <View style={styles.metaTextContainer}>
                <Text style={styles.metaLabel}>Budget</Text>
                <Text style={styles.metaValue}>
                  {currencySymbol} {job.budget.toLocaleString()}
                </Text>
              </View>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons
                name="time-outline"
                size={22}
                color={Colors.primary_1}
              />
              <View style={styles.metaTextContainer}>
                <Text style={styles.metaLabel}>Duration</Text>
                <Text style={styles.metaValue}>{job.duration}</Text>
              </View>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Ionicons
                name="briefcase-outline"
                size={22}
                color={Colors.primary_1}
              />
              <View style={styles.metaTextContainer}>
                <Text style={styles.metaLabel}>Type</Text>
                <Text style={styles.metaValue}>
                  {job.job_type === "fixed" ? "Fixed" : "Hourly"}
                </Text>
              </View>
            </View>
          </View>

          {/* Status Badge */}
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    job.status === "open" ? Colors.success : Colors.gray_500,
                },
              ]}
            >
              <Ionicons name="ellipse" size={8} color={Colors.white} />
              <Text style={styles.statusText}>{job.status.toUpperCase()}</Text>
            </View>
            <PaymentVerified iconSize={16} textSize={13} />
          </View>

          {/* Description Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Description</Text>
            <View style={styles.descriptionContainer}>
              <JobDescription description={job.description} />
            </View>
          </View>

          {/* Location Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationCard}>
              <Ionicons name="location" size={24} color={Colors.primary_1} />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationAddress}>
                  {job.location.address}
                </Text>
                <Text style={styles.locationCity}>
                  {job.location.city}, {job.location.state},{" "}
                  {job.location.country}
                </Text>
              </View>
            </View>
          </View>

          {/* Skills Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Required Skills</Text>
            <View style={styles.skillsContainer}>
              {job?.required_skills.map((skill) => (
                <SkillTag key={skill._id} skill={skill.name} />
              ))}
            </View>
          </View>

          {/* About Client Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the Client</Text>
            <View style={styles.clientCard}>
              <View style={styles.clientInfo}>
                <View style={styles.clientAvatar}>
                  <Ionicons name="person" size={24} color={Colors.gray_500} />
                </View>
                <View style={styles.clientTextContainer}>
                  <Text style={styles.clientName}>Verified Client</Text>
                  <View style={styles.clientMeta}>
                    <Ionicons name="star" size={14} color={Colors.warning} />
                    <Text style={styles.clientRating}>4.8</Text>
                    <Text style={styles.clientJobs}>(25 jobs posted)</Text>
                  </View>
                </View>
              </View>
              <View style={styles.clientStats}>
                <View style={styles.clientStatItem}>
                  <Text style={styles.clientStatValue}>98%</Text>
                  <Text style={styles.clientStatLabel}>Hire Rate</Text>
                </View>
                <View style={styles.clientStatDivider} />
                <View style={styles.clientStatItem}>
                  <Text style={styles.clientStatValue}>$12K+</Text>
                  <Text style={styles.clientStatLabel}>Total Spent</Text>
                </View>
                <View style={styles.clientStatDivider} />
                <View style={styles.clientStatItem}>
                  <Text style={styles.clientStatValue}>BD</Text>
                  <Text style={styles.clientStatLabel}>Location</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Action Bar */}
          <View style={styles.bottomBar}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() =>
                navigation.navigate("OtherPages", {
                  screen: "Proposal",
                  params: { jobId: job._id },
                })
              }
            >
              <Text style={styles.applyButtonText}>Apply Now</Text>
              <Ionicons name="arrow-forward" size={18} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={Colors.primary_2}
              />
              <Text style={styles.messageButtonText}>Save job</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  postedTime: {
    fontSize: 13,
    color: Colors.gray_500,
    marginBottom: 8,
  },
  metaCard: {
    flexDirection: "row",
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  metaItem: {
    flex: 1,
    alignItems: "center",
  },
  metaTextContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 12,
    color: Colors.gray_500,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray_800,
    textTransform: "capitalize",
  },
  metaDivider: {
    width: 1,
    backgroundColor: Colors.gray_200,
    marginHorizontal: 8,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.white,
    marginLeft: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray_800,
    marginBottom: 12,
  },
  descriptionContainer: {
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    padding: 16,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    padding: 16,
  },
  locationTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  locationAddress: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.gray_800,
    marginBottom: 4,
  },
  locationCity: {
    fontSize: 13,
    color: Colors.gray_600,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  clientCard: {
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    padding: 16,
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  clientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray_100,
    justifyContent: "center",
    alignItems: "center",
  },
  clientTextContainer: {
    marginLeft: 12,
  },
  clientName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray_800,
    marginBottom: 4,
  },
  clientMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  clientRating: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray_700,
    marginLeft: 4,
  },
  clientJobs: {
    fontSize: 13,
    color: Colors.gray_500,
    marginLeft: 6,
  },
  clientStats: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: Colors.gray_200,
    paddingTop: 16,
  },
  clientStatItem: {
    flex: 1,
    alignItems: "center",
  },
  clientStatValue: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.gray_800,
    marginBottom: 4,
  },
  clientStatLabel: {
    fontSize: 12,
    color: Colors.gray_500,
  },
  clientStatDivider: {
    width: 1,
    backgroundColor: Colors.gray_100,
  },
  bottomBar: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  messageButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    paddingVertical: 14,

    borderWidth: 1,
    borderColor: Colors.primary_2,
  },
  messageButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary_2,
    marginLeft: 8,
  },
  applyButton: {
    marginRight: 12,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.success_2,
    borderRadius: 12,
    paddingVertical: 14,
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.white,
    marginRight: 8,
  },
});

export default JobsDetailsScreen;
