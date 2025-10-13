import { ScrollView, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Orders() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          <ScrollView>
            <Text>Orders Screen</Text>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

export default Orders;
