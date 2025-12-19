
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from "react-native";
import { AntDesign, Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from "../../utils/constants/Color";

function PreferencesScreen (){
    const navigation = useNavigation();

    const menuItems = [
        { id: 1, title: "Billing & Payment", icon: <AntDesign name="transaction" size={20} color={Colors.dark} /> },
        { id: 2, title: "Notifications", icon: <Ionicons name="notifications-outline" size={20} color={Colors.dark} /> },
        { id: 3, title: "Security", icon: <Ionicons name="shield-checkmark-outline" size={20} color={Colors.dark} /> },
        { id: 4, title: "Language", icon: <Ionicons name="language-outline" size={20} color={Colors.dark} />, onPress: () => navigation.navigate("OtherPages", { screen: "LanguageSelection" }) },
        // { id: 5, title: "Appearance", icon: "color-palette-outline" },
        { id: 6, title: "Currency", icon: <Fontisto name="money-symbol" size={20} color={Colors.dark} />, onPress: () => navigation.navigate("OtherPages", { screen: "CurrencySelection" }) },
    ];

    const MenuItem = ({ item }) => (
      <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
        {/* <Text style={styles.menuText}>{item.title}</Text> */}
        <View style={styles.menuItemLeft}>
          {item?.icon}
          <Text style={styles.menuText}>{item.title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.dark} />
      </TouchableOpacity>
    );

    return (
      <SafeAreaProvider>
        <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              {menuItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary_1,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  menuText: {
    fontSize: 16,
    color: Colors.dark,
    fontWeight: "500",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2A2A",
    marginTop: 20,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#1A1A1A",
    borderTopWidth: 1,
    borderTopColor: "#2A2A2A",
  },
  navItem: {
    padding: 8,
  },
});

export default PreferencesScreen;
