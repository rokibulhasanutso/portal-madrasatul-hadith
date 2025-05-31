import React, { useState } from "react";
import StudentForm from "../components/StudentForm";

const StudentAddPage = () => {
  const [submitData, setSubmitData] = useState({});

  console.log(submitData);

  return (
    <>
      <div className="py-5 px-6 bg-gray-900/50 backdrop-blur-sm h-full font-bangla text-lg">
        <h1 className="text-2xl text-center my-8">
          নতুন শিক্ষার্থী ভর্তি ফর্ম
        </h1>
        <StudentForm onSubmit={(value) => setSubmitData(value)} />
      </div>
    </>
  );
};

export default StudentAddPage;
