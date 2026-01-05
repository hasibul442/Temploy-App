import { StyleSheet, View, Animated, Dimensions } from "react-native";
import { Colors } from "../../utils/constants/Color";
import { useEffect, useRef } from "react";

function OfferCarouselSkeleton() {
    const width = Dimensions.get("window").width - 20;
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
        <View style={[styles.container, { width }]}>
            <Animated.View style={[styles.skeletonCard, { opacity }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    skeletonCard: {
        width: "90%",
        height: 140,
        borderRadius: 10,
        backgroundColor: Colors.light_gray_2,
    },
});

export default OfferCarouselSkeleton;
