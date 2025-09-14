import React, { useEffect, useState } from "react";
import supabase from "./../../supabase/config";

const ResultOnlineSheet = () => {
  const [data, setData] = useState([]);

  const getAllResults = async () => {
    const { data, error } = await supabase
      .from(import.meta.env.VITE_RESULT_TABLE_NAME)
      .select(
        `*, students (id, studentName, roll, classes (classLabel, class_code), studentImage)`
      )
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching results:", error);
      return [];
    }

    const convertedData = data.map((item) => {
      const { id, created_at, students, ...rest } = item;

      const results = Object.keys(rest).reduce((acc, key) => {
        if (!isNaN(key)) {
          acc[key] = rest[key];
        }
        return acc;
      }, {});

      return {
        id,
        name: students.studentName,
        roll: students.roll,
        classLabel: students.classes.classLabel,
        class_code: students.classes.class_code,
        studentImage: students.studentImage,
        results,
        created_at,
      };
    });

    setData(convertedData);
  };

  useEffect(() => {
    getAllResults(1);
  }, []);

  console.log(data);

  return <div></div>;
};

export default ResultOnlineSheet;
