import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../utils/constants/Color";
import { useNavigation } from "@react-navigation/native";

function CategoryButton({ item }) {
  const navigation = useNavigation();
  return (
    <View style={styles.category_buttons}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { itemId: item.id })}
        style={styles.category_button_item}
      >
        <Image
          source={{
            uri: item?.icon_png_active,
          }}
          style={styles.tinyLogo}
          alt={item?.name}
          resizeMode="contain"
          onLoad={() => console.log(`${item?.icon_png_active} image loaded`)}
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
    backgroundColor: Colors.light_gray_2,
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
    tinyLogo: {
    width: 50,
    height: 50,
  },
});
export default CategoryButton;
