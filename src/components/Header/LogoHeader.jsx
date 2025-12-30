import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Colors } from "../../utils/constants/Color";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch } from "react-redux";
import { logoutUser } from "../../slices/authSlice";

function LogoHeader() {
    const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      console.log('Logout button clicked - dispatching logout action...');
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Temploy</Text>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleLogout}
        >
         <AntDesign name="logout" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.success_2,
  },
});

export default LogoHeader;
