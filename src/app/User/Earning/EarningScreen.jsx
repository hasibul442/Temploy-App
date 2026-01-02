import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "../../../utils/constants/Color";
import { CommonStyles } from "../../../utils/styles/CommonStyle";
import IncomeData from "../../../utils/data/IncomeData";
import ExpenseData from "../../../utils/data/ExpenseData";
import TransactionCard from "../../../components/Card/TransactionCard";
import HeaderWithBackButton from "../../../components/Header/HeaderWithBackButton";
import { HeaderStyles } from "../../../utils/styles/HeaderStyle";
import { useSystemNavigateSpace } from "../../../utils/helper/Helper";
import { useNavigation } from "@react-navigation/native";

function EarningScreen() {

  const incomeData = IncomeData
  const expenseData = ExpenseData

  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Balance Summary" />
          <View style={{ width: 40 }} />
        </View>
        <ScrollView
          style={CommonStyles.container_3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: useSystemNavigateSpace(60) }}
        >
          <View style={styles.headerSection}>
            <View style={styles.balanceSection}>
              <Text style={styles.balanceLabel}>Current Balance</Text>
              <Text style={styles.balanceAmount}>$ 12,345.67</Text>
            </View>
          </View>

          {/* Income/Expense Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <View
                style={[
                  styles.summaryIconContainer,
                  { backgroundColor: "#DCFCE7" },
                ]}
              >
                <FontAwesome6
                  name="arrow-down"
                  size={16}
                  color="#10B981"
                  iconStyle="solid"
                />
              </View>
              <Text style={styles.summaryLabel}>Income</Text>
              <Text style={[styles.summaryAmount, { color: "#10B981" }]}>
                $ 840.00
              </Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <View
                style={[
                  styles.summaryIconContainer,
                  { backgroundColor: "#FEE2E2" },
                ]}
              >
                <FontAwesome6
                  name="arrow-up"
                  size={16}
                  color="#EF4444"
                  iconStyle="solid"
                />
              </View>
              <Text style={styles.summaryLabel}>Withdrawals</Text>
              <Text style={[styles.summaryAmount, { color: "#EF4444" }]}>
                $ 350.00
              </Text>
              {/* <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Add Expense</Text>
              </TouchableOpacity> */}
            </View>
          </View>

          {/* Level Section */}
          <View style={styles.levelSection}>
            <View style={styles.levelHeader}>
              <View style={styles.levelLeft}>
                <View style={styles.levelIcon}>
                  <FontAwesome6
                    name="trophy"
                    size={18}
                    color="#F59E0B"
                    iconStyle="solid"
                  />
                </View>
                <View>
                  <Text style={styles.levelTitle}>Level 2</Text>
                  <Text style={styles.levelSubtitle}>Professional Tasker</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.levelContent}>
              <Text style={styles.levelLabel}>Progress to Level 3</Text>
              <Text style={styles.levelPoints}>350 / 1000 XP</Text>
            </View>
            <View style={styles.levelProgress}>
              <View style={[styles.levelProgressFill, { width: "35%" }]} />
            </View>
            <View style={styles.levelBenefits}>
              <Text style={styles.benefitsTitle}>Level Benefits:</Text>
              <View style={styles.benefitItem}>
                <FontAwesome6
                  name="check"
                  size={12}
                  color="#10B981"
                  iconStyle="solid"
                />
                <Text style={styles.benefitText}>Priority task matching</Text>
              </View>
              <View style={styles.benefitItem}>
                <FontAwesome6
                  name="check"
                  size={12}
                  color="#10B981"
                  iconStyle="solid"
                />
                <Text style={styles.benefitText}>Lower service fees</Text>
              </View>
              <View style={styles.benefitItem}>
                <FontAwesome6
                  name="check"
                  size={12}
                  color="#10B981"
                  iconStyle="solid"
                />
                <Text style={styles.benefitText}>Badge on profile</Text>
              </View>
            </View>
          </View>

          {/* Order Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Complete Orders</Text>
              <TouchableOpacity onPress={() => { navigation.navigate("OtherPages", { screen: "EarningHistory" }) }}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            {incomeData.slice(0, 5).map((item) => (
              <TransactionCard key={item.id} item={item} type="income" />
            ))}
          </View>

          {/* Withdrawal Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Withdrawal</Text>
              <TouchableOpacity onPress={() =>
                navigation.navigate("OtherPages", { screen: "WithdrawHistory" })
              }>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            {expenseData.slice(0, 5).map((item) => (
              <TransactionCard key={item.id} item={item} type="withdrawal" />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerSection: {
    backgroundColor: Colors.success_2,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  balanceSection: {
    alignItems: "center",
  },

  balanceLabel: {
    paddingTop: 20,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  summaryCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -25,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  seeAllText: {
    fontSize: 14,
    color: "#6B7280",
  },
  // Level Section Styles
  levelSection: {
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  levelLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  levelIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FEF3C7",
    justifyContent: "center",
    alignItems: "center",
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  levelSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  viewDetailsText: {
    fontSize: 14,
    color: Colors.success_2,
    fontWeight: "500",
  },
  levelContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  levelLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  levelPoints: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  levelProgress: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 16,
  },
  levelProgressFill: {
    height: "100%",
    backgroundColor: "#F59E0B",
    borderRadius: 5,
  },
  levelBenefits: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 12,
  },
  benefitsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  benefitText: {
    fontSize: 13,
    color: "#6B7280",
  },
});

export default EarningScreen;
