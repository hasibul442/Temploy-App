import Details from '../../app/Details/Details';
import HomeScreen from '../../app/Home/HomeScreen';
import Menu from '../../app/Menu/Menu';
import Messages from '../../app/Message/Messages';
import Offers from '../../app/Offer/Offers';
import Orders from '../../app/Orders/Orders'
import { Colors } from '../../utils/constants/Color'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
  )
}

export function HomeStack() {
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
          title: "",
          headerStyle: { backgroundColor: Colors.primary_2 },
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
          headerStyle: { backgroundColor: Colors.primary_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
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
          headerStyle: { backgroundColor: Colors.primary_2 },
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
          headerStyle: { backgroundColor: Colors.primary_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: "bold" },
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
