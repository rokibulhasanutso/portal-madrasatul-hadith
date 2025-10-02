import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentForm from "../../components/StudentForm";
import supabase from "../../supabase/config";
import LoadingComponent from "../../components/LoadingComponent";

const NewAdmissionStudentEdit = () => {
  const { student_id: studentID } = useParams();
  const navigate = useNavigate();
  // const [submitData, setSubmitData] = useState({});
  const [oneStudentData, setOneStudentData] = useState({});
  const [oneStudentLoading, setOneStudentLoading] = useState(false);

  const getOneStudent = async (studentId) => {
    setOneStudentLoading(true);

    const { data, error } = await supabase
      .from("new-admission")
      .select("*")
      .eq("id", studentId)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      setOneStudentData(data);
    }

    setOneStudentLoading(false);
  };

  const updateData = async (updateData) => {
    // console.log(updateData);
    const { data, error } = await supabase
      .from("students")
      .upsert({ id: studentID, ...updateData })
      .select()
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      navigate(`/students/${data.class_code}/${studentID}`);
    }
  };

  useEffect(() => {
    getOneStudent(studentID);
  }, [studentID]);

  return (
    <div className="area-wrapper bg-content-blur font-bangla text-lg">
      <h1 className="text-2xl text-center my-8">
        শিক্ষার্থী তথ্য পরিবর্তন করুন
      </h1>

      <LoadingComponent loadingState={oneStudentLoading}>
        <StudentForm
          defaultValue={oneStudentData}
          onSubmit={(value) => updateData(value)}
          imageUploadOptionDisable={true}
          bucketName="new-students"
          tableName="new-admission"
        />
      </LoadingComponent>
    </div>
  );
};

export default NewAdmissionStudentEdit;
