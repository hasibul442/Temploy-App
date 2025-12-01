// Example LogoutButton component to use in Profile or Menu screens
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";

export default function LogoutButton() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      console.log('Logout button clicked - dispatching logout action...');
      await dispatch(logoutUser()).unwrap();
      console.log('Logout successful - isAuthenticated should now be false');
      // Navigation will happen automatically when isAuthenticated becomes false
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
