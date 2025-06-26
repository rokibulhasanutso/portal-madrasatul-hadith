import React, { useEffect, useState } from "react";
import supabase from "../../supabase/config";
import ExamAdmitCard from "../../components/ExamAdmitCard";
import { useSearchParams } from "react-router-dom";

const AdmitListPage = () => {
  const [studentsDataLoading, setStudentsDataLoading] = useState(false);
  const [seachparams] = useSearchParams();
  const [data, setData] = useState([]);

  const getStudentsByClass = async (class_code) => {
    setStudentsDataLoading(true);

    let query = supabase
      .from("students")
      .select(
        `id, studentName, class_code, roll, studentImage, classes (classLabel)`
      )
      .order("id", "desc");

    if (parseInt(class_code)) {
      query = query.eq("class_code", class_code);
    }

    const { data, error } = await query;

    if (error) {
      console.log(error);
    } else {
      setData(data);
    }
    
    setStudentsDataLoading(false);
  };

  useEffect(() => {
    getStudentsByClass(seachparams.get("class_code"));
  }, [seachparams]);

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
