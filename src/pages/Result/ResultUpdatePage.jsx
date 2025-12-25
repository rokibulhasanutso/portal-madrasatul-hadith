import React, { useEffect, useState } from "react";
import supabase from "../../supabase/config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { enToBnNumber } from "../../utils/functions";
import BackgroundBlurWrapper from "../../components/BackgroundBlurWrapper";
import TextInput from "../../components/TextInput";
import { secondTermExamSubjects } from "../../static/SecondTermExamRoutine";
import LoadingComponent from "../../components/LoadingComponent";
import Button from "../../components/Button";
import {
  CheckCircle2,
  Edit,
  File,
  FilePen,
  Home,
  Loader,
  Newspaper,
} from "lucide-react";

const ResultUpdatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const classCode = searchParams.get("c_c");
  const classLabel = searchParams.get("ccl");
  const subjectCode = searchParams.get("s_c");
  const [data, setData] = useState({
    students: [],
  });
  const [loading, setLoading] = useState({
    students: false,
    query: false,
    submit: false,
  });

  const tabObjects = {
    open: false,
    loading: false,
    success: false,
    error: false,
    table: false,
    editableTable: false,
    title: "",
  };

  const [tab, setTab] = useState(tabObjects);

  const handleTab = (obj = {}) => {
    setTab((prev) => ({ ...prev, ...obj }));
  };
  const handleTabReset = () => setTab(tabObjects);

  const [query, setQuery] = useState([]);
  const [attendenceAccount, setAttendenceAccount] = useState([]);

  // console.log(query);
  // console.log(attendenceAccount);

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
      getResults(data.map((s) => s.id));
    }

    setLoading((prev) => ({ ...prev, students: false }));
  };

  const getResults = async (ids) => {
    setLoading((prev) => ({ ...prev, students: true }));

    if (parseInt(subjectCode) === 100) {
      const { data, error } = await supabase
        .from("attendence")
        .select(`id, present,present_percentage, absent`)
        .in("id", ids)
        .order("id", { ascending: true });

      setAttendenceAccount(data);

      if (error) {
        console.log(error);
      }
    }

    const { data, error } = await supabase
      .from(import.meta.env.VITE_RESULT_TABLE_NAME)
      .select(`id, ${subjectCode}`)
      .in("id", ids)
      .order("id", { ascending: true });

    if (error) {
      console.log(error);
    }

    if (data) {
      setQuery(data);
    }

    setLoading((prev) => ({ ...prev, students: false }));
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleUpdateData = (studentId, subjectCode, getMarks) => {
    // console.log("call", studentId, subjectCode, marks);
    let marks = 0;
    const workingDay = 283;
    const attendenceFullMarks = 25;
    let attendenceDay = 0,
      attendancePercentage = 0,
      attendenceMark = 0;

    // In case for creating attendence number
    if (parseInt(subjectCode) === 100) {
      attendenceDay = workingDay - getMarks;
      attendancePercentage = (100 / workingDay) * attendenceDay;
      attendenceMark = attendenceFullMarks * (attendancePercentage / 100);

      marks = attendenceMark;
    } else {
      marks = getMarks;
    }

    const index = query.findIndex((item) => item.id === studentId);

    if (index !== -1) {
      // for attendence data
      if (parseInt(subjectCode) === 100) {
        const updatedAttendence = attendenceAccount.map((item) =>
          item.id === studentId
            ? {
                id: studentId,
                present: attendenceDay,
                present_percentage: attendancePercentage,
                absent: getMarks, // getMarks mean get input absent instead marks
              }
            : item
        );

        setAttendenceAccount(updatedAttendence);
      }

      // ✅ If item exists: update
      const updatedData = query.map((item) =>
        item.id === studentId ? { ...item, [subjectCode]: marks } : item
      );
      setQuery(updatedData);
    } else {
      if (parseInt(subjectCode) === 100) {
        const addNewAttendence = {
          id: studentId,
          present: attendenceDay,
          present_percentage: attendancePercentage,
          absent: getMarks,
        };

        setAttendenceAccount((prev) => [...prev, addNewAttendence]);
      }

      // ✅ If item doesn't exist: insert new
      const newItem = { id: studentId, [subjectCode]: marks };
      setQuery((prev) => [...prev, newItem]);
    }
  };

  const handleSubmit = async () => {
    // setLoading((prev) => ({ ...prev, submit: true }));
    handleTab({
      open: true,
      loading: true,
    });

    if (parseInt(subjectCode) === 100) {
      const { error } = await supabase
        .from("attendence")
        .upsert(attendenceAccount)
        .select();

      if (error) {
        handleTab({ error: true });
        handleTab({ loading: false });
        return;
      }
    }

    const { data, error } = await supabase
      .from(import.meta.env.VITE_RESULT_TABLE_NAME)
      .upsert(query)
      .select();

    if (error) {
      console.log(error);
      handleTab({ error: true });
    }

    if (data) {
      setQuery(data);
      handleTab({
        success: true,
        title: "আপডেটকৃত ফলাফল সমূহ",
        table: true,
      });
    }

    // setLoading((prev) => ({ ...prev, submit: false }));
    handleTab({ loading: false });
  };

  const handleShowResult = () => {
    handleTabReset();
    handleTab({
      open: true,
      title: "ফলাফল সমূহ",
      table: true,
    });
  };

  return (
    <BackgroundBlurWrapper className={"space-y-4"}>
      <div className="bg-gray-800 rounded-2xl ring-2 ring-gray-700 overflow-hidden">
        <div className="px-4 py-2 text-center">
          <p>পরীক্ষার ফলাফল যুক্ত করুন</p>
          <p className="text-2xl">{classLabel}</p>
        </div>
        <p className="px-4 py-2.5 bg-gray-900 text-center">
          {secondTermExamSubjects[subjectCode]}
        </p>
        <div className="flex justify-between p-2.5">
          <div className="flex gap-4 items-center">
            <Button
              icon={FilePen}
              iconClassName={"size-5"}
              className={`p-2.5 ${!tab.open ? "bg-gray-700" : ""}`}
              onClick={handleTabReset}
            />
            <Button
              icon={File}
              iconClassName={"size-5"}
              className={`p-2.5 ${tab.table ? "bg-gray-700" : ""}`}
              onClick={handleShowResult}
            />
          </div>
          <Button
            onClick={handleSubmit}
            className={`bg-green-700 ring-green-900 active:scale-95 transition-transform ${
              tab.loading ? "opacity-50" : ""
            }`}
          >
            আপডেট করুন
          </Button>
        </div>
      </div>
      {tab.open ? (
        <div className="bg-gray-800 rounded-2xl ring-2 ring-gray-700 overflow-hidden">
          {/* loading tab */}
          {tab.loading && (
            <div className="flex flex-col items-center my-2.5">
              <Loader className="size-8 my-2.5 animate-spin text-green-400" />
              <div className="text-center">
                <p>ফলাফল গুলো আপডেট করা হচ্ছে</p>
                <p>অনুগ্রহ করে অপেক্ষা করুন...</p>
              </div>
            </div>
          )}

          {/* success tab */}
          {tab.success && (
            <div className="flex flex-col items-center my-5">
              <div className="mb-10 flex flex-col items-center">
                <CheckCircle2 className="size-12 my-2.5 text-green-400" />
                <div className="text-center">
                  <p>ফলাফলটি সফলভাবে আপডেট হয়েছে</p>
                </div>
              </div>
              <div className="flex flex-col gap-3.5">
                <div className="flex gap-3.5">
                  <Button
                    className={
                      "ring-green-900 active:scale-95 transition-transform"
                    }
                    icon={Home}
                    iconClassName={"size-5"}
                    value={"হোম"}
                    onClick={() => navigate("/")}
                  />
                  <Button
                    className={
                      "w-full ring-green-900 active:scale-95 transition-transform"
                    }
                    icon={Edit}
                    iconClassName={"size-5"}
                    value={"এডিট করুন"}
                    onClick={handleTabReset}
                  />
                </div>
                <div>
                  <Button
                    className={
                      "w-full ring-green-900 active:scale-95 transition-transform"
                    }
                    icon={Newspaper}
                    iconClassName={"size-5"}
                    value={"নতুন ফলাফল তৈরি করুন"}
                    onClick={() => navigate("/results")}
                  />
                </div>
              </div>
            </div>
          )}

          <p className="text-center mt-5 mb-2.5">{tab.title}</p>

          {/* table tab */}
          {tab.table && (
            <div className="px-4 mb-4">
              <table className="w-full">
                <tbody className="*:odd:bg-gray-900 **:my-2.5 *:border  *:border-gray-700">
                  <tr className="text-center *:py-2.5 *:px-1.5">
                    <td>রোল</td>
                    <td>ছবি</td>
                    <td className="text-start !pl-3.5">নাম</td>
                    <td>প্রাপ্ত নম্বর</td>
                  </tr>
                  {data.students.map((data) => (
                    <tr key={data.id} className="text-center">
                      <td>{enToBnNumber(data.roll)}</td>
                      <td className="px-0.5">
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
                      </td>
                      <td className="text-start pl-3.5">{data.studentName}</td>
                      <td>
                        {enToBnNumber(
                          query.find((item) => item.id === data.id)?.[
                            subjectCode
                          ] || "00"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
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
                    <div
                      className={
                        parseInt(subjectCode) === 100 ? `space-y-3` : ""
                      }
                    >
                      <div className="flex gap-3 items-center">
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
                          {parseInt(subjectCode) === 100 ? (
                            <>
                              <span className="text-base">
                                প্রাপ্ত নাম্বারঃ{" "}
                                {enToBnNumber(
                                  parseFloat(
                                    query.find((item) => item.id === data.id)?.[
                                      subjectCode
                                    ] || 0
                                  ).toFixed(2)
                                )}
                              </span>
                            </>
                          ) : (
                            ""
                          )}
                        </p>
                      </div>
                      <p className="*:block">
                        {/* <span className="text-lg">{data.studentName}</span> */}
                        {parseInt(subjectCode) === 100 ? (
                          <>
                            <span className="text-base">
                              কার্যদিবসঃ {enToBnNumber(283)}দিন
                            </span>
                            <span className="text-base">
                              উপস্থিতিঃ{" "}
                              {enToBnNumber(
                                attendenceAccount.find(
                                  (item) => item.id === data.id
                                )?.present || 0
                              )}
                              দিন
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    {parseInt(subjectCode) === 100 ? (
                      <>
                        <span className="text-base block">অনুপস্থিতিঃ</span>
                      </>
                    ) : (
                      ""
                    )}
                    <TextInput
                      className={"my-0"}
                      type="number"
                      inputClassName={
                        "*:text-center bg-gray-950 *:ml-0 font-sans"
                      }
                      placeholder={"00"}
                      defaultValue={
                        parseInt(subjectCode) === 100
                          ? attendenceAccount.find(
                              (item) => item.id === data.id
                            )?.absent || ""
                          : query.find((item) => item.id === data.id)?.[
                              subjectCode
                            ] || ""
                      }
                      onChange={(e) =>
                        handleUpdateData(
                          data.id,
                          subjectCode,
                          parseInt(e.target.value || 0)
                        )
                      }
                    />
                    {/* <input
                    type="number"
                    className="border w-full font-sans p-2 text-center rounded-xl"
                    placeholder={"00"}
                    defaultValue={
                      query.find((item) => item.id === data.id)?.[
                        subjectCode
                      ] || ""
                    }
                    onChange={(e) =>
                      handleUpdateData(
                        data.id,
                        subjectCode,
                        parseInt(e.target.value || 0)
                      )
                    }
                  /> */}
                  </div>
                </div>
              </div>
            ))}
            {/* <div>
              <Button
                // value={"আপডেট করুন"}
                className={"w-full py-5 my-10"}
                onClick={handleSubmit}
              >
                {loading.submit ? (
                  <div className="flex items-center justify-center gap-2.5">
                    <Loader className="size-7 animate-spin" />{" "}
                    <span>আপডেট হচ্ছে</span>
                  </div>
                ) : (
                  "আপডেট করুন"
                )}
              </Button>
            </div> */}
          </LoadingComponent>
        </div>
      )}
    </BackgroundBlurWrapper>
  );
};

export default ResultUpdatePage;
