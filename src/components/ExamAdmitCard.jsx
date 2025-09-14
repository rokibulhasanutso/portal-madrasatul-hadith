import React from "react";
import { enToBnNumber } from "../utils/functions";
import { secondTermExamRoutine } from "../static/SecondTermExamRoutine";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
// import { Star, StarOff } from "lucide-react";

const ExamAdmitCard = ({ data }) => {
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
    <>
      <div className="relative background-area h-1/2 bg-cover px-14 py-12 font-bangla border-b border-dashed border-gray-300">
        {/* <div className="grid grid-cols-4 place-content-center  p-2 border-b-2 border-[#f9d7d7] bg-[#ffe8e8]"> */}
        <div className="grid grid-cols-4 place-content-center  p-2 border-b-2 border-[#fbbdbd] bg-[#ffd3d3]">
          <div className="size-16 mx-2.5 p-1">
            <img
              src="/assets/logo-transparent.jpg"
              alt="Logo"
              className="size-full"
            />
          </div>

          <div className="text-center col-span-2">
            <h1 className="font-galada text-[26px]">মাদ্‌রাসাতুল হাদিস</h1>
            {/* <h6 className="text-sm">পুঠিয়াড় পাড়, সরিষাবাড়ী, জামালপুর।</h6> */}
            <p className="leading-normal">তৃতীয় সাময়িক পরীক্ষা - ২০২৫ ইং</p>
          </div>

          <div className="size-16 mx-2.5 p-1 justify-self-end">
            <QRCodeSVG
              value={`https://madrasatulhadis.onrender.com/results?orsi=${data?.id}&c=${data?.class_code}&r=${data.roll}`}
              className="!size-full"
              bgColor="transparent"
            />
          </div>
        </div>

        <div className="text-center mt-2">
          <p className="bg-white border rounded inline-block px-3.5 py-1.5 text-xl font-semibold leading-none">
            প্রবেশ পত্র
          </p>
        </div>

        <div className="h-85 px-4 background-logo flex flex-col">
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
                    <td>{enToBnNumber(data.roll)}</td>
                  </tr>
                  <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                    <td>শ্রেণীঃ</td>
                    <td>{data.classes.classLabel}</td>
                  </tr>
                  <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                    <td>পরীক্ষার স্থানঃ</td>
                    <td>মাদ্‌রাসাতুল হাদিস</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center gap-5">
              <div className="size-24 border-2 border-gray-300 rounded-full text-center p-4 flex justify-center items-center text-xs text-gray-500">
                পরীক্ষায় অনুমদিত সিল মোহর ও স্বাক্ষর
              </div>
              <div className="size-28 justify-self-end">
                <img
                  src={data.studentImage || "/public/assets/student-avater.png"}
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
                src="/assets/author-vice-singnature.png"
                alt="singnature"
                className="w-25 -mb-2"
              />
              <p className="text-sm">পরিচালকের স্বাক্ষর</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamAdmitCard;
