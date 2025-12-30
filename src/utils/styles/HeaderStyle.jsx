import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../constants/Color";

const { width, height } = Dimensions.get("window");

export const HeaderStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.success_2,
  },
});
