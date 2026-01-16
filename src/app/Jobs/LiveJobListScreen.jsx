import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/constants/Color";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { HeaderStyles } from "../../utils/styles/HeaderStyle";
import HeaderWithBackButton from "../../components/Header/HeaderWithBackButton";
import {
  getCurrencySymbol,
  getTimeAgo,
  getTimeColor,
  stripHtmlTags,
} from "../../utils/helper/Helper";
import JobsData from "../../utils/data/JobsData";
import LiveJobCard from "../../components/Card/LiveJobCard";

function LiveJobListScreen({ navigation }) {
  const [liveJobs, setLiveJobs] = useState([]);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [filterStatus, setFilterStatus] = useState("all"); // all, hot, ending-soon
  const [bidModalVisible, setBidModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidDescription, setBidDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const AUTO_REFRESH_INTERVAL = 10000; // 10 seconds

  useEffect(() => {
    getCurrencySymbol().then(setCurrencySymbol);
    loadLiveJobs();
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadLiveJobs(true);
    }, AUTO_REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const loadLiveJobs = (isAutoRefresh = false) => {
    if (!isAutoRefresh) {
      setIsRefreshing(true);
    }
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter for open jobs and add live bid properties
      const jobs = JobsData.filter((job) => job.status === "open").map((job) => ({
        ...job,
        currentBids: Math.floor(Math.random() * 20) + 1,
        timeRemaining: Math.floor(Math.random() * 48) + 1, // hours
        isHot: Math.random() > 0.6,
        lowestBid: job.budget * (0.7 + Math.random() * 0.2),
        highestBid: job.budget * (1.1 + Math.random() * 0.3),
      }));
      setLiveJobs(jobs);
      setLastRefreshTime(new Date());
      setIsRefreshing(false);
    }, isAutoRefresh ? 0 : 500);
  };

  const handleBidPress = (job) => {
    setSelectedJob(job);
    setBidAmount("");
    setBidDescription("");
    setBidModalVisible(true);
  };

  const handleSubmitBid = () => {
    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      Alert.alert("Error", "Please enter a valid bid amount");
      return;
    }
    if (!bidDescription.trim()) {
      Alert.alert("Error", "Please provide a brief description for your bid");
      return;
    }

    // Here you would typically send the bid to your backend
    Alert.alert(
      "Success",
      `Your bid of ${currencySymbol}${bidAmount} has been submitted!`,
      [
        {
          text: "OK",
          onPress: () => {
            setBidModalVisible(false);
            setBidAmount("");
            setBidDescription("");
          },
        },
      ]
    );
  };

  const getFilteredJobs = () => {
    let filtered = liveJobs;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stripHtmlTags(job.description)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus === "hot") {
      filtered = filtered.filter((job) => job.isHot);
    } else if (filterStatus === "ending-soon") {
      filtered = filtered.filter((job) => job.timeRemaining <= 6);
    }

    return filtered;
  };

  const filteredJobs = getFilteredJobs();

  return (
    <SafeAreaView style={CommonStyles.container_3} edges={["top"]}>
      {/* Header */}
      <View style={HeaderStyles.header}>
        <HeaderWithBackButton title="Live Jobs" />
        <View style={styles.headerRight}>
          <View style={styles.autoRefreshIndicator}>
            <View style={[styles.liveDot, isRefreshing && styles.liveDotPulse]} />
            <Text style={styles.autoRefreshText}>
              {getTimeAgo(lastRefreshTime)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => loadLiveJobs(false)}
            activeOpacity={0.7}
            disabled={isRefreshing}
          >
            <Animated.View
              style={{
                transform: [{ rotate: isRefreshing ? "360deg" : "0deg" }],
              }}
            >
              <Ionicons name="refresh" size={22} color={Colors.white} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>

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
          placeholder="Search jobs..."
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

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            filterStatus === "all" && styles.filterChipActive,
          ]}
          onPress={() => setFilterStatus("all")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.filterChipText,
              filterStatus === "all" && styles.filterChipTextActive,
            ]}
          >
            All Jobs ({liveJobs.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            filterStatus === "hot" && styles.filterChipActive,
          ]}
          onPress={() => setFilterStatus("hot")}
          activeOpacity={0.7}
        >
          <Ionicons
            name="flame"
            size={14}
            color={filterStatus === "hot" ? Colors.white : Colors.danger}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.filterChipText,
              filterStatus === "hot" && styles.filterChipTextActive,
            ]}
          >
            Hot ({liveJobs.filter((j) => j.isHot).length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            filterStatus === "ending-soon" && styles.filterChipActive,
          ]}
          onPress={() => setFilterStatus("ending-soon")}
          activeOpacity={0.7}
        >
          <Ionicons
            name="time"
            size={14}
            color={
              filterStatus === "ending-soon" ? Colors.white : Colors.warning
            }
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.filterChipText,
              filterStatus === "ending-soon" && styles.filterChipTextActive,
            ]}
          >
            Ending Soon ({liveJobs.filter((j) => j.timeRemaining <= 6).length})
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Jobs List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredJobs.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="briefcase-outline"
              size={64}
              color={Colors.gray_400}
            />
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? "No jobs found matching your search"
                : "No live jobs available"}
            </Text>
          </View>
        ) : (
          filteredJobs.map((job, index) => (
            <LiveJobCard
              key={job._id}
              job={job}
              currencySymbol={currencySymbol}
              onBidPress={handleBidPress}
              getTimeColor={getTimeColor}
              index={index}
              navigation={navigation}
            />
          ))
        )}
      </ScrollView>

      {/* Bid Modal */}
      <Modal
        visible={bidModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setBidModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Place Your Bid</Text>
              <TouchableOpacity onPress={() => setBidModalVisible(false)}>
                <Ionicons
                  name="close-circle"
                  size={28}
                  color={Colors.gray_500}
                />
              </TouchableOpacity>
            </View>

            {selectedJob && (
              <>
                {/* Job Info */}
                <View style={styles.modalJobInfo}>
                  <Text style={styles.modalJobTitle} numberOfLines={2}>
                    {selectedJob.title}
                  </Text>
                  <View style={styles.modalJobMeta}>
                    <Text style={styles.modalJobMetaText}>
                      Budget: {currencySymbol}
                      {selectedJob.budget.toLocaleString()}
                    </Text>
                    <View style={styles.modalJobMetaDot} />
                    <Text style={styles.modalJobMetaText}>
                      {selectedJob.currentBids} bids
                    </Text>
                  </View>
                  <View style={styles.bidRangeContainer}>
                    <View style={styles.bidRangeItem}>
                      <Text style={styles.bidRangeLabel}>Lowest Bid</Text>
                      <Text style={styles.bidRangeValue}>
                        {currencySymbol}
                        {selectedJob.lowestBid.toFixed(0)}
                      </Text>
                    </View>
                    <View style={styles.bidRangeItem}>
                      <Text style={styles.bidRangeLabel}>Highest Bid</Text>
                      <Text style={styles.bidRangeValue}>
                        {currencySymbol}
                        {selectedJob.highestBid.toFixed(0)}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Bid Amount Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Your Bid Amount *</Text>
                  <View style={styles.bidInputWrapper}>
                    <Text style={styles.currencyPrefix}>{currencySymbol}</Text>
                    <TextInput
                      style={styles.bidInput}
                      placeholder="Enter amount"
                      placeholderTextColor={Colors.gray_400}
                      keyboardType="numeric"
                      value={bidAmount}
                      onChangeText={setBidAmount}
                    />
                  </View>
                </View>

                {/* Bid Description */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Cover Letter *</Text>
                  <TextInput
                    style={[styles.bidInput, styles.bidDescriptionInput]}
                    placeholder="Explain why you're the best fit for this job..."
                    placeholderTextColor={Colors.gray_400}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={bidDescription}
                    onChangeText={setBidDescription}
                  />
                </View>

                {/* Action Buttons */}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setBidModalVisible(false)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmitBid}
                    activeOpacity={0.8}
                  >
                    <View style={styles.submitButtonGradient}>
                      <Text style={styles.submitButtonText}>Submit Bid</Text>
                      <Ionicons name="arrow-forward" size={18} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  autoRefreshIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light_3,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: 6,
  },
  liveDotPulse: {
    backgroundColor: Colors.secondary_2,
  },
  autoRefreshText: {
    fontSize: 11,
    color: Colors.gray_600,
    fontWeight: "600",
  },
  refreshButton: {
    padding: 8,
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
  filterContainer: {
    marginTop: 12,
    marginHorizontal: 16,
    flexGrow: 0,
    height: 40,
  },
  filterContent: {
    paddingBottom: 4,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    // paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.gray_100,
  },
  filterChipActive: {
    backgroundColor: Colors.primary_2,
    borderColor: Colors.primary_2,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.gray_700,
  },
  filterChipTextActive: {
    color: Colors.white,
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
  },
 
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary_2,
  },
  modalJobInfo: {
    backgroundColor: Colors.light_3,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  modalJobTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary_2,
    marginBottom: 8,
  },
  modalJobMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  modalJobMetaText: {
    fontSize: 13,
    color: Colors.gray_600,
  },
  modalJobMetaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray_400,
    marginHorizontal: 8,
  },
  bidRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bidRangeItem: {
    flex: 1,
  },
  bidRangeLabel: {
    fontSize: 11,
    color: Colors.gray_500,
    marginBottom: 4,
  },
  bidRangeValue: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.primary_2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.dark,
    marginBottom: 8,
  },
  bidInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray_50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray_200,
    paddingHorizontal: 12,
  },
  currencyPrefix: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray_700,
    marginRight: 8,
  },
  bidInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.dark,
    paddingVertical: 12,
  },
  bidDescriptionInput: {
    backgroundColor: Colors.gray_50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.gray_200,
    paddingHorizontal: 12,
    minHeight: 100,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.gray_100,
    borderRadius: 10,
    paddingVertical: 14,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.gray_700,
  },
  submitButton: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.primary_2,
  },
  submitButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "700",
    marginRight: 8,
  },
});

export default LiveJobListScreen;
