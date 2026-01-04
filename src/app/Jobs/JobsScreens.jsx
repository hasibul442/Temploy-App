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
import JobCard from "../../components/Card/JobCard";
import { HeaderStyles } from "../../utils/styles/HeaderStyle";
import HeaderWithBackButton from "../../components/Header/HeaderWithBackButton";
import { CommonStyles } from "../../utils/styles/CommonStyle";

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
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      <View style={CommonStyles.container}>
        {/* Search Bar */}
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Available Jobs" />
          <View style={{ width: 40 }} />
        </View>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: 12
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
  listContainer: {
    paddingBottom: 110,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default JobsScreens;
