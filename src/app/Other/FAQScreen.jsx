import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { CommonStyles } from "../../utils/styles/CommonStyle";
import { Colors } from "../../utils/constants/Color";

const faqSections = [
  {
    id: "general",
    title: "General FAQs",
    data: [
      {
        id: 1,
        question: "What is Temploy?",
        answer:
          "Temploy is a marketplace that connects people who need physical, in-person tasks completed with skilled, verified taskers in their local area.",
      },
      {
        id: 2,
        question: "What types of tasks can be done on Temploy?",
        answer:
          "Temploy supports a wide range of tasks, including:\n\n• Home cleaning\n• Furniture assembly\n• Delivery & pickup\n• Moving help\n• Repairs & handyman tasks\n• Event assistance\n• Outdoor work (gardening, snow removal)\n• General errands",
      },
      {
        id: 3,
        question: "Is Temploy available everywhere?",
        answer:
          "Temploy operates in selected areas and is expanding. Availability may vary based on your location and local tasker supply.",
      },
      {
        id: 4,
        question: "How does Temploy ensure safety?",
        answer:
          "We use:\n\n• ID verification\n• Secure payment protection\n• Rating & review system\n• Optional background checks (location dependent)\n• Customer support for dispute handling",
      },
    ],
  },
  {
    id: "client",
    title: "Client (Customer) FAQs",
    data: [
      {
        id: 5,
        question: "How do I post a task?",
        answer:
          "Simply create an account, describe your task, add photos if needed, set a budget & time, and publish it. Local taskers will start applying.",
      },
      {
        id: 6,
        question: "How are prices determined?",
        answer:
          "You can:\n\n• Set your own budget, or\n• Choose from taskers' proposed offers\n\nFinal pricing depends on task complexity and urgency.",
      },
      {
        id: 7,
        question: "How do I choose the right tasker?",
        answer:
          "Review:\n\n• Their ratings & reviews\n• Skill tags\n• Verification status\n• Task history\n• Offered price",
      },
      {
        id: 8,
        question: "When do I pay for a task?",
        answer:
          "Payment is securely processed upfront and kept in escrow. Funds are only released to the tasker after you confirm the job is completed.",
      },
      {
        id: 9,
        question: "What if the tasker doesn't show up?",
        answer:
          "If a tasker cancels or doesn't arrive, you can:\n\n• Request another tasker\n• Reschedule\n• Receive a refund (according to refund policy)",
      },
      {
        id: 10,
        question: "Can I cancel a task after posting?",
        answer:
          "Yes — cancellation rules depend on whether a tasker has already accepted the job. Tasks canceled early are typically fully refundable.",
      },
      {
        id: 11,
        question: "What if I'm not satisfied with the work?",
        answer:
          "You can:\n\n• Request adjustments\n• Open a dispute with Temploy support\n• Withhold payment until resolved",
      },
    ],
  },
  {
    id: "tasker",
    title: "Tasker FAQs",
    data: [
      {
        id: 12,
        question: "How do I become a tasker on Temploy?",
        answer:
          "Create an account → Complete your profile → Upload ID → Set your skills & rates → Start applying for tasks in your area.",
      },
      {
        id: 13,
        question: "How do I get paid?",
        answer:
          "After the client confirms the task is completed, your earnings are released to your Temploy wallet, and you can withdraw to your bank or payment account.",
      },
      {
        id: 14,
        question: "Does Temploy charge taskers a fee?",
        answer:
          "Yes, Temploy charges a service fee from each completed task to support platform maintenance, support, and security.",
      },
      {
        id: 15,
        question: "How do I increase my chances of getting tasks?",
        answer:
          "• Maintain a strong rating\n• Respond quickly\n• Upload a professional profile photo\n• Provide clear descriptions of your skills\n• Keep prices competitive\n• Complete tasks reliably",
      },
      {
        id: 16,
        question: "Can I cancel a task after accepting it?",
        answer:
          "Cancelling should only be done when necessary. Frequent cancellations may lower your rating and reduce future task opportunities.",
      },
      {
        id: 17,
        question: "Do I need to bring my own tools?",
        answer:
          "Most clients expect taskers to bring tools for relevant jobs. Temploy also allows you to charge extra for tools or equipment.",
      },
      {
        id: 18,
        question: "What happens if there is an issue during a task?",
        answer:
          "Contact the client through chat. If unresolved, reach out to Temploy support. We help mediate disputes and ensure fair outcomes.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Safety FAQs",
    data: [
      {
        id: 19,
        question: "Is Temploy free to join?",
        answer:
          "Yes. Creating an account for both clients and taskers is completely free.",
      },
      {
        id: 20,
        question: "How is my data protected?",
        answer:
          "Temploy uses secure encryption, strict privacy policies, and industry-standard protection for all personal and payment information.",
      },
      {
        id: 21,
        question: "How do ratings work?",
        answer:
          "After every completed task, both the client and tasker can rate each other and leave feedback. High ratings help boost visibility and trust.",
      },
    ],
  },
  {
    id: "support",
    title: "Support FAQs",
    data: [
      {
        id: 22,
        question: "How do I contact Temploy support?",
        answer:
          "You can reach us through the in-app support chat or email support from your Temploy account settings.",
      },
      {
        id: 23,
        question: "What if I forgot my password?",
        answer:
          'Use the "Forgot Password" option on the login page to reset it securely.',
      },
    ],
  },
];

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
            color="#666"
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
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
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
  container: {
    flex: 1,
    backgroundColor: Colors.light_gray_2,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
    backgroundColor: Colors.success_2,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
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
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FAQScreen;
