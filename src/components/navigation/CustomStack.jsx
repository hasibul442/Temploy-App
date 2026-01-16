
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
import WithdrawDetailScreen from "../../app/User/Withdraw/WithdrawDetailScreen";
import OrderDetailScreen from "../../app/User/Order/OrderDetailScreen";
import TrainingListScreen from "../../app/User/Training/TrainingListScreen";
import TrainingDetailScreen from "../../app/User/Training/TrainingDetailScreen";
import KycScreen from "../../app/Settings/Kyc/KycScreen";
import LiveJobListScreen from "../../app/Jobs/LiveJobListScreen";
import MyJobsScreen from "../../app/Jobs/MyJobsScreen";
import WithdrawMethodScreen from "../../app/User/Withdraw/Method/WithdrawMethodScreen";
import ProfileInfoUpdateScreen from "../../app/User/Profile/ProfileInfoUpdateScreen";
import ContactInfoScreen from "../../app/Settings/Contact/ContactInfoScreen";
import SkillScreen from "../../app/Settings/Skills/SkillScreen";
import PasswordUpdateScreen from "../../app/User/Profile/PasswordUpdateScreen";

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
  return createSimpleStack("Orders", OrderHistoryScreen, getHeaderOptions("Orders", true, false));
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

export function JobListStack() {
  return createSimpleStack("Jobs", JobsScreens, getHeaderOptions("Available Jobs", false, false));
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
    { name: "Preferences", component: PreferencesScreen, header: false, page_title: "Preferences" },
    { name: "MyOffer", component: Offers, header: false, page_title: "My Offers" },
    { name: "CurrencySelection", component: CurrencyScreen, header: false, page_title: "Currency Selection" },
    { name: "LanguageSelection", component: LanguageScreen, header: false, page_title: "Language Selection" },
    { name: "AccountSettingOptions", component: AccountSettingOptionScreen, header: false, page_title: "Accounts" },
    { name: "Notification", component: NotificationScreen, header: true, page_title: "Notifications" },
    { name: "JobsList", component: JobsScreens, header: false, page_title: "Available Jobs" },
    { name: "JobsDetails", component: JobsDetailsScreen, header: false, page_title: "Job Details" },
    { name: "JobPost", component: CreateJobScreen, header: false, page_title: "Create Job" },
    { name: "LiveJobList", component: LiveJobListScreen, header: false, page_title: "Live Job List" },
    { name: "Proposal", component: SubmitProposalScreen, header: false, page_title: "Submit Proposal" },
    { name: "MyJobs", component: MyJobsScreen, header: false, page_title: "My Jobs" },
    { name: "WithdrawHistory", component: WithdrawHistoryScreen, header: false, page_title: "Withdrawals History" },
    { name: "WithdrawDetail", component: WithdrawDetailScreen, header: false, page_title: "Withdrawal Details" },
    { name: "WithdrawMethod", component: WithdrawMethodScreen, header: false, page_title: "Withdrawal Method" },
    { name: "EarningHistory", component: OrderHistoryScreen, header: false, page_title: "Earning History" },
    { name: "OrderDetails", component: OrderDetailScreen, header: false, page_title: "Earning Details" },
    { name: "TrainingList", component: TrainingListScreen, header: false, page_title: "Training List" },
    { name: "TrainingDetails", component: TrainingDetailScreen, header: false, page_title: "Training Details" },
    { name: "Kyc", component: KycScreen, header: false, page_title: "KYC" },
    { name: "ProfileInfoUpdate", component: ProfileInfoUpdateScreen, header: false, page_title: "Profile Info Update" },
    { name: "ContactInformationUpdate", component: ContactInfoScreen, header: false, page_title: "Contact Information Update" },
    { name: "PasswordUpdate", component: PasswordUpdateScreen, header: false, page_title: "Password Update" },
    { name: "Skill", component: SkillScreen, header: false, page_title: "Skills" },

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
