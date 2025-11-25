 import { useNavigation } from "@react-navigation/native";
 import React from "react";
 import { Text } from "react-native";
 import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
 
 function MessageDetails({ route }) {
   const navigation = useNavigation();
   const { item } = route.params || {};
   return (
     <>
       <SafeAreaProvider>
         <SafeAreaView
           edges={["top"]}
           style={{ flex: 1, backgroundColor: "white" }}
         >
           <Text style={{ padding: 20 }}>
             Message Details Screen - {item?.sender}
           </Text>
         </SafeAreaView>
       </SafeAreaProvider>
     </>
   );
 }
 
 export default MessageDetails;
