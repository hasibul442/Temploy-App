import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../utils/constants/Color";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Category from "../../utils/data/Category";
import CategoryButton from "../../components/CategoryButton";
import OfferCarousel from "../../components/Sliders/OfferCarousel";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import HotJobSlider from "../../components/Sliders/HotJobSlider";

function HomeScreen() {
  const navigation = useNavigation();
  const categories = Category;

  // 👇 Move BottomSheet ref to screen level
  const BottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const openSheet = () => BottomSheetRef.current?.expand();
  const backDrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={[style.homescreen_container]} edges={["top"]}>
          {/* Scrollable content */}
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {/* Banner Section */}
            <View style={style.banner_container}>
              <Image
                source={require("../../assets/image/banner_1.jpg")}
                style={style.banner_image}
              />
            </View>

            {/* Categories */}
            <View style={style.category_block}>
              {categories.slice(0, 7).map((item, index) => (
                <CategoryButton key={index} item={item} />
              ))}

              {/* More Button */}
              <View style={style.category_buttons}>
                <TouchableOpacity
                  onPress={openSheet}
                  style={style.category_button_item}
                >
                  <Image
                    source={{
                      uri: "https://cdn-marketplacexyz.s3.ap-south-1.amazonaws.com/sheba_xyz/images/svg/all-services.svg",
                    }}
                    style={{
                      width: 36,
                      height: 36,
                    }}
                  />
                </TouchableOpacity>
                <Text style={style.category_button_item_text}>More</Text>
              </View>
            </View>

            {/* Promo Section */}
            <View>
              <OfferCarousel />
            </View>

            <View style={style.statsRow}>
              <View style={style.statBox}>
                <Text style={style.statTitle}>New Jobs</Text>
                <Text style={style.statValue}>747</Text>
              </View>
              <View style={[style.statBox, { marginLeft: 10 }]}>
                <Text style={style.statTitle}>Live Job</Text>
                <Text style={style.statValue}>7574</Text>
              </View>
            </View>

            {/* Trending Section */}
            <View style={style.trending_section}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={CommonStyles.title_16_bold}> Hot Jobs</Text>
                <TouchableOpacity onPress={() => alert("See All Pressed")}>
                  <Text style={CommonStyles.button_text_12}>See All</Text>
                </TouchableOpacity>
              </View>

              <View>
                <HotJobSlider />
              </View>
            </View>

            {/* Navigation Button */}
            <TouchableOpacity
              style={style.details_button}
              onPress={() => navigation.navigate("Details")}
            >
              <Text style={style.details_button_text}>Go to Details</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* 👇 BOTTOM SHEET OUTSIDE SCROLLVIEW */}
          <BottomSheet
            ref={BottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose
            index={-1}
            backdropComponent={backDrop}
          >
            <BottomSheetView style={{ padding: 15 }}>
              <View style={style.category_block}>
                {categories.map((item, index) => (
                  <CategoryButton key={item.id} item={item} />
                ))}
              </View>
            </BottomSheetView>
          </BottomSheet>
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const style = StyleSheet.create({
  homescreen_container: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingHorizontal: 10,
  },

  banner_container: {
    height: 200,
    backgroundColor: Colors.primary_2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  banner_image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    resizeMode: "cover",
  },

  category_block: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 10,
    columnGap: 5,
    marginTop: 10,
  },

  category_buttons: {
    flexBasis: "22%",
    alignItems: "center",
    marginBottom: 15,
  },

  category_button_item: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    backgroundColor: Colors.light_gray_2,
    justifyContent: "center",
    alignItems: "center",
  },

  category_button_item_text: {
    color: Colors.dark,
    marginTop: 5,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },

  details_button: {
    backgroundColor: Colors.primary_2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },

  details_button_text: {
    color: Colors.light,
    fontWeight: "bold",
    fontSize: 16,
  },

  trending_section: {
    marginTop: 20,
  },
  statsRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    height: 100,
    backgroundColor: Colors.basil_green_800,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statTitle: {
    fontSize: 14,
    color: Colors.white,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
    color: Colors.white,
  },
});

export default HomeScreen;
