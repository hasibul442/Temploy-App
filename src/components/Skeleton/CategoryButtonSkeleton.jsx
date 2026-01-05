import { StyleSheet, View, Animated, Platform } from "react-native";
import { Colors } from "../../utils/constants/Color";
import { useEffect, useRef } from "react";

function CategoryButtonSkeleton() {
  const opacity = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View style={styles.category_buttons}>
      <Animated.View style={[styles.category_button_item, { opacity }]}>
        <View style={styles.skeletonBox} />
      </Animated.View>
      <Animated.View style={[styles.skeletonText, { opacity }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  category_buttons: {
    flexBasis: "22%",
    alignItems: "center",
    marginBottom: 15,
  },
  category_button_item: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  skeletonBox: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light_gray_2,
    borderRadius: 10,
  },
  skeletonText: {
    width: 60,
    height: 10,
    borderRadius: 4,
    marginTop: 5,
    backgroundColor: Colors.light_gray_2,
  },
});

export default CategoryButtonSkeleton;
