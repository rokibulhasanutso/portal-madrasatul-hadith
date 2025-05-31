import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import supabase from "../../supabase/config";

const NoticeDetails = () => {
  const { notice_id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotice = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("notice")
      .select("*")
      .eq("id", notice_id)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      setData(data);
      console.log(data);
    }

    setLoading(false);
  };

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

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div className="py-5 px-6 bg-gray-900/50 backdrop-blur-sm h-[calc(100svh-68px)] font-bangla text-lg">
      <h1 className="text-2xl text-center my-8">{data.title}</h1>

      <div className="ring-2 ring-gray-700 rounded-xl flex items-center px-3.5 py-2 bg-gray-900">
        <p>{data.description}</p>
      </div>

      <div className="flex justify-end my-4 font-bangla">
        <button
          onClick={() => navigate(`/notice/edit/${data.id}`)}
          className="px-2 py-2.5 flex items-center ring-2 ring-gray-700 rounded-xl bg-gray-900"
        >
          <Edit />
          <span className="px-2">নোটিশ পরিবর্তন করুন</span>
        </button>
      </div>

      {/* classes contents */}
      <div className="my-5 mt-10">
        {/* <p className="my-2 text-lg font-medium font-bangla">সকল শ্রেণী সমূহ</p> */}

        <div className="space-y-4">
          {classesData?.map((data) => (
            <Link
              key={data.id}
              to={`/notice/send-sms/${notice_id}/${data.class_code}`}
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
    </div>
  );
};

export default NoticeDetails;
