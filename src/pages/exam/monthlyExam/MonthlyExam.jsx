import React, { useEffect, useState } from "react";
import MonthlyExamOfficeRoutine from "../routine/MonthlyExamOfficeRoutine";
import supabase from "../../../supabase/config";
import ClassBaseExamRoutine from "../routine/ClassBaseExamRoutine";
import SimpleAdmitCard from "../admitCard/SimpleAdmitCard";
import RollNumberSlip from "../slip/RollNumberSlip";
import { getSecondTermRoutines } from "@/static/monthlyExam";
import { PrintPage } from "@/components/pageComponent/A4page";
import { LoaderCircleIcon } from "lucide-react";
import ClassRoomTag from "../classRoomTag/ClassRoomTag";
import AdmitCardLayout from "../admitCard/AdmitCardLayout";

const MonthlyExam = () => {
  const routine = getSecondTermRoutines();
  const [dataLoading, setDataLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [classData, setClassData] = useState([]);

  const getStudentsByClass = async () => {
    setDataLoading(true);
    const skipIds = [201,150,141, 140, 138, 126, 127, 155, 50];

    let query = supabase
      .from("students")
      .select(
        `id, studentName, class_code, roll, studentImage, classes (classLabel)`,
      )
      .order("class_code", "desc")
      .order("roll", "desc")
      .eq("class_code", 1)
      .not("id", "in", `(${skipIds.join(",")})`);



    const { data, error } = await query;

    if (error) {
      console.log(error);
    } else {
      setStudents(data);
    }

    setDataLoading(false);
  };

  const getClasses = async () => {
    setDataLoading(true);

    let query = supabase
      .from("classes")
      .select("*")
      .order("class_code", "desc");

    const { data, error } = await query;

    if (error) {
      console.log(error);
    } else {
      setClassData(data);
    }

    setDataLoading(false);
  };

  useEffect(() => {
    getStudentsByClass();
    getClasses();
  }, []);

  const instituteInfo = {
    name: "মাদ্‌রাসাতুল হাদিস",
    address: "পুঠিয়ারপাড়, সরিষাবাড়ী, জামালপুর।",
    examTitle: "প্রথম সাময়িক পরীক্ষা - ২০২৬ইং",
    examStartTime: "সকাল ৯টা ও বিকাল ২টা",
  };

  return (
    <div className="font-bangla bg-gray-200">
      {dataLoading ? (
        <div className="min-h-screen flex gap-2.5 items-center justify-center">
          <LoaderCircleIcon className="size-7 animate-spin" />
          <p>অনুগ্রহ করে অপেক্ষা করুন পেজ লোড হচ্ছে।</p>
        </div>
      ) : (
        <>
          {/* office routine */}
          {/* <MonthlyExamOfficeRoutine
            instituteInfo={instituteInfo}
            data={routine}
          /> */}

          {/* classbase routine */}
          {/* <ClassBaseExamRoutine instituteInfo={instituteInfo} data={routine} /> */}

          {/* student admit card */}
          {/* <SimpleAdmitCard
            instituteInfo={instituteInfo}
            routine={routine}
            data={students}
          /> */}
          <AdmitCardLayout
            instituteInfo={instituteInfo}
            routine={routine}
            data={students}
          />

          {/* roll number slip */}
          {/* <RollNumberSlip instituteInfo={instituteInfo} data={students} /> */}

          {/* Class Room Tag */}
          {/* <ClassRoomTag instituteInfo={instituteInfo} data={classData} /> */}
        </>
      )}
    </div>
  );
};

export default MonthlyExam;
