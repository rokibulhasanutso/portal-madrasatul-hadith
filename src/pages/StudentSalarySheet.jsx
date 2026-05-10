import React, { useEffect, useState } from "react";
import { enToBnNumber } from "../utils/functions";
import supabase from "../supabase/config";

const StudentSalarySheet = () => {
  const [data, setData] = useState([]);

  const getStudentInfo = async () => {
    const res = await supabase
      .from("classes")
      .select("*, students:students(id, studentName, roll)")
      .order("roll", { ascending: true, foreignTable: "students" });

    setData(res.data || []);
  };

  useEffect(() => {
    getStudentInfo();
  }, []);

  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  return (
    <>
      {data.map((cls, i) => (
        <div key={i} className="font-bangla text-sm m-2.5">
          <h2 className="text-center text-xl font-bold mb-2">মাদরাসাতুল হাদিস</h2>
          
          <div className="grid grid-cols-3 mb-2">
            <p>শ্রেণীঃ {cls.classLabel} </p>
            <p className="text-center col-span-1">বেতন আদায়ের তালিকা - ২০২৬ইং</p>
          </div>

          <div className="overflow-x-auto">
            <table className="table-fixed w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-12 border border-black px-1 py-0.5">রোল</th>
                  <th className="w-40 border border-black px-1 py-0.5">শিক্ষার্থীর নাম</th>

                  {months.map((month) => (
                    <React.Fragment key={month}>
                      <th className="w-16 border border-black px-1 py-0.5">{month}</th>
                      <th className="w-16 border border-black px-1 py-0.5">ফি</th>
                    </React.Fragment>
                  ))}

                  <th className="w-16 border border-black px-1 py-0.5">মোট</th>
                </tr>
              </thead>

              <tbody>
                {cls.students?.map((student, idx) => (
                  <tr key={idx}>
                    <td className="border border-black px-1 py-0.5">{enToBnNumber(student.roll)}</td>
                    <td className="border border-black px-1 py-0.5">{student.studentName}</td>

                    {months.map((_, i) => (
                      <React.Fragment key={i}>
                        <td className="border border-black px-1 py-0.5"></td>
                        <td className="border border-black px-1 py-0.5"></td>
                      </React.Fragment>
                    ))}

                    <td className="border border-black px-1 py-0.5"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
};

export default StudentSalarySheet;
