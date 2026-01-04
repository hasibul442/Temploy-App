import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CommonStyles } from '../../utils/styles/CommonStyle';
import PolicyData from '../../utils/data/PolicyData';
import { Colors } from '../../utils/constants/Color';
import { HeaderStyles } from '../../utils/styles/HeaderStyle';
import HeaderWithBackButton from '../../components/Header/HeaderWithBackButton';
import { useSystemNavigateSpace } from '../../utils/helper/Helper';

function PrivacyPolicyScreen() {
  const policySections = PolicyData
  const bottomPadding = useSystemNavigateSpace(40);

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
        <View style={HeaderStyles.header}>
          <HeaderWithBackButton title="Privacy Policy" />
          <View style={{ width: 40 }} />
        </View>
        <ScrollView style={CommonStyles.container_2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottomPadding }}
        >
          <View style={styles.introContainer}>
            <Text style={CommonStyles.introText}>
              Welcome to <Text style={styles.bold}>Temploy</Text> ("we", "us", "our").
            </Text>
            <Text style={CommonStyles.introText}>
              This Privacy Policy explains how we collect, use, disclose, and protect your
              information when you use our website, mobile app, and related services
              (collectively, the "Platform").
            </Text>
            <Text style={[CommonStyles.introText, styles.agreementText]}>
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
            <Text style={styles.lastUpdated}>Last Updated: December 2024</Text>
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
    paddingHorizontal: 16,
  },
  introContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginHorizontal: 10,
    padding: 16,
    marginTop: 20,
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
    marginHorizontal: 10,
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: Colors.gray_600,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default PrivacyPolicyScreen;
