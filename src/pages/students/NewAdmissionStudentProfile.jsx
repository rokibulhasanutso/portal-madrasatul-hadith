import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import supabase from "../../supabase/config";
import { Camera, FileEdit, MessageSquare, PhoneCall } from "lucide-react";
import { enToBnNumber } from "../../utils/functions";
import NumberSelectModal from "../../components/NumberSelectModal";
import LoadingComponent from "../../components/LoadingComponent";

const NewAdmissionStudentProfile = () => {
  const { student_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  // const [numberSelectModalOpen, setNumberSelectModal] = useState(false);

  const getOneStudent = async (studentId) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("new-admission")
      .select("*")
      .eq("id", studentId)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      setData(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getOneStudent(student_id);
  }, [student_id]);

  const handleCall = () => {
    // Your logic to make a call
    if (data.fatherPhone) {
      window.location.href = `tel:${data.fatherPhone}`;
    } else if (data.motherPhone) {
      window.location.href = `tel:${data.motherPhone}`;
    } else if (data.otherGuardianPhone) {
      window.location.href = `tel:${data.otherGuardianPhone}`;
    } else {
      alert("No phone number found");
    }
  };

  return (
    <LoadingComponent loadingState={loading}>
      <div className="area-wrapper bg-content-blur font-bangla text-lg">
        <div className="w-full my-8 flex justify-center gap-8">
          {/* student image */}
          <div className="relative size-30">
            <div className="size-full rounded-full overflow-hidden ring-4 ring-gray-700">
              <img
                src={data?.studentImage || "/assets/student-avater.png"}
                className="size-full"
                alt="User Image"
              />
              <div className="absolute bottom-0 right-0 p-2 bg-gray-900/75 backdrop-blur-sm rounded-full">
                <Camera size={18} />
              </div>
            </div>
          </div>

          <div>
            <p className="text-2xl">{data.studentName}</p>
            <p className="text-base">
              শ্রেণীঃ {data.classes?.classLabel}, রোলঃ {enToBnNumber(data.roll)}
            </p>
            <p className="text-base">উপস্থিতিঃ ৯৫%</p>

            <div className="flex gap-5 my-4">
              <button
                onClick={() => navigate(`/admission/student/edit/${student_id}`)}
                className="ring-2 ring-gray-700 rounded-xl flex items-center p-2 bg-gray-900 "
              >
                <FileEdit />
              </button>
              <button
                onClick={() => navigate(`/notice?redirect_id=${student_id}`)}
                className="ring-2 ring-gray-700 rounded-xl flex items-center p-2 bg-gray-900 "
              >
                <MessageSquare />
              </button>
              <button
                onClick={handleCall}
                className="ring-2 ring-gray-700 rounded-xl flex items-center p-2 bg-gray-900 "
              >
                <PhoneCall />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 my-4">
          <button className="text-center ring-2 ring-gray-700 rounded-xl flex items-center py-2 px-4 bg-gray-900 ">
            <span className="block mx-auto">প্রোফাইল</span>
          </button>
          <button className="text-center ring-2 ring-gray-700 rounded-xl flex items-center py-2 px-4 bg-gray-900 ">
            <span className="block mx-auto">হাজিরা</span>
          </button>
          <button className="text-center ring-2 ring-gray-700 rounded-xl flex items-center py-2 px-4 bg-gray-900 ">
            <span className="block mx-auto">পরীক্ষা</span>
          </button>
          <button className="text-center ring-2 ring-gray-700 rounded-xl flex items-center py-2 px-4 bg-gray-900 ">
            <span className="block mx-auto">বেতন</span>
          </button>
        </div>

        <div className="ring-2 ring-gray-700 rounded-xl flex items-center py-2 bg-gray-900">
          <div className="flex-1">
            <table className="w-full border-collapse">
              <tbody className="**:w-1/2 **:px-4 **:py-1 *:odd:bg-gray-800/35">
                <tr>
                  <td colSpan={2} className="text-center bg-gray-700">
                    শিক্ষার্থীর
                  </td>
                </tr>
                <tr>
                  <td>আইডি নং :</td>
                  <td>{data.idCardNumber}</td>
                </tr>
                <tr>
                  <td>নামঃ</td>
                  <td>{data.studentName}</td>
                </tr>
                <tr>
                  <td>রোলঃ</td>
                  <td>{enToBnNumber(data.roll)}</td>
                </tr>
                <tr>
                  <td>শ্রেণীঃ</td>
                  <td>{data.classes?.classLabel}</td>
                </tr>
                <tr>
                  <td>জন্ম তারিখঃ</td>
                  <td>{data.dob}</td>
                </tr>
                <tr className="font-sans">
                  <td>জন্ম নিবন্ধন নম্বরঃ</td>
                  <td>{data.birthNumber}</td>
                </tr>
                <tr>
                  <td>জেলাঃ</td>
                  <td>{data.district}</td>
                </tr>
                <tr>
                  <td>থানাঃ</td>
                  <td>{data.thana}</td>
                </tr>
                <tr>
                  <td>ডাকঘরঃ</td>
                  <td>{data.postOffice}</td>
                </tr>
                <tr>
                  <td>গ্রামঃ</td>
                  <td>{data.village}</td>
                </tr>
                <tr>
                  <td>বর্তমান ঠিকানাঃ</td>
                  <td>{data.presentAddress}</td>
                </tr>

                <tr>
                  <td colSpan={2} className="text-center bg-gray-700">
                    পিতা
                  </td>
                </tr>
                <tr>
                  <td>নামঃ</td>
                  <td>{data.fatherName}</td>
                </tr>
                <tr>
                  <td>পেশাঃ</td>
                  <td>{data.fatherOccupation}</td>
                </tr>
                <tr>
                  <td>মোবাইল নাম্বারঃ</td>
                  <td className="font-serif">{data.fatherPhone}</td>
                </tr>

                <tr>
                  <td colSpan={2} className="text-center bg-gray-700">
                    মাতা
                  </td>
                </tr>
                <tr>
                  <td>নামঃ</td>
                  <td>{data.motherName}</td>
                </tr>
                <tr>
                  <td>পেশাঃ </td>
                  <td>{data.motherOccupation}</td>
                </tr>
                <tr>
                  <td>মোবাইল নাম্বারঃ</td>
                  <td className="font-serif">{data.motherPhone}</td>
                </tr>

                <tr>
                  <td colSpan={2} className="text-center bg-gray-700">
                    অভিভাবক
                  </td>
                </tr>
                <tr>
                  <td>নামঃ</td>
                  <td>{data.otherGuardianName}</td>
                </tr>
                <tr>
                  <td>সম্পর্কঃ</td>
                  <td>{data.otherGuardianRelation}</td>
                </tr>
                <tr>
                  <td>মোবাইল নাম্বারঃ</td>
                  <td className="font-serif">{data.otherGuardianPhone}</td>
                </tr>

                <tr>
                  <td colSpan={2} className="text-center bg-gray-700">
                    পূর্ববর্তী প্রতিষ্ঠান
                  </td>
                </tr>
                <tr>
                  <td>প্রতিষ্ঠানের নামঃ</td>
                  <td>{data.previousInsti}</td>
                </tr>
                <tr>
                  <td>শ্রেণীঃ</td>
                  <td>{data.otherGuardianName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* {numberSelectModalOpen && <NumberSelectModal data={{ ...data }} />} */}
    </LoadingComponent>
  );
};

export default NewAdmissionStudentProfile;
