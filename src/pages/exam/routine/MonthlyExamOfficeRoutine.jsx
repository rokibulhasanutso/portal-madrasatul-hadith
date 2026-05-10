import React from "react";
import { PrintPage } from "../../../components/pageComponent/A4page";
import { enToBnNumber } from "../../../utils/functions";

const MonthlyExamOfficeRoutine = ({ data = [], instituteInfo }) => {
  const examDates = data[0]?.routine || [];

  return (
    <>
      <PrintPage
        size="A4"
        orientation="landscape"
        padding={{ x: 2, y: 0, unit: "cm" }}
        className="flex flex-col justify-start text-[15.5pt]"
      >
        {/* Header */}
        <div className="text-center mb-6 mt-10">
          <h1 className="text-[32pt] font-galada">{instituteInfo?.name}</h1>
          <p>{instituteInfo?.address}</p>
          <p className="mt-1">{instituteInfo?.examTitle}</p>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className=" text-white bg-gray-500 inline-block pb-1 pt-2.5 px-14 rounded-t-4xl text-[18pt]">
            প্রথম সাময়িক পরীক্ষার অফিস রুটিন
          </h2>
        </div>

        {/* ===================== ROUTINE TABLE ===================== */}
        <table className="table-fixed w-full border-3 border-gray-500 border-collapse mb-8">
          <thead>
            <tr>
              <th className="border-2 border-gray-300 py-2 w-20">শ্রেণী</th>

              {examDates.map((exam, i) => (
                <th key={i} className="border-2 border-gray-300 py-2">
                  {exam.date} <br />
                  {"(" + exam.week + ")"}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((cls, index) => (
              <tr key={index} className="text-center">
                <td className="border-2 border-gray-300 py-2 font-semibold">
                  {cls.class}
                </td>

                {/* Subjects (Safe Version Here) */}
                {examDates.map((_, i) => (
                  <td
                    key={i}
                    className="border-2 border-gray-300 py-2 px-1 even:bg-gray-100"
                  >
                    {cls.routine[i]?.subject || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===================== FEE TABLE ===================== */}
        <div className="mt-6">
          <h1 className="text-center">
            <span className="px-10 pb-2 pt-3 rounded-t-4xl text-center bg-gray-500 text-white text-[16pt]">
              ক্লাস ভিত্তিক পরীক্ষার ফি সমূহ
            </span>
          </h1>
          <table className="w-full border-3 border-gray-500 border-collapse">
            <thead>
              <tr className="text-center">
                {data.map((cls, index) => (
                  <th
                    key={index}
                    className="border-2 border-gray-300 py-2 odd:bg-gray-100"
                  >
                    {cls.class}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className="text-center">
                {data.map((cls, index) => (
                  <td
                    key={index}
                    className="border-2 border-gray-300 py-2 odd:bg-gray-100"
                  >
                    {enToBnNumber(cls.fee || 0)} টাকা
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </PrintPage>
    </>
  );
};

export default MonthlyExamOfficeRoutine;
