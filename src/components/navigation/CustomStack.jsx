
import ForgetPasswordScreen from "../../app/Auth/ForgetPasswordScreen";
import LoginScreen from "../../app/Auth/LoginScreen";
import OTPScreen from "../../app/Auth/OTPScreen";
import SignupScreen from "../../app/Auth/SignupScreen";
import Details from "../../app/Details/Details";
import HomeScreen from "../../app/Home/HomeScreen";
import MenuScreen from "../../app/Menu/MenuScreen";
import MessageDetails from "../../app/Message/MessageDetails";
import Messages from "../../app/Message/Messages";
import Offers from "../../app/Offer/Offers";
import Orders from "../../app/Orders/Orders";
import AccountSettingOptionScreen from "../../app/Other/AccountSettingOptionScreen";
import FAQScreen from "../../app/Other/FAQScreen";
import PreferencesScreen from "../../app/Other/PreferencesScreen";
import PrivacyPolicyScreen from "../../app/Other/PrivacyPolicyScreen";
import TermsOfServiceScreen from "../../app/Other/TermsOfServiceScreen";
import CurrencyScreen from "../../app/Settings/CurrencyScreen";
import LanguageScreen from "../../app/Settings/LanguageScreen";
import EarningScreen from "../../app/User/Earning/EarningScreen";
import NotificationScreen from "../../app/User/NotificationScreen";
import ProfileScreen from "../../app/User/Profile/ProfileScreen";
import WelcomeScreen from "../../app/WelcomeScreen";
import JobsDetailsScreen from "../../app/Jobs/JobsDetailsScreen";
import JobsScreens from "../../app/Jobs/JobsScreens";
import { Colors } from "../../utils/constants/Color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SubmitProposalScreen from "../../app/User/Proposal/SubmitProposalScreen";
import WithdrawHistoryScreen from "../../app/User/Withdraw/WithdrawHistoryScreen";
import OrderHistoryScreen from "../../app/User/Order/OrderHistoryScreen";
import CreateJobScreen from "../../app/Jobs/CreateJobScreen";

const Stack = createNativeStackNavigator();

// Common header options
const getHeaderOptions = (title, showBack, header_shown) => ({
  title,
  headerShown: header_shown,
  headerStyle: { backgroundColor: Colors.success_2 },
  headerTintColor: Colors.white,
  headerTitleStyle: { fontWeight: "bold" },
  headerBackVisible: showBack,
});

// Generic stack creator for simple single-screen stacks
const createSimpleStack = (screenName, component, headerOptions) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenName}
        component={component}
        options={headerOptions}
      />
    </Stack.Navigator>
  );
};

export function OrderStack() {
  return createSimpleStack("Orders", Orders, getHeaderOptions("Orders", true, false));
}

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={getHeaderOptions("Home", false, false)}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={getHeaderOptions("", false, true)}
      />
    </Stack.Navigator>
  );
}

export function MessageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={getHeaderOptions("Inbox", false, true)}
      />
      <Stack.Screen
        name="MessageDetails"
        component={MessageDetails}
        options={({ route }) => ({
          ...getHeaderOptions(route.params?.item?.sender ?? "Temploy", true, true),
        })}
      />
    </Stack.Navigator>
  );
}

export function OfferStack() {
  return createSimpleStack("Offers", Offers, getHeaderOptions("Offers", false, false));
}

export function MenuStack() {
  return createSimpleStack("MenuTab", MenuScreen, getHeaderOptions("Menu", true, false));
}

export function ProfileStack() {
  return createSimpleStack("Profile", ProfileScreen, { headerShown: false });
}

export function AuthStack() {
  const authScreens = [
    { name: "Welcome", component: WelcomeScreen },
    { name: "Login", component: LoginScreen },
    { name: "Signup", component: SignupScreen },
    { name: "ForgetPassword", component: ForgetPasswordScreen },
    { name: "OTPScreen", component: OTPScreen },
  ];

  return (
    <Stack.Navigator initialRouteName="Welcome">
      {authScreens.map(({ name, component }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
}

export function OtherStack() {
  const screens = [
    { name: "FAQ", component: FAQScreen, header: false, page_title: "FAQ" },
    { name: "Privacy", component: PrivacyPolicyScreen, header: false, page_title: "Privacy Policy" },
    { name: "Terms", component: TermsOfServiceScreen, header: false, page_title: "Terms of Service" },
    { name: "Earning", component: EarningScreen, header: false, page_title: "Earning" },
    { name: "Preferences", component: PreferencesScreen, header: true, page_title: "Preferences" },
    { name: "CurrencySelection", component: CurrencyScreen, header: false, page_title: "Currency Selection" },
    { name: "LanguageSelection", component: LanguageScreen, header: false, page_title: "Language Selection" },
    { name: "AccountSettingOptions", component: AccountSettingOptionScreen, header: true, page_title: "Accounts" },
    { name: "Notification", component: NotificationScreen, header: true, page_title: "Notifications" },
    { name: "Jobs", component: JobsScreens, header: false, page_title: "Available Jobs" },
    { name: "JobsDetails", component: JobsDetailsScreen, header: false, page_title: "Job Details" },
    { name: "JobPost", component: CreateJobScreen, header: false, page_title: "Create Job" },
    { name: "Proposal", component: SubmitProposalScreen, header: false, page_title: "Submit Proposal" },
    { name: "WithdrawHistory", component: WithdrawHistoryScreen, header: false, page_title: "Withdrawals History" },
    { name: "EarningHistory", component: OrderHistoryScreen, header: false, page_title: "Earning History" }

  ];


  return (
    <Stack.Navigator>
      {screens.map(({ name, component, header, page_title }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{
            headerShown: header,
            ...(header ? getHeaderOptions(page_title, true, true) : {})
          }}
        />
      ))}
    </Stack.Navigator>
  );
}
