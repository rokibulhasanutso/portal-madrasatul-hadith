import React, { useEffect, useState } from "react";
import Statusbar from "../components/Statusbar";
import { useBanglaDateTime } from "../hook/useBanglaDateTime";
import { useNavigate } from "react-router-dom";
import useResultsData from "@/hook/useResultsData";
import { classNamelist } from "@/static/commonData";
import { enToBnNumber } from "@/utils/functions";

const gradeColor = (grade) => {
  if (grade === "F") return "bg-red-500/20 text-red-400";
  if (grade === "A+" || grade === "A") return "bg-green-500/20 text-green-400";
  if (grade === "A-" || grade === "B") return "bg-blue-500/20 text-blue-400";
  return "bg-yellow-500/20 text-yellow-400";
};

const buildClassWiseResult = (resultData) => {
  const grouped = resultData.reduce((acc, student) => {
    const code = student.class_code;
    if (!acc[code]) acc[code] = [];
    acc[code].push(student);
    return acc;
  }, {});

  return Object.keys(grouped).reduce((acc, classCode) => {
    const students = grouped[classCode];

    const subjectStats = {};
    students.forEach((student) => {
      student.results.forEach((sub) => {
        if (!subjectStats[sub.sub_code]) {
          subjectStats[sub.sub_code] = {
            sub_name: sub.sub_name,
            full_marks: sub.full_marks,
            total: 0,
            passed: 0,
          };
        }
        subjectStats[sub.sub_code].total += 1;
        if (sub.grade !== "F") {
          subjectStats[sub.sub_code].passed += 1;
        }
      });
    });

    acc[classCode] = { students, subjectStats };
    return acc;
  }, {});
};

// ── SubjectStats Panel ───────────────────────────────────────

const SubjectStatsPanel = ({ subjectStats }) => (
  <div className="bg-gray-900/50 px-4 py-3 space-y-2">
    {Object.values(subjectStats).map((stat) => {
      const failed = stat.total - stat.passed;
      const percentage =
        stat.total > 0
          ? ((stat.passed / stat.total) * 100).toFixed(1)
          : "0.0";

      const barWidth =
        stat.total > 0
          ? Math.round((stat.passed / stat.total) * 100)
          : 0;

      return (
        <div key={stat.sub_name} className="space-y-1">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="text-gray-300 flex-1 pr-2 truncate">
              {stat.sub_name}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-green-400">
                পাস {enToBnNumber(stat.passed)}
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-red-400">
                ফেল {enToBnNumber(failed)}
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-300 font-medium w-10 text-right">
                {enToBnNumber(percentage)}%
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500/70 rounded-full transition-all duration-300"
              style={{ width: `${barWidth}%` }}
            />
          </div>
        </div>
      );
    })}
  </div>
);

// ── Student Panel ────────────────────────────────────────────

const StudentImage = ({ src, name }) =>
  src ? (
    <img
      src={src}
      alt={name}
      className="w-7 h-7 rounded-full object-cover flex-shrink-0"
    />
  ) : (
    <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-xs flex-shrink-0">
      {name.trim()[0]}
    </div>
  );

