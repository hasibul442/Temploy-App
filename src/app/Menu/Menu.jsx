import { ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Menu() {
 return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <ScrollView>
            <Text>Menu Screen</Text>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );

}

export default Menu
