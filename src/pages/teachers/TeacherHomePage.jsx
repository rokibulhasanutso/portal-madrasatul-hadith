import { Check, Plus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const TeacherHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-5">
      {/* Serach students by name */}
      <div>
        <form>
          <div className="ring-2 ring-gray-700 rounded-xl flex items-center p-2 bg-gray-900">
            <Search className="inline size-7" />
            <input
              type="text"
              placeholder="Search by teacher name..."
              className="w-full outline-0 ml-2"
            />
          </div>
        </form>
      </div>

      {/* acction buttons */}
      <div className="flex justify-end my-4 font-bangla">
        <button
          onClick={() => navigate("/teachers/add")}
          className="px-2 py-2.5 flex items-center ring-2 ring-gray-700 rounded-xl bg-gray-900"
        >
          <Plus />
          <span className="px-2">নতুন শিক্ষক যুক্ত করুণ</span>
        </button>
      </div>

      {/* classes contents */}
      <div className="my-5 mt-10">
        {/* <p className="my-2 text-lg font-medium font-bangla">সকল শ্রেণী সমূহ</p> */}

        <div className="grid grid-cols-3 gap-5">
          {Array.from({ length: 7 }).map(() => (
            <Link to={`/teachers`} className="block">
              <div className="space-y-1 w-full ring-2 ring-gray-700 bg-gray-800/85 backdrop-blur-[6px] rounded-xl p-2 font-bangla">
                <div className="relative ring-4 ring-green-500 rounded-full">
                  <div className="relative aspect-square rounded-full overflow-hidden ">
                    <img
                      src="/assets/user_avater.png"
                      className="size-full"
                      alt="User Image"
                    />
                  </div>
                  <div className="bg-green-500 absolute bottom-0 right-0 rounded-full">
                    <Check />
                  </div>
                </div>

                <div className="font-bangla text-base text-center mt-2">
                  <p className="line-clamp-1">জাহাঙ্গীর সরকার</p>
                  <p className="text-sm">প্রধান শিক্ষক</p>
                </div>

                <div className="bg-green-500 rounded-2xl text-center font-sans">
                  8.40 PM
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherHomePage;
