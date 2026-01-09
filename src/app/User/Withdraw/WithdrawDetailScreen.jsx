import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../../utils/constants/Color'
import { CommonStyles } from '../../../utils/styles/CommonStyle'
import { HeaderStyles } from '../../../utils/styles/HeaderStyle'
import HeaderWithBackButton from '../../../components/Header/HeaderWithBackButton'
import { getIconForStatus, getStatusBackgroundColor, getStatusColor, getStatusIconColor, getStatusText, useSystemNavigateSpace } from '../../../utils/helper/Helper'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import ExpenseData from '../../../utils/data/ExpenseData'

function WithdrawDetailScreen({ route }) {
  const { id } = route?.params || {};
  const navigation = useNavigation()

  const withdrawal = ExpenseData.find(item => item.id === id) || {}

  // Helper function to get timeline line color based on status
  const getTimelineLineColor = (status) => {
    switch (status) {
      case 'completed':
        return Colors.success
      case 'active':
        return Colors.info + '50'
      default:
        return Colors.gray_100
    }
  }

  // Use timeline from data if available, otherwise generate default
  const getTimelineSteps = () => {
    if (withdrawal.timeline && withdrawal.timeline.length > 0) {
      return withdrawal.timeline.map((step, index) => ({
        ...step,
        icon: getIconForStatus(step.status),
      }))
    }
  }

  const timelineSteps = getTimelineSteps()

  return (
    <SafeAreaProvider>
      <SafeAreaView style={CommonStyles.safeArea} edges={['top']}>
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Withdrawal Details" />
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={CommonStyles.container_3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: useSystemNavigateSpace(80) }}
        >
          {/* Amount Card */}
          <View style={styles.amountCard}>
            <View style={styles.amountHeader}>
              <Text style={styles.amountLabel}>Withdrawal Amount</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(withdrawal.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(withdrawal.status) }]}>
                  {getStatusText(withdrawal.status)}
                </Text>
              </View>
            </View>
            <Text style={styles.amountValue}>${withdrawal.amount.toFixed(2)}</Text>
            <View style={styles.amountDetails}>
              <View style={styles.amountDetailRow}>
                <Text style={styles.amountDetailLabel}>Transaction Fee</Text>
                <Text style={styles.amountDetailValue}>-${withdrawal.transactionFee.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.amountDetailRow}>
                <Text style={styles.amountDetailLabelBold}>Net Amount</Text>
                <Text style={styles.amountDetailValueBold}>${withdrawal.netAmount.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Timeline Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Transaction Timeline</Text>
            <View style={styles.timelineContainer}>
              {timelineSteps.map((step, index) => (
                <View key={index} style={styles.timelineItem}>
                  {/* Timeline Icon and Line */}
                  <View style={styles.timelineLeft}>
                    <View style={[
                      styles.timelineIconContainer,
                      { backgroundColor: getStatusBackgroundColor(step.status) }
                    ]}>
                      <Ionicons 
                        name={step.icon} 
                        size={20} 
                        color={getStatusIconColor(step.status)} 
                      />
                    </View>
                    {index < timelineSteps.length - 1 && (
                      <View style={[
                        styles.timelineLine,
                        { backgroundColor: getTimelineLineColor(step.status) }
                      ]} />
                    )}
                  </View>

                  {/* Timeline Content */}
                  <View style={styles.timelineContent}>
                    <Text style={[
                      styles.timelineTitle,
                      { color: step.status === 'pending' ? Colors.gray_400 : Colors.dark }
                    ]}>
                      {step.title}
                    </Text>
                    <Text style={[
                      styles.timelineDescription,
                      { color: step.status === 'pending' ? Colors.gray_400 : Colors.gray_600 }
                    ]}>
                      {step.description}
                    </Text>
                    {step.date && (
                      <Text style={styles.timelineDate}>
                        {step.date} {step.time && `• ${step.time}`}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Payment Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <View style={styles.detailIconContainer}>
                  <FontAwesome6 name="building-columns" size={16} color={Colors.primary_1} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Bank Name</Text>
                  <Text style={styles.detailValue}>{withdrawal.bankName}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailIconContainer}>
                  <FontAwesome6 name="credit-card" size={16} color={Colors.primary_1} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Account Number</Text>
                  <Text style={styles.detailValue}>{withdrawal.accountNumber}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailIconContainer}>
                  <FontAwesome6 name="user" size={16} color={Colors.primary_1} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Account Name</Text>
                  <Text style={styles.detailValue}>{withdrawal.accountName}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailIconContainer}>
                  <FontAwesome6 name="receipt" size={16} color={Colors.primary_1} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Reference Number</Text>
                  <Text style={styles.detailValue}>{withdrawal.referenceNumber}</Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailIconContainer}>
                  <FontAwesome6 name="calendar" size={16} color={Colors.primary_1} />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Estimated Arrival</Text>
                  <Text style={styles.detailValue}>{withdrawal.estimatedArrival}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons - Show based on status */}
          {(withdrawal.status === 'pending' || withdrawal.status === 'processing') && (
            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  // Handle cancel withdrawal
                  console.log('Cancel withdrawal')
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel Withdrawal</Text>
              </TouchableOpacity>
            </View>
          )}

          {withdrawal.status === 'failed' && (
            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => {
                  // Handle retry
                  navigation.goBack()
                }}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Help Section */}
          <View style={styles.helpSection}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.info} />
            <Text style={styles.helpText}>
              Need help? Contact our support team for assistance with your withdrawal.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  amountCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  amountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 14,
    color: Colors.gray_600,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  amountValue: {
    fontSize: 36,
    fontWeight: '700',
    color: Colors.primary_2,
    marginBottom: 16,
  },
  amountDetails: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray_100,
    paddingTop: 12,
  },
  amountDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  amountDetailLabel: {
    fontSize: 14,
    color: Colors.gray_600,
  },
  amountDetailValue: {
    fontSize: 14,
    color: Colors.gray_600,
  },
  amountDetailLabelBold: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
  },
  amountDetailValueBold: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray_100,
    marginVertical: 8,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 16,
  },
  timelineContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 24,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  timelineDate: {
    fontSize: 12,
    color: Colors.gray_500,
    fontWeight: '500',
  },
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primary_1 + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.gray_500,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark,
  },
  actionSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  cancelButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.danger,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: Colors.primary_1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  helpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.info + '10',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  helpText: {
    flex: 1,
    fontSize: 13,
    color: Colors.info,
    lineHeight: 18,
  },
})

export default WithdrawDetailScreen