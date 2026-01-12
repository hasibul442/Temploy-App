import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
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
import AntDesign from '@expo/vector-icons/AntDesign';
import CategoryButtonSkeleton from "../../components/Skeleton/CategoryButtonSkeleton";
import { useTranslation } from "react-i18next";

function HomeScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [catloading, setCatLoading] = useState(true);
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
        setCatLoading(false);
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

              {/* Categories */}
              <View style={style.category_block}>
                {catloading ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <CategoryButtonSkeleton key={index} />
                  ))
                ) : (
                  <>
                    {categories.slice(0, 7).map((item) => (
                      <CategoryButton key={item._id} item={item} />
                    ))}

                    <View style={style.category_buttons}>
                      <TouchableOpacity
                        onPress={openSheet}
                        style={style.category_button_item}
                      >
                        <AntDesign name="appstore" size={30} color={Colors.success_2} />
                      </TouchableOpacity>
                      <Text style={style.category_button_item_text}>{t('button.more')}</Text>
                    </View>
                  </>
                )}
              </View>

              {/* Promo Section */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={CommonStyles.title_18_bold}>{t('titles.exclusive_offers')}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("OtherPages", { screen: "JobsList" })
                    }
                  >
                    <Text style={CommonStyles.button_text_12}>{t('button.see_all')}</Text>
                  </TouchableOpacity>
                </View>
                <OfferCarousel />
              </View>

              <View style={style.statsRow}>
                <View style={[style.statBox, { backgroundColor: "#F0FFDF" }]}>
                  <Text style={style.statTitle}>New Jobs</Text>
                  <Text style={style.statValue}>747</Text>
                </View>
                <View style={[style.statBox, { marginLeft: 10, backgroundColor: "#FFFDE1" }]}>
                  <Text style={[style.statTitle]}>Job Category</Text>
                  <Text style={[style.statValue]}>14</Text>
                </View>
              </View>

              {/* Create Job Button */}

              <TouchableOpacity
                style={style.create_job_button}
                onPress={() =>
                  navigation.navigate("OtherPages", { screen: "JobPost" })
                }
              >
                <Text style={style.create_job_button_text}>{t('button.post_a_job')}</Text>
              </TouchableOpacity>

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
                  <Text style={CommonStyles.title_18_bold}>{t('titles.recent_jobs')}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("OtherPages", { screen: "JobsList" })
                    }
                  >
                    <Text style={CommonStyles.button_text_12}>{t('button.see_all')}</Text>
                  </TouchableOpacity>
                </View>

                <View>
                  {jobdata.slice(0, 10).map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
                </View>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("OtherPages", { screen: "JobsList" })
                  }
                  style={{ alignSelf: "center", marginTop: 6, marginBottom: 6 }}
                >
                  <Text style={CommonStyles.button_text_14}>{t('button.see_more')}</Text>
                </TouchableOpacity>
              </View>

              <View>

                <View style={style.trainingCard}>
                  <Text style={style.trainingTitle}>{t('titles.enhance_your_skills')}</Text>
                  <Text style={style.trainingDescription}>
                    Join our professional training programs to boost your career
                  </Text>
                  <TouchableOpacity
                    style={style.trainingButton}
                    onPress={() =>
                      navigation.navigate("OtherPages", { screen: "TrainingList" })
                    }
                  >
                    <Text style={style.trainingButtonText}>{t('button.browse_trainings')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
                <View style={{ marginBottom: 100, ...style.category_block }}>
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
    paddingHorizontal: 16,
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
    marginBottom: 10,
  },

  category_button_item: {
    width: 60,
    height: 60,
    borderRadius: 50,
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
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
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
  create_job_button: {
    width: "100%",
    backgroundColor: Colors.success_2,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  create_job_button_text: {
    color: Colors.light,
    fontWeight: "bold",
    fontSize: 16,
  },
  trainingCard: {
    marginTop: 15,
    marginBottom: 30,
    backgroundColor: Colors.light_3,
    borderRadius: 10,
    padding: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 3,
  },
  trainingTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 8,
  },
  trainingDescription: {
    fontSize: 14,
    color: Colors.dark_gray,
    marginBottom: 15,
    lineHeight: 20,
  },
  trainingButton: {
    backgroundColor: Colors.success_2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  trainingButtonText: {
    color: Colors.light,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default HomeScreen;
