import React from "react";

const TeacherEditPage = () => {
  return (
    <div className="area-wrapper bg-content-blur font-bangla text-lg">
      <h1 className="text-2xl text-center my-8">
        শিক্ষার্থী তথ্য পরিবর্তন করুন
      </h1>

      <LoadingComponent loadingState={oneStudentLoading}>
        <StudentForm
          defaultValue={oneStudentData}
          onSubmit={(value) => updateData(value)}
        />
      </LoadingComponent>
    </div>
  );
};

export default TeacherEditPage;
