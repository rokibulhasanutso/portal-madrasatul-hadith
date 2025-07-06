import React, { useState } from "react";
import StudentForm from "../../components/StudentForm";
import supabase from "../../supabase/config";
import { useNavigate } from "react-router-dom";

const StudentAddPage = () => {
  // const [submitData, setSubmitData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (insertData) => {
    // console.log(updateData);
    const { data, error } = await supabase
      .from("students")
      .insert([insertData])
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      // navigate(`/students/${data.class_code}/${data.id}`);
      console.log("ok");
    }

    console.log(data, error, insertData);
  };
  return (
    <>
      <div className="area-wrapper bg-content-blur font-bangla text-lg">
        <h1 className="text-2xl text-center my-8">
          নতুন শিক্ষার্থী ভর্তি ফর্ম
        </h1>
        <StudentForm onSubmit={(value) => handleSubmit(value)} />
      </div>
    </>
  );
};

export default StudentAddPage;
