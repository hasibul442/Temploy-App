import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  convertTimeStampToTimeAgo,
  stripHtmlTags,
} from "../../utils/helper/Helper";
import { Colors } from "../../utils/constants/Color";

function LiveJobCard({
  job,
  currencySymbol,
  onBidPress,
  getTimeColor,
  index,
  navigation,
}) {
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 50,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.jobCard,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      {/* Hot Badge */}
      {job.isHot && (
        <View style={styles.hotBadge}>
          <Ionicons name="flame" size={12} color="#fff" />
          <Text style={styles.hotBadgeText}>HOT</Text>
        </View>
      )}

      {/* Card Header */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OtherPages", {
            screen: "JobsDetails",
            params: { jobId: job._id },
          })
        }
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderLeft}>
            <Text style={styles.jobTitle} numberOfLines={2}>
              {job.title}
            </Text>
            <Text style={styles.postedTime}>
              {convertTimeStampToTimeAgo(job?.created_at)}
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

        {/* Job Description */}
        <Text style={styles.jobDescription} numberOfLines={2}>
          {stripHtmlTags(job.description).substring(0, 120) + "..."}
        </Text>

        {/* Job Meta */}
        <View style={styles.jobMeta}>
          <View style={styles.metaItem}>
            <Ionicons
              name="briefcase-outline"
              size={14}
              color={Colors.gray_500}
            />
            <Text style={styles.metaText}>
              {job.job_type === "fixed" ? "Fixed" : "Hourly"}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons
              name="location-outline"
              size={14}
              color={Colors.gray_500}
            />
            <Text style={styles.metaText}>{job.location.city}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="bar-chart" size={14} color={Colors.gray_500} />
            <Text style={styles.metaText}>{job.level}</Text>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.skillsContainer}>
          {job.required_skills.slice(0, 3).map((skill) => (
            <View key={skill._id} style={styles.skillTag}>
              <Text style={styles.skillText}>{skill.name}</Text>
            </View>
          ))}
          {job.required_skills.length > 3 && (
            <View style={styles.skillTag}>
              <Text style={styles.skillText}>
                +{job.required_skills.length - 3}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Live Stats Bar */}
      <View style={styles.liveStatsBar}>
        <View style={styles.liveStatItem}>
          <Ionicons name="people" size={16} color={Colors.primary_1} />
          <Text style={styles.liveStatText}>{job.currentBids} bids</Text>
        </View>

        <View style={styles.liveStatItem}>
          <Ionicons
            name="time"
            size={16}
            color={getTimeColor(job.timeRemaining)}
          />
          <Text
            style={[
              styles.liveStatText,
              { color: getTimeColor(job.timeRemaining) },
            ]}
          >
            {job.timeRemaining}h left
          </Text>
        </View>

        <View style={styles.liveStatItem}>
          <Ionicons name="flash" size={16} color={Colors.secondary_2} />
          <Text style={styles.liveStatText}>
            {currencySymbol}
            {job.lowestBid.toFixed(0)} - {currencySymbol}
            {job.highestBid.toFixed(0)}
          </Text>
        </View>
      </View>

      {/* Bid Button */}
      <TouchableOpacity
        style={styles.bidButton}
        onPress={() => onBidPress(job)}
        activeOpacity={0.8}
      >
        <View style={styles.bidButtonGradient}>
          <Ionicons name="hammer" size={18} color="#fff" />
          <Text style={styles.bidButtonText}>Place Bid</Text>
        </View>
      </TouchableOpacity>

      {/* Time Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${Math.max(10, (job.timeRemaining / 48) * 100)}%`,
              backgroundColor: getTimeColor(job.timeRemaining),
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
    overflow: "hidden",
  },
  hotBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: Colors.danger,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 10,
  },
  hotBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
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
  postedTime: {
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

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  skillTag: {
    backgroundColor: Colors.gray_100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 11,
    color: Colors.gray_700,
    fontWeight: "500",
  },
  liveStatsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.gray_100,
    marginBottom: 12,
  },
  liveStatItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  liveStatText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.gray_700,
    marginLeft: 4,
  },
  bidButton: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
    backgroundColor: Colors.primary_2,
  },
  bidButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  bidButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: Colors.gray_100,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },
});
export default LiveJobCard;
