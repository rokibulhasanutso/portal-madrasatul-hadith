import React, { useEffect, useState } from "react";
import supabase from "../../supabase/config";
import { useSearchParams } from "react-router-dom";
import { enToBnNumber } from "../../utils/functions";
import BackgroundBlurWrapper from "../../components/BackgroundBlurWrapper";
import TextInput from "../../components/TextInput";
import { secondTermExamSubjects } from "../../static/SecondTermExamRoutine";
import LoadingComponent from "../../components/LoadingComponent";

const ResultUpdatePage = () => {
  const [searchParams] = useSearchParams();
  const classCode = searchParams.get("c_c");
  const classLabel = searchParams.get("ccl");
  const subjectCode = searchParams.get("s_c");
  const [data, setData] = useState({
    students: [],
  });
  const [loading, setLoading] = useState({
    students: false,
  });

  const getStudents = async () => {
    setLoading((prev) => ({ ...prev, students: true }));

    const { data, error } = await supabase
      .from("students")
      .select("id, studentName, roll, studentImage")
      .eq("class_code", classCode)
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
    }

    if (data) {
      setData((prev) => ({ ...prev, students: data }));
    }

    setLoading((prev) => ({ ...prev, students: false }));
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <BackgroundBlurWrapper>
      <div className="bg-gray-800 rounded-2xl ring-2 ring-gray-700 overflow-hidden">
        <div className="px-4 py-2 text-center">
          <p>পরীক্ষার ফলাফল যুক্ত করুন</p>
          <p className="text-2xl">{classLabel}</p>
        </div>
        <p className="px-4 py-2.5 bg-gray-900 text-center">
          {secondTermExamSubjects[subjectCode]}
        </p>
      </div>

      <div className="space-y-4 my-4">
        <LoadingComponent loadingState={loading.students}>
          {data.students.map((data) => (
            <div
              key={data.id}
              className="w-full ring-2 ring-gray-700 bg-gray-900 backdrop-blur-[6px] rounded-xl p-4 font-bangla"
            >
              <div className="grid grid-cols-5">
                <div className="flex items-center gap-3 col-span-4">
                  <p className="bg-gray-800 rounded-full ring-2 ring-gray-700 size-10 flex justify-center items-center">
                    {enToBnNumber(data.roll)}
                  </p>
                  <div className="size-12">
                    <img
                      src={
                        data?.studentImage ||
                        "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"
                      }
                      alt="Student Image"
                      className="size-full bg-cover bg-top rounded"
                    />
                  </div>
                  <p className="*:block">
                    <span className="text-lg">{data.studentName}</span>
                    {/* <span className="text-base">উপস্থিতিঃ ০%</span> */}
                  </p>
                </div>
                <div>
                  <TextInput
                    className={"my-0"}
                    type="number"
                    inputClassName={
                      "*:text-center bg-gray-950 *:ml-0 font-sans"
                    }
                    placeholder={"00"}
                  />
                </div>
              </div>
            </div>
          ))}
        </LoadingComponent>
      </div>
    </BackgroundBlurWrapper>
  );
};

export default ResultUpdatePage;
