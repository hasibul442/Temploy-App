import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CommonStyles } from '../../utils/styles/CommonStyle';
import Terms from '../../utils/data/Terms';
import { Colors } from '../../utils/constants/Color';

const termsSections = Terms;

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
        <ScrollView style={CommonStyles.container_2} showsVerticalScrollIndicator={false}>
          <View style={CommonStyles.header_1}>
            <Text style={CommonStyles.headerTitle_1}>Terms of Service</Text>
            <Text style={styles.lastUpdated}>Last Updated: December 2024</Text>
          </View>

          <View style={styles.introContainer}>
            <Text style={CommonStyles.introText}>
              Welcome to <Text style={styles.bold}>Temploy</Text> ("Temploy," "we," "our," "us").
            </Text>
            <Text style={CommonStyles.introText}>
              These Terms of Service ("Terms") govern your access to and use of the Temploy
              website, mobile app, and all related services (collectively, the "Platform").
            </Text>
            <Text style={[CommonStyles.introText, styles.agreementText]}>
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

  lastUpdated: {
    fontSize: 13,
    color: Colors.gray_500,
    fontStyle: 'italic',
  },
  introContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bold: {
    fontWeight: 'bold',
    color: Colors.gray_800,
  },
  agreementText: {
    marginBottom: 0,
    fontStyle: 'italic',
  },
  sectionsContainer: {
    marginBottom: 20,
  },
  sectionContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.gray_800,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    color: Colors.gray_700,
    lineHeight: 22,
  },
  subsection: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.gray_100,
  },
  subsectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray_700,
    marginBottom: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: Colors.gray_600,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default TermsOfServiceScreen;
