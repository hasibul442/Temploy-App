import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/navigation/Navigatior";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { AlertNotificationRoot } from "react-native-alert-notification";

export default function App() {
  return (
    <SafeAreaProvider>
        <PaperProvider>
      <AlertNotificationRoot>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
      </AlertNotificationRoot>
        </PaperProvider>
    </SafeAreaProvider>
  );
}
