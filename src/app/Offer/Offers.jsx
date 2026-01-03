import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/constants/Color";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { HeaderStyles } from "../../utils/styles/HeaderStyle";
import HeaderWithBackButton from "../../components/Header/HeaderWithBackButton";

// Sample promo data
const promosData = [
  {
    id: 1,
    code: "NEWHIRE50",
    category: "Jobs",
    description:
      "50% off on service fee for your first job posting (up to BDT 500). Valid for new employers only.",
    validTill: "March 31, 2026",
  },
  {
    id: 2,
    code: "FREELANCE20",
    category: "Freelancer",
    description:
      "20% discount on platform commission for your next 5 completed projects. Minimum earnings of BDT 1000 required.",
    validTill: "February 15, 2026",
  },
  {
    id: 3,
    code: "PREMIUM30",
    category: "Subscription",
    description:
      "30% off on Premium membership for 3 months. Get priority job listings, verified badge, and unlimited proposals.",
    validTill: "January 31, 2026",
  },
  {
    id: 4,
    code: "REFERRAL100",
    category: "Referral",
    description:
      "Earn BDT 100 for every friend you refer who completes their first job. No limit on referrals!",
    validTill: "December 31, 2026",
  },
  {
    id: 5,
    code: "QUICKHIRE",
    category: "Jobs",
    description:
      "Post urgent jobs with 2x visibility boost. Free for your first 3 urgent job postings.",
    validTill: "February 28, 2026",
  },
];

const PromoCard = ({ promo }) => {
  return (
    <View style={styles.promoCard}>
      <View style={styles.promoHeader}>
        <Text style={styles.promoCode}>{promo.code}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{promo.category}</Text>
        </View>
      </View>
      <Text style={styles.promoDescription}>{promo.description}</Text>
      <Text style={styles.validTill}>Valid till {promo.validTill}</Text>
    </View>
  );
};

function Offers() {
  const [activeTab, setActiveTab] = useState("promos");

  return (
    <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
      <View style={HeaderStyles.header}>
        <HeaderWithBackButton title="Offers" />
        <View style={{ width: 40 }} />
      </View>
      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionEmoji}>🎁</Text>
          <Text style={styles.sectionTitle}>Available Offers</Text>
        </View>

        {/* Promo Cards */}
        {promosData.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
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
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.dark,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.gray_400,
    backgroundColor: Colors.white,
  },
  activeTabButton: {
    backgroundColor: Colors.danger,
    borderColor: Colors.danger,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.dark,
  },
  activeTabButtonText: {
    color: Colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray_100,
    marginTop: 15,
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.light_gray,
  },
  sectionEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
  },
  promoCard: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray_100,
  },
  promoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  promoCode: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
  },
  categoryBadge: {
    backgroundColor: "#FFEBEE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.danger,
  },
  promoDescription: {
    fontSize: 14,
    color: Colors.gray_600,
    lineHeight: 20,
    marginBottom: 8,
  },
  validTill: {
    fontSize: 13,
    color: Colors.gray_500,
    marginBottom: 12,
  },
  addPromoButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  addPromoText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.danger,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.gray_500,
  },
});

export default Offers;

