import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase/config";
import LoadingComponent from "../../components/LoadingComponent";
import { enToBnNumber } from "./../../utils/functions";

const StudentHomePage = () => {
  const navigate = useNavigate();
  const [statisticData, setStatisticData] = useState({
    total_students: 0,
    total_classes: 0,
  });
  const [classesData, setClassesData] = useState([]);
  const [classesDataLoading, setClassesDataLoading] = useState(false);

  const getAllClasses = async () => {
    setClassesDataLoading(true);

    const { data, error } = await supabase
      .from("classes")
      .select("*, total_students:students(count)");
    if (error) {
      console.log(error);
    }
    if (data) {
      const filteredData = data.map((cls) => ({
        id: cls.id,
        class_code: cls.class_code,
        classLabel: cls.classLabel,
        totalStudents: cls.total_students[0].count,
      }));

      const statisticCalculation = {
        total_students: data.reduce((total, cls) => {
          return total + cls.total_students[0].count;
        }, 0),
        total_classes: data.length,
      };

      setStatisticData(statisticCalculation);
      setClassesData(filteredData);
    }

    setClassesDataLoading(false);
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  return (
    <div className="m-5">
      {/* statistic data */}
      <div className="my-5">
        <div className="w-full ring-2 ring-gray-700 bg-gray-800/85 backdrop-blur-[6px] rounded-xl p-4 font-bangla">
          <div>
            <p className="text-xl">
              <span>শিক্ষার্থী সংখ্যাঃ</span>{" "}
              <span>{enToBnNumber(statisticData.total_students)} জন</span>
            </p>
            <p className="text-xl">
              <span>শ্রেণী সংখ্যাঃ</span>{" "}
              <span>{enToBnNumber(statisticData.total_classes)} টি</span>
            </p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/students/add")}
              className="px-2 py-2.5 flex items-center ring-2 ring-gray-700 rounded-xl bg-gray-900"
            >
              <Plus />
              <span className="px-2">নতুন শিক্ষার্থী যুক্ত করুন</span>
            </button>
          </div>
        </div>
      </div>

      {/* classes contents */}
      <LoadingComponent loadingState={classesDataLoading}>
        <div className="my-5">
          <div className="grid grid-cols-2 gap-5">
            {classesData?.map((data) => (
              <Link
                key={data.id}
                to={`/students/${data.class_code}`}
                className="block"
              >
                <div className="w-full ring-2 ring-gray-700 bg-gray-800/85 backdrop-blur-[6px] rounded-xl p-4 font-bangla">
                  <div className="">
                    <p>{data.classLabel} শ্রেণী</p>
                    <p className="">
                      শিক্ষার্থীঃ {enToBnNumber(data.totalStudents)} জন
                    </p>
                    {/* <p className="">উপস্থিতিঃ</p> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </LoadingComponent>
    </div>
  );
};

export default StudentHomePage;
