import { PrintPage } from "@/components/pageComponent/A4page";
import { enToBnNumber } from "@/utils/functions";
import { Fragment } from "react";

const ClassBaseExamRoutine = ({ data: routine = {}, instituteInfo = {} }) => {
  const examInstructions = [
    `পরীক্ষা ${instituteInfo?.examStartTime}য় শুরু হওয়ার ৩০ মিনিট পূর্বে নিজ নিজ আসন গ্রহণ করতে হবে।`,
    "প্রত্যেক পরীক্ষায় প্রবেশপত্র সাথে আনতে হবে।",
    "পরীক্ষায় হলে কলম, পেন্সিল, রাবার, ক্যালকুলেটর, প্রবেশপত্র ও শিক্ষা উপকরণ ছাড়া অন্য কিছু রাখা যাবে না।",
    "উত্তরপত্রে প্রথমে নাম, রোল, শ্রেণী ভালোভাবে লিখতে হবে।",
    "পরীক্ষায় অসদুপায় অবলম্বন করলে পরীক্ষার্থী বহিষ্কার হতে পারে।",
  ];

  return Object.entries(routine).map(([classNum, data]) => (
    <Fragment key={classNum}>
      <PrintPage
        size="A4"
        orientation="portrait"
        padding={{ x: 3, y: 0, unit: "cm" }}
        className="flex flex-col justify-center text-[14pt]"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-[32pt] font-galada">{instituteInfo?.name}</h1>
          <p>{instituteInfo?.address}</p>
          <p className="mt-1">{instituteInfo?.examTitle}</p>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="font-semibold text-white bg-black inline-block py-2 px-8 rounded-full text-[18pt]">
            {data?.class} শ্রেণীর ১ম সাময়িক পরীক্ষার রুটিন
          </h2>
        </div>

        {/* Table */}
        <table className="w-full border-2 border-black border-collapse text-[14pt]">
          <thead className="">
            <tr>
              <th className="border border-black py-2 w-30">তারিখ</th>
              <th className="border border-black py-2 w-30">বার</th>
              <th className="border border-black py-2">বিষয়</th>
            </tr>
          </thead>

          <tbody>
            {data?.routine?.map((row, index) => (
              <tr key={index} className="text-center odd:bg-gray-100">
                <td className="border border-black py-2">{row.date}</td>
                <td className="border border-black py-2">{row.week}</td>
                <td className="border border-black py-2 px-4">{row.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Fee */}
        <div className="text-center mt-6">
          <p className="font-semibold text-[24pt]">
            পরীক্ষার ফি {enToBnNumber(data?.fee || 0)} টাকা
          </p>
        </div>

        {/* Instruction */}
        <div className="border-2 border-black rounded-2xl mt-6">
          {/* Instructions Header */}
          <div className="bg-black/10 text-black text-center pb-2 pt-4 font-medium rounded-t-2xl text-[16pt] font-galada">
            শিক্ষার্থীদের জন্য বিশেষ নির্দেশনা
          </div>

          {/* Instructions List */}
          <ul className="my-4 space-y-2 leading-relaxed px-6 text-justify">
            {examInstructions.map((item, index) => (
              <li
                key={index}
                className="grid grid-cols-[30px_auto] items-start"
              >
                <span>★</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </PrintPage>
    </Fragment>
  ));
};

export default ClassBaseExamRoutine;
