import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/Color";
import { Ionicons } from "@expo/vector-icons";

function CoverLetterTips() {
  return (
    <>
      {/* Tips */}
      <View style={styles.tipsCard}>
        <View style={styles.tipsHeader}>
          <Ionicons name="bulb-outline" size={18} color={Colors.secondary_2} />
          <Text style={styles.tipsTitle}>Writing Tips</Text>
        </View>
        <Text style={styles.tipText}>
          • Explain why you're a great match for this project
        </Text>
        <Text style={styles.tipText}>• Describe your relevant experience</Text>
        <Text style={styles.tipText}>• Be professional and concise</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
      tipsCard: {
    backgroundColor: Colors.basil_orange_50,
    borderRadius: 8,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: Colors.secondary_2,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.dark,
  },
  tipText: {
    fontSize: 13,
    color: Colors.gray_700,
    marginBottom: 4,
    lineHeight: 20,
  },
});

export default CoverLetterTips;
