// ========================================
// 📅 1️⃣ Common Exam Dates
// ========================================

import { classNamelist } from "./commonData";

export const examDates = {
  common: [
    { date: "১৯/০৫/২০২৬", week: "মঙ্গলবার" },
    { date: "২০/০৫/২০২৬", week: "বুধবার" },
    { date: "২১/০৫/২০২৬", week: "বৃহস্পতিবার" },
    { date: "২৩/০৫/২০২৬", week: "শনিবার" },
    { date: "২৪/০৫/২০২৬", week: "রবিবার" },
    { date: "২৫/০৫/২০২৬", week: "সোমবার" },
  ],
  // upper: [
  //   { date: "০২-১২-২০২৫", week: "মঙ্গলবার" },
  //   { date: "০৩-১২-২০২৫", week: "বুধবার" },
  // ],
};

// ========================================
// 📚 2️⃣ Subjects By Class
// ========================================

export const secondTermSubjects = {
  1: {
    class_id: 1,
    type: "common",
    fee: 130,
    subjects: ["গণিত", "ইংরেজি", "বাংলা", "আরবি লেখা", "কালিমা ও মাসাইল", "হাদীস শরীফ + বাংলা দিয়ে ইংরেজি শিখি"],
  },

  2: {
    class_id: 2,
    type: "common",
    fee: 140,
    subjects: ["ইংরেজি", "গনিত", "হাদীস শরীফ", "বাংলা", "আরবি লেখা", "কালিমা ও মাসাইল + বাংলা দিয়ে ইংরেজি শিখি"],
  },

  3: {
    class_id: 3,
    type: "common",
    fee: 150,
    subjects: [
      "আরবি লেখা",
      "কুরআন মাজিদ ও তাজবীদ + আদঃ সালাত ও আদঃ মাসনুনাহ",
      "কালিমা-মাসাইল ও সাধারণ জ্ঞান + হাদীস শরীফ",
      "গণিত",
      "ইংরেজি + বাংলা দিয়ে ইংরেজি শিখি",
      "বাংলা"
    ],
  },

  4: {
    class_id: 4,
    type: "common",
    fee: 180,
    subjects: [
      "আরবী লেখা + কালিমা ও মাসাইল",
      "পরিবেশ পরিচিতি ও সাধারণ জ্ঞান + হাদিস ও আস. হুসনা",
      "কুরআন মাজিদ ও তাজবীদ + আদঃ সালাত ও আদঃ মাসনুনাহ",
      "বাংলা",
      "ইংরেজি + বাংলা দিয়ে ইংরেজি শিখি",
      "গণিত",
    ],
  },

  5: {
    class_id: 5,
    type: "common",
    fee: 200,
    subjects: [
      "আরবী লেখা + হাদিস শরীফ ও আস. হুসনা",
      "সমাজ বিজ্ঞান ও সাধারণ জ্ঞান",
      "গনিত",
      "ইংরেজি + বাংলা দিয়ে ইংরেজি শিখি",
      "বাংলা + কালিমা ও মাসাইল",
      "কুরআন মাজিদ ও তাজবীদ + আদঃ সালাত ও আদঃ মাসনুনাহ",
    ],
  },

  6: {
    class_id: 6,
    type: "common",
    fee: 230,
    subjects: [
      "গণিত + আকাইদ ও ফিকহ্‌",
      "বাংলা + কুরআন মাজিদ",
      "ইংরেজি",
      "বিজ্ঞান",
      "সমাজ",
      "আদ্‌দুরূসুল আরাবিয়্যাহ্ ১ম/২য় পত্র",
    ],
  },

  7: {
    class_id: 7,
    type: "common",
    fee: 250,
    subjects: [
      "আদ্‌দুরূসুল আরাবিয়্যাহ্ ১ম/২য় পত্র + কুরআন মাজিদ",
      "গণিত",
      "বাংলা",
      "বিজ্ঞান",
      "ইংরেজি",
      "সমাজ + আকাইদ ও ফিকহ্‌",
    ],
  },

  8: {
    class_id: 8,
    type: "common",
    fee: 280,
    subjects: [
      "ইংরেজি + তথ্য ও যোগাযোগ প্রযুক্তি",
      "বাংলা ১ম/২য় পত্র",
      "গনিত",
      "বিজ্ঞান",
      "সমাজ + কৃষি শিক্ষা",
      "ইংরেজি ২য় + ইসলাম শিক্ষা",
    ],
  },
};

// ========================================
// 🧠 3️⃣ Universal Routine Generator
// ========================================

// ========================================
// 🧠 3️⃣ Universal Routine Generator (Updated)
// ========================================

export const getSecondTermRoutines = (classNum = null) => {
  const generateRoutine = (cls) => {
    const classData = secondTermSubjects[cls];
    if (!classData) return null;

    const dates = examDates[classData.type];

    const routine = classData.subjects.map((subject, index) => ({
      ...dates[index],
      subject,
    }));

    return {
      class: classNamelist[classData.class_id],
      type: classData.type,
      fee: classData.fee,
      routine,
    };
  };

  // 👉 যদি নির্দিষ্ট ক্লাস চাওয়া হয়
  if (classNum) {
    return generateRoutine(classNum);
  }

  // 👉 যদি সব ক্লাস চাওয়া হয়
  return Object.keys(secondTermSubjects).map((cls) => generateRoutine(cls));
};
