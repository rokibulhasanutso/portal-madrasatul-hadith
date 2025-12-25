import React from "react";
import { enToBnNumber } from "../utils/functions";
import { secondTermExamRoutine } from "../static/SecondTermExamRoutine";
import { QRCodeSVG } from "qrcode.react";

const ExamAdmitCard_v2 = ({ data }) => {
  function rearrangeAndGroupArray(array, groupSize = 2) {
    const half = Math.floor(array.length / 2);
    const rearranged = [];

    for (let i = 0; i < half; i++) {
      rearranged.push(array[i]);
      if (i + half < array.length) {
        rearranged.push(array[i + half]);
      }
    }

    if (array.length % 2 !== 0) {
      rearranged.push(array[array.length - 1]);
    }

    const grouped = [];
    for (let i = 0; i < rearranged.length; i += groupSize) {
      grouped.push(rearranged.slice(i, i + groupSize));
    }

    return grouped;
  }

  return (
    <div
      className={`relative h-1/2 bg-cover px-10 py-8 font-bangla border-b border-dashed border-gray-300 id-${data?.id}`}
    >
      {/* admit main body */}
      <div className="h-full border-4 border-yellow-500 rounded flex flex-col">
        {/* header */}
        <div className="relative min-h-30 grid grid-cols-5 place-content-center p-2 bg-yellow-200">
          <div className="relative">
            <div className="absolute top-1/2 -translate-y-1/2 size-25 mx-2.5 p-1 bg-white rounded-full">
              <img
                src="/assets/demo-logo.png"
                alt="Logo"
                className="size-full"
              />
            </div>
          </div>

          <div className="text-center col-span-3">
            <h1 className="font-galada text-[20px] leading-tight">
              مدرسة الحيرة جامعة النوراني
            </h1>
            <h1 className="font-galada text-[22px]">
              জামিয়াতুল মহিলা নূরানী মাদ্‌রাসা
            </h1>
            <h6 className="text-sm leading-tight">গোলচত্বর, মিরপুর-১০, ঢাকা</h6>
            <p className="leading-relaxed font-bold mt-1.5 bg-white inline-block py-1 px-3.5 rounded-full">
              বার্ষিক পরীক্ষা - ২০২৫ ইং
            </p>
          </div>

          <div className="flex justify-end items-center">
            <div className="size-18 mx-2.5 p-1 bg-white rounded">
              <QRCodeSVG
                value={`www.example.com/result/id=1505423`}
                className="!size-full"
                bgColor="transparent"
              />
            </div>
          </div>
        </div>

        <div className="relative flex justify-center">
          <p className="leading-tight font-bold tracking-wider mt-1.5 border-2 border-yellow-500 bg-yellow-100 inline-block py-1 px-6 rounded-full">
            প্রবেশ পত্র
          </p>
        </div>

        {/* main body */}
        <div className="flex-grow">
          <div className="h-full py-2 px-4 background-logo-demo flex flex-col">
            {/* student info */}
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <table className="my-2">
                  <tbody className="font-medium">
                    <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                      <td>নামঃ</td>
                      <td>{data.studentName}</td>
                    </tr>
                    <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                      <td>রোলঃ</td>
                      <td>০{enToBnNumber(data.roll)}</td>
                    </tr>
                    <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                      <td>শ্রেণীঃ</td>
                      <td>{data.classes.classLabel}</td>
                    </tr>
                    <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                      <td>পরীক্ষার স্থানঃ</td>
                      <td>জামিয়াতুল মহিলা নূরানী মাদ্‌রাসা</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center items-center gap-5">
                <div className="size-24 border-2 border-gray-300 rounded-full text-center p-4 flex justify-center items-center text-xs text-gray-500">
                  পরীক্ষার অনুমদিত সিল মোহর ও স্বাক্ষর
                </div>
                <div className="size-28 justify-self-end">
                  <img
                    src={
                      data.studentImage || "/public/assets/student-avater.png"
                    }
                    alt="Student Image"
                    className="size-full bg-cover bg-top rounded-md ring-2 ring-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* routine */}
            <div className="flex-1">
              <h1 className="text-center font-semibold underline">
                পরীক্ষার রুটিন
              </h1>
              <div>
                <table className="border-collapse w-full border-2 border-gray-500">
                  <tbody>
                    <tr className="*:border *:border-gray-500 *:w-1/10 text-center *:leading-4.5">
                      <td>তারিখ</td>
                      <td>বার</td>
                      <td className="!w-2/10">বিষয়</td>

                      <td className="!w-1/20 border-b-transparent"></td>

                      <td>তারিখ</td>
                      <td>বার</td>
                      <td className="!w-2/10">বিষয়</td>
                    </tr>
                    {rearrangeAndGroupArray(
                      secondTermExamRoutine[data.class_code],
                      2
                    ).map((data, i) => (
                      <tr
                        key={i}
                        className="*:border *:border-gray-500 *:w-1/10 text-center *:leading-4.5"
                      >
                        <td>{data[0]?.date}</td>
                        <td>{data[0]?.week}</td>
                        <td className="!w-2/10">{data[0]?.subject}</td>
                        <td className="!w-1/20 border-b-transparent"></td>
                        <td>{data[1]?.date}</td>
                        <td>{data[1]?.week}</td>
                        <td className="!w-2/10">{data[1]?.subject}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* aditional info */}
            <div className="flex justify-between items-center">
              <p>*** পরীক্ষা প্রতিদিন সকাল ৯টা থেকে শুরু হবে ইনশাআল্লাহ।</p>
              <div className="flex flex-col items-center">
                <img
                  src="/assets/demo-signature.png"
                  alt="singnature"
                  className="w-25 -mb-2"
                />
                <p className="text-sm">মুহতামিমের স্বাক্ষর</p>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="h-8 bg-yellow-200 flex justify-center items-center">
          <p className="text-center font-sans">
            www.al-hera-jamiatul-nurani-madrasah.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamAdmitCard_v2;
