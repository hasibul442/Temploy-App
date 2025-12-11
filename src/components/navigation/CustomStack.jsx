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
import ProfileScreen from "../../app/User/Profile/ProfileScreen";
import WelcomeScreen from "../../app/WelcomeScreen";
import { Colors } from "../../utils/constants/Color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
        options={getHeaderOptions("Home", false, true)}
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
  return createSimpleStack("Offers", Offers, getHeaderOptions("Offers", true, false));
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
