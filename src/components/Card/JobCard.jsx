import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { convertTimeStampToTimeAgo, stripHtmlTags, getCurrencySymbol } from "../../utils/helper/Helper";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/constants/Color";
import PaymentVerified from "./Tag/PaymentVerified";
import Badge from "./Tag/Badge";

function JobCard({ job }) {
  const [saved, setSaved] = useState(false);
  const navigation = useNavigation();
  
  const [currencySymbol, setCurrencySymbol] = useState('$');
  useEffect(() => {
    getCurrencySymbol().then(setCurrencySymbol);
  }, []);

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("OtherPages", {
            screen: "JobsDetails",
            params: { jobId: job._id },
          })
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
            <Text style={styles.budgetText}>
              {currencySymbol} {job.budget.toLocaleString()}
            </Text>
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={4}>
          {stripHtmlTags(job.description).substring(0, 150) + "..."}
        </Text>

        {/* Skills/Tags */}
        <View style={styles.tagsContainer}>
          <Badge text="Verified" fontSize={12} backgroundColor={Colors.gray_50} color={Colors.gray_700} />
          <Badge text={job.duration} fontSize={12} backgroundColor={Colors.gray_50} color={Colors.gray_700} />
          <Badge text={job.status} fontSize={12} backgroundColor={Colors.gray_50} color={Colors.gray_700} />
        </View>

        {/* Location & Verification */}
        <View style={styles.bottomRow}>
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={Colors.gray_500}
            />
            <Text style={styles.locationText}>
              {job.location.city}, {job.location.country}
            </Text>
          </View>
          <PaymentVerified iconSize={14} textSize={12} />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
});

export default JobCard;
