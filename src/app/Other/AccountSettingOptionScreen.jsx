import {
  View,
  ScrollView,
} from "react-native";
import {
  AntDesign,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { Colors } from "../../utils/constants/Color";
import MenuItem from "../../utils/helper/MenuItem";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { HeaderStyles } from "../../utils/styles/HeaderStyle";
import HeaderWithBackButton from "../../components/Header/HeaderWithBackButton";

function AccountSettingOptionScreen() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const menuItems = [
    {
      id: 1,
      title: t("menu_names.profile_info_update"),
      icon: <AntDesign name="transaction" size={20} color={Colors.dark} />,
      onPress: () => navigation.navigate("OtherPages", { screen: "ProfileInfoUpdate" }),
    },
    {
      id: 2,
      title: t("menu_names.skills"),
      icon: (
        <Ionicons name="notifications-outline" size={20} color={Colors.dark} />
      ),
      onPress: () => navigation.navigate("OtherPages", { screen: "Skill" }),
    },
    {
      id: 3,
      title: t("menu_names.contact_information"),
      icon: (
        <Ionicons
          name="shield-checkmark-outline"
          size={20}
          color={Colors.dark}
        />
      ),
      onPress: () => navigation.navigate("OtherPages", { screen: "ContactInformationUpdate" }),
    },
    {
      id: 4,
      title: t("menu_names.kyc_verification"),
      icon: <Ionicons name="language-outline" size={20} color={Colors.dark} />,
      onPress: () => navigation.navigate("OtherPages", { screen: "Kyc" }),
    },
    // { id: 5, title: "Appearance", icon: "color-palette-outline" },
    {
      id: 6,
      title: t("menu_names.tax_information"),
      icon: (
        <MaterialCommunityIcons
          name="cash-edit"
          size={20}
          color={Colors.dark}
        />
      ),
    },
    {
      id: 7,
      title: t("menu_names.password_and_security"),
      icon: (
        <MaterialCommunityIcons
          name="cash-edit"
          size={20}
          color={Colors.dark}
        />
      ),
      onPress: () => navigation.navigate("OtherPages", { screen: "PasswordUpdate" }),
    },
    {
      id: 8,
      title: t("menu_names.withdrawals_method"),
      icon: (
        <MaterialCommunityIcons
          name="cash-edit"
          size={20}
          color={Colors.dark}
        />
      ),
      onPress: () => navigation.navigate("OtherPages", { screen: "WithdrawMethod" }),
    },
    {
      id: 9,
      title: t("menu_names.account_deletion"),
      icon: <Fontisto name="money-symbol" size={20} color={Colors.dark} />,
    },
  ];

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
          <View style={HeaderStyles.header}>
            <HeaderWithBackButton title={t("Pages_Title.accounts")} />
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
                  onPress={item?.onPress}
                  showChevron={true}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

export default AccountSettingOptionScreen;
