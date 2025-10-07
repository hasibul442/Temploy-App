import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../utils/constants/Color';

function CategoryButton() {
  const data = [
    { name: 'AC Repair Service', icon: 'fan', style: 'solid' },
    { name: 'Appliance Repair', icon: 'wrench', style: 'solid' },
    { name: 'Cleaning Solutions', icon: 'bolt', style: 'solid' },
    { name: 'Beauty & Wellness', icon: 'broom', style: 'solid' },
    { name: 'Shifting', icon: 'hammer', style: 'solid' },
    { name: 'Health & Care', icon: 'hammer', style: 'solid' },
    { name: "Men's Care & Salon", icon: 'hammer', style: 'solid' },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.category_block}>
        {data.map((item, index) => (
          <View key={index} style={styles.category_buttons}>
            <TouchableOpacity
              onPress={() => alert(`Pressed ${item.name}`)}
              style={styles.category_button_item}
            >
              <FontAwesome6
                name={item.icon}
                size={26}
                color={Colors.primary_2}
                iconStyle={item.style}
              />
            </TouchableOpacity>
            <Text style={styles.category_button_item_text}>{item.name}</Text>
          </View>
        ))}

        <View style={styles.category_buttons}>
          <TouchableOpacity
            onPress={handleModalOpen}
            style={styles.category_button_item}
          >
            <FontAwesome6
              name="ellipsis"
              size={26}
              color={Colors.primary_2}
              iconStyle="solid"
            />
          </TouchableOpacity>
          <Text style={styles.category_button_item_text}>More</Text>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        presentationStyle='pageSheet'
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          // onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text>Hi</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = {
  category_block: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    columnGap: 5,
    marginTop: 10,
    marginBottom: 10,
  },

  category_buttons: {
    width: '22%',
    alignItems: 'center',
    marginBottom:15,
  },

  category_button_item: {
    width: '100%',
    height: 70,
    borderRadius: 10,
    backgroundColor: Colors.light_3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  category_button_item_text: {
    color: Colors.dark,
    marginTop: 5,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    height: '70%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
};
export default CategoryButton;
