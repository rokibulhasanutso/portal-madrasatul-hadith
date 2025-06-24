import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Tiro-bangla",
  src: "/assets/fonts/TiroBangla-Regular.ttf", // adjust path as needed
});

const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: "Tiro-bangla" },
  section: { marginBottom: 10 },
  heading: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12 },
});

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

const ExamAdmitFile = () => {
  return (
    <PDFViewer style={{ width: "100%", height: "100%" }}>
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
    </PDFViewer>
  );
};

export default ExamAdmitFile;
