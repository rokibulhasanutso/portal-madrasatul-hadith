import React, { useState } from "react";
import { filterValidObject } from "../utils/functions";
import TextInputArea from "./TextInputArea";
import TextInput from "./TextInput";

const NoticeForm = ({ defaultValue = {}, onSubmit = () => null }) => {
  const [formData, setFormData] = useState({
    title: defaultValue.title || "",
    description: defaultValue.description || "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    const data = filterValidObject(formData);
    onSubmit(data);
  };

  return (
    <div>
      <div>
        <TextInput
          placeholder="নোটিশ এর নাম"
          borderClassName="rounded-lg"
          onChange={handleChange("title")}
          value={formData.title}
          defaultValue={defaultValue.title}
        />

        <TextInputArea
          placeholder={"এখান থেকে নোটিশটি লিখুন..."}
          borderClassName="rounded-lg"
          inputClassName={"h-[360px]"}
          cols={10}
          onChange={handleChange("description")}
          value={formData.description}
          defaultValue={defaultValue.description}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="p-4 bg-gray-800 w-full rounded-xl"
      >
        সাবমিট করুন
      </button>
    </div>
  );
};

export default NoticeForm;
