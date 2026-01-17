import React, { useState } from "react";
import StudentForm from "../../components/StudentForm";
import supabase from "../../supabase/config";
import { useNavigate } from "react-router-dom";
import { Loader, Loader2 } from "lucide-react";

const StudentAddPage = () => {
  const navigate = useNavigate();
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const handleSubmit = async (insertData) => {
    setSubmissionLoading(true);

    const { data, error } = await supabase
      .from("students")
      .insert([insertData])
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      navigate(`/students/${data[0].class_code}/${data[0].id}`);
    }

    setSubmissionLoading(false);
  };
  return (
    <>
      <div className="area-wrapper bg-content-blur font-bangla text-lg">
        <h1 className="text-2xl text-center my-8">
          নতুন শিক্ষার্থী ভর্তি ফর্ম
        </h1>

        {submissionLoading && (
          <p className="text-center flex justify-center items-center">
            <Loader2 className="mr-4 animate-spin" /> অপেক্ষা করুন...
          </p>
        )}

        {!submissionLoading && (
          <StudentForm onSubmit={(value) => handleSubmit(value)} />
        )}
      </div>
    </>
  );
};

export default StudentAddPage;
