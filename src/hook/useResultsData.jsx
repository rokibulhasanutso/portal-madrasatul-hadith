import { useState, useEffect, useCallback } from "react";
import {
  secondTermExamClassBySubjectCodes as SUBJECTS_BY_CLASS,
  subjectInfo as SUBJECTS_INFO,
} from "../static/SecondTermExamRoutine.js";
import supabase from "../supabase/config.js";
import { getGrade } from "../utils/examFunctions.js";

const useResultsData = ({ idParam, classCodeParam, rollParams } = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = useCallback(async () => {
    setLoading(true);

    const { data: resultData, error } = await supabase
      .from(import.meta.env.VITE_RESULT_TABLE_NAME)
      .select(
        `id, created_at,
         students(id, studentName, roll, studentImage, classes(classLabel, class_code)),
         *`
      )
      .order("id", { ascending: true });

    if (error) {
      console.error("Error:", error);
      setLoading(false);
      return;
    }

    const studentsWithResults = resultData.map((item) => {
      const { students, ...rest } = item;
      const classCode = students?.classes?.class_code;
      const validSubjects = SUBJECTS_BY_CLASS[classCode] || [];

      let totalMarks = 0;
      let fullMarks = 0;
      let hasFail = false;
      let allAPlus = true;

      const subjectResults = validSubjects.map((subjectId) => {
        const subjectInfo = SUBJECTS_INFO[subjectId] || {};
        const mark = parseFloat(rest[subjectId]) || 0;
        const full = subjectInfo.fullMarks || 100;
        const grade = getGrade(full, mark);

        if (grade === "F") hasFail = true;
        if (grade !== "A+") allAPlus = false;

        totalMarks += mark;
        fullMarks += full;

        return {
          sub_code: subjectId,
          sub_name: subjectInfo.name || `Subject ${subjectId}`,
          obtained_marks: mark,
          full_marks: full,
          grade,
        };
      });

      const totalGrade = getGrade(fullMarks, totalMarks);
      let allOverGrade = hasFail
        ? "F"
        : totalGrade === "A+" && !allAPlus
        ? "A"
        : totalGrade;

      return {
        id: item.id,
        name: students?.studentName || "",
        roll: students?.roll || "",
        class: students?.classes?.classLabel || "",
        class_code: classCode,
        studentImage: students?.studentImage || "",
        total_obtained_marks: totalMarks,
        total_full_marks: fullMarks,
        grade: allOverGrade,
        results: subjectResults,
        created_at: item.created_at,
      };
    });

    const groupedByClass = {};
    studentsWithResults.forEach((student) => {
      const code = student.class_code;
      if (!groupedByClass[code]) groupedByClass[code] = [];
      groupedByClass[code].push(student);
    });

    const studentsWithPlacement = Object.values(groupedByClass).flatMap(
      (classGroup) => {
        return [...classGroup]
          .sort((a, b) => b.total_obtained_marks - a.total_obtained_marks)
          .map((student, index) => ({
            ...student,
            placement: index + 1,
          }));
      }
    );

    const filtered = studentsWithPlacement.filter((student) => {
      const matchId = isNaN(idParam) || student.id === idParam;
      const matchRoll =
        rollParams?.length === 0 ||
        rollParams?.includes(parseInt(student.roll));
      const matchClass =
        isNaN(classCodeParam) || student.class_code === classCodeParam;
      return matchId && matchRoll && matchClass;
    });

    setData(filtered.length > 0 ? filtered : studentsWithPlacement);
    setLoading(false);
  }, [idParam, classCodeParam, rollParams]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return { data, loading, refetch: fetchResults };
};

export default useResultsData;
