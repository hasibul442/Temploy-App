import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/navigation/Navigatior";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { Platform } from "react-native";

export default function App() {
  const AppContent = (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
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
