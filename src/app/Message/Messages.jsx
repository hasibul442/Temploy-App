 import {
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
 } from "react-native";
 import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
 import { Colors } from "../../utils/constants/Color";
 import MessageData from "../../utils/data/MessageData";
 import { useNavigation } from "@react-navigation/native";
 
 function Messages() {
   const data = MessageData;
   const navigation = useNavigation();
 
   // Sort by last message time
   data.sort(
     (a, b) => new Date(b.last_message_time) - new Date(a.last_message_time)
   );
 
   return (
     <SafeAreaProvider
       style={{ flex: 1, backgroundColor: Colors.white, paddingBottom: 60 }}
     >
       <SafeAreaView style={style.messagescreen_container} edges={["top"]}>
         <ScrollView>
           <View style={style.messages_block}>
             {data.map((item) => (
               <View key={item.id} style={style.message_item}>
                 <View
                   style={{
                     width: 48,
                     height: 48,
                     borderRadius: 24,
                     backgroundColor: Colors.primary_1,
                     justifyContent: "center",
                     alignItems: "center",
                     marginRight: 12,
                   }}
                 >
                   <Text style={{ fontWeight: "600", color: Colors.primary_2 }}>
                     {(item?.name || item?.sender || "U")
                       .slice(0, 2)
                       .toUpperCase()}
                   </Text>
                 </View>
 
                 <TouchableOpacity
                   style={{ flex: 1 }}
                   onPress={() => navigation.navigate("MessageDetails", { item : item })}
                 >
                   <View
                     style={{
                       flexDirection: "row",
                       justifyContent: "space-between",
                       marginBottom: 4,
                     }}
                   >
                     <Text
                       style={{
                         fontWeight: "700",
                         fontSize: 16,
                         color: Colors.dark,
                         maxWidth: "70%",
                       }}
                       numberOfLines={1}
                     >
                       {item?.sender || "User Name"}
                     </Text>
                     <Text style={{ fontSize: 12, color: Colors.gray }}>
                       {
                         new Date(item?.last_message_time)
                           .toISOString()
                           .split("T")[0]
                       }
                     </Text>
                   </View>
                   <Text
                     style={{ fontSize: 13, color: Colors.grayDark }}
                     numberOfLines={1}
                   >
                     {item?.messages[item?.messages?.length - 1]?.text}
                   </Text>
                 </TouchableOpacity>
 
                 {item?.unread || item?.unreadCount ? (
                   <View
                     style={{
                       minWidth: 22,
                       paddingHorizontal: 6,
                       height: 22,
                       borderRadius: 11,
                       backgroundColor: Colors.primary_1,
                       justifyContent: "center",
                       alignItems: "center",
                       marginLeft: 8,
                     }}
                   >
                     <Text
                       style={{
                         color: "#fff",
                         fontSize: 12,
                         fontWeight: "600",
                       }}
                     >
                       {item?.unread || item?.unreadCount}
                     </Text>
                   </View>
                 ) : null}
               </View>
             ))}
           </View>
         </ScrollView>
       </SafeAreaView>
     </SafeAreaProvider>
   );
 }
 
 const style = StyleSheet.create({
   messagescreen_container: {
     flex: 1,
     backgroundColor: Colors.light,
     paddingHorizontal: 10,
   },
   messages_block: {
     marginTop: 10,
   },
   message_item: {
     flexDirection: "row",
     alignItems: "center",
     paddingVertical: 12,
     paddingHorizontal: 10,
     backgroundColor: Colors.light,
     // shadowColor: "#000",
     // shadowOpacity: 0.05,
     // shadowOffset: { width: 0, height: 2 },
     // shadowRadius: 4,
     // elevation: 2,
     marginBottom: 10,
     borderBottomWidth: 1,
     borderBottomColor: Colors.primary_1,
   },
 });
 export default Messages;
