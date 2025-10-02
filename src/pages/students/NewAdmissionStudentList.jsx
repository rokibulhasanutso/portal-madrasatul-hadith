import { Filter, PhoneCall, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../../supabase/config";
import { enToBnNumber } from "../../utils/functions";
import LoadingComponent from "../../components/LoadingComponent";
const NewAdmissionStudentList = () => {
  // const { class_id } = useParams();
  // const [data, setData] = useState({
  //   class: "",
  //   students: [],
  // });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const getStudentsByClass = async (classcode) => {
  //   setStudentsDataLoading(true);

  //   const { data, error } = await supabase
  //     .from("students")
  //     .select("id, studentName, roll, studentImage")
  //     .eq("class_code", classcode)
  //     .order("id", "desc");

  //   const { data: classLabel, error: classError } = await supabase
  //     .from("classes")
  //     .select("*")
  //     .eq("class_code", classcode)
  //     .single();

  //   if (error || classError) {
  //     console.log(error);
  //   }
  //   if (data && classLabel) {
  //     setData({
  //       class: classLabel.classLabel,
  //       students: data,
  //     });
  //   }

  //   setStudentsDataLoading(false);
  // };

  // useEffect(() => {
  //   getStudentsByClass(class_id);
  // }, [class_id]);

  // const handleCall = (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   console.log("click");
  // };

  const getNewStudents = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("new-admission").select("*");

    if (error) {
      console.log(error);
    }
    if (data) {
      setData(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    getNewStudents();
  }, []);
  return (
    <div className="area-wrapper bg-content-blur font-bangla text-lg">
      <h1 className="text-2xl text-center my-8">নতুন ভর্তিকৃত শিক্ষার্থী</h1>

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

        <LoadingComponent loadingState={loading}>
          <div className="space-y-5">
            {data?.map((data) => (
              <Link
                key={data.id}
                to={`/admission/student/${data?.id}`}
                className="block"
              >
                <div className="w-full ring-2 ring-gray-700 bg-gray-800/85 backdrop-blur-[6px] rounded-xl p-4 font-bangla">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      <p>{enToBnNumber(data.id)}.</p>
                      <div className="size-12">
                        <img
                          src={
                            data?.studentImage ||
                            "https://cdn-icons-png.flaticon.com/512/12225/12225935.png"
                          }
                          alt="Student Image"
                          className="size-full bg-cover bg-top rounded"
                        />
                      </div>
                      <p className="*:block">
                        <span className="text-lg">{data.studentName}</span>
                        <span className="text-base">উপস্থিতিঃ ০%</span>
                      </p>
                    </div>
                    <button
                      // onClick={handleCall}
                      className="ring-2 ring-gray-700 p-2 rounded"
                    >
                      <PhoneCall />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </LoadingComponent>
      </div>
    </div>
  );
};

export default NewAdmissionStudentList;
