import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
    StatusBar,
    ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from "../../utils/constants/Color";

const PreferencesScreen = () => {
    const navigation = useNavigation();
    const [onlineStatus, setOnlineStatus] = useState(false);

    const menuItems = [
        { id: 1, title: "Notifications", icon: "notifications-outline" },
        { id: 2, title: "Security", icon: "shield-checkmark-outline" },
        { id: 3, title: "Language", icon: "language-outline", onPress: () => navigation.navigate("OtherPages", { screen: "LanguageSelection" }) },
        { id: 4, title: "Appearance", icon: "color-palette-outline" },
        { id: 5, title: "Briefs", icon: "document-text-outline" },
        { id: 6, title: "Currency", icon: "cash-outline", onPress: () => navigation.navigate("OtherPages", { screen: "CurrencySelection" }) },
    ];

    const MenuItem = ({ item }) => (
        <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
            <Text style={styles.menuText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" /> */}

                {/* Menu Items */}
                <View style={styles.content}>
                    {menuItems.map((item) => (
                        <MenuItem key={item.id} item={item} />
                    ))}

                    {/* Online Status Toggle */}
                    <View style={styles.toggleContainer}>
                        <Text style={styles.menuText}>Online status</Text>
                        <Switch
                            value={onlineStatus}
                            onValueChange={setOnlineStatus}
                            trackColor={{ false: "#3e3e3e", true: "#4CAF50" }}
                            thumbColor={onlineStatus ? "#fff" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light_gray_2,
    },
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: Colors.dark,
    },
    menuText: {
        fontSize: 16,
        color: Colors.dark,
        fontWeight: "500",
    },
    toggleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#2a2a2a",
        marginTop: 20,
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 12,
        backgroundColor: "#1a1a1a",
        borderTopWidth: 1,
        borderTopColor: "#2a2a2a",
    },
    navItem: {
        padding: 8,
    },
});

export default PreferencesScreen;