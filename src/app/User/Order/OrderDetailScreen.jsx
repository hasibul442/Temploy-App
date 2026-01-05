import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../../utils/constants/Color'
import { CommonStyles } from '../../../utils/styles/CommonStyle'
import { HeaderStyles } from '../../../utils/styles/HeaderStyle'
import HeaderWithBackButton from '../../../components/Header/HeaderWithBackButton'
import { getStatusColor, getStatusText, useSystemNavigateSpace } from '../../../utils/helper/Helper'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import IncomeData from '../../../utils/data/IncomeData'

function OrderDetailScreen({ route }) {
  const { id } = route?.params || {};
  const navigation = useNavigation()

  const earning = IncomeData.find(item => item.id === id) || {}

  // Calculate estimated values
  const platformFee = earning.amount ? (earning.amount * 0.15).toFixed(2) : '0.00'
  const netEarning = earning.amount ? (earning.amount * 0.85).toFixed(2) : '0.00'

  return (
    <SafeAreaProvider>
      <SafeAreaView style={CommonStyles.safeArea} edges={['top']}>
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Order Details" />
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
              <View style={styles.amountHeaderLeft}>
                <View style={styles.iconCircle}>
                  <FontAwesome6 name='money-bill-wave' size={20} color={Colors.success} />
                </View>
                <View>
                  <Text style={styles.amountLabel}>Total Earning</Text>
                  <Text style={styles.amountValue}>${earning.amount ? earning.amount.toFixed(2) : '0.00'}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(earning.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(earning.status) }]}>
                  {getStatusText(earning.status)}
                </Text>
              </View>
            </View>
            
            <View style={styles.earningBreakdown}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownLabel}>Platform Fee (15%)</Text>
                  <Text style={styles.breakdownValue}>-${platformFee}</Text>
                </View>
                <View style={styles.dividerWhite} />
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabelBold}>Your Net Earning</Text>
                <Text style={styles.breakdownValueBold}>${netEarning}</Text>
              </View>
            </View>
          </View>

          {/* Job Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Job Details</Text>
            <View style={styles.detailsCard}>
              <View style={styles.jobHeader}>
                <View style={[styles.jobIconContainer, { backgroundColor: Colors.success_2 + '20' }]}>
                  <FontAwesome6 name='briefcase' size={24} color={Colors.success_2} />
                </View>
                <View style={styles.jobHeaderInfo}>
                  <Text style={styles.jobTitle}>{earning.title || 'Job Title'}</Text>
                  <View style={styles.jobMeta}>
                    <Ionicons name="calendar-outline" size={14} color={Colors.gray_500} />
                    <Text style={styles.jobMetaText}>{earning.date || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Reviews Section */}
          {earning.status === 'completed' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reviews & Feedback</Text>
              
              {/* Employer Review */}
              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <View style={styles.reviewerAvatar}>
                      <FontAwesome6 name="user-tie" size={18} color={Colors.primary_1} />
                    </View>
                    <View style={styles.reviewerDetails}>
                      <Text style={styles.reviewerName}>John Doe</Text>
                      <Text style={styles.reviewerRole}>Employer</Text>
                    </View>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FDB022" />
                    <Text style={styles.ratingText}>4.8</Text>
                  </View>
                </View>

                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons 
                      key={star} 
                      name={star <= 5 ? "star" : "star-outline"} 
                      size={18} 
                      color="#FDB022" 
                    />
                  ))}
                </View>

                <Text style={styles.reviewText}>
                  Excellent work! The freelancer completed the project ahead of schedule and delivered high-quality results. Communication was clear and professional throughout the entire process. Highly recommended!
                </Text>

                <View style={styles.reviewFooter}>
                  <View style={styles.reviewDate}>
                    <Ionicons name="calendar-outline" size={14} color={Colors.gray_500} />
                    <Text style={styles.reviewDateText}>{earning.date || 'N/A'}</Text>
                  </View>
                  <TouchableOpacity style={styles.helpfulButton}>
                    <Ionicons name="thumbs-up-outline" size={14} color={Colors.gray_500} />
                    <Text style={styles.helpfulText}>Helpful</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Employee Review */}
              <View style={[styles.reviewCard, { marginTop: 16 }]}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerInfo}>
                    <View style={[styles.reviewerAvatar, { backgroundColor: Colors.success + '15' }]}>
                      <FontAwesome6 name="user" size={18} color={Colors.success} />
                    </View>
                    <View style={styles.reviewerDetails}>
                      <Text style={styles.reviewerName}>You (Freelancer)</Text>
                      <Text style={styles.reviewerRole}>Your Review</Text>
                    </View>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FDB022" />
                    <Text style={styles.ratingText}>5.0</Text>
                  </View>
                </View>

                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons 
                      key={star} 
                      name="star" 
                      size={18} 
                      color="#FDB022" 
                    />
                  ))}
                </View>

                <Text style={styles.reviewText}>
                  Great client to work with! Clear instructions and prompt responses. The project requirements were well-defined, and payment was processed quickly. Looking forward to future collaborations.
                </Text>

                <View style={styles.reviewFooter}>
                  <View style={styles.reviewDate}>
                    <Ionicons name="calendar-outline" size={14} color={Colors.gray_500} />
                    <Text style={styles.reviewDateText}>{earning.date || 'N/A'}</Text>
                  </View>
                  <TouchableOpacity style={styles.editReviewButton}>
                    <Ionicons name="pencil-outline" size={14} color={Colors.primary_1} />
                    <Text style={styles.editReviewText}>Edit Review</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Earning Breakdown Chart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Earning Breakdown</Text>
            <View style={styles.chartCard}>
              <View style={styles.chartRow}>
                <View style={styles.chartBarContainer}>
                  <View style={styles.chartBar}>
                    <View style={[styles.chartBarFill, { 
                      width: '85%', 
                      backgroundColor: Colors.success 
                    }]} />
                  </View>
                  <Text style={styles.chartLabel}>Net Earning (85%)</Text>
                </View>
                <Text style={styles.chartValue}>${netEarning}</Text>
              </View>

              <View style={styles.chartRow}>
                <View style={styles.chartBarContainer}>
                  <View style={styles.chartBar}>
                    <View style={[styles.chartBarFill, { 
                      width: '15%', 
                      backgroundColor: Colors.warning 
                    }]} />
                  </View>
                  <Text style={styles.chartLabel}>Platform Fee (15%)</Text>
                </View>
                <Text style={styles.chartValue}>${platformFee}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          {earning.status === 'completed' && (
            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => {
                  console.log('Request invoice')
                }}
              >
                <FontAwesome6 name="file-invoice" size={16} color={Colors.white} />
                <Text style={styles.primaryButtonText}>Download Invoice</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => {
                  console.log('Contact support')
                }}
              >
                <FontAwesome6 name="headset" size={16} color={Colors.primary_1} />
                <Text style={styles.secondaryButtonText}>Contact Support</Text>
              </TouchableOpacity>
            </View>
          )}

          {earning.status === 'pending' && (
            <View style={styles.actionSection}>
              <TouchableOpacity 
                style={styles.warningButton}
                onPress={() => {
                  console.log('View job details')
                }}
              >
                <FontAwesome6 name="clock" size={16} color={Colors.warning} />
                <Text style={styles.warningButtonText}>Payment Pending</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Info Section */}
          <View style={styles.infoSection}>
            <Ionicons name="information-circle" size={20} color={Colors.success} />
            <Text style={styles.infoText}>
              Your earnings are processed securely and will be transferred to your account within 2-3 business days.
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
    borderRadius: 20,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  amountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  amountHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.success + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: Colors.gray_600,
    fontWeight: '500',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '600',
    color: Colors.success,
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
  earningBreakdown: {
    backgroundColor: Colors.gray_50,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  breakdownLabel: {
    fontSize: 13,
    color: Colors.gray_600,
  },
  breakdownValue: {
    fontSize: 14,
    color: Colors.gray_700,
    fontWeight: '500',
  },
  breakdownLabelBold: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.dark,
  },
  breakdownValueBold: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.success,
  },
  dividerWhite: {
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
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  jobIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  jobHeaderInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 8,
    lineHeight: 22,
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  jobMetaText: {
    fontSize: 13,
    color: Colors.gray_500,
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
    backgroundColor: Colors.success + '15',
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
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  chartBarContainer: {
    flex: 1,
    marginRight: 16,
  },
  chartBar: {
    height: 8,
    backgroundColor: Colors.gray_100,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  chartBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 13,
    color: Colors.gray_600,
  },
  chartValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
  },
  actionSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary_1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary_1,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  secondaryButtonText: {
    color: Colors.primary_1,
    fontSize: 16,
    fontWeight: '600',
  },
  warningButton: {
    backgroundColor: Colors.warning + '15',
    borderWidth: 1.5,
    borderColor: Colors.warning,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  warningButtonText: {
    color: Colors.warning,
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.success + '10',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.success,
    lineHeight: 18,
  },
  reviewCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reviewerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary_1 + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewerDetails: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 2,
  },
  reviewerRole: {
    fontSize: 12,
    color: Colors.gray_500,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FDB022' + '15',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FDB022',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  reviewText: {
    fontSize: 14,
    color: Colors.gray_700,
    lineHeight: 22,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray_200,
  },
  reviewDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewDateText: {
    fontSize: 12,
    color: Colors.gray_500,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.gray_100,
    borderRadius: 6,
  },
  helpfulText: {
    fontSize: 12,
    color: Colors.gray_600,
    fontWeight: '500',
  },
  editReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.primary_1 + '10',
    borderRadius: 6,
  },
  editReviewText: {
    fontSize: 12,
    color: Colors.primary_1,
    fontWeight: '500',
  },
})

export default OrderDetailScreen