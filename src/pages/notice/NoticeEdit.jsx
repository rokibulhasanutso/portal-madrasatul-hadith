import React, { useEffect, useState } from "react";
import NoticeForm from "../../components/NoticeForm";
import supabase from "../../supabase/config";
import { useNavigate, useParams } from "react-router-dom";

const NoticeEdit = () => {
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

  const updateNotice = async (newUpdatedData) => {
    setLoading(true);

    const { data: updateData, error } = await supabase
      .from("notice")
      .upsert({ id: data.id, ...newUpdatedData })
      .select("*")
      .eq("id", notice_id)
      .single();

    if (error) {
      console.log(error);
    }
    if (updateData) {
      navigate("/notice");
    }

    setLoading(false);
  };

  useEffect(() => {
    getNotice();
  }, []);

  const handleSubmit = (value) => {
    updateNotice(value);
  };

  return (
    <div className="py-5 px-6 bg-gray-900/50 backdrop-blur-sm h-[calc(100svh-68px)] font-bangla text-lg">
      <h1 className="text-2xl text-center my-8">নোটিশ পরিবর্তন করুন</h1>
      {!loading ? (
        <NoticeForm defaultValue={data} onSubmit={handleSubmit} />
      ) : null}
    </div>
  );
};

export default NoticeEdit;
