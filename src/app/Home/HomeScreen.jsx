import { Button } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../utils/constants/Color';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CategoryButton from '../../components/CategoryButton';

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaProvider style={style.homescreen_container}>
        <View >
          <View style={style.banner_container}>
            <Image
              source={require('../../assets/image/banner_1.jpg')}
              style={style.banner_image}
            />
          </View>

          <View>
            <CategoryButton />
          </View>

          <View>
            <Button onPress={() => navigation.navigate('Details')}>
              Go to Details
            </Button>
          </View>
        </View>
      </SafeAreaProvider>
    </>
  );
}

const style = {
  homescreen_container: {
    backgroundColor: Colors.light,
    paddingRight: 10,
    paddingTop: 10,
    paddingLeft: 10,
  },

  banner_container: {
    height: 200,
    backgroundColor: Colors.primary_2,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },

  banner_image: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
  },
};

export default HomeScreen;