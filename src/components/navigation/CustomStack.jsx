import ForgetPasswordScreen from "../../app/Auth/ForgetPasswordScreen";
import LoginScreen from "../../app/Auth/LoginScreen";
import OTPScreen from "../../app/Auth/OTPScreen";
import SignupScreen from "../../app/Auth/SignupScreen";
import Details from "../../app/Details/Details";
import HomeScreen from "../../app/Home/HomeScreen";
import Menu from "../../app/Menu/Menu";
import MessageDetails from "../../app/Message/MessageDetails";
import Messages from "../../app/Message/Messages";
import Offers from "../../app/Offer/Offers";
import Orders from "../../app/Orders/Orders";
import Profile from "../../app/User/Profile/Profile";
import WelcomeScreen from "../../app/WelcomeScreen";
import { Colors } from "../../utils/constants/Color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function OrderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          title: "Orders",
          headerStyle: { backgroundColor: Colors.primary_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerStyle: { backgroundColor: Colors.success_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: "",
          headerStyle: { backgroundColor: Colors.success_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
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
        options={{
          title: "Inbox",
          headerStyle: { backgroundColor: Colors.success_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="MessageDetails"
        component={MessageDetails}
        options={({ route }) => ({
          title: route.params?.item?.sender ?? "Temploy",
          headerStyle: { backgroundColor: Colors.success_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: true,
        })}
      />
    </Stack.Navigator>
  );
}

export function OfferStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Offers"
        component={Offers}
        options={{
          title: "Offers",
          headerStyle: { backgroundColor: Colors.success_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          title: "Menu",
          headerStyle: { backgroundColor: Colors.success_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPasswordScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
