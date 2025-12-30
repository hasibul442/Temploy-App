import React from "react";
import { Colors } from "../../utils/constants/Color";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
function TermCard({text}) {
  return (
    <>
      <View style={styles.termsNotice}>
        <Ionicons
          name="shield-checkmark-outline"
          size={22}
          color={Colors.primary_1}
        />
        <Text style={styles.termsText}>{text}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
      termsNotice: {
        flexDirection: "row",
        gap: 12,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 8,
        backgroundColor: Colors.light_3,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.primary_1,
      },
      termsText: {
        flex: 1,
        fontSize: 13,
        color: Colors.gray_700,
        lineHeight: 20,
      },
});

export default TermCard;
