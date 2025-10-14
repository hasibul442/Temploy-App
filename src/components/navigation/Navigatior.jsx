 import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
 import { Ionicons } from "@expo/vector-icons";
 import { useSafeAreaInsets } from "react-native-safe-area-context";
 
 // Screens
 import { Colors } from "../../utils/constants/Color";
 import { OrderStack, HomeStack, MessageStack, OfferStack, MenuStack } from "./CustomStack";
 
 // Navigators
 const Tab = createBottomTabNavigator();
 
 // Bottom Tab Navigator component
 export default function Navigator() {
   const insets = useSafeAreaInsets();
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
         tabBarStyle: {
           height: 60,
           position: "absolute",
           bottom: 10 + insets.bottom,
 
           borderRadius: 16,
           backgroundColor: Colors.light_blue,
           overflow: "hidden",
           paddingBottom: 0,
           paddingTop: 2,
           paddingRight: 0,
           paddingLeft: 0,
           marginRight: 10,
           marginLeft: 10,
           right: 1,
           left: 1,
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
           }
 
           return (
             <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />
           );
         },
       })}
     >
       <Tab.Screen
         name="Message"
         component={MessageStack}
       />
       <Tab.Screen name="Offer" component={OfferStack} />
       <Tab.Screen
         name="Home"
         component={HomeStack}
         options={{ title: "Home" }}
       />
       <Tab.Screen
         name="Orders"
         component={OrderStack}
         options={{ title: "Orders" }}
       />
       <Tab.Screen name="Menu" component={MenuStack} />
     </Tab.Navigator>
   );
 }
