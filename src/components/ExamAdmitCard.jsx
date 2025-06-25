import React from "react";
import { enToBnNumber } from "../utils/functions";
import { secondTermExamRoutine } from "../static/SecondTermExamRoutine";

const ExamAdmitCard = ({ data }) => {
  function chunkArray(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  return (
    <>
      <div className="relative background-area h-1/2 bg-cover px-14 py-12 font-bangla border-b border-dashed border-gray-300">
        <div className="grid grid-cols-4 place-content-center  p-2 border-b-2 border-[#f9d7d7] bg-[#ffe8e8]">
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
            <p className="leading-normal">দ্বিতীয় সাময়িক পরীক্ষা - ২০২৫ ইং</p>
          </div>
        </div>

        <div className="text-center mt-2">
          <p className="bg-white border rounded inline-block px-3.5 py-1.5 text-xl font-semibold leading-none">
            প্রবেশ পত্র
          </p>
        </div>

        <div className="px-4 background-logo">
          {/* info */}
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <table className="my-2">
                <tbody className="font-medium">
                  <tr className="*:px-2 *:leading-normal">
                    <td>নামঃ</td>
                    <td>{data.studentName}</td>
                  </tr>
                  <tr className="*:px-2 *:leading-normal">
                    <td>রোলঃ</td>
                    <td>{enToBnNumber(data.roll)}</td>
                  </tr>
                  <tr className="*:px-2 *:leading-normal">
                    <td>শ্রেণীঃ</td>
                    <td>{data.classes.classLabel}</td>
                  </tr>
                  <tr className="*:px-2 *:leading-normal">
                    <td>পরীক্ষার স্থানঃ</td>
                    <td>মাদ্‌রাসাতুল হাদিস</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="size-28 justify-self-end">
              <img
                src={data.studentImage || "/public/assets/student-avater.png"}
                alt="Student Image"
                className="size-full bg-cover bg-top rounded-md"
              />
            </div>
          </div>

          <div className="">
            <h1 className="text-center font-semibold underline">
              পরীক্ষার রুটিন
            </h1>
            <div>
              <table className="border-collapse w-full">
                <tbody>
                  <tr className="*:border *:w-1/10 text-center">
                    <td>তারিখ</td>
                    <td>বার</td>
                    <td className="!w-2/10">বিষয়</td>

                    <td className="!w-1/20"></td>

                    <td>তারিখ</td>
                    <td>বার</td>
                    <td className="!w-2/10">বিষয়</td>
                  </tr>
                  {chunkArray(secondTermExamRoutine[7], 2).map((data, i) => (
                    <tr key={i} className="*:border *:w-1/10 text-center">
                      <td>{data[0]?.date}</td>
                      <td>{data[0]?.week}</td>
                      <td className="!w-2/10">{data[0]?.subject}</td>
                      <td className="!w-1/20"></td> {/* separator column */}
                      <td>{data[1]?.date}</td>
                      <td>{data[1]?.week}</td>
                      <td className="!w-2/10">{data[1]?.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamAdmitCard;
