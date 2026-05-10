import { PrintPage } from "@/components/pageComponent/A4page";
import { pairOjectArray } from "@/utils/pairOjectArray";
import { enToBnNumber } from "@/utils/functions";

const RollNumberSlip = ({ data = [], instituteInfo }) => {
  const pairData = pairOjectArray(data, 15);

  return (
    <>
      {pairData?.map((pair, index) => (
        <PrintPage
          key={index}
          size="A4"
          orientation="portrait"
          padding={{ x: 0, y: 0, unit: "cm" }}
          className="grid grid-cols-3 grid-rows-5 size-full text-[14pt]"
        >
          {pair?.map((student) => (
            <div
              key={student.id}
              className="p-6 border-[0.1px] border-dashed border-gray-300"
            >
              <div className="ring-6 ring-gray-300 rounded-lg font-galada h-[46mm] relative background-logo after:!size-32 flex flex-col justify-between">
                {/* heading */}
                <div className="pt-5 pb-1">
                  <p className="text-center text-2xl">{instituteInfo.name}</p>
                  <p className="text-center text-sm font-bangla">
                    {instituteInfo.examTitle}
                  </p>
                </div>

                {/* student info */}
                <p className="text-[22px] text-center mx-1.5">
                  {student.studentName}
                </p>

                <div className="mx-3 my-1.5 text-xl text-center flex flex-col">
                  <div className="flex justify-between">
                    <p>শ্রেণীঃ {student?.classes?.classLabel}</p>
                    <p>
                      রোলঃ{" "}
                      <span className="font-bangla font-semibold">
                        {enToBnNumber(student.roll).padStart(2, "০")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* যদি স্টুডেন্ট সংখ্যা বিজোড় হয়, তাহলে শেষ কার্ডটি ফাঁকা থাকবে */}
          {pair?.length <= 12 && (
            <div className="col-span-3 row-span-4 flex flex-col items-center justify-center px-14 font-bangla">
              <p className="text-gray-400">
                আর কোনো শিক্ষার্থীর রোল নাম্বার স্লিপ নেই।
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
        </PrintPage>
      ))}
    </>
  );
};

export default RollNumberSlip;
