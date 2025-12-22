import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/fontawesome6";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { Colors } from "../../utils/constants/Color";
import FAQData from "../../utils/data/FAQData";

const faqSections = FAQData;
function FAQScreen() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  function FAQItem({ item }) {
    const isExpanded = expandedId === item.id;

    return (
      <TouchableOpacity
        style={styles.faqItem}
        onPress={() => toggleExpand(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.questionRow}>
          <Text style={styles.questionText}>{item.question}</Text>
          <FontAwesome6
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={16}
            color={Colors.gray_600}
            iconStyle="solid"
          />
        </View>
        {isExpanded && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{item.answer}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
      <SafeAreaView style={CommonStyles.safeArea} edges={["top"]}>
        <ScrollView
          style={CommonStyles.container_2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View style={CommonStyles.header_1}>
            <Text style={CommonStyles.headerTitle_1}>Frequently Asked Questions</Text>
            <Text style={styles.headerSubtitle}>
              Find answers to common questions about Temploy
            </Text>
          </View>

          {faqSections.map((section) => (
            <View key={section.id} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.faqContainer}>
                {section.data.map((item) => (
                  <FAQItem key={item.id} item={item} />
                ))}
              </View>
            </View>
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Still have questions?</Text>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  headerSubtitle: {
    fontSize: 14,
    color: Colors.green_pantone,
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.green_dark_moss,
    marginBottom: 12,
  },
  faqContainer: {
    marginBottom: 0,
  },
  faqItem: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 10,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.green_dark_moss,
    flex: 1,
    marginRight: 10,
  },
  answerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light_gray,
  },
  answerText: {
    fontSize: 14,
    color: Colors.dark_gray,
    lineHeight: 22,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 16,
    color: Colors.dark_gray,
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: Colors.basil_orange_800,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FAQScreen;
