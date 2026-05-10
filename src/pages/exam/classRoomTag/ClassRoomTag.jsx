import { pairOjectArray } from "@/utils/pairOjectArray";
import AdmitCardLayout from "../admitCard/AdmitCardLayout";

const ClassRoomTag = ({ instituteInfo, data }) => {
  const pairData =
    pairOjectArray([
      { id: 9, classLabel: "অফিস কক্ষ", sparated: true },
      ...data,
      { id: 10, classLabel: "টয়লেট", sparated: true },
    ]) || [];
  return (
    <>
      {pairData?.map((pair, index) => (
        <AdmitCardLayout key={index}>
          {pair.map(({ id, classLabel, sparated }) => (
            <div key={id} className="p-5">
              <div className="h-full flex flex-col font-bangla text-white bg-emerald-500">
                {!sparated && (
                  <h1 className="bg-emerald-600 p-5 text-4xl text-center">
                    শ্রেণী কক্ষ
                  </h1>
                )}
                <h1 className={`flex-1 flex justify-center items-center font-black ${classLabel === "অফিস কক্ষ" ? "text-[120pt]" : "text-[165pt]"}`}>
                  {classLabel}
                </h1>
                <div className="bg-emerald-600 p-5">
                  <h1
                    className={`text-center font-galada text-4xl`}
                  >
                    {instituteInfo.name}
                  </h1>
                  <p className="text-center">{instituteInfo.address}</p>
                </div>
              </div>
            </div>
          ))}
        </AdmitCardLayout>
      ))}
    </>
  );
};

export default ClassRoomTag;
