import { Button } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/constants/Color";
import { ImageBackground } from "react-native";
import { getData } from "../../utils/helper/HttpHelper";
function Details({ route }) {
  const navigation = useNavigation();
  const { itemId } = route.params || {};
  const [error, setError] = useState(false);

  const [data, setData] = useState({});

    const fetchData = async (id) => {
      try {
        await getData(`/api/v1/categories/${id}/subcat`, {}, false).then((response) => {
          setData(response?.data);
        });
      } catch (error) {
        console.error("Error fetching offer data:", error);
      }
    };

  useEffect(() => {
    if (itemId) {
      fetchData(itemId);
    }
  }, [itemId]);

  return (
    <>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaView edges={["top"]} style={[style.task_list_container]}>
            {/* Page Title */}
            <View style={style.page_title_container}>
              <Text style={style.page_title}>{data?.category?.cat_name}</Text>
              <Text style={style.page_subtitle}>
                {data?.category?.description}
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
              {data?.subcategories?.map((sub) => (
                <TouchableOpacity
                  key={sub._id}
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
                  onPress={() => alert(`Pressed ${sub?.sub_cat_name}`)}
                >
                  <ImageBackground
                    source={{ uri: sub?.sub_cat_icon_url }}
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
                        {sub.sub_cat_name}
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
