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
import { useTranslation } from "react-i18next";
import { HeaderStyles } from "../../utils/styles/HeaderStyle";
import HeaderWithBackButton from "../../components/Header/HeaderWithBackButton";

function PreferencesScreen() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const menuItems = [
    {
      id: 1,
      title: t("menu_names.billing_and_plans"),
      icon: <AntDesign name="transaction" size={20} color={Colors.dark} />,
    },
    {
      id: 2,
      title: t("menu_names.notifications"),
      icon: (
        <Ionicons name="notifications-outline" size={20} color={Colors.dark} />
      ),
    },
    {
      id: 3,
      title: t("menu_names.security"),
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
      title: t("menu_names.language"),
      icon: <Ionicons name="language-outline" size={20} color={Colors.dark} />,
      onPress: () =>
        navigation.navigate("OtherPages", { screen: "LanguageSelection" }),
    },
    {
      id: 6,
      title: t("menu_names.currency"),
      icon: <Fontisto name="money-symbol" size={20} color={Colors.dark} />,
      onPress: () =>
        navigation.navigate("OtherPages", { screen: "CurrencySelection" }),
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title={t("Pages_Title.preferences")} />
          <View style={{ width: 40 }} />
        </View>
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
