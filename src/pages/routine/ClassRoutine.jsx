import React from 'react';
import { PrintPage } from "@/components/pageComponent/A4page";

const ClassRoutine = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <PrintPage
        size="A4"
        // orientation="portrait"
        orientation="landscape"
        padding={{ x: 0, y: 0, unit: "cm" }}
        className="border border-gray-300"
        style={{ transform: "scale(1.2)" }}
      >
        
      </PrintPage>
    </div>
  );
};

export default ClassRoutine;