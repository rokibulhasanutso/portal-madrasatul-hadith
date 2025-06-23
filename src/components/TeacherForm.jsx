import React, { useState } from "react";

const TeacherForm = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div>
      <div className="my-8 space-y-8">
        {/* teacher image */}
        <div className="relative w-40 mx-auto">
          <div className="size-40 rounded-full overflow-hidden ring-4 ring-gray-700 mx-auto my-8">
            <img
              src="/assets/student-avater.png"
              className="size-full"
              alt="User Image"
            />
            <div className="absolute bottom-0 right-0 p-2 bg-gray-900/75 backdrop-blur-sm rounded-full">
              <Plus size={24} />
            </div>
          </div>
        </div>

        {/* teacher info */}
        <div>
          <h4 className="text-xl">শিক্ষক তথ্যঃ</h4>
          <TextInput
            placeholder="শিক্ষকের সম্পূর্ণ নাম"
            inputClassName="rounded-lg"
            value={formData.studentName}
            defaultValue={defaultValue.studentName}
            onChange={handleChange("studentName")}
          />
          <TextInput
            placeholder="জন্ম তারিখ (১৫-০৮-২০০২)"
            inputClassName="rounded-lg"
            value={formData.dob}
            defaultValue={defaultValue.dob}
            onChange={handleChange("dob")}
          />
          <TextInput
            placeholder="লিঙ্গ (ছেলে/মেয়ে/অন্যান্য)"
            inputClassName="rounded-lg"
            value={formData.gender}
            defaultValue={defaultValue.gender}
            onChange={handleChange("gender")}
          />
          <TextInput
            placeholder="পূর্ব প্রতিষ্ঠানের শ্রেণী / বিভাগ"
            inputClassName="rounded-lg"
            value={formData.previousClass}
            defaultValue={defaultValue.previousClass}
            onChange={handleChange("previousClass")}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherForm;
