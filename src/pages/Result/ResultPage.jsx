import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase/config";
import BackgroundBlurWrapper from "../../components/BackgroundBlurWrapper";
import { BookOpenCheck, Download, Loader2, NotebookPen } from "lucide-react";
import Button from "../../components/Button";
import SelectInput from "../../components/SelectInput";
import {
  secondTermExamClassBySubjectCodes,
  secondTermExamSubjects,
} from "../../static/SecondTermExamRoutine";
// import AdjustSheetMobileScreen from "../../components/AdjustSheetMobileScreen";
const AdjustSheetMobileScreen = React.lazy(() =>
  import("../../components/AdjustSheetMobileScreen")
);
const ResultMarkSheetTemplate = React.lazy(() =>
  import("./ResultMarkSheetTemplate")
);
import useResultsData from "../../hook/useResultsData";
import { enToBnNumber } from "../../utils/functions";
import { usePdfDownloader } from "../../hook/usePdfDownloader";

const ResultPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [classData, setClassData] = useState([]);
  const [selectedData, setSelectedData] = useState({
    subject_code: null,
    class_code: null,
  });

  const [selectedForResult, setSelectedForResult] = useState({
    class: null,
    roll: null,
  });

  const [subjectWaysUpdateResult, setSubjectWaysUpdateResult] = useState({});

  const getClassList = async () => {
    const { data, error } = await supabase.from("classes").select("*");
    if (error) {
      console.error(error);
      return;
    }
    setClassData(data);
  };

  useEffect(() => {
    getClassList();
  }, []);

  const getExamResultList = async () => {
    try {
      const subjectCodes =
        secondTermExamClassBySubjectCodes[selectedData.class_code];

      if (!subjectCodes || subjectCodes.length === 0) {
        console.warn("No subject codes found for the selected class.");
        return;
      }

      const { data, error } = await supabase.from("resultTest").select(`
        id,
        ${subjectCodes.join(",")},
        students (
          classes (
            class_code
            )
        )
        `);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      const filteredData = data?.filter(
        (item) => item.students?.classes?.class_code === selectedData.class_code
      );

      const result = subjectCodes.reduce((acc, subject) => {
        acc[subject] = filteredData?.some((item) => item[subject] > 0) || false;
        return acc;
      }, {});

      setSubjectWaysUpdateResult(result);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  useEffect(() => {
    if (selectedData.class_code) {
      getExamResultList();
    }
  }, [selectedData.class_code]);

  const handleSubmit = () => {
    // handle form submission
    navigate(
      `update?c_c=${selectedData.class_code}&ccl=${
        classData.find((data) => data.class_code === selectedData.class_code)
          .classLabel
      }&s_c=${selectedData.subject_code}`
    );
  };

  const { data: resultData, loading: resultLoading } = useResultsData();
  const { downloadPdf, loading: sheetDownloadLoading } = usePdfDownloader({
    sheetData: {
      sheetName: "দ্বিতীয় সাময়িক পরীক্ষা - ২০২৫ইং",
    },
    elementName: ".sheet",
  });

  return (
    <BackgroundBlurWrapper>
      <div>
        <div>
          <h1 className="text-center">পরীক্ষার ফলাফল সংক্রান্ত পৃষ্ঠা</h1>
        </div>

        {/* tab button */}
        <div>
          <div className="flex justify-center gap-4 my-5">
            <Button
              value={"তৈরি করুন"}
              icon={NotebookPen}
              iconClassName={"size-5"}
              className={tab == 0 ? "bg-gray-800" : ""}
              onClick={() => setTab(0)}
            />
            <Button
              value={"দেখুন"}
              icon={BookOpenCheck}
              iconClassName={"size-5"}
              className={tab == 1 ? "bg-gray-800" : ""}
              onClick={() => setTab(1)}
            />
          </div>
        </div>

        {/* tab contents */}
        {tab == 0 && (
          <div className="max-w-sm w-full px-10 my-16 mx-auto">
            <div className="w-full">
              <h4 className="text-center">শ্রেণী ও বিষয় নির্বাচন করুন</h4>

              <SelectInput
                className={`*:odd:bg-gray-800 *:my-1.5 ${
                  selectedData.class_code ? "" : "text-gray-500 *:text-white"
                }`}
                firstOption={{
                  value: null,
                  label: "শ্রেণী নির্বাচন করুন",
                }}
                onChange={(e) =>
                  setSelectedData((prev) => ({
                    ...prev,
                    class_code: parseInt(e.target.value),
                  }))
                }
              >
                {classData.map((data, index) => (
                  <option key={index} value={data.class_code}>
                    {data.classLabel}
                  </option>
                ))}
              </SelectInput>

              <SelectInput
                className={`*:odd:bg-gray-800 *:my-1.5 ${
                  selectedData.subject_code ? "" : "text-gray-500 *:text-white"
                }`}
                firstOption={{
                  value: null,
                  label: "বিষয় নির্বাচন করুন",
                }}
                onChange={(e) =>
                  setSelectedData((prev) => ({
                    ...prev,
                    subject_code: parseInt(e.target.value),
                  }))
                }
              >
                {secondTermExamClassBySubjectCodes[
                  selectedData.class_code
                ]?.map((data, index) => (
                  <option key={index} value={data}>
                    {subjectWaysUpdateResult[data] && "✔"}{" "}
                    {secondTermExamSubjects[data]}
                  </option>
                ))}
              </SelectInput>

              <Button
                value={"তৈরি করুন"}
                className={`w-full text-center my-3.5 ${
                  selectedData.class_code && selectedData.subject_code
                    ? ""
                    : "text-gray-500 select-none pointer-events-none"
                }`}
                onClick={handleSubmit}
              />
            </div>
          </div>
        )}

        {tab == 1 && (
          <>
            <div className="flex gap-3.5">
              <SelectInput
                className={`*:odd:bg-gray-800 *:my-1.5 ${
                  selectedData.class_code ? "" : "text-gray-500 *:text-white"
                }`}
                firstOption={{
                  value: null,
                  label: "সকল শ্রেণী",
                }}
                onChange={(e) =>
                  setSelectedForResult((prev) => ({
                    ...prev,
                    class: parseInt(e.target.value),
                  }))
                }
              >
                {classData.map((data, index) => (
                  <option key={index} value={data.class_code}>
                    {data.classLabel}
                  </option>
                ))}
              </SelectInput>

              <SelectInput
                className={`*:odd:bg-gray-800 text-left *:my-1.5 ${
                  selectedData.class_code ? "" : "text-gray-500 *:text-white"
                }`}
                firstOption={{
                  value: null,
                  label: "সকল শিক্ষার্থী",
                }}
                onChange={(e) =>
                  setSelectedForResult((prev) => ({
                    ...prev,
                    roll: parseInt(e.target.value),
                  }))
                }
              >
                {resultData
                  ?.filter(
                    (student) => student.class_code === selectedForResult.class
                  )
                  .sort((a, b) => a.roll - b.roll)
                  .map((data, index) => (
                    <option key={index} value={data.roll}>
                      {enToBnNumber(data.roll)}. {data.name}
                    </option>
                  ))}
              </SelectInput>
            </div>

            <div className="h-[calc(100vh-390px)] rounded-xl overflow-auto bg-white text-black text-base">
              <Suspense
                fallback={
                  <div className="h-full flex justify-center items-center gap-3.5">
                    <Loader2 className="size-6 animate-spin" />
                    <p>অপেক্ষা করুন</p>
                  </div>
                }
              >
                {resultLoading ? (
                  <div className="h-full flex justify-center items-center gap-3.5">
                    <Loader2 className="size-6 animate-spin" />
                    <p>অপেক্ষা করুন</p>
                  </div>
                ) : (
                  <AdjustSheetMobileScreen>
                    {resultData
                      ?.filter((student) => {
                        const { class: class_code, roll } = selectedForResult;

                        if (class_code && roll) {
                          return (
                            student.class_code === class_code &&
                            parseInt(student.roll) === roll
                          );
                        } else if (class_code) {
                          return student.class_code === class_code;
                        } else {
                          return true;
                        }
                      })
                      ?.map((item, i) => (
                        <div
                          className="*:h-[297mm] text-black border border-gray-300"
                          key={i}
                        >
                          <ResultMarkSheetTemplate
                            sheetName={"sheet"}
                            examName="দ্বিতীয় সাময়িক পরীক্ষা - ২০২৫ইং"
                            data={item}
                          />
                        </div>
                      ))}
                  </AdjustSheetMobileScreen>
                )}
              </Suspense>
            </div>

            <div className="mt-8 flex justify-center">
              <Button onClick={downloadPdf}>
                <div className="flex gap-3.5">
                  {sheetDownloadLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Download />
                  )}
                  <p>Download Sheet</p>
                </div>
              </Button>
            </div>
          </>
        )}
      </div>
    </BackgroundBlurWrapper>
  );
};

export default ResultPage;
