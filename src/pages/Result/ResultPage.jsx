import React, { useEffect, useState } from "react";
import BackgroundBlurWrapper from "../../components/BackgroundBlurWrapper";
import { BookOpenCheck, Check, NotebookPen } from "lucide-react";
import Button from "../../components/Button";
import supabase from "../../supabase/config";
import SelectInput from "../../components/SelectInput";
import {
  secondTermExamClassBySubjectCodes,
  secondTermExamSubjects,
} from "../../static/SecondTermExamRoutine";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [classData, setClassData] = useState([]);
  const [selectedData, setSelectedData] = useState({
    subject_code: null,
    class_code: null,
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

  const handleSubmit = () => {
    // handle form submission
    navigate(
      `update?c_c=${selectedData.class_code}&ccl=${
        classData.find((data) => data.class_code === selectedData.class_code)
          .classLabel
      }&s_c=${selectedData.subject_code}`
    );
  };

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
        <div className="max-w-sm w-full px-10 my-16 mx-auto">
          {tab == 0 && (
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
          )}
        </div>
      </div>
    </BackgroundBlurWrapper>
  );
};

export default ResultPage;
