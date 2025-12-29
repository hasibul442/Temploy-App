import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import JobsData from "../../utils/data/JobsData";
import { Colors } from "../../utils/constants/Color";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  convertTimeStampToTimeAgo,
  stripHtmlTags,
} from "../../utils/helper/Helper";
import { useNavigation } from "@react-navigation/native";

const FilterChip = ({ label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.filterChip, active && styles.filterChipActive]}
    onPress={onPress}
  >
    <Text
      style={[styles.filterChipText, active && styles.filterChipTextActive]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const JobCard = ({ job }) => {
  const [saved, setSaved] = useState(false);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate(
          "OtherPages", { screen: "JobsDetails", params: { jobId: job._id } }
        )
      }
    >
      {/* Posted Time & Save */}
      <View style={styles.cardTopRow}>
        <Text style={styles.postedTime}>
          {convertTimeStampToTimeAgo(job?.created_at)}
        </Text>
        <TouchableOpacity
          onPress={() => setSaved(!saved)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={saved ? "heart" : "heart-outline"}
            size={22}
            color={saved ? Colors.danger : Colors.gray_500}
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={2}>
        {job.title}
      </Text>

      {/* Job Meta */}
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          {job.job_type === "fixed" ? "Fixed-price" : "Hourly"}
        </Text>
        <Text style={styles.metaDot}>•</Text>
        <Text style={styles.metaText}>{job.duration}</Text>
        <Text style={styles.metaDot}>•</Text>
        <Text style={styles.metaText}>
          Est. Budget:{" "}
          <Text style={styles.budgetText}>$ {job.budget.toLocaleString()}</Text>
        </Text>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={4}>
        {stripHtmlTags(job.description).substring(0, 150) + "..."}
      </Text>

      {/* Skills/Tags */}
      <View style={styles.tagsContainer}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Verified</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{job.duration}</Text>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{job.status}</Text>
        </View>
      </View>

      {/* Location & Verification */}
      <View style={styles.bottomRow}>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color={Colors.gray_500} />
          <Text style={styles.locationText}>
            {job.location.city}, {job.location.country}
          </Text>
        </View>
        <View style={styles.verifiedRow}>
          <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
          <Text style={styles.verifiedText}>Payment verified</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function JobsScreens() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Best Matches");
  const jobdata = JobsData;

  const filters = ["Best Matches", "Most Recent"];

  const filteredJobs = jobdata.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={Colors.gray_500} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for jobs..."
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
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onPress={() => setActiveFilter(filter)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Job List */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredJobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.gray_800,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray_50,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.gray_100,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: Colors.gray_800,
  },
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
  },
  filtersScroll: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.gray_50,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.gray_100,
  },
  filterChipActive: {
    backgroundColor: Colors.primary_2,
    borderColor: Colors.primary_2,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: "500",
    color: Colors.gray_700,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.gray_50,
  },
  resultsText: {
    fontSize: 14,
    color: Colors.gray_600,
  },
  resultsCount: {
    fontWeight: "700",
    color: Colors.gray_800,
  },
  listContainer: {
    paddingBottom: 80,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  postedTime: {
    fontSize: 12,
    color: Colors.gray_500,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary_2,
    marginBottom: 8,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  metaText: {
    fontSize: 13,
    color: Colors.gray_600,
    textTransform: "capitalize",
  },
  metaDot: {
    marginHorizontal: 8,
    color: Colors.gray_400,
  },
  budgetText: {
    fontWeight: "600",
    color: Colors.gray_800,
  },
  description: {
    fontSize: 14,
    color: Colors.gray_600,
    lineHeight: 21,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    backgroundColor: Colors.gray_50,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    color: Colors.gray_700,
    textTransform: "capitalize",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 12,
    color: Colors.gray_500,
    marginLeft: 4,
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedText: {
    fontSize: 12,
    color: Colors.success,
    marginLeft: 4,
    fontWeight: "500",
  },
});

export default JobsScreens;
