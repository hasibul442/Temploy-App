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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CategoryButton from "../../components/CategoryButton";
import OfferCarousel from "../../components/Sliders/OfferCarousel";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import HotJobSlider from "../../components/Sliders/HotJobSlider";
import { getData } from "../../utils/helper/HttpHelper";
import LogoutButton from "../../components/LogoutButton";

function MenuScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

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
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default MenuScreen;
