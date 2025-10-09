import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Screens
import { View, Text } from "react-native";
import { Colors } from "../../utils/constants/Color";
import HomeScreen from "../../app/Home/HomeScreen";
import Details from "../../app/Details/Details";

// Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack inside Tab
function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          headerStyle: { backgroundColor: Colors.primary_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: "Details",
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

// Placeholder for other tabs
function Placeholder({ name }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>⚙️ {name} Screen</Text>
    </View>
  );
}

// Bottom Tab Navigator component
export default function Navigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary_2,
        tabBarInactiveTintColor: "gray",
        // tabBarActiveBackgroundColor: Colors.primary_2,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: "timing",
            config: { duration: 250 },
          },
        },
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 10 + insets.bottom,
 
          borderRadius: 16,
          // backgroundColor: Colors.white,
          overflow: "hidden",
          paddingBottom: 0,
          paddingTop: 2,
          paddingRight: 0,
          paddingLeft: 0,
          marginRight: 10,
          marginLeft: 10,
          
        },
        tabBarLabelStyle: {
          margin: -2,
          fontSize: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "Settings") {
            iconName = "settings";
          } else if (route.name === "Orders") {
            iconName = "reader-outline";
          } else if (route.name === "Menu") {
            iconName = "grid-outline";
          } else if (route.name === "Message") {
            iconName = "mail-unread-outline";
          } else if (route.name === "Offer") {
            iconName = "pricetag";
          }

          return (
            <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Message"
        component={() => <Placeholder name="Message" />}
      />
      <Tab.Screen name="Offer" component={() => <Placeholder name="Offer" />} />
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Orders"
        component={() => <Placeholder name="Orders" />}
      />
      <Tab.Screen name="Menu" component={() => <Placeholder name="Menu" />} />
    </Tab.Navigator>
  );
}
