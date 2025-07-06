import React from "react";
import BackgroundBlurWrapper from "../../components/BackgroundBlurWrapper";
import AddButton from "../../components/AddButton";

const ExamPage = () => {
  return (
    <BackgroundBlurWrapper>
      <AddButton className={"justify-end"} action={"create"}>
        নতুন পরীক্ষা তৈরি করুন
      </AddButton>
      
      <div>
        <h3>পূর্ববর্তী পরীক্ষাগুলিঃ</h3>
      </div>
    </BackgroundBlurWrapper>
  );
};

export default ExamPage;
