import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import React, { useMemo, useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../utils/constants/Color";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function CategoryButton({ item }) {

  return (
          <View style={styles.category_buttons}>
            <TouchableOpacity
              onPress={() => alert(`Pressed ${item.name}`)}
              style={styles.category_button_item}
            >
              {/* <FontAwesome6
                name={item.icon}
                size={26}
                color={Colors.primary_2}
                iconStyle={item.style}
              /> */}
              <FontAwesome6
                name="hammer"
                size={26}
                color={Colors.primary_2}
                iconStyle="solid"
              />
            </TouchableOpacity>
            <Text style={styles.category_button_item_text}>{item.name}</Text>
          </View>
  );
}

const styles = StyleSheet.create({
  category_buttons: {
    flexBasis: "22%",
    alignItems: "center",
    marginBottom: 15,
  },

  category_button_item: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    backgroundColor: Colors.light_3,
    justifyContent: "center",
    alignItems: "center",
  },

  category_button_item_text: {
    color: Colors.dark,
    marginTop: 5,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    height: "70%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CategoryButton;
