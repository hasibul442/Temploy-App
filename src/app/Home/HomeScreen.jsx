import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../utils/constants/Color";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CategoryButton from "../../components/CategoryButton";
import OfferCarousel from "../../components/Sliders/OfferCarousel";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { getData } from "../../utils/helper/HttpHelper";
import LogoutButton from "../../components/LogoutButton";
import JobsData from "../../utils/data/JobsData";
import JobCard from "../../components/Card/JobCard";
import LogoHeader from "../../components/Header/LogoHeader";
import { StatusBar } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

function HomeScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const jobdata = JobsData;

  // :point_down: Move BottomSheet ref to screen level
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

  const fetchCategories = async () => {
    try {
      await getData("/api/v1/categories", {}, false).then((response) => {
        setCategories(response?.data);
      });
    } catch (error) {
      console.error("Error fetching offer data:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
        <GestureHandlerRootView style={{ ...CommonStyles.container }}>
          <StatusBar barStyle="light-content" backgroundColor={Colors.success_2} />
          <LogoHeader />
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 100 }}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              bounces={true}
              nestedScrollEnabled={true}
            >
              {/* Banner Section */}
              {/* <View style={style.banner_container}>
                <Image
                  source={require("../../assets/image/banner_1.jpg")}
                  style={style.banner_image}
                />
              </View> */}

              {/* Categories */}
              <View style={style.category_block}>
                {categories.slice(0, 7).map((item, index) => (
                  <CategoryButton key={item._id} item={item} />
                ))}

                {/* More Button */}
                <View style={style.category_buttons}>
                  <TouchableOpacity
                    onPress={openSheet}
                    style={style.category_button_item}
                  >
                    {/* <Image
                      source={{
                        uri: "https://cdn-marketplacexyz.s3.ap-south-1.amazonaws.com/sheba_xyz/images/svg/all-services.svg",
                      }}
                      style={{
                        width: 36,
                        height: 36,
                      }}
                    /> */}
                    <AntDesign name="appstore" size={30} color={Colors.success_2} />
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
                  <Text style={CommonStyles.title_16_bold}> Recent Jobs</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("OtherPages", { screen: "Jobs" })
                    }
                  >
                    <Text style={CommonStyles.button_text_12}>See All</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  {jobdata.slice(0, 10).map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("OtherPages", { screen: "Jobs" })
                  }
                  style={{ alignSelf: "center", marginTop: 10, marginBottom: 10 }}
                >
                  <Text style={CommonStyles.button_text_12}>See More</Text>
                </TouchableOpacity>
              </View>

              {/* Navigation Button For test*/}
              <TouchableOpacity
                style={style.details_button}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={style.details_button_text}>Go to Login</Text>
              </TouchableOpacity>

              <LogoutButton />
            </ScrollView>

            {/* :point_down: BOTTOM SHEET OUTSIDE SCROLLVIEW */}
            <BottomSheet
              ref={BottomSheetRef}
              snapPoints={snapPoints}
              enablePanDownToClose
              index={-1}
              backdropComponent={backDrop}
            >
              <BottomSheetView style={{ padding: 15 }}>
                <View style={{marginBottom: 100, ...style.category_block }}>
                  {categories.map((item, index) => (
                    <CategoryButton key={item._id} item={item} />
                  ))}
                </View>
              </BottomSheetView>
            </BottomSheet>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
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
    marginTop: 20,
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
    height: 120,
    backgroundColor: Colors.light_3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statTitle: {
    fontSize: 14,
    color: Colors.dark_gray,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 6,
    color: Colors.dark_gray,
  },
});

export default HomeScreen;
