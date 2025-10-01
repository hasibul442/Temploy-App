import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/app/Home/HomeScreen';
import Details from './src/app/Details/Details';
import { Colors } from './src/utils/constants/Color';

const Stack = createNativeStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator 
    initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ 
          title: 'Home' ,
          headerStyle: { backgroundColor: Colors.primary_2 },
          headerTintColor: Colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false
        }}
      />
      <Stack.Screen name="Details" component={Details} options={{ 
          title: 'Details' ,
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackVisible: false
        }}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}