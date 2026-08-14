import React from "react";
import { PrintPage } from "../../../components/pageComponent/A4page";
import { enToBnNumber } from "../../../utils/functions";

const MonthlyExamOfficeRoutine = ({ data = [], instituteInfo }) => {
  const examDates = data[0]?.routine || [];

  return (
    <>
      <PrintPage
        size="A4"
        // orientation=""
        padding={{ x: 2, y: 0, unit: "cm" }}
        className="flex flex-col justify-center text-[12.5pt]"
      >
        {/* Header */}
        <div className="text-center mb-6 mt-6">
          <h1 className="text-[32pt] font-galada">{instituteInfo?.name}</h1>
          <p>{instituteInfo?.address}</p>
          <p className="mt-1">{instituteInfo?.examTitle}</p>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className=" text-white bg-gray-500 inline-block pb-1 pt-2.5 px-14 rounded-t-4xl text-[18pt]">
            দ্বিতীয় সাময়িক পরীক্ষার অফিস রুটিন
          </h2>
        </div>

        {/* ===================== ROUTINE TABLE ===================== */}
        <table className="table-fixed w-full border-3 border-gray-500 border-collapse mb-4 text-[13pt]">
          <thead>
            <tr>
              <th className="border-2 border-gray-300 py-2">
                শ্রেণী
              </th>

              {data.map((cls, i) => (
                <th key={i} className="border-2 border-gray-300 py-2">
                  {cls.class}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {examDates.map((exam, rowIndex) => (
              <tr key={rowIndex} className="text-center">
                <td className="border-2 border-gray-300 py-2 font-semibold">
                  {exam.date}
                  <br />
                  ({exam.week})
                </td>

                {data.map((cls, colIndex) => (
                  <td
                    key={colIndex}
                    className="border-2 border-gray-300 py-2 px-1 even:bg-gray-100"
                  >
                    {cls.routine[rowIndex]?.subject || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===================== FEE TABLE ===================== */}
        <div className="mt-2">
          <h1 className="text-center">
            <span className="px-10 pb-2 pt-3 rounded-t-4xl text-center bg-gray-500 text-white text-[14pt]">
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
