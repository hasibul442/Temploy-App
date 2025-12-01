import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

// Screens
import { Colors } from "../../utils/constants/Color";
import {
  OrderStack,
  HomeStack,
  MessageStack,
  OfferStack,
  MenuStack,
  ProfileStack,
  AuthStack
} from "./CustomStack";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { checkAuthStatus } from '../../slices/authSlice';
import LoadingScreen from '../LoadingScreen';

// Navigators
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator component
export default function Navigator() {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Check auth status on app mount
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  // Debug log to track auth state changes
  useEffect(() => {
    console.log('Navigator - Auth state changed:', { isAuthenticated, isLoading });
  }, [isAuthenticated, isLoading]);

  // Show loading screen while checking authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated, show only public Auth screens
  if (!isAuthenticated) {
    return <AuthStack key="auth-stack" />;
  }

  // If authenticated, show private app tabs
  // const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.basil_orange_800,
        tabBarInactiveTintColor: Colors.green_pakistan,
        // tabBarActiveBackgroundColor: Colors.primary_2,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: "timing",
            config: { duration: 250 },
          },
        },
        tabBarBackground: () => (
          <BlurView
            tint="systemMaterialLight"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarStyle: {
          height: 60,
          position: "absolute",
          // backgroundColor: "rgba(202, 220, 252, 0.93)",
          overflow: "hidden",
          paddingBottom: 0,
          paddingTop: 2,
          paddingRight: 0,
          paddingLeft: 0,
          elevation: 5,
          border: 0,
        },
        tabBarLabelStyle: {
          margin: -2,
          fontSize: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
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
          } else {
            iconName = none;
          }

          return (
            <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: "Home" }}
      />
      <Tab.Screen name="Offer" component={OfferStack} />

      <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={{ title: "Orders" }}
      />
      <Tab.Screen name="Message" component={MessageStack} />
      <Tab.Screen name="Menu" component={MenuStack} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: 'none' }
        }}
      />
    </Tab.Navigator>
  );
}
