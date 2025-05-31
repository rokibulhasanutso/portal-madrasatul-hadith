import React, { useEffect, useState } from "react";
import { enToBnNumber } from "../../utils/functions";
import supabase from "../../supabase/config";
import { Link, useParams } from "react-router-dom";
import { Filter, MessageSquare, Search } from "lucide-react";

const NoticeSmsSend = () => {
  const { notice_id, class_id } = useParams();
  const [data, setData] = useState({
    class: "",
    students: [],
  });
  const [noticeData, setNoticeData] = useState({});
  const [studentsDataLoading, setStudentsDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const getStudentsByClass = async (classcode) => {
    setStudentsDataLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select(
        "id, studentName, roll, fatherPhone, motherPhone, otherGuardianPhone"
      )
      .eq("class_code", classcode);

    const { data: classLabel, error: classError } = await supabase
      .from("classes")
      .select("*")
      .eq("class_code", classcode)
      .single();

    if (error || classError) {
      console.log(error);
    }
    if (data && classLabel) {
      setData({
        class: classLabel.classLabel,
        students: data,
      });
    }

    setStudentsDataLoading(false);
  };

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
      setNoticeData(data);
      console.log(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getStudentsByClass(class_id);
    getNotice(notice_id);
  }, [class_id, notice_id]);

  const handleCall = (e, data) => {
    e.stopPropagation();
    e.preventDefault();

    console.log(data);

    if (data.fatherPhone) {
      window.location.href = `sms:${data.fatherPhone}?body=${noticeData.description}`;
    } else if (data.motherPhone) {
      window.location.href = `sms:${data.motherPhone}?body=${noticeData.description}`;
    } else if (data.otherGuardianPhone) {
      window.location.href = `sms:${data.otherGuardianPhone}?body=${noticeData.description}`;
    } else {
      alert("No phone number found");
    }
  };
  return (
    <div className="py-5 px-6 bg-gray-900/50 backdrop-blur-sm min-h-[calc(100svh-68px)] font-bangla text-lg">
      <h1 className="text-2xl text-center my-8">{data.class} শ্রেণী</h1>

      <div className="space-y-5">
        <div className="font-sans text-base flex gap-5">
          <form className="flex-1">
            <div className="ring-2 ring-gray-700 rounded-xl flex items-center p-2 bg-gray-900">
              <Search className="inline size-7" />
              <input
                type="text"
                placeholder="Search by student name..."
                className="w-full outline-0 ml-2"
              />
            </div>
          </form>
          <div className="size-10 ring-2 ring-gray-700 rounded-xl flex items-center p-2 bg-gray-900">
            <Filter className="inline size-full" />
          </div>
        </div>

        <div className="space-y-5">
          {data.students?.map((data) => (
            <Link
              key={data.id}
              to={`/students/${class_id}/${data.id}`}
              className="block"
            >
              <div className="w-full ring-2 ring-gray-700 bg-gray-800/85 backdrop-blur-[6px] rounded-xl p-4 font-bangla">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <p>{enToBnNumber(data.roll)}.</p>
                    <p className="*:block">
                      <span className="text-lg">{data.studentName}</span>
                      <span className="text-base">উপস্থিতিঃ ০%</span>
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleCall(e, data)}
                    className="ring-2 ring-gray-700 p-2 rounded"
                  >
                    <MessageSquare />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeSmsSend;
