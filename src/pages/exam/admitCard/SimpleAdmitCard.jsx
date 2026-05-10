import { groupArray } from "@/utils/array";
import { enToBnNumber } from "@/utils/functions";
import { pairOjectArray } from "@/utils/pairOjectArray";
import React from "react";
import AdmitCardLayout from "./AdmitCardLayout";

const SimpleAdmitCard = ({
  instituteInfo,
  data = [],
  routine: allClassRoutine = [],
}) => {
  const pairData = pairOjectArray(data) || [];

  return (
    <>
      {pairData?.map((pair, index) => (
        <AdmitCardLayout key={index}>
          {pair?.map((student) => (
            <div
              key={student.id}
              className="flex-1 flex items-center justify-center"
            >
              <div
                className={`relative flex items-center justify-center px-14 font-bangla border-gray-300 id-${data?.id}`}
              >
                <div className="border-2 rounded-2xl overflow-hidden grayscale flex flex-col">
                  <div className="grid grid-cols-4 place-content-center p-2 border-b-2 border-gray-300 bg-gray-100">
                    <div className="size-22 mx-2.5 p-1">
                      <img
                        src="/assets/logo-transparent.jpg"
                        alt="Logo"
                        className="size-full"
                      />
                    </div>

                    <div className="text-center col-span-2">
                      <h1 className="font-galada text-[26px]">
                        {instituteInfo?.name}
                      </h1>
                      <h6 className="text-sm">{instituteInfo?.address}</h6>
                      <p className="leading-normal mt-2.5 font-semibold">
                        {instituteInfo?.examTitle}
                      </p>
                    </div>

                    <div className="size-16 mx-2.5 p-1 justify-self-end">
                      {/* <QRCodeSVG
                      value={`https://madrasatulhadis.onrender.com/results?orsi=${data?.id}&c=${data?.class_code}&r=${data.roll}`}
                      className="!size-full"
                      bgColor="transparent"
                    /> */}
                    </div>
                  </div>

                  <div className="text-center mt-2">
                    <p className="bg-white border rounded inline-block px-3.5 py-1.5 text-xl font-semibold leading-none">
                      প্রবেশ পত্র
                    </p>
                  </div>

                  <div className="flex-1 px-4 background-logo flex flex-col">
                    {/* student info */}
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <table className="my-2">
                          <tbody className="font-medium">
                            <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                              <td>নামঃ</td>
                              <td>{student?.studentName}</td>
                            </tr>
                            <tr className="*:px-2 *:first:pl-1 *:leading-normal">
                              <td>রোলঃ</td>
                              <td>{enToBnNumber(student?.roll)}</td>
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
                          {student?.studentImage ? (
                            <img
                              src={student?.studentImage}
                              alt="Student Image"
                              className="size-full bg-cover bg-top rounded-md ring-2 ring-gray-500"
                            />
                          ) : (
                            <div className="size-full bg-gray-100 flex items-center justify-center rounded-md ring-2 ring-gray-500 text-gray-500">
                              ছবি নাই
                            </div>
                          )}
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
                            {groupArray(
                              allClassRoutine?.[student.class_code - 1]
                                ?.routine,
                              2,
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
                                    {/* Gap column between groups */}
                                    {idx !== group.length - 1 && (
                                      <td className="!w-1/20 border-b-transparent"></td>
                                    )}
                                  </React.Fragment>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* aditional info */}
                    <div className="flex justify-between items-center py-2">
                      <p>
                        *** পরীক্ষা প্রতিদিন সকাল {instituteInfo?.examStartTime}{" "}
                        থেকে শুরু হবে ইনশাআল্লাহ।
                      </p>
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
              </div>
            </div>
          ))}

          {pair?.length === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center">
              <p className="text-center text-gray-400">
                আর কোনো শিক্ষার্থীর প্রবেশপত্র নেই।
              </p>

              {/* just for test */}
              <p className="font-rajdhani font-semibold mt-10 text-gray-300">
                This software develop by{" "}
                <span className="text-gray-500">
                  Rokibul Hasan Utso (Software Engineer)
                </span>
                .
              </p>
            </div>
          )}
        </AdmitCardLayout>
      ))}
    </>
  );
};

export default SimpleAdmitCard;
