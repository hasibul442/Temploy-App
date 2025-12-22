import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { Colors } from '../constants/Color';

function MenuItem({ icon, title, onPress, showChevron }) {
  return (
    <>
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {showChevron && (
        <Ionicons name="chevron-forward" size={20} color={Colors.dark} />
      )}
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_gray,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.dark,
  },
  logoutContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default MenuItem