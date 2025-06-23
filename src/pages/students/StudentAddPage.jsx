import React, { useState } from "react";
import StudentForm from "../../components/StudentForm";

const StudentAddPage = () => {
  const [submitData, setSubmitData] = useState({});

  

  return (
    <>
      <div className="area-wrapper bg-content-blur font-bangla text-lg">
        <h1 className="text-2xl text-center my-8">
          নতুন শিক্ষার্থী ভর্তি ফর্ম
        </h1>
        <StudentForm onSubmit={(value) => setSubmitData(value)} />
      </div>
    </>
  );
};

export default StudentAddPage;
