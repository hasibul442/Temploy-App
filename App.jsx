import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./src/components/navigation/Navigatior";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
