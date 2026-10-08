import { enToBnNumber } from '@/utils/functions';
import { nanoid } from 'nanoid';
import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

const GreenGoldenAdmitCard = ({ instituteInfo, student, examRoutine }) => {
  const uniqueId = nanoid(6);

  return (
    <>
      <div
        style={{ "--py": "48px", "--px": "66px" }}
        className={`relative  px-[var(--px)] py-[var(--py)] font-bangla id-${student?.id}`}
      >
        {/* admit frame layer */}
        <div className="*:absolute">
          <img
            src="/public/assets/admit-bg-pattern-2.png"
            alt="Admit Background Pattern"
            className="bg-cover inset-0 opacity-100"
          />
        </div>

        {/* admit info and design structure */}
        <div className="relative z-10">
          {/* header */}
          <div className="pt-2">
            <div className="grid grid-cols-4 place-content-center">
              <div className="size-20 mx-8">
                <img
                  src="/assets/logo-transparent.jpg"
                  alt="Logo"
                  className="size-full"
                />
              </div>

              <div className="text-center col-span-2">
                <h1 className="font-galada text-[26pt] text-green-900">{instituteInfo?.name}</h1>
                {/* <h6 className="text-sm">{instituteInfo?.address}</h6> */}
                <p className="leading-normal">{instituteInfo?.examTitle} পরীক্ষা - {instituteInfo?.examYear}</p>
              </div>

              <div className="size-16 mr-7 mt-3.5 p-1 justify-self-end">
                <QRCodeSVG
                  value={`https://madrasatulhadis.onrender.com/results?orsi=${student?.id}&c=${student?.class_code}&r=${student.roll}`}
                  className="!size-full"
                  bgColor="transparent"
                />
              </div>
            </div>
          </div>

          {/* admint tag */}
          <div className="text-center mt-4 h-0">
            <p className="bg-transparent text-white rounded inline-block px-3.5 py-1.5 text-[20pt] font-semibold leading-none">
              প্রবেশ পত্র
            </p>
          </div>

          {/* student info and routine */}
          <div className="h-82.5 px-4 mt-10 flex flex-col">
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
                      <td>শ্রেণীঃ</td>
                      <td>{student?.classes?.classLabel}</td>
                      <td>রোলঃ</td>
                      <td>{enToBnNumber(student.roll).padStart(2, "০")}</td>
                    </tr>
                    <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                    </tr>
                    <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                      <td>পরীক্ষার স্থানঃ</td>
                      <td>মাদ্‌রাসাতুল হাদিস</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center items-center gap-8">
                <div className="-ml-3 size-24 p-4 text-center flex justify-center items-center text-xs text-gray-500">
                  পরীক্ষায় অনুমদিত সিল মোহর ও স্বাক্ষর
                </div>
                <div className="w-28 h-30  justify-self-end -mt-5 ml-1 -mr-1.5">
                  <img
                    src={student.studentImage || "/public/assets/student-avater.png"}
                    alt="Student Image"
                    className="size-full bg-cover bg-top rounded-md"
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

                <table className=" text-[13pt]  border-collapse w-full border-2 border-green-900 bg-green-700/5">
                  <tbody>
                    <tr className="*:border *:border-gray-500 *:w-1/10 text-center *:leading-4.5 *:pt-1.5">
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
            <div className="flex justify-between items-end text-green-900">
              <div className='flex gap-1.5 text-[12pt] font-semibold pl-7 pb-1.5'>
                <p>***</p>
                <p>পরীক্ষা প্রতিদিন সকাল ৯টা ও বিকাল ২টা থেকে শুরু হবে ইনশাআল্লাহ।</p>
              </div>
              <div className="flex flex-col items-center pr-8">
                <img
                  src="/assets/author-vice-singnature.png"
                  alt="singnature"
                  className="w-25 -mb-2"
                />
                <p className="text-sm font font-semibold">পরিচালকের স্বাক্ষর</p>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute bottom-69 -right-15.5 text-sm font-rajdhani text-gray-700 font-medium -rotate-90">Created by: Rokibul Hasan Utso {"#" + uniqueId}</p>
      </div>
    </>
  );
};

export default GreenGoldenAdmitCard;