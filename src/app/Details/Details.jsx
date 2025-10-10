import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/constants/Color";
import Category from "../../utils/data/Category";
import { ImageBackground } from "react-native";
function Details({ route }) {
  const navigation = useNavigation();
  const { itemId } = route.params || {};
  const [subcategory, setSubcategory] = useState([]);
  const [error, setError] = useState(false);

  const data = Category;

  const getFilteredSubcategories = (id) => {
    const sub = data.filter((category) => category.id == id);
    if (sub.length > 0) {
      setSubcategory(sub[0] || []);
    } else {
      setSubcategory([]);
    }
  };

  useEffect(() => {
    if (itemId) {
      getFilteredSubcategories(itemId);
    }
  }, [itemId]);

  return (
    <>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView edges={["top"]} style={[style.task_list_container]}>
            {/* Page Title */}
            <View style={style.page_title_container}>
              <Text style={style.page_title}>{subcategory?.name}</Text>
              <Text style={style.page_subtitle}>
                We provide top-notch AC repair services.
              </Text>
            </View>

            {/* SubCategory */}
            <View
              style={{
                flexDirection: "row",
                overflow: "scroll",
                paddingBottom: 10,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {subcategory?.children?.map((sub) => (
                <TouchableOpacity
                  key={sub.id}
                  style={{
                    backgroundColor: Colors.light_gray_2,
                    marginRight: 15,
                    width: 120,
                    height: 100,
                    borderRadius: 10,
                    overflow: "hidden",
                    shadowColor: Colors.deep_teal_green,
                    shadowOffset: { width: 2, height: 3 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                  onPress={() => alert(`Pressed ${sub?.name}`)}
                >
                  <ImageBackground
                    source={{ uri: sub?.app_thumb }}
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "flex-end",
                      shadowColor: "#000",
                    }}
                    resizeMode="cover"
                    onError={() => setError(true)}
                  >
                    {/* Shade Overlay */}
                    <View
                      style={{
                        width: "100%",
                        paddingVertical: 5,
                        background:
                          "linear-gradient(to bottom, #06170007, #014122)",
                        alignItems: "center",
                        height: 50,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "700",
                          color: "#fff",
                          textAlign: "center",
                          paddingLeft: 5,
                          paddingRight: 5,
                        }}
                      >
                        {sub.name}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Details Screen</Text>

              <Button onPress={() => navigation.navigate("Home")}>
                Go to Home
              </Button>
            </View>
          </SafeAreaView>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}

const style = StyleSheet.create({
  task_list_container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingHorizontal: 10,
  },
  page_title_container: {
    marginBottom: 10,
    marginTop: 15,
  },
  page_title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  page_subtitle: {
    marginVertical: 10,
    fontSize: 16,
    color: Colors.gray,
  },
});

export default Details;
