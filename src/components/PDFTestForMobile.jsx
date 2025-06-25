import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf,
} from "@react-pdf/renderer";
import ExamAdmitCard from "./ExamAdmitCard";

// ফন্ট রেজিস্ট্রেশন (বাংলা ফন্ট)
Font.register({
  family: "Tiro-bangla",
  src: "/assets/fonts/TiroBangla-Regular.ttf", // নিশ্চিত করুন path সঠিক
});

// স্টাইলস
const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: "Tiro-bangla" },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 },
});

// ডেটা
const data = [
  {
    name: "John Doe",
    description: "123 Main St",
  },
  {
    name: "Jane Doe",
    description: "456 Elm St",
  },
  {
    name: "Bob Smith",
    description: "789 Oak St",
  },
];

// PDF ডকুমেন্ট কম্পোনেন্ট
const MyPDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>PDF ডেটা রিপোর্ট</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.text}>নাম: {item.name}</Text>
          <Text style={styles.text}>বর্ণনা: {item.description}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

// মূল কম্পোনেন্ট
const PDFTestForMobile = () => {
  const handleViewPDF = async () => {
    const blob = await pdf(<ExamAdmitCard />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, ""); // নতুন ট্যাবে PDF দেখাবে
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>পরীক্ষার অ্যাডমিট কার্ড দেখুন</h2>
      <button onClick={handleViewPDF}>PDF দেখুন</button>
    </div>
  );
};

export default PDFTestForMobile;
