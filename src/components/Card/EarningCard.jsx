import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../utils/constants/Color'

function EarningCard({ title, value, color }) {
  return (
    <>
    <View style={styles.earningCard}>
        <Text style={[styles.earningValue, { color: color || '#333' }]}>{value}</Text>
        <Text style={styles.earningTitle}>{title}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  earningCard: {
    width: '48%',
    backgroundColor: Colors.light,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    minHeight: 100,
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  earningValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  earningTitle: {
    fontSize: 13,
    color: Colors.gray_600,
  },
})
export default EarningCard