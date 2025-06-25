import React, { useEffect, useState } from "react";
import supabase from "../../supabase/config";
import ExamAdmitCard from "../../components/ExamAdmitCard";

const AdmitListPage = () => {
  const [studentsDataLoading, setStudentsDataLoading] = useState(false);
  const [data, setData] = useState([]);

  const getStudentsByClass = async () => {
    setStudentsDataLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select(
        `id, studentName, class_code, roll, studentImage, classes (classLabel)`
      )
      .eq("class_code", 7)
      .order("id", "desc");

    if (error) {
      console.log(error);
    } else {
      setData(data);
    }

    // const { data: classLabel, error: classError } = await supabase
    //   .from("classes")
    //   .select("*")
    //   .eq("class_code", classcode)
    //   .single();

    // if (error) {
    //   console.log(error);
    // }
    // if (data && classLabel) {
    //   setData({
    //     class: classLabel.classLabel,
    //     students: data,
    //   });
    // }

    setStudentsDataLoading(false);
  };

  useEffect(() => {
    getStudentsByClass();
  }, []);

  return (
    <div>
      <div className="page-size-A4 mx-auto">
        {data?.map((data) => (
          <ExamAdmitCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default AdmitListPage;
