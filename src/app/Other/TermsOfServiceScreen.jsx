import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CommonStyles } from '../../utils/styles/CommonStyle';

const termsSections = [
  {
    id: 1,
    title: '1. About Temploy',
    content:
      'Temploy is a marketplace that connects Clients who need physical tasks completed with Taskers who can perform those tasks.\n\nTemploy is not an employer, contractor, or agent of any Tasker. All tasks are performed by independent individuals.',
  },
  {
    id: 2,
    title: '2. Eligibility',
    content:
      'You must:\n\n• Be at least 18 years old\n• Create an account with accurate information\n• Comply with these Terms and all applicable laws\n\nYou may not use Temploy if you have been suspended or removed from the Platform.',
  },
  {
    id: 3,
    title: '3. Creating an Account',
    content:
      'You are responsible for:\n\n• Maintaining the confidentiality of your login details\n• All activity under your account\n• Providing accurate and updated information\n\nTemploy may verify your identity and request documentation.',
  },
  {
    id: 4,
    title: '4. Posting and Accepting Tasks',
    content: null,
    subsections: [
      {
        id: '4a',
        title: 'Clients',
        content:
          'Clients may post tasks by providing descriptions, budget, photos, and location. Clients agree to provide accurate information and ensure the task is safe and lawful.',
      },
      {
        id: '4b',
        title: 'Taskers',
        content:
          'Taskers may browse and accept tasks they are qualified to perform. By accepting a task, you enter a direct service agreement with the Client.\n\nTemploy is not responsible for the work performed by Taskers.',
      },
    ],
  },
  {
    id: 5,
    title: '5. Payments',
    content:
      'Temploy uses secure third-party payment processors. By using the Platform, you authorize:\n\n• Clients: to pay for tasks through Temploy\n• Taskers: to receive payouts after task completion',
    subsections: [
      {
        id: '5a',
        title: 'A. Escrow System',
        content:
          'Client payments are held in escrow and released only after the Client confirms completion.',
      },
      {
        id: '5b',
        title: 'B. Platform Fees',
        content:
          'Temploy charges service fees to Clients and/or Taskers. Fees are displayed before confirming a task.',
      },
      {
        id: '5c',
        title: 'C. Cancellations & Refunds',
        content: "Refunds are processed according to Temploy's Cancellation & Refund Policy.",
      },
    ],
  },
  {
    id: 6,
    title: '6. Tasker Responsibilities',
    content:
      'Taskers agree to:\n\n• Provide accurate skills and availability information\n• Arrive on time and complete tasks safely\n• Bring necessary tools unless otherwise agreed\n• Maintain professionalism\n• Comply with local laws and regulations\n• Not engage in dangerous or prohibited activities\n\nTaskers are independent contractors and are responsible for taxes, licenses, or permits.',
  },
  {
    id: 7,
    title: '7. Client Responsibilities',
    content:
      'Clients agree to:\n\n• Provide a safe environment for the Tasker\n• Give clear and accurate task instructions\n• Not request illegal or harmful work\n• Treat Taskers respectfully\n• Confirm task completion promptly',
  },
  {
    id: 8,
    title: '8. Prohibited Activities',
    content:
      'Users may NOT:\n\n• Commit fraud or misrepresentation\n• Harass, abuse, or harm others\n• Engage in violence, theft, or unsafe behavior\n• Post tasks involving illegal activities\n• Circumvent Temploy\'s payment system\n• Use bots, scripts, or unauthorized tools\n• Interfere with platform operations\n• Create multiple accounts to bypass rules\n\nViolation may result in suspension or permanent removal.',
  },
  {
    id: 9,
    title: '9. Ratings & Reviews',
    content:
      'Users may leave honest ratings and reviews after task completion.\n\nYou may not:\n\n• Post fake or misleading reviews\n• Demand positive reviews\n• Manipulate ratings in any way\n\nTemploy may remove reviews that violate guidelines.',
  },
  {
    id: 10,
    title: '10. Disputes Between Users',
    content:
      'Temploy provides dispute assistance but is not responsible for resolving disagreements between Clients and Taskers.\n\nAll agreements made between users are independent of Temploy.',
  },
  {
    id: 11,
    title: '11. Insurance & Liability',
    content:
      'Temploy does not provide liability insurance for users. Clients and Taskers assume all risks associated with physical tasks.\n\nTo the fullest extent permitted by law:\n\n• Temploy is not liable for personal injury, property damage, lost profits, or any damages resulting from platform use.\n• You use the Platform at your own risk.',
  },
  {
    id: 12,
    title: '12. Termination',
    content:
      'Temploy may suspend or delete your account if you:\n\n• Violate these Terms\n• Engage in harmful or illegal behavior\n• Pose safety risks to others\n• Misuse the Platform\n\nYou may also delete your account at any time.',
  },
  {
    id: 13,
    title: '13. Intellectual Property',
    content:
      'All content on Temploy—including logos, graphics, text, and software—is owned by Temploy and protected by copyright and trademark laws.\n\nUsers may not copy, modify, or distribute platform content without permission.',
  },
  {
    id: 14,
    title: '14. Communications',
    content:
      'By using Temploy, you agree to receive:\n\n• Transactional emails (task updates, confirmations)\n• Service notifications\n• Optional marketing messages (you can opt out)',
  },
  {
    id: 15,
    title: '15. Third-Party Services',
    content:
      'Temploy may use third-party tools for:\n\n• Payments\n• Background checks\n• Analytics\n• Messaging\n\nTemploy is not responsible for third-party failures or policies.',
  },
  {
    id: 16,
    title: '16. Changes to These Terms',
    content:
      'Temploy may update these Terms at any time. If changes are significant, we will notify you through the Platform or email.\n\nContinued use of Temploy means you accept the updated Terms.',
  },
  {
    id: 17,
    title: '17. Governing Law',
    content:
      'These Terms are governed by the applicable laws of your jurisdiction, without regard to conflict-of-law rules.\n\nAny disputes must be resolved in the appropriate courts of your jurisdiction.',
  },
  {
    id: 18,
    title: '18. Contact Us',
    content:
      'If you have questions about these Terms, contact us at:\n\n:e-mail: Email: support@temploy.com\n:globe_with_meridians: Website: www.temploy.com',
  },
];

function TermsOfServiceScreen() {
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
    <SafeAreaProvider>
      <SafeAreaView style={CommonStyles.safeArea} edges={['top']}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Terms of Service</Text>
            <Text style={styles.lastUpdated}>Last Updated: December 2024</Text>
          </View>

          <View style={styles.introContainer}>
            <Text style={styles.introText}>
              Welcome to <Text style={styles.bold}>Temploy</Text> ("Temploy," "we," "our," "us").
            </Text>
            <Text style={styles.introText}>
              These Terms of Service ("Terms") govern your access to and use of the Temploy
              website, mobile app, and all related services (collectively, the "Platform").
            </Text>
            <Text style={[styles.introText, styles.agreementText]}>
              By creating an account or using Temploy, you agree to be bound by these Terms. If you
              do not agree, do not use the Platform.
            </Text>
          </View>

          <View style={styles.sectionsContainer}>
            {termsSections.map((section) => (
              <SectionItem key={section.id} section={section} />
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Thank you for using Temploy. If you have any questions about these Terms, please
              contact our support team.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
  },
  introContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
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

export default TermsOfServiceScreen;
