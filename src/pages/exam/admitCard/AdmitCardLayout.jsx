import { PrintPage } from "@/components/pageComponent/A4page";
import PageDeviderScissorCutLine from "@/components/pageComponent/PageDeviderScissorCutLine";
import { pairOjectArray } from "@/utils/pairOjectArray";
import ColourfulAdmitCard from "./ColourfulAdmitCard";

// const AdmitCardLayout = ({ children }) => {
//   return (
//     <>
//       <PrintPage
//         size="A4"
//         orientation="portrait"
//         padding={{ x: 0, y: 0, unit: "cm" }}
//         className="flex flex-col justify-center text-[14pt]"
//       >
//         {/* ✂ CUT LINE WITH SCISSOR */}
//         <PageDeviderScissorCutLine />

//         <div className="h-full grid grid-rows-2">{children}</div>
//       </PrintPage>
//     </>
//   );
// };

// export default AdmitCardLayout;

const AdmitCardLayout = ({
  instituteInfo,
  data = [],
  routine,
}) => {
  const pairData = pairOjectArray(data) || [];

  // console.log(pairData)

  return (
    <>
      {pairData?.map((pair, index) => (
        <PrintPage
          key={index}
          size="A4"
          orientation="portrait"
          padding={{ x: 0, y: 0, unit: "cm" }}
          className="flex flex-col justify-center text-[14pt]"
        >
          {/* ✂ CUT LINE WITH SCISSOR */}
          <PageDeviderScissorCutLine />

          <div className="h-full grid grid-rows-2">
            {pair?.map((student) => (
              <div
                key={student?.id}
                className="flex-1 flex items-center justify-center"
              >

                <ColourfulAdmitCard
                  instituteInfo={instituteInfo}
                  examRoutine={routine[student?.class_code - 1]}
                  student={student}
                />

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
          </div>
        </PrintPage>))
      }
    </>
  );
};

export default AdmitCardLayout;
