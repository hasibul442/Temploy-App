import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import TransactionCard from '../../../components/Card/TransactionCard'
import IncomeData from '../../../utils/data/IncomeData'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HeaderWithBackButton from '../../../components/Header/HeaderWithBackButton'
import { CommonStyles } from '../../../utils/styles/CommonStyle'
import { HeaderStyles } from '../../../utils/styles/HeaderStyle'
import { useSystemNavigateSpace } from '../../../utils/helper/Helper'

function OrderHistoryScreen() {
  const incomeData = IncomeData
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
          <View style={HeaderStyles.header}>
            <HeaderWithBackButton title="Earnings History" />
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={CommonStyles.container_3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: useSystemNavigateSpace(60) }}
          >
            <View style={styles.section}>
              {incomeData.map((item) => (
                <TransactionCard key={item.id} item={item} type="income" />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  )
}

const styles = StyleSheet.create({
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
})

export default OrderHistoryScreen