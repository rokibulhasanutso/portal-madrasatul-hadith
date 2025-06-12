import { useEffect, useState } from "react";

// ইংরেজি → বাংলা ডিজিট ম্যাপিং
function convertToBanglaNumber(number) {
  const engToBanglaDigits = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  return number
    .toString()
    .split("")
    .map((digit) => engToBanglaDigits[digit] || digit)
    .join("");
}

// বাংলা দিনের নাম
const banglaDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহঃস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

// বাংলা মাসের নাম
const banglaMonths = [
  "জানুয়ারী",
  "ফেব্রুয়ারী",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

// সময় ফরম্যাট ফাংশন
function getBanglaTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let period = "";
  if (hours >= 4 && hours < 6) {
    period = "ভোর সকাল";
  } else if (hours >= 6 && hours < 12) {
    period = "সকাল";
  } else if (hours >= 12 && hours < 15) {
    period = "দুপুর";
  } else if (hours >= 15 && hours < 18) {
    period = "বিকাল";
  } else if (hours >= 18 && hours < 19) {
    period = "সন্ধ্যা";
  } else if (hours >= 19 && hours < 24) {
    period = "রাত";
  } else {
    period = "গভীর রাত";
  }

  let displayHour = hours % 12;
  displayHour = displayHour === 0 ? 12 : displayHour;

  const banglaHours = convertToBanglaNumber(displayHour);
  const banglaMinutes = convertToBanglaNumber(
    minutes.toString().padStart(2, "0")
  );

  return `${period} ${banglaHours} : ${banglaMinutes}`;
}

// তারিখ ফরম্যাট ফাংশন
function getBanglaDate(date) {
  const dayName = banglaDays[date.getDay()];
  const day = convertToBanglaNumber(date.getDate().toString().padStart(2, "0"));
  const month = banglaMonths[date.getMonth()];
  const year = convertToBanglaNumber(date.getFullYear());

  return `${dayName}, ${day} ${month}, ${year}`;
}

// ✅ কাস্টম হুক
export function useBanglaDateTime() {
  const [banglaDateTime, setBanglaDateTime] = useState({
    time: getBanglaTime(new Date()),
    date: getBanglaDate(new Date()),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setBanglaDateTime({
        time: getBanglaTime(now),
        date: getBanglaDate(now),
      });
    }, 1000); // প্রতি ১ সেকেন্ডে আপডেট

    return () => clearInterval(interval); // ক্লিনআপ
  }, []);

  return banglaDateTime;
}
