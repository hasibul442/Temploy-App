import {
  View,
  ScrollView,
} from "react-native";
import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/constants/Color";
import MenuItem from "../../utils/helper/MenuItem";

function PreferencesScreen() {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 1,
      title: "Billing & Payment",
      icon: <AntDesign name="transaction" size={20} color={Colors.dark} />,
    },
    {
      id: 2,
      title: "Notifications",
      icon: (
        <Ionicons name="notifications-outline" size={20} color={Colors.dark} />
      ),
    },
    {
      id: 3,
      title: "Security",
      icon: (
        <Ionicons
          name="shield-checkmark-outline"
          size={20}
          color={Colors.dark}
        />
      ),
    },
    {
      id: 4,
      title: "Language",
      icon: <Ionicons name="language-outline" size={20} color={Colors.dark} />,
      onPress: () =>
        navigation.navigate("OtherPages", { screen: "LanguageSelection" }),
    },
    {
      id: 6,
      title: "Currency",
      icon: <Fontisto name="money-symbol" size={20} color={Colors.dark} />,
      onPress: () =>
        navigation.navigate("OtherPages", { screen: "CurrencySelection" }),
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
        <ScrollView
          style={CommonStyles.container}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                onPress={item.onPress}
                showChevron={true}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default PreferencesScreen;
