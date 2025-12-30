import React from "react";
import { Colors } from "../../../utils/constants/Color";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

function SkillTag({ skill }) {
  return (
    <>
      <View style={styles.skillTag}>
        <Text style={styles.skillText}>{skill}</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  skillTag: {
    backgroundColor: Colors.primary_1 + "20",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  skillText: {
    fontSize: 13,
    color: Colors.primary_2,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});

export default SkillTag;
