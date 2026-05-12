import React from "react";
// import { secondTermExamRoutine } from "../static/SecondTermExamRoutine";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { enToBnNumber } from "@/utils/functions";
import { groupArray } from "@/utils/array";
// import { Star, StarOff } from "lucide-react";

const ColourfulAdmitCard = ({ instituteInfo, student, examRoutine }) => {

  // console.log(instituteInfo, student, examRoutine)
  return (
    <>
      <div
        style={{ "--py": "46px", "--px": "56px" }}
        className={`relative  px-[var(--px)] py-[var(--py)] font-bangla id-${student?.id}`}
      >
        {/* admit frame layer */}
        <div className="*:absolute">
          <img
            src="/assets/admit-masque-bg.png"
            alt="App Logo"
            className="inset-0 top-auto px-[var(--px)] py-[var(--py)] opacity-[0.225]"
          />

          <img
            src="/assets/logo-transparent.jpg"
            alt="App Logo"
            className="top-1/2 left-1/2 -translate-1/2 size-56 opacity-[0.225]"
          />

          <img
            src="/assets/pageBorderFrame/admit-border-frame.png"
            alt="App Logo"
            className="inset-0 opacity-65"
          />
        </div>

        {/* admit info and design structure */}
        <div className="relative z-10">
          {/* header */}
          <div className="grid grid-cols-4 place-content-center  p-2 border-b-2 border-[#fbbdbd] bg-[#ffd3d3]">
            <div className="size-16 mx-2.5 p-1">
              <img
                src="/assets/logo-transparent.jpg"
                alt="Logo"
                className="size-full"
              />
            </div>

            <div className="text-center col-span-2">
              <h1 className="font-galada text-[26px]">{instituteInfo?.name}</h1>
              {/* <h6 className="text-sm">{instituteInfo?.address}</h6> */}
              <p className="leading-normal">{instituteInfo?.examTitle}</p>
            </div>

            <div className="size-16 mx-2.5 p-1 justify-self-end">
              <QRCodeSVG
                value={`https://madrasatulhadis.onrender.com/results?orsi=${student?.id}&c=${student?.class_code}&r=${student.roll}`}
                className="!size-full"
                bgColor="transparent"
              />
            </div>
          </div>

          {/* admint tag */}
          <div className="text-center mt-2">
            <p className="bg-white border rounded inline-block px-3.5 py-1.5 text-xl font-semibold leading-none">
              প্রবেশ পত্র
            </p>
          </div>

          {/* student info and routine */}
          <div className="h-85 px-4 flex flex-col">
            {/* student info */}
            <div className="grid grid-cols-3">
              <div className="col-span-2">
                <table className="my-2">
                  <tbody className="font-medium">
                    <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                      <td>নামঃ</td>
                      <td>{student.studentName}</td>
                    </tr>
                    <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                      <td>রোলঃ</td>
                      <td>{enToBnNumber(student.roll).padStart(2, "০")}</td>
                    </tr>
                    <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                      <td>শ্রেণীঃ</td>
                      <td>{student?.classes?.classLabel}</td>
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
                    src={student.studentImage || "/public/assets/student-avater.png"}
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
                
                {/* <table className="border-collapse w-full border-2 border-gray-500">
                  <tbody>
                    <tr className="*:border *:border-gray-500 *:w-1/10 text-center">
                      <td>তারিখ</td>
                      <td>বার</td>
                      <td className="!w-2/10">বিষয়</td>

                      <td className="!w-1/20 border-b-transparent"></td>

                      <td>তারিখ</td>
                      <td>বার</td>
                      <td className="!w-2/10">বিষয়</td>
                    </tr>

                    {groupArray(
                      examRoutine?.routine || [],
                      1,
                    ).map((group, i) => (
                      <tr
                        key={i}
                        className="*:border *:border-gray-500 *:leading-4.5"
                      >
                        {group.map((item, idx) => (
                          <React.Fragment key={idx}>
                            <td>{item?.date}</td>
                            <td>{item?.week}</td>
                            <td className="!w-2/10">{item?.subject}</td>
                            
                            {idx !== group.length - 1 && (
                              <td className="!w-1/20 border-b-transparent"></td>
                            )}
                          </React.Fragment>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table> */}

                <table className="border-collapse w-full border-2 border-gray-500 bg-white/75">
                  <tbody>
                    <tr className="*:border *:border-gray-500 *:w-1/10 text-center *:leading-4.5">
                      <td>তারিখ</td>
                      <td>বার</td>
                      <td className="!w-1/2">বিষয়</td>
                    </tr>
                    {examRoutine?.routine?.map((item, idx) => (
                      <tr
                        key={idx}
                        className="*:border *:border-gray-500 *:leading-4.5 text-center"
                      >
                        <td>{item?.date}</td>
                        <td>{item?.week}</td>
                        <td className="!w-1/2 text-left px-2">{item?.subject}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* aditional info */}
            <div className="flex justify-between items-center">
              <p>*** পরীক্ষা প্রতিদিন সকাল ৯টা ও বিকাল ২টা থেকে শুরু হবে ইনশাআল্লাহ।</p>
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
        <p className="absolute bottom-0.5 right-10 text-sm font-rajdhani text-gray-700 font-medium">Created by: Rokibul Hasan Utso</p>
      </div>
    </>
  );
};

export default ColourfulAdmitCard;
