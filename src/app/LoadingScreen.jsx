import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "../utils/constants/Color";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={80} color={Colors.white} />
      {/* <Text style={styles.text}>Loading...</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.success,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.white,
  },
});
