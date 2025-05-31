import React, { useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import TextInputArea from "../../components/TextInputArea";
import NoticeForm from "../../components/NoticeForm";
import supabase from "../../supabase/config";
import { useNavigate } from "react-router-dom";

const CreateNotice = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const createNotice = async (data) => {
    setLoading(true);

    const { data: createdData, error } = await supabase
      .from("notice")
      .insert([data])
      .select();

    if (error) {
      console.log(error);
    }
    if (createdData) {
      navigate("/notice");
    }

    setLoading(false);
  };

  const handleSubmit = (data) => {
    createNotice(data);
  };

  return (
    <div className="py-5 px-6 bg-gray-900/50 backdrop-blur-sm h-[calc(100svh-68px)] font-bangla text-lg">
      <h1 className="text-2xl text-center my-8">নোটিশ ফর্ম</h1>

      <NoticeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateNotice;
