import React from 'react'
import ExpenseData from '../../../utils/data/ExpenseData'
import { HeaderStyles } from '../../../utils/styles/HeaderStyle'
import { CommonStyles } from '../../../utils/styles/CommonStyle'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { ScrollView } from 'react-native'
import { useSystemNavigateSpace } from '../../../utils/helper/Helper'
import TransactionCard from '../../../components/Card/TransactionCard'
import HeaderWithBackButton from '../../../components/Header/HeaderWithBackButton'
import { StyleSheet } from 'react-native'

function WithdrawHistoryScreen() {
  const withdrawal = ExpenseData
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
          <View style={HeaderStyles.header}>
            <HeaderWithBackButton title="Withdrawals History" />
            <View style={{ width: 40 }} />
          </View>

          <ScrollView
            style={CommonStyles.container_3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: useSystemNavigateSpace(60) }}
          >
            <View style={styles.section}>
              {withdrawal.map((item) => (
              <TransactionCard key={item.id} item={item} type="withdrawal" />
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
export default WithdrawHistoryScreen