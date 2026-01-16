import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../../../utils/constants/Color'
import { CommonStyles } from '../../../../utils/styles/CommonStyle'
import { HeaderStyles } from '../../../../utils/styles/HeaderStyle'
import HeaderWithBackButton from '../../../../components/Header/HeaderWithBackButton'
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import { useSystemNavigateSpace } from '../../../../utils/helper/Helper'

function WithdrawMethodScreen() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [savedMethods, setSavedMethods] = useState([])
  const [selectedMethod, setSelectedMethod] = useState(null)

  useEffect(() => {
    fetchSavedMethods()
  }, [])

  const fetchSavedMethods = async () => {
    try {
      setLoading(true)
      // Replace with your API endpoint
      // const response = await getData('/api/payment-methods', {}, true)
      // setSavedMethods(response.methods || [])
      
      // Mock data - remove this when API is ready
      setTimeout(() => {
        setSavedMethods([
          {
            id: 1,
            type: 'bank',
            name: 'Chase Bank',
            accountNumber: '**** **** **** 4532',
            accountName: 'John Doe',
            isDefault: true,
          },
          {
            id: 2,
            type: 'mobile_banking',
            name: 'bKash',
            accountNumber: '+880 1712-345678',
            accountName: 'John Doe',
            isDefault: false,
          },
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error fetching payment methods:', error)
      setLoading(false)
    }
  }

  const paymentMethodTypes = [
    {
      id: 'bank',
      title: 'Bank Account',
      description: 'Add your bank account details',
      icon: 'bank',
      iconLibrary: 'MaterialCommunityIcons',
      color: Colors.primary_2,
    },
    {
      id: 'mobile_banking',
      title: 'Mobile Banking',
      description: 'Add mobile banking account',
      icon: 'cellphone',
      iconLibrary: 'MaterialCommunityIcons',
      color: Colors.success,
    },
    {
      id: 'credit_card',
      title: 'Credit Card',
      description: 'Add credit card details',
      icon: 'credit-card',
      iconLibrary: 'MaterialCommunityIcons',
      color: Colors.info,
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      description: 'Add net banking account',
      icon: 'web',
      iconLibrary: 'MaterialCommunityIcons',
      color: Colors.secondary_1,
    },
    {
      id: 'digital_wallet',
      title: 'Digital Wallet',
      description: 'Add digital wallet account',
      icon: 'wallet',
      iconLibrary: 'Ionicons',
      color: Colors.warning,
    },
  ]

  const getIconComponent = (iconLibrary, iconName, size, color) => {
    switch (iconLibrary) {
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName} size={size} color={color} />
      case 'Ionicons':
      default:
        return <Ionicons name={iconName} size={size} color={color} />
    }
  }

  const getMethodIcon = (type) => {
    switch (type) {
      case 'bank':
        return <MaterialCommunityIcons name="bank" size={24} color={Colors.primary_2} />
      case 'mobile_banking':
        return <MaterialCommunityIcons name="cellphone" size={24} color={Colors.success} />
      case 'credit_card':
        return <MaterialCommunityIcons name="credit-card" size={24} color={Colors.info} />
      case 'netbanking':
        return <MaterialCommunityIcons name="web" size={24} color={Colors.secondary_1} />
      case 'digital_wallet':
        return <Ionicons name="wallet" size={24} color={Colors.warning} />
      default:
        return <Ionicons name="card" size={24} color={Colors.gray_500} />
    }
  }

  const handleAddPaymentMethod = (methodType) => {
    // Navigate to add payment method screen with the selected type
    Alert.alert(
      'Add Payment Method',
      `Adding ${methodType.title}. This will navigate to the form.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: () => {
            // navigation.navigate('AddPaymentMethod', { type: methodType.id })
            console.log('Navigate to add payment method:', methodType.id)
          },
        },
      ]
    )
  }

  const handleSelectMethod = (method) => {
    setSelectedMethod(method.id)
  }

  const handleRemoveMethod = (methodId) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setSavedMethods(savedMethods.filter(m => m.id !== methodId))
          },
        },
      ]
    )
  }

  const handleSetDefault = (methodId) => {
    setSavedMethods(
      savedMethods.map(method => ({
        ...method,
        isDefault: method.id === methodId,
      }))
    )
  }

  const handleContinue = () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method to continue')
      return
    }
    // Navigate to withdrawal amount screen or next step
    Alert.alert('Success', 'Payment method selected. Proceeding to withdrawal...')
  }

  const renderSavedMethod = (method) => {
    const isSelected = selectedMethod === method.id

    return (
      <TouchableOpacity
        key={method.id}
        style={[
          styles.methodCard,
          isSelected && styles.methodCardSelected,
        ]}
        onPress={() => handleSelectMethod(method)}
        activeOpacity={0.7}
      >
        <View style={styles.methodCardHeader}>
          <View style={styles.methodCardLeft}>
            <View style={[
              styles.methodIconContainer,
              isSelected && styles.methodIconContainerSelected,
            ]}>
              {getMethodIcon(method.type)}
            </View>
            <View style={styles.methodInfo}>
              <View style={styles.methodNameRow}>
                <Text style={styles.methodName}>{method.name}</Text>
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultBadgeText}>Default</Text>
                  </View>
                )}
              </View>
              <Text style={styles.methodAccount}>{method.accountNumber}</Text>
              <Text style={styles.methodAccountName}>{method.accountName}</Text>
            </View>
          </View>
          <View style={styles.methodCardRight}>
            {isSelected ? (
              <View style={styles.selectedIndicator}>
                <Ionicons name="checkmark-circle" size={28} color={Colors.success} />
              </View>
            ) : (
              <View style={styles.unselectedIndicator} />
            )}
          </View>
        </View>

        <View style={styles.methodActions}>
          {!method.isDefault && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleSetDefault(method.id)}
            >
              <Ionicons name="star-outline" size={16} color={Colors.primary_2} />
              <Text style={styles.actionButtonText}>Set as Default</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleRemoveMethod(method.id)}
          >
            <Ionicons name="trash-outline" size={16} color={Colors.danger} />
            <Text style={[styles.actionButtonText, { color: Colors.danger }]}>Remove</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={CommonStyles.safeArea} edges={['top']}>
          <View style={HeaderStyles.header}>
            <HeaderWithBackButton title="Payment Methods" />
            <View style={{ width: 40 }} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary_2} />
            <Text style={styles.loadingText}>Loading payment methods...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={CommonStyles.safeArea} edges={['top']}>
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Payment Methods" />
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={CommonStyles.container_3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: useSystemNavigateSpace(100) }}
        >
          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color={Colors.info} />
            <Text style={styles.infoText}>
              Select your preferred payment method for withdrawals
            </Text>
          </View>

          {/* Saved Payment Methods */}
          {savedMethods.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
              {savedMethods.map(renderSavedMethod)}
            </View>
          )}

          {/* Add New Payment Method */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Add Payment or Bank Account</Text>
              <Ionicons name="add-circle" size={24} color={Colors.primary_2} />
            </View>
            <Text style={styles.sectionDescription}>
              Choose a payment method to add to your account
            </Text>

            <View style={styles.methodTypesContainer}>
              {paymentMethodTypes.map((methodType) => (
                <TouchableOpacity
                  key={methodType.id}
                  style={styles.methodTypeCard}
                  onPress={() => handleAddPaymentMethod(methodType)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.methodTypeIconContainer,
                    { backgroundColor: methodType.color + '15' }
                  ]}>
                    {getIconComponent(
                      methodType.iconLibrary,
                      methodType.icon,
                      32,
                      methodType.color
                    )}
                  </View>
                  <View style={styles.methodTypeInfo}>
                    <Text style={styles.methodTypeTitle}>{methodType.title}</Text>
                    <Text style={styles.methodTypeDescription}>
                      {methodType.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={Colors.gray_500} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Security Note */}
          <View style={styles.securityCard}>
            <Ionicons name="shield-checkmark" size={24} color={Colors.success} />
            <View style={styles.securityTextContainer}>
              <Text style={styles.securityTitle}>Secure & Encrypted</Text>
              <Text style={styles.securityDescription}>
                Your payment information is encrypted and stored securely
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Continue Button */}
        {savedMethods.length > 0 && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !selectedMethod && styles.continueButtonDisabled,
              ]}
              onPress={handleContinue}
              disabled={!selectedMethod}
            >
              <Text style={styles.continueButtonText}>
                Continue with Selected Method
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.gray_600,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.info + '15',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.dark,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark,
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.gray_600,
    marginBottom: 16,
    lineHeight: 20,
  },
  methodCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.gray_100,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  methodCardSelected: {
    borderColor: Colors.success,
    backgroundColor: Colors.success + '05',
  },
  methodCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  methodCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  methodIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: Colors.gray_50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodIconContainerSelected: {
    backgroundColor: Colors.success + '15',
  },
  methodInfo: {
    flex: 1,
  },
  methodNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
  },
  defaultBadge: {
    backgroundColor: Colors.primary_2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  defaultBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.white,
  },
  methodAccount: {
    fontSize: 14,
    color: Colors.gray_600,
    marginBottom: 2,
  },
  methodAccountName: {
    fontSize: 13,
    color: Colors.gray_500,
  },
  methodCardRight: {
    marginLeft: 12,
  },
  selectedIndicator: {
    width: 28,
    height: 28,
  },
  unselectedIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.gray_300,
  },
  methodActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray_100,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary_2,
  },
  methodTypesContainer: {
    gap: 12,
  },
  methodTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray_100,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  methodTypeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodTypeInfo: {
    flex: 1,
  },
  methodTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark,
    marginBottom: 4,
  },
  methodTypeDescription: {
    fontSize: 13,
    color: Colors.gray_600,
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '10',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginTop: 8,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.success_2,
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 13,
    color: Colors.gray_600,
    lineHeight: 18,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray_100,
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  continueButton: {
    backgroundColor: Colors.primary_2,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
})

export default WithdrawMethodScreen