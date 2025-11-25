import React, { useRef } from "react";
import HotJobs from "../../utils/data/HotJobs";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { CommonStyles } from "../../utils/styles/CommonStyle";

function HotJobSlider() {
  const data = HotJobs;
  const width = Dimensions.get("window").width - 20;

  const ref = useRef(null);
  const progress = useSharedValue(0);
  return (
    <>
      <View
        id="carousel-Offer-component"
        dataSet={{ kind: "basic-layouts", name: "parallax" }}
      >
        <Carousel
          data={data}
          height={150}
          loop={true}
          pagingEnabled={true}
          snapEnabled={true}
          width={width}
          autoPlay={true}
          autoPlayInterval={3000}
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
                height: 150,
                borderRadius: 10,
                margin: 8,
                backgroundColor: "#fff",
                overflow: "hidden",
              }}
            >
              <ImageBackground
                resizeMode="cover"
                source={require("../../assets/image/card_bg.jpg")}
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                }}
                imageStyle={{ opacity: 0.4 }}
              >
                <View
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  <Text style={[CommonStyles.title_16_bold]}>
                    {data[index].title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Text style={CommonStyles.text_14_regular}>
                      {data[index].price_type}
                    </Text>
                    <Text style={CommonStyles.text_14_regular}>
                      {data[index].currency}
                      {data[index].price} / {data[index].per}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        />
      </View>
    </>
  );
}

export default HotJobSlider;
