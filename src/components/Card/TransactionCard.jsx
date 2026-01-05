import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../utils/constants/Color'
import { CommonStyles } from '../../utils/styles/CommonStyle'

function TransactionCard({ item, type, onPress }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return CommonStyles.status_color_pending;
      case 'completed':
        return CommonStyles.status_color_completed;
      case 'canceled':
        return CommonStyles.status_color_canceled;
      case 'failed':
        return CommonStyles.status_color_failed;
      default:
        return {};
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.transactionItem} onPress={onPress}>
        <View style={styles.transactionLeft}>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>
              {item.title.length > 40
                ? item.title.substring(0, 40) + "..."
                : item.title}
            </Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
            <Text style={[styles.transactionStatus, getStatusStyle(item.status)]}>{item.status}</Text>
          </View>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: type === "income" ? "#10B981" : "#EF4444" },
            ]}
          >
            {type === "income" ? "+" : "-"}${item.amount}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  transactionInfo: {
    gap: 4,
  },
  transactionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1F2937",
  },
  transactionDate: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  transactionStatus: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  transactionRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default TransactionCard