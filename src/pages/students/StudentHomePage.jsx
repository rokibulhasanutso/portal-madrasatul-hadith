import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase/config";
import LoadingComponent from "../../components/LoadingComponent";

const StudentHomePage = () => {
  const navigate = useNavigate();
  const [classesData, setClassesData] = useState([]);
  const [classesDataLoading, setClassesDataLoading] = useState(false);

  const getAllClasses = async () => {
    setClassesDataLoading(true);

    const { data, error } = await supabase.from("classes").select("*");
    if (error) {
      console.log(error);
    }
    if (data) {
      setClassesData(data);
    }

    setClassesDataLoading(false);
  };

  useEffect(() => {
    getAllClasses();
  }, []);

  return (
    <div className="m-5">
      {/* Serach students by name */}
      <div>
        <form>
          <div className="ring-2 ring-gray-700 rounded-xl flex items-center p-2 bg-gray-900">
            <Search className="inline size-7" />
            <input
              type="text"
              placeholder="Search by student name..."
              className="w-full outline-0 ml-2"
            />
          </div>
        </form>
      </div>

      {/* acction buttons */}
      <div className="flex justify-end my-4 font-bangla">
        <button
          onClick={() => navigate("/students/add")}
          className="px-2 py-2.5 flex items-center ring-2 ring-gray-700 rounded-xl bg-gray-900"
        >
          <Plus />
          <span className="px-2">নতুন শিক্ষার্থী যুক্ত করুণ</span>
        </button>
      </div>

      <LoadingComponent loadingState={classesDataLoading}>
        {/* classes contents */}
        <div className="my-5 mt-10">
          {/* <p className="my-2 text-lg font-medium font-bangla">সকল শ্রেণী সমূহ</p> */}

          <div className="space-y-4">
            {classesData?.map((data) => (
              <Link
                key={data.id}
                to={`/students/${data.class_code}`}
                className="block"
              >
                <div className="w-full ring-2 ring-gray-700 bg-gray-800/85 backdrop-blur-[6px] rounded-xl p-4 font-bangla">
                  <div className="grid grid-cols-3 justify-between items-center">
                    <p>{data.classLabel} শ্রেণী</p>
                    <p className="text-center">২৯ / ৩৫</p>
                    <p className="text-end">৭৮ %</p>
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
