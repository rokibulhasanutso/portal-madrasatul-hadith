import React from "react";
import Statusbar from "../components/Statusbar";

const HomePage = () => {
  return (
    <div className="*:my-10">
      <div className="flex justify-center items-center gap-6 px-5">
        {/* heading  */}
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

      {/* watch */}
      <div className="flex justify-center">
        <div className="bg-gray-900/90 backdrop-blur-xs rounded-xl p-4 font-bangla text-2xl ring-4 ring-gray-700 text-center">
          <p>সকাল ৮ : ৩০</p>
          <p className="text-base">বৃহঃস্পতিবার, ১৫ জানুয়ারী, ২০২৫</p>
        </div>
      </div>

      {/* Statusbar  */}
      <div className="mx-5">
        <Statusbar />
      </div>

      {/* all contents */}
      <div className="mx-5">
        <h2 className="font-bangla text-xl font-medium my-2.5">
          সকল শ্রেণীর উপস্থিতি
        </h2>

        <div className="space-y-3.5">
          <div className="w-full bg-gray-800/75 backdrop-blur-xs rounded-xl p-4 font-bangla">
            <div className="grid grid-cols-3 justify-between items-center">
              <p>প্লে শ্রেণী</p>
              <p className="text-center">২৯ / ৩৫</p>
              <p className="text-end">৭৮ %</p>
            </div>
          </div>

          <div className="w-full bg-gray-800/75 backdrop-blur-xs rounded-xl p-4 font-bangla">
            <div className="grid grid-cols-3 justify-between items-center">
              <p>নার্সারি শ্রেণী</p>
              <p className="text-center">২৯ / ৩৫</p>
              <p className="text-end">৭৮ %</p>
            </div>
          </div>

          <div className="w-full bg-gray-800/75 backdrop-blur-xs rounded-xl p-4 font-bangla">
            <div className="grid grid-cols-3 justify-between items-center">
              <p>প্রথম শ্রেণী</p>
              <p className="text-center">২৯ / ৩৫</p>
              <p className="text-end">৭৮ %</p>
            </div>
          </div>

          <div className="w-full bg-gray-800/75 backdrop-blur-xs rounded-xl p-4 font-bangla">
            <div className="grid grid-cols-3 justify-between items-center">
              <p>দ্বিতীয় শ্রেণী</p>
              <p className="text-center">২৯ / ৩৫</p>
              <p className="text-end">৭৮ %</p>
            </div>
          </div>

          <div className="w-full bg-gray-800/75 backdrop-blur-xs rounded-xl p-4 font-bangla">
            <div className="grid grid-cols-3 justify-between items-center">
              <p>তৃতীয় শ্রেণী</p>
              <p className="text-center">২৯ / ৩৫</p>
              <p className="text-end">৭৮ %</p>
            </div>
          </div>

          <div className="w-full bg-gray-800/75 backdrop-blur-xs rounded-xl p-4 font-bangla">
            <div className="grid grid-cols-3 justify-between items-center">
              <p>চতুর্থ শ্রেণী</p>
              <p className="text-center">২৯ / ৩৫</p>
              <p className="text-end">৭৮ %</p>
            </div>
          </div>

          <div className="w-full bg-gray-800/75 backdrop-blur-xs rounded-xl p-4 font-bangla">
            <div className="grid grid-cols-3 justify-between items-center">
              <p>পঞ্চম শ্রেণী</p>
              <p className="text-center">২৯ / ৩৫</p>
              <p className="text-end">৭৮ %</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
