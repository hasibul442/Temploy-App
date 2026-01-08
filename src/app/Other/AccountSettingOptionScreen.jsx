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

function AccountSettingOptionScreen() {
  const navigation = useNavigation();
  const menuItems = [
    {
      id: 1,
      title: "Profile Info Update",
      icon: <AntDesign name="transaction" size={20} color={Colors.dark} />,
    },
    {
      id: 2,
      title: "Skills",
      icon: (
        <Ionicons name="notifications-outline" size={20} color={Colors.dark} />
      ),
    },
    {
      id: 3,
      title: "Contact Info",
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
      title: "KYC Verification",
      icon: <Ionicons name="language-outline" size={20} color={Colors.dark} />,
      onPress: () => navigation.navigate("OtherPages", { screen: "Kyc" }),
    },
    // { id: 5, title: "Appearance", icon: "color-palette-outline" },
    {
      id: 6,
      title: "Tax Information",
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
      title: "Password & Security",
      icon: (
        <MaterialCommunityIcons
          name="cash-edit"
          size={20}
          color={Colors.dark}
        />
      ),
    },
    {
      id: 8,
      title: "Withdrawals",
      icon: (
        <MaterialCommunityIcons
          name="cash-edit"
          size={20}
          color={Colors.dark}
        />
      ),
    },
    {
      id: 9,
      title: "Account Deletion",
      icon: <Fontisto name="money-symbol" size={20} color={Colors.dark} />,
    },
  ];

  return (
    <>
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
