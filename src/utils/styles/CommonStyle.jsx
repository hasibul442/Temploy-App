import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../constants/Color";

const { width, height } = Dimensions.get("window");

export const CommonStyles = StyleSheet.create({
  title_16_bold: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
  },
  text_12_regular: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.gray_2,
  },
  text_14_regular: {
    fontSize: 14,
    color: Colors.gray_2,
  },

  button_text_12: {
    color: Colors.primary_2,
    fontSize: 12,
    fontWeight: "600",
  },
  // --- Decorative Circles ---

  circleTopLeft: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ffffff1a",
    top: -50,
    left: -50,
    zIndex: 0,
  },
  circleTopRight: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ffffff1a",
    top: 50,
    right: -20,
    zIndex: 0,
  },
  circleMidRight: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#d32f2f4d",
    top: height * 0.4,
    right: -60,
    zIndex: 0,
  },

  circleBottomRight: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ffffff1a",
    bottom: -80,
    right: -80,
    zIndex: 0,
  },

  // Common Containers
  safeArea: {
    flex: 1,
    backgroundColor: Colors.success_2,
    overflow: "hidden",
  },

  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  container_2: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  container_3: {
    flex: 1,
    backgroundColor: Colors.gray_50,
  },

  scrollContent: {
    flex: 1,
  },

  header_1: {
    marginBottom: 24,
  },

  headerTitle_1: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    backgroundColor: Colors.success_2,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  introText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 10,
  },

  scrollView: {
    flex: 1,
  },

  title_dark_20: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.dark,
    lineHeight: 30,
    marginBottom: 16,
  },

  form_label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.gray_800,
    marginBottom: 8,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.gray_100,
    marginVertical: 20,
  },
});