const StudentItem = ({ student, isOpen, onToggle }) => (
  <div className="border-b border-white/5 last:border-b-0">
    <div
      className="grid grid-cols-3 items-center px-4 py-2.5 text-sm cursor-pointer hover:bg-white/5 transition-colors select-none"
      onClick={onToggle}
    >
      <div className="flex items-center gap-2 min-w-0">
        <StudentImage src={student.studentImage} name={student.name} />
        <span className="truncate">{student.name}</span>
      </div>

      <p className="text-center font-sans text-gray-300">
        {enToBnNumber(student.total_obtained_marks)}/
        {enToBnNumber(student.total_full_marks)}
      </p>

      <div className="flex items-center justify-end gap-2">
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${gradeColor(student.grade)}`}
        >
          {student.grade}
        </span>
        <span
          className={`text-gray-500 text-xs transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </div>
    </div>

    {isOpen && (
      <div className="bg-gray-900/50 px-4 py-3">
        <p className="text-xs text-gray-400 mb-2 font-sans">
          মেধাক্রম:{" "}
          <span className="text-white font-medium">
            {enToBnNumber(student.placement)}
          </span>{" "}
          · রোল:{" "}
          <span className="text-white font-medium">
            {enToBnNumber(student.roll)}
          </span>
        </p>

        {student.results.map((sub) => (
          <div
            key={sub.sub_code}
            className="flex items-center justify-between text-xs font-sans py-1 border-b border-white/5 last:border-b-0"
          >
            <span className="text-gray-300 flex-1 pr-2 truncate">
              {sub.sub_name}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-gray-400">
                {enToBnNumber(sub.obtained_marks)}/
                {enToBnNumber(sub.full_marks)}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${gradeColor(sub.grade)}`}
              >
                {sub.grade}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const StudentsPanel = ({ students, expandedStudent, onToggleStudent }) => (
  <div>
    {students.map((student) => (
      <StudentItem
        key={student.id}
        student={student}
        isOpen={expandedStudent === student.id}
        onToggle={() => onToggleStudent(student.id)}
      />
    ))}
  </div>
);

// ── ClassItem ────────────────────────────────────────────────

const TAB = { NONE: null, SUBJECTS: "subjects", STUDENTS: "students" };

const ClassItem = ({ classCode, students, subjectStats }) => {
  const [activeTab, setActiveTab] = useState(TAB.NONE);
  const [expandedStudent, setExpandedStudent] = useState(null);

  const totalStudents = students.length;
  const passedStudents = students.filter((s) => s.grade !== "F").length;
  const percentage =
    totalStudents > 0
      ? ((passedStudents / totalStudents) * 100).toFixed(2)
      : "0.00";

  const handleTabToggle = (tab) => {
    setActiveTab((prev) => (prev === tab ? TAB.NONE : tab));
    setExpandedStudent(null);
  };

  const handleToggleStudent = (id) => {
    setExpandedStudent((prev) => (prev === id ? null : id));
  };

  const isOpen = activeTab !== TAB.NONE;

  return (
    <div className="w-full bg-gray-800/75 backdrop-blur-xs rounded-xl overflow-hidden">
      {/* Class Header */}
      <div className="grid grid-cols-3 items-center p-4">
        <p className="font-medium">{classNamelist[classCode]}</p>

        <p className="text-center font-sans text-sm">
          {enToBnNumber(passedStudents)} / {enToBnNumber(totalStudents)}
        </p>

        <p className="text-right font-sans text-sm">
          {enToBnNumber(percentage)} %
        </p>
      </div>

      {/* Two Buttons */}
      <div className="grid grid-cols-2 gap-2 px-4 pb-4">
        <button
          onClick={() => handleTabToggle(TAB.SUBJECTS)}
          className={`py-2 px-3 rounded-lg text-xs font-sans font-medium transition-colors select-none
            ${activeTab === TAB.SUBJECTS
              ? "bg-blue-500/30 text-blue-300 ring-1 ring-blue-500/40"
              : "bg-gray-700/60 text-gray-400 hover:bg-gray-700"
            }`}
        >
          সাবজেক্টভিত্তিক পাশের হার
          <span className="ml-1">{activeTab === TAB.SUBJECTS ? "▴" : "▾"}</span>
        </button>

        <button
          onClick={() => handleTabToggle(TAB.STUDENTS)}
          className={`py-2 px-3 rounded-lg text-xs font-sans font-medium transition-colors select-none
            ${activeTab === TAB.STUDENTS
              ? "bg-purple-500/30 text-purple-300 ring-1 ring-purple-500/40"
              : "bg-gray-700/60 text-gray-400 hover:bg-gray-700"
            }`}
        >
          ছাত্রভিত্তিক ফলাফল
          <span className="ml-1">{activeTab === TAB.STUDENTS ? "▴" : "▾"}</span>
        </button>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="border-t border-white/10">
          {activeTab === TAB.SUBJECTS && (
            <SubjectStatsPanel subjectStats={subjectStats} />
          )}
          {activeTab === TAB.STUDENTS && (
            <StudentsPanel
              students={students}
              expandedStudent={expandedStudent}
              onToggleStudent={handleToggleStudent}
            />
          )}
        </div>
      )}
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────

const HomePage = () => {
  const navigate = useNavigate();
  const banglaDateTime = useBanglaDateTime();

  const { data: resultData, loading: resultLoading } = useResultsData();
  const [classWiseResult, setClassWiseResult] = useState({});

  useEffect(() => {
    if (resultData?.length) {
      setClassWiseResult(buildClassWiseResult(resultData));
    }
  }, [resultData]);

  return (
    <div className="*:my-10">
      {/* Profile */}
      <div
        onClick={() => navigate("/teachers/profile")}
        className="flex justify-center items-center gap-6 px-5"
      >
        <div className="size-28 rounded-full overflow-hidden ring-4 ring-gray-700">
          <img
            src="/assets/user_avater.png"
            className="size-full"
            alt="User Image"
          />
        </div>
        <div className="font-bangla text-2xl w-[160px]">
          <p>জাহাঙ্গীর সরকার</p>
          <p className="text-lg">প্রধান শিক্ষক</p>
        </div>
      </div>

      {/* Clock */}
      <div className="flex justify-center">
        <div className="bg-gray-900/90 backdrop-blur-xs rounded-xl p-4 font-bangla text-2xl ring-4 ring-gray-700 text-center min-w-50">
          <p>{banglaDateTime.time}</p>
          <p className="text-base">{banglaDateTime.date}</p>
        </div>
      </div>

      {/* Statusbar */}
      <div className="mx-5">
        <Statusbar />
      </div>

      {/* Results */}
      <div className="mx-5">
        <h2 className="font-bangla text-xl font-medium my-2.5">
          শ্রেণী ভিত্তিক ফলাফল ও শতাংশ
        </h2>

        <div className="space-y-3.5 font-serif">
          {resultLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            Object.keys(classWiseResult)
              .sort((a, b) => Number(a) - Number(b))
              .map((classCode) => {
                const { students, subjectStats } = classWiseResult[classCode];
                return (
                  <ClassItem
                    key={classCode}
                    classCode={classCode}
                    students={students}
                    subjectStats={subjectStats}
                  />
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;