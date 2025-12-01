import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/navigation/Navigatior";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { Platform } from "react-native";
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store/store';

function AppNavigator() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  return (
    <NavigationContainer key={isAuthenticated ? 'authenticated' : 'unauthenticated'}>
      <Navigator />
    </NavigationContainer>
  );
}

export default function App() {
  const AppContent = (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );

  // Only use AlertNotificationRoot on native platforms (iOS/Android)
  if (Platform.OS === 'web') {
    return AppContent;
  }

  return (
    <AlertNotificationRoot>
      {AppContent}
    </AlertNotificationRoot>
  );
}
