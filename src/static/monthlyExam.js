// ========================================
// 📅 1️⃣ Common Exam Dates
// ========================================

import { classNamelist } from "./commonData";

export const examDates = {
  common: [
    { date: "০৫/১০/২০২৬", week: "সোমবার" },
    { date: "০৬/১০/২০২৬", week: "মঙ্গলবার" },
    { date: "০৭/১০/২০২৬", week: "বুধবার" },
    { date: "০৮/১০/২০২৬", week: "বৃহস্পতিবার" },
    { date: "১০/১০/২০২৬", week: "শনিবার" },
  ],
  upper: [
    { date: "০৩/১০/২০২৬", week: "শনিবার" },
    { date: "০৪/১০/২০২৬", week: "রবিবার" },
    { date: "০৫/১০/২০২৬", week: "সোমবার" },
    { date: "০৬/১০/২০২৬", week: "মঙ্গলবার" },
    { date: "০৭/১০/২০২৬", week: "বুধবার" },
    { date: "০৮/১০/২০২৬", week: "বৃহস্পতিবার" },
    { date: "১০/১০/২০২৬", week: "শনিবার" },
  ],
};

// ========================================
// 📚 2️⃣ Subjects By Class
// ========================================

export const secondTermSubjects = {
  1: {
    class_id: 1,
    type: "common",
    fee: 130,
    subjects: ["গণিত", "আরবি লেখা", "বাংলা", "ইংরেজি + বাংলা দিয়ে ইংরেজি শিখি", "কালিমা ও মাসাইল + হাদিস শরীফ"],
  },

  2: {
    class_id: 2,
    type: "common",
    fee: 140,
    subjects: ["ইংরেজি + বাংলা দিয়ে ইংরেজি শিখি", "বাংলা", "আরবি লেখা", "কালিমা ও মাসাইল + হাদিস শরীফ", "গনিত"],
  },

  3: {
    class_id: 3,
    type: "common",
    fee: 150,
    subjects: [
      "আরবি লেখা + হাদিস শরীফ",
      "গণিত + আদ: সালাত ও আদ: মাসনূনাহ্‌",
      "কালিমা-মাসাইল ও সাধারণ জ্ঞান",
      "বাংলা + মাখরাজ ও তাজবীদ",
      "ইংরেজি + বাংলা দিয়ে ইংরেজি শিখি",
    ],
  },

  4: {
    class_id: 4,
    type: "common",
    fee: 180,
    subjects: [
      "পরিবেশ পরিচিতি ও সাধারণ জ্ঞান + কালিমা-মাসাইল",
      "ইংরেজি + বাংলা দিয়ে ইংরেজি শিখি",
      "গণিত + ‌হাদিস ও আস্‌মাউল হুসনা",
      "আরবি লেখা + কুরআন মাজিদ ও তাজবীদ",
      "বাংলা + আদ: সালাত ও আদ: মাসনূনাহ্",
    ],
  },

  5: {
    class_id: 5,
    type: "common",
    fee: 200,
    subjects: [
      "আরবি লেখা + কুরআন মাজিদ ও তাজবীদ",
      "গণিত + ‌কালিমা-মাসাইল",
      "সমাজ - বিজ্ঞান ও সাধারণ জ্ঞান",
      "বাংলা + আদ: সালাত ও আদ: মাসনূনাহ্",
      "ইংরেজি - বাংলা দিয়ে ইংরেজি শিখি + হাদিস ও আস্‌মাউল হুসনা",
    ],
  },

  6: {
    class_id: 6,
    type: "upper",
    fee: 250,
    subjects: [
      "কুরআন মাজিদ + আকাইদ ও ফিকহ্",
      "বাংলাদেশ ও বিশ্বপরিচয়",
      "ইংরেজি",
      "গণিত",
      "বিজ্ঞান",
      "আদ্‌দুরূসুল আরাবিয়্যাহ্",
      "বাংলা",
    ],
  },

  7: {
    class_id: 7,
    type: "upper",
    fee: 270,
    subjects: [
      "আকাইদ ও ফিকহ্ + কুরআন মাজিদ",
      "বাংলাদেশ ও বিশ্বপরিচয়",
      "বাংলা",
      "গণিত",
      "ইংরেজি",
      "আদ্‌দুরূসুল আরাবিয়্যাহ্",
      "বিজ্ঞান",
    ],
  },

  8: {
    class_id: 8,
    type: "upper",
    fee: 400,
    subjects: [
      "ইংরেজি ১ম + ইংরেজি ২য়",
      "ইসলাম শিক্ষা",
      "গনিত",
      "তথ্য ও যোগাযোগ প্রযুক্তি + কৃষি শিক্ষা",
      "বিজ্ঞান",
      "বাংলাদেশ ও বিশ্বপরিচয়",
      "বাংলা ১ম + বাংলা ২য়",
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
