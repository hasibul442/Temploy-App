import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../utils/constants/Color";
import { getLevelColor, getStatusColor, getStatusText } from "../utils/helper/Helper";

function StatusBadge({status = null, level = null}) {
  return (
    <>
      <View
        style={[
          styles.statusBadge,
          status != null && { backgroundColor: getStatusColor(status) },
          level != null && { borderColor: getLevelColor(level), borderWidth: 1 },
        ]}
      >
        <Text style={[
            styles.statusText, 
            level != null &&  { 
                color: getLevelColor(level) 

            }]}>
                {status != null && getStatusText(status)}
                {level != null && level}
                </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default StatusBadge;
