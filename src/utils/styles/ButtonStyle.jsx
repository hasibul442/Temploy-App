import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../constants/Color";

const { width, height } = Dimensions.get("window");

export const ButtonStyle = StyleSheet.create({
  // --- Sign In Button ---
  signInButton: {
    backgroundColor: Colors.success_2,
    borderRadius: 12,
    paddingVertical: 17,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 18,
    shadowColor: Colors.success_2,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  signInButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  // --- Sign In Button 2---
  signInButton_2: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  signInButtonText_2: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  // --- Sign Up Button ---
  signUpButton: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  signUpButtonText: {
    color: Colors.success_2,
    fontSize: 18,
    fontWeight: "bold",
  },
});
