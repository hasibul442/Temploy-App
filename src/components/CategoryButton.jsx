import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../utils/constants/Color";

function CategoryButton({ item }) {

  return (
          <View style={styles.category_buttons}>
            <TouchableOpacity
              onPress={() => alert(`Pressed ${item?.name}`)}
              style={styles.category_button_item}
            >
              <Image source={{
                uri: item?.icon_png_active,
              }}
              style={{ 
                width: 40, 
                height: 40 
              }}
              alt={item?.name}
               />
            </TouchableOpacity>
            <Text style={styles.category_button_item_text}>{item?.name}</Text>
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
    fontSize: 10,
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
