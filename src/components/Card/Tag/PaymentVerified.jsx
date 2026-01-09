import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../../utils/constants/Color'
import { Ionicons } from "@expo/vector-icons";

function PaymentVerified({ iconSize, textSize }) {
  return (
    <>
      <View style={styles.verifiedBadge}>
        <Ionicons
          name="checkmark-circle"
          size={iconSize}
          color={Colors.success}
        />
        <Text style={[styles.verifiedText, { fontSize: textSize }]}>Payment Verified</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedText: {
    color: Colors.success,
    fontWeight: "500",
    marginLeft: 4,
  },
});
export default PaymentVerified