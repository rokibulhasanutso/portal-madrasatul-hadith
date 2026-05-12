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
import Button from "@/components/Button";

const MonthlyExam = () => {
  const routine = getSecondTermRoutines();

  const [dataLoading, setDataLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [classData, setClassData] = useState([]);
  const [isReadyToPrint, setIsReadyToPrint] = useState(false);

  const getStudentsByClass = async () => {
    try {
      setDataLoading(true);

      const { data, error } = await supabase
        .from("students")
        .select(
          `id, studentName, class_code, roll, studentImage, classes (classLabel)`
        )
        .order("class_code", "desc")
        .order("roll", "desc");

      if (error) {
        console.log(error);
      } else {
        setStudents(data || []);
      }
    } catch (error) {
      alert("An error occurred while fetching students data.");
    }
  };

  const getClasses = async () => {
    try {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .order("class_code", "desc");

      if (error) {
        console.log(error);
      } else {
        setClassData(data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([getStudentsByClass(), getClasses()]);
      setDataLoading(false);
      setIsReadyToPrint(true);
    };

    loadData();
  }, []);

  // সব component render হওয়ার পরে print
  useEffect(() => {
    if (
      isReadyToPrint &&
      students.length > 0
    ) {
      // setTimeout(() => {
      //   window.print();

      //   window.onafterprint = () => {
      //     window.close();
      //   };
      // }, 500);
    }
  }, [isReadyToPrint, students]);

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
          {/* <div className="p-4 text-center">
            <h1 className="text-3xl font-galada mb-2">{instituteInfo.name}</h1>
            <p>{instituteInfo.address}</p>
            <p className="mt-1">{instituteInfo.examTitle}</p>

            {classData.length > 0 && (
              <p className="mt-1">


            )}
            <Button className={"bg-white"} value={"প্লে শ্রেণী"} />
          </div> */}

          <div className="">


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
          </div>
        </>
      )}
    </div>
  );
};

export default MonthlyExam;
