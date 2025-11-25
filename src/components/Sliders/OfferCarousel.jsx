import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import PromoData from "../../utils/data/PromoData";
import { getData } from "../../utils/helper/HttpHelper";

function OfferCarousel() {
  const width = Dimensions.get("window").width - 20;

  const ref = useRef(null);
  const progress = useSharedValue(0);
  const [promodata, setPromodata] = useState([]);

  const getOfferData = async() => {
    try {
      await getData("/api/v1/banners", {}, false).then((response) => {
        setPromodata(response);
      });
    } catch (error) {
      console.error("Error fetching offer data:", error);
    }
  }

  useEffect(() => {
    getOfferData();
  }, []);

  return (
    <>
      <View
        id="carousel-Offer-component"
        dataSet={{ kind: "basic-layouts", name: "parallax" }}
      >
        <Carousel
          data={promodata?.data || []}
          height={150}
          loop={true}
          pagingEnabled={true}
          snapEnabled={true}
          width={width}
          style={{
            width: width,
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 55,
          }}
          ref={ref}
          onProgressChange={progress}
          renderItem={({ index }) => (
            <View
              style={{
                justifyContent: "center",
                height: 150,
                borderRadius: 10,
                margin: 8,
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: promodata?.data[index]?.banner }}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </View>
    </>
  );
}

export default OfferCarousel;
