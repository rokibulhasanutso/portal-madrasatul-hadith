import React, { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabase/config";

const NoticePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllNotice = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("notice").select("*");

    if (error) {
      console.log(error);
    }
    if (data) {
      setData(data);
      console.log(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getAllNotice();
  }, []);

  return (
    <div className="mx-5">
      {/* Serach students by name */}
      <div>
        <form>
          <div className="ring-2 ring-gray-700 rounded-xl flex items-center p-2 bg-gray-900">
            <Search className="inline size-7" />
            <input
              type="text"
              placeholder="Search by notice..."
              className="w-full outline-0 ml-2"
            />
          </div>
        </form>
      </div>

      {/* acction buttons */}
      <div className="flex justify-end my-4 font-bangla">
        <button
          onClick={() => navigate("/notice/create")}
          className="px-2 py-2.5 flex items-center ring-2 ring-gray-700 rounded-xl bg-gray-900"
        >
          <Plus />
          <span className="px-2">নতুন নোটিশ তৈরি করুন</span>
        </button>
      </div>

      {/* classes contents */}
      <div className="my-5 mt-10">
        {/* <p className="my-2 text-lg font-medium font-bangla">সকল শ্রেণী সমূহ</p> */}

        <div className="space-y-4">
          {data?.map((notice) => (
            <Link to={`/notice/${notice.id}`} className="block">
              <div className="w-full ring-2 ring-gray-700 bg-gray-800/85 backdrop-blur-[6px] rounded-xl p-4 font-bangla">
                <div className="flex justify-between items-center gap-4">
                  <div className="space-y-2">
                    <h1 className="text-xl font-medium">{notice.title}</h1>
                    <p className="line-clamp-3 text-sm">{notice.description}</p>
                  </div>
                  <div className="text-start self-end">
                    {/* <p>১৫/০৬/২০২৫</p>
                    <p>১০.৩০ AM</p> */}

                    <p>
                      {notice.created_at.split("T")[0].replaceAll("-", "/")}
                    </p>
                    {/* <p>
                      {notice.created_at.split("T")[1]}
                    </p> */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticePage;
