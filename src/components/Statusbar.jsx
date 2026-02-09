import React from "react";
import { Link } from "react-router-dom";

const Statusbar = () => {
  return (
    <div className="w-full bg-gray-800/75 backdrop-blur-xs rounded-2xl p-4 font-bangla grid grid-cols-4 gap-y-4 justify-between">
      {/* cate 1 */}
      {/* <Link to={"/teachers"}>
        <div className="space-y-2">
          <div className="size-14 rounded-full overflow-hidden mx-auto bg-white">
            <img
              src="/assets/teacher-avater.png"
              className="size-full"
              alt="Teacher Image"
            />
          </div>
          <div className="text-center text-sm font-bangla ">
            <p>শিক্ষক</p>
            <p>৫/৭</p>
          </div>
        </div>
      </Link> */}

      {/* cate 2 */}
      <Link to={"/students"}>
        <div className="space-y-2">
          <div className="size-14 rounded-full overflow-hidden mx-auto bg-white">
            <img
              src="/assets/student-avater.png"
              className="size-full"
              alt="Teacher Image"
            />
          </div>
          <div className="text-center text-sm font-bangla ">
            <p>শিক্ষার্থী</p>
            <p>১৬৭ জন</p>
          </div>
        </div>
      </Link>

      {/* cate 3 */}
      {/* <Link to={"/exams"}>
        <div className="space-y-2">
          <div className="size-14 flex justify-center items-center rounded-full overflow-hidden mx-auto bg-white">
            <img
              src="/assets/exam-icon.png"
              className="size-full"
              alt="Teacher Image"
            />
          </div>
          <div className="text-center text-sm font-bangla ">
            <p>পরীক্ষা সংক্রান্ত</p>
            <p>৫/৭</p>
          </div>
        </div>
      </Link> */}

      {/* cate 4 */}
      {/* <Link to={"/notice"}>
        <div className="space-y-2">
          <div className="size-14 rounded-full overflow-hidden mx-auto">
            <img
              src="/assets/notice-icon.png"
              className="size-full bg-center"
              alt="Teacher Image"
            />
          </div>
          <div className="text-center text-sm font-bangla ">
            <p>নোটিশ প্রেরণ</p>
            <p>৫/৭</p>
          </div>
        </div>
      </Link> */}

      {/* cate 5 */}
      {/* <Link to={"/results"}>
        <div className="space-y-2">
          <div className="size-14 flex justify-center items-center rounded-full overflow-hidden mx-auto bg-white">
            <img
              src="/assets/resultsheet-icon2.png"
              className="size-[75%]"
              alt="Teacher Image"
            />
          </div>
          <div className="text-center text-sm font-bangla ">
            <p>পরীক্ষার ফলাফল</p>
            
          </div>
        </div>
      </Link> */}

      {/* cate 6 */}
      {/* <Link to={"/admission/new"}>
        <div className="space-y-2">
          <div className="size-14 flex justify-center items-center rounded-full overflow-hidden mx-auto bg-white">
            <img
              src="/assets/new-admission.png"
              className="size-[95%]"
              alt="Teacher Image"
            />
          </div>
          <div className="text-center text-sm font-bangla ">
            <p>নতুন ভর্তি</p>
            
          </div>
        </div>
      </Link> */}

      {/* cate 7 */}
      {/* <Link to={"/admission"}>
        <div className="space-y-2">
          <div className="size-14 flex justify-center items-center rounded-full overflow-hidden mx-auto bg-white">
            <img
              src="/assets/new-admission.png"
              className="size-[95%]"
              alt="Teacher Image"
            />
          </div>
          <div className="text-center text-sm font-bangla ">
            <p>নতুন ভর্তিকৃত শিক্ষার্থী সমূহ</p>
            
          </div>
        </div>
      </Link> */}
    </div>
  );
};

export default Statusbar;
