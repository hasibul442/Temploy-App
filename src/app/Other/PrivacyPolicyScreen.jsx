import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonStyles } from '../../utils/styles/CommonStyle';
import { Colors } from '../../utils/constants/Color';

const policySections = [
  {
    id: 1,
    title: '1. Information We Collect',
    content: null,
    subsections: [
      {
        id: '1a',
        title: 'A. Information You Provide Directly',
        content:
          '• Account details: name, email, phone number, password\n• Profile information: photo, skills, bio, experience\n• Task information: descriptions, photos, preferences\n• Payment details: bank account info, payout details (processed through secure third-party payment processors)\n• Verification data: ID uploads, documents for identity check\n• Communication content: messages, support requests',
      },
      {
        id: '1b',
        title: 'B. Information Collected Automatically',
        content:
          'When you use Temploy, we may automatically collect:\n\n• Device information: IP address, device model, OS\n• Usage data: pages viewed, actions taken, app interactions\n• Location data: GPS/location for finding nearby tasks (with your permission)\n• Cookies & tracking technologies: to improve functionality and performance',
      },
      {
        id: '1c',
        title: 'C. Information from Third Parties',
        content:
          'We may receive:\n\n• Identity verification results\n• Background check information (if applicable)\n• Payment confirmation from payment processors\n• Analytics data (e.g., Google Analytics, app analytics tools)',
      },
    ],
  },
  {
    id: 2,
    title: '2. How We Use Your Information',
    content:
      'Temploy uses collected information to:\n\n• Create and manage user accounts\n• Match clients with suitable taskers\n• Process payments and payouts\n• Enable communication between users\n• Improve platform functionality and user experience\n• Provide customer support\n• Monitor safety, prevent fraud, and enforce our policies\n• Send updates, notifications, and promotional content (you may opt out)',
  },
  {
    id: 3,
    title: '3. How We Share Your Information',
    content: 'We do not sell your personal information.\nWe may share information in the following situations:',
    subsections: [
      {
        id: '3a',
        title: 'A. With Other Users',
        content:
          'When you interact with others:\n\n• Clients see tasker profiles, ratings, skills, location approximation\n• Taskers see task details and client profiles',
      },
      {
        id: '3b',
        title: 'B. With Service Providers',
        content:
          'Trusted third parties that help us operate the platform, including:\n\n• Payment processors\n• Identity verification services\n• Hosting providers\n• Analytics and marketing tools',
      },
      {
        id: '3c',
        title: 'C. For Legal or Safety Reasons',
        content:
          'We may share information if required to:\n\n• Comply with laws\n• Respond to legal requests\n• Protect rights, property, or safety of users or the platform',
      },
    ],
  },
  {
    id: 4,
    title: '4. Your Choices & Rights',
    content:
      'Depending on your location, you may have the right to:\n\n• Access and update your personal data\n• Delete your account and related information\n• Restrict or object to certain processing activities\n• Download a copy of your data\n• Manage notification preferences\n• Turn location access on or off\n\nTo exercise these rights, contact us at: support@temploy.com',
  },
  {
    id: 5,
    title: '5. Data Security',
    content:
      'We use industry-standard measures to protect your information, including:\n\n• Encryption\n• Secure servers\n• Restricted access controls\n\nHowever, no system is 100% secure. We cannot guarantee absolute protection.',
  },
  {
    id: 6,
    title: "6. Children's Privacy",
    content:
      "Temploy is not intended for anyone under 18 years old.\nWe do not knowingly collect data from minors.\nIf we discover a minor's account, it will be removed.",
  },
  {
    id: 7,
    title: '7. Data Retention',
    content:
      'We may retain your information:\n\n• As long as your account is active\n• To comply with legal obligations\n• To resolve disputes or enforce our terms\n\nYou may request deletion at any time.',
  },
  {
    id: 8,
    title: '8. International Data Transfers',
    content:
      'Your information may be stored or processed outside your country.\nWe take steps to ensure your data is protected according to applicable laws.',
  },
  {
    id: 9,
    title: '9. Changes to This Privacy Policy',
    content:
      'We may update this policy from time to time.\nIf changes are significant, we will notify you via email or in-app notifications.\nContinued use of Temploy means you accept the updated policy.',
  },
  {
    id: 10,
    title: '10. Contact Us',
    content:
      'If you have any questions about this Privacy Policy or your data rights, contact us at:\n\n:e-mail: Email: support@temploy.com\n:globe_with_meridians: Website: www.temploy.com',
  },
];

function PrivacyPolicyScreen() {
  const SectionItem = ({ section }) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{section.title}</Text>

        {section.content && <Text style={styles.contentText}>{section.content}</Text>}

        {section.subsections?.map((sub) => (
          <View key={sub.id} style={styles.subsection}>
            <Text style={styles.subsectionTitle}>{sub.title}</Text>
            <Text style={styles.contentText}>{sub.content}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={CommonStyles.safeArea} edges={['top']}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Privacy Policy</Text>
            <Text style={styles.lastUpdated}>Last Updated: December 2024</Text>
          </View>

          <View style={styles.introContainer}>
            <Text style={styles.introText}>
              Welcome to <Text style={styles.bold}>Temploy</Text> ("we", "us", "our").
            </Text>
            <Text style={styles.introText}>
              This Privacy Policy explains how we collect, use, disclose, and protect your
              information when you use our website, mobile app, and related services
              (collectively, the "Platform").
            </Text>
            <Text style={[styles.introText, styles.agreementText]}>
              By using Temploy, you agree to the practices described in this Privacy Policy.
            </Text>
          </View>

          <View style={styles.sectionsContainer}>
            {policySections.map((section) => (
              <SectionItem key={section.id} section={section} />
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              If you have any concerns about our privacy practices, please don't hesitate to
              contact us.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light_gray_2,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    backgroundColor: Colors.success_2,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lastUpdated: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    paddingHorizontal: 16,
  },
  introContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 10,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  introText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#333',
  },
  agreementText: {
    marginBottom: 0,
    fontStyle: 'italic',
  },
  sectionsContainer: {
    marginBottom: 20,

  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
      marginHorizontal: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  subsection: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PrivacyPolicyScreen;
