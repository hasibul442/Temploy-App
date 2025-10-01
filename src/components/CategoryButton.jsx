import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../utils/constants/Color';

function CategoryButton() {
  const data = [
    { name: 'AC Service', icon: 'git' },
    { name: 'Plumbing', icon: 'wrench' },
    { name: 'Electrical', icon: 'bolt' },
    { name: 'Cleaning', icon: 'broom' },
    { name: 'Carpentry', icon: 'hammer' },
    { name: 'More', icon: 'ellipsis-h' },
  ];

  return (
    <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
        rowGap: 10,
        }}>
      {data.map((item, index) => (
        <View
          key={index}
          style={{
            width: '31.5%',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => alert(`Pressed ${item.name}`)}
            style={{
              width: '100%',
              height: 70,
              borderRadius: 10,
              backgroundColor: Colors.light_2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FontAwesome6
              name={item.icon}
              size={26}
              color={Colors.primary_2}
              iconStyle="solid"
            />
          </TouchableOpacity>
          <Text style={{ color: Colors.dark, marginTop: 5 }}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
}

export default CategoryButton;
