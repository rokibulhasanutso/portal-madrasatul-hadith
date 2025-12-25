import React, { useEffect, useState } from "react";
import supabase from "../../supabase/config";
import { useSearchParams } from "react-router-dom";
import { enToBnNumber } from "./../../utils/functions";

const SitStiker = () => {
  const [studentsDataLoading, setStudentsDataLoading] = useState(false);
  const [seachparams] = useSearchParams();
  const withID = seachparams.get("id");
  const skipID = seachparams.get("skip_id");
  const withOneRoll = seachparams.get("roll");
  const skipRoll = seachparams.get("skip_roll");
  const [data, setData] = useState([]);

  const getStudentsByClass = async (class_code) => {
    setStudentsDataLoading(true);

    let query = supabase
      .from("students")
      .select(
        `id, studentName, class_code, roll, studentImage, classes (classLabel)`
      )
      .order("id", "desc");

    if (parseInt(class_code)) {
      query = query.eq("class_code", class_code);
    }

    if (withID) {
      query = query = query.in("id", withID.split(","));
    }

    if (skipID) {
      query = query = query.not("id", "in", `(${skipID})`);
    }

    if (withOneRoll) {
      query = query = query.in("roll", withOneRoll.split(","));
    }

    if (skipRoll) {
      query = query = query.not("roll", "in", `(${skipRoll})`);
    }

    const { data, error } = await query;

    if (error) {
      console.log(error);
    } else {
      setData(data);
    }

    setStudentsDataLoading(false);
  };

  useEffect(() => {
    getStudentsByClass(seachparams.get("class_code"));
  }, [seachparams]);

  console.log(data);

  return (
    <div>
      <div className="page-size-A4 mx-auto">
        <div className="grid grid-cols-3">
          {data?.map((data) => (
            <div
              key={data.id}
              className="p-6 border-[0.1px] border-dashed border-gray-300"
            >
              <div className="ring-6 ring-gray-300 rounded-lg font-galada h-[46mm] relative background-logo after:!size-32">
                {/* heading */}
                <div className="pt-5 pb-1">
                  {/* <img
                    src="/assets/logo-transparent.jpg"
                    alt="logo"
                    className="size-10 m-2.5"
                  /> */}
                  <p className="text-center text-2xl">
                    মাদ্‌রাসাতুল হাদিস
                  </p>
                  <p className="text-center text-sm font-bangla">
                    বার্ষিক পরীক্ষা - ২০২৫ইং
                  </p>
                </div>

                {/* student info */}
                <div className="mx-3 my-4 text-xl text-center">
                  <p className="text-[22px] my-2 text-nowrap">নামঃ {data.studentName}</p>
                  <div className="flex justify-between">
                    <p>শ্রেণীঃ {data.classes.classLabel}</p>
                    <p>
                      রোলঃ{" "}
                      <span className="font-bangla font-semibold">
                        {enToBnNumber(data.roll).padStart(2, "০")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SitStiker;
