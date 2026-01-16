import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/constants/Color";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { HeaderStyles } from "../../utils/styles/HeaderStyle";
import HeaderWithBackButton from "../../components/Header/HeaderWithBackButton";
import {
  convertTimeStampToTimeAgo,
  getCurrencySymbol,
  getStatusColor,
  stripHtmlTags,
} from "../../utils/helper/Helper";
import JobsData from "../../utils/data/JobsData";

const { width } = Dimensions.get("window");

function MyJobsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("applied"); // applied or posted
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCurrencySymbol().then(setCurrencySymbol);
    loadJobs();
  }, []);

  const loadJobs = () => {
    // Load jobs I applied to
    const applied = JobsData.slice(0, 5).map((job) => ({
      ...job,
      applicationStatus: ["pending", "accepted", "rejected", "interview"][
        Math.floor(Math.random() * 4)
      ],
      appliedDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
      myBidAmount: job.budget * (0.8 + Math.random() * 0.3),
    }));
    setAppliedJobs(applied);

    // Load jobs I posted
    const posted = JobsData.slice(5, 10).map((job) => ({
      ...job,
      proposals: Math.floor(Math.random() * 25) + 1,
      views: Math.floor(Math.random() * 100) + 10,
      shortlisted: Math.floor(Math.random() * 5),
      hired: job.status === "closed" ? 1 : 0,
    }));
    setPostedJobs(posted);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadJobs();
      setRefreshing(false);
    }, 1000);
  };

  const getFilteredJobs = (jobs) => {
    if (!searchQuery.trim()) return jobs;

    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stripHtmlTags(job.description)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  };

  const currentJobs = activeTab === "applied" ? appliedJobs : postedJobs;
  const filteredJobs = getFilteredJobs(currentJobs);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={HeaderStyles.header}>
        <HeaderWithBackButton title="My Jobs" />
        {activeTab === "posted" && (
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate("CreateJobScreen")}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle" size={28} color={Colors.primary_2} />
          </TouchableOpacity>
        )}
        {activeTab === "applied" && <View style={{ width: 40 }} />}
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "applied" && styles.activeTab]}
          onPress={() => {
            setActiveTab("applied");
            setSearchQuery("");
          }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="briefcase"
            size={20}
            color={activeTab === "applied" ? Colors.white : Colors.gray_600}
            style={{ marginRight: 8 }}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "applied" && styles.activeTabText,
            ]}
          >
            Jobs I Applied
          </Text>
          <View
            style={[
              styles.tabBadge,
              activeTab === "applied"
                ? styles.tabBadgeActive
                : styles.tabBadgeInactive,
            ]}
          >
            <Text
              style={[
                styles.tabBadgeText,
                activeTab === "applied" && styles.tabBadgeTextActive,
              ]}
            >
              {appliedJobs.length}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "posted" && styles.activeTab]}
          onPress={() => {
            setActiveTab("posted");
            setSearchQuery("");
          }}
          activeOpacity={0.7}
        >
          <Ionicons
            name="megaphone"
            size={20}
            color={activeTab === "posted" ? Colors.white : Colors.gray_600}
            style={{ marginRight: 8 }}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "posted" && styles.activeTabText,
            ]}
          >
            Jobs I Posted
          </Text>
          <View
            style={[
              styles.tabBadge,
              activeTab === "posted"
                ? styles.tabBadgeActive
                : styles.tabBadgeInactive,
            ]}
          >
            <Text
              style={[
                styles.tabBadgeText,
                activeTab === "posted" && styles.tabBadgeTextActive,
              ]}
            >
              {postedJobs.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Stats for Active Tab */}
      {activeTab === "applied" ? (
        <View style={styles.statsRow}>
          <View style={styles.miniStat}>
            <View
              style={[
                styles.miniStatIcon,
                { backgroundColor: Colors.success + "20" },
              ]}
            >
              <Ionicons name="checkmark" size={16} color={Colors.success} />
            </View>
            <Text style={styles.miniStatNumber}>
              {appliedJobs.filter((j) => j.applicationStatus === "accepted").length}
            </Text>
            <Text style={styles.miniStatLabel}>Accepted</Text>
          </View>

          <View style={styles.miniStat}>
            <View
              style={[
                styles.miniStatIcon,
                { backgroundColor: Colors.warning + "20" },
              ]}
            >
              <Ionicons name="time" size={16} color={Colors.warning} />
            </View>
            <Text style={styles.miniStatNumber}>
              {appliedJobs.filter((j) => j.applicationStatus === "pending").length}
            </Text>
            <Text style={styles.miniStatLabel}>Pending</Text>
          </View>

          <View style={styles.miniStat}>
            <View
              style={[
                styles.miniStatIcon,
                { backgroundColor: Colors.info + "20" },
              ]}
            >
              <Ionicons name="people" size={16} color={Colors.info} />
            </View>
            <Text style={styles.miniStatNumber}>
              {appliedJobs.filter((j) => j.applicationStatus === "interview").length}
            </Text>
            <Text style={styles.miniStatLabel}>Interview</Text>
          </View>

          <View style={styles.miniStat}>
            <View
              style={[
                styles.miniStatIcon,
                { backgroundColor: Colors.danger + "20" },
              ]}
            >
              <Ionicons name="close" size={16} color={Colors.danger} />
            </View>
            <Text style={styles.miniStatNumber}>
              {appliedJobs.filter((j) => j.applicationStatus === "rejected").length}
            </Text>
            <Text style={styles.miniStatLabel}>Rejected</Text>
          </View>
        </View>
      ) : (
        <View style={styles.statsRow}>
          <View style={styles.miniStat}>
            <View
              style={[
                styles.miniStatIcon,
                { backgroundColor: Colors.success + "20" },
              ]}
            >
              <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
            </View>
            <Text style={styles.miniStatNumber}>
              {postedJobs.filter((j) => j.status === "open").length}
            </Text>
            <Text style={styles.miniStatLabel}>Open</Text>
          </View>

          <View style={styles.miniStat}>
            <View
              style={[
                styles.miniStatIcon,
                { backgroundColor: Colors.info + "20" },
              ]}
            >
              <Ionicons name="time" size={16} color={Colors.info} />
            </View>
            <Text style={styles.miniStatNumber}>
              {postedJobs.filter((j) => j.status === "in-progress").length}
            </Text>
            <Text style={styles.miniStatLabel}>In Progress</Text>
          </View>

          <View style={styles.miniStat}>
            <View
              style={[
                styles.miniStatIcon,
                { backgroundColor: Colors.secondary_2 + "20" },
              ]}
            >
              <Ionicons name="document-text" size={16} color={Colors.secondary_2} />
            </View>
            <Text style={styles.miniStatNumber}>
              {postedJobs.reduce((sum, j) => sum + j.proposals, 0)}
            </Text>
            <Text style={styles.miniStatLabel}>Proposals</Text>
          </View>

          <View style={styles.miniStat}>
            <View
              style={[
                styles.miniStatIcon,
                { backgroundColor: Colors.gray_500 + "20" },
              ]}
            >
              <Ionicons name="close-circle" size={16} color={Colors.gray_500} />
            </View>
            <Text style={styles.miniStatNumber}>
              {postedJobs.filter((j) => j.status === "closed").length}
            </Text>
            <Text style={styles.miniStatLabel}>Closed</Text>
          </View>
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.gray_500}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${activeTab === "applied" ? "applications" : "posted jobs"}...`}
          placeholderTextColor={Colors.gray_500}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={Colors.gray_500} />
          </TouchableOpacity>
        )}
      </View>

      {/* Jobs List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary_2]}
            tintColor={Colors.primary_2}
          />
        }
      >
        {filteredJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name={activeTab === "applied" ? "briefcase-outline" : "megaphone-outline"}
              size={64}
              color={Colors.gray_400}
            />
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? "No jobs found matching your search"
                : activeTab === "applied"
                ? "You haven't applied to any jobs yet"
                : "You haven't posted any jobs yet"}
            </Text>
            {!searchQuery && activeTab === "posted" && (
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => navigation.navigate("CreateJobScreen")}
                activeOpacity={0.8}
              >
                <Ionicons name="add" size={20} color={Colors.white} />
                <Text style={styles.emptyStateButtonText}>Post Your First Job</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredJobs.map((job, index) =>
            activeTab === "applied" ? (
              <AppliedJobCard
                key={job._id}
                job={job}
                currencySymbol={currencySymbol}
                getStatusColor={getStatusColor}
                navigation={navigation}
              />
            ) : (
              <PostedJobCard
                key={job._id}
                job={job}
                currencySymbol={currencySymbol}
                getStatusColor={getStatusColor}
                navigation={navigation}
              />
            )
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Applied Job Card Component
function AppliedJobCard({ job, currencySymbol, getStatusColor, navigation }) {
  const statusLabels = {
    pending: "Under Review",
    accepted: "Accepted",
    rejected: "Not Selected",
    interview: "Interview Scheduled",
  };

  return (
    <TouchableOpacity
      style={styles.jobCard}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("OtherPages", {
          screen: "JobsDetails",
          params: { jobId: job._id },
        })
      }
    >
      {/* Status Badge */}
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(job.applicationStatus) + "20" },
        ]}
      >
        <Ionicons
          name={
            job.applicationStatus === "accepted"
              ? "checkmark-circle"
              : job.applicationStatus === "rejected"
              ? "close-circle"
              : job.applicationStatus === "interview"
              ? "people"
              : "time"
          }
          size={12}
          color={getStatusColor(job.applicationStatus)}
        />
        <Text
          style={[
            styles.statusText,
            { color: getStatusColor(job.applicationStatus) },
          ]}
        >
          {statusLabels[job.applicationStatus]}
        </Text>
      </View>

      {/* Job Info */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.jobTitle} numberOfLines={2}>
            {job.title}
          </Text>
          <Text style={styles.appliedDate}>
            Applied {convertTimeStampToTimeAgo(job?.appliedDate)}
          </Text>
        </View>
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetLabel}>My Bid</Text>
          <Text style={styles.budgetAmount}>
            {currencySymbol}
            {job.myBidAmount.toFixed(0)}
          </Text>
        </View>
      </View>

      <Text style={styles.jobDescription} numberOfLines={2}>
        {stripHtmlTags(job.description).substring(0, 120) + "..."}
      </Text>

      {/* Job Meta */}
      <View style={styles.jobMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="briefcase-outline" size={14} color={Colors.gray_500} />
          <Text style={styles.metaText}>
            {job.job_type === "fixed" ? "Fixed" : "Hourly"}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={14} color={Colors.gray_500} />
          <Text style={styles.metaText}>{job.location.city}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="cash-outline" size={14} color={Colors.gray_500} />
          <Text style={styles.metaText}>
            Budget: {currencySymbol}
            {job.budget.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Actions */}
      {job.applicationStatus === "accepted" && (
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Ionicons name="chatbubble-ellipses" size={16} color={Colors.white} />
          <Text style={styles.actionButtonText}>Message Employer</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

// Posted Job Card Component
function PostedJobCard({ job, currencySymbol, getStatusColor, navigation }) {
  return (
    <TouchableOpacity
      style={styles.jobCard}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("OtherPages", {
          screen: "JobsDetails",
          params: { jobId: job._id },
        })
      }
    >
      {/* Status Badge */}
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: getStatusColor(job.status) + "20" },
        ]}
      >
        <Ionicons
          name={
            job.status === "open"
              ? "checkmark-circle"
              : job.status === "closed"
              ? "close-circle"
              : "time"
          }
          size={12}
          color={getStatusColor(job.status)}
        />
        <Text style={[styles.statusText, { color: getStatusColor(job.status) }]}>
          {job.status.toUpperCase()}
        </Text>
      </View>

      {/* Job Info */}
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Text style={styles.jobTitle} numberOfLines={2}>
            {job.title}
          </Text>
          <Text style={styles.appliedDate}>
            Posted {convertTimeStampToTimeAgo(job?.created_at)}
          </Text>
        </View>
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetLabel}>Budget</Text>
          <Text style={styles.budgetAmount}>
            {currencySymbol}
            {job.budget.toLocaleString()}
          </Text>
        </View>
      </View>

      <Text style={styles.jobDescription} numberOfLines={2}>
        {stripHtmlTags(job.description).substring(0, 120) + "..."}
      </Text>

      {/* Stats */}
      <View style={styles.statsRowCard}>
        <View style={styles.statItemCard}>
          <Ionicons name="document-text" size={16} color={Colors.primary_1} />
          <Text style={styles.statTextCard}>{job.proposals}</Text>
        </View>
        <View style={styles.statItemCard}>
          <Ionicons name="eye" size={16} color={Colors.info} />
          <Text style={styles.statTextCard}>{job.views}</Text>
        </View>
        {job.shortlisted > 0 && (
          <View style={styles.statItemCard}>
            <Ionicons name="star" size={16} color={Colors.secondary_2} />
            <Text style={styles.statTextCard}>{job.shortlisted}</Text>
          </View>
        )}
      </View>

      {/* Job Meta */}
      <View style={styles.jobMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="briefcase-outline" size={14} color={Colors.gray_500} />
          <Text style={styles.metaText}>
            {job.job_type === "fixed" ? "Fixed" : "Hourly"}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={14} color={Colors.gray_500} />
          <Text style={styles.metaText}>{job.location.city}</Text>
        </View>
      </View>

      {/* Actions */}
      {job.status === "open" && (
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Ionicons name="people" size={16} color={Colors.white} />
          <Text style={styles.actionButtonText}>
            View Proposals ({job.proposals})
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_50,
  },
  createButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary_2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.gray_600,
  },
  activeTabText: {
    color: Colors.white,
  },
  tabBadge: {
    marginLeft: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: "center",
  },
  tabBadgeInactive: {
    backgroundColor: Colors.gray_100,
  },
  tabBadgeActive: {
    backgroundColor: Colors.white + "30",
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.gray_700,
  },
  tabBadgeTextActive: {
    color: Colors.white,
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  miniStat: {
    flex: 1,
    alignItems: "center",
  },
  miniStatIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  miniStatNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary_2,
    marginBottom: 2,
  },
  miniStatLabel: {
    fontSize: 10,
    color: Colors.gray_600,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.dark,
  },
  scrollView: {
    flex: 1,
    marginTop: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.gray_500,
    marginTop: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  emptyStateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary_2,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  emptyStateButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    position: "relative",
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    zIndex: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingRight: 100,
  },
  cardHeaderLeft: {
    flex: 1,
    marginRight: 12,
  },
  jobTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.primary_2,
    marginBottom: 4,
    lineHeight: 24,
  },
  appliedDate: {
    fontSize: 12,
    color: Colors.gray_500,
  },
  budgetContainer: {
    backgroundColor: Colors.light_3,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  budgetLabel: {
    fontSize: 10,
    color: Colors.gray_600,
    marginBottom: 2,
  },
  budgetAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary_2,
  },
  jobDescription: {
    fontSize: 14,
    color: Colors.gray_600,
    lineHeight: 20,
    marginBottom: 12,
  },
  statsRowCard: {
    flexDirection: "row",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.gray_100,
    marginBottom: 12,
  },
  statItemCard: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statTextCard: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.gray_700,
    marginLeft: 4,
  },
  jobMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.gray_600,
    marginLeft: 4,
    textTransform: "capitalize",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary_2,
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default MyJobsScreen;
