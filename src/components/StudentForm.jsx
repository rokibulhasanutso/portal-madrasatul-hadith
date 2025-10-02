import React, { useEffect, useRef, useState } from "react";
import TextInput from "../components/TextInput";
import { Loader, Plus } from "lucide-react";
import { filterValidObject } from "../utils/functions";
import useImageUpload from "../hook/useImageUpload";
import supabase from "../supabase/config";

const StudentForm = ({
  defaultValue = {},
  onSubmit = () => null,
  imageUploadOptionDisable = false,
  bucketName = "student-image",
  tableName = "students",
}) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(() => ({
    studentName: defaultValue.studentName || "",
    roll: defaultValue.roll || "",
    class_code: defaultValue.class_code || "",
    dob: defaultValue.dob || "",
    gender: defaultValue.gender || "",
    fatherName: defaultValue.fatherName || "",
    motherName: defaultValue.motherName || "",
    desiredClass: defaultValue.desiredClass || "",
    previousInstitute: defaultValue.previousInstitute || "",
    previousClass: defaultValue.previousClass || "",
    district: defaultValue.district || "",
    thana: defaultValue.thana || "",
    postOffice: defaultValue.postOffice || "",
    village: defaultValue.village || "",
    presentAddress: defaultValue.presentAddress || "",
    fatherOccupation: defaultValue.fatherOccupation || "",
    fatherPhone: defaultValue.fatherPhone || "",
    motherOccupation: defaultValue.motherOccupation || "",
    motherPhone: defaultValue.motherPhone || "",
    otherGuardianName: defaultValue.otherGuardianName || "",
    otherGuardianRelation: defaultValue.otherGuardianRelation || "",
    otherGuardianPhone: defaultValue.otherGuardianPhone || "",
    idCardNumber: defaultValue.idCardNumber || "",
    guardianRelation: defaultValue.guardianRelation || "",
    guardianName: defaultValue.guardianName || "",
  }));

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    const data = filterValidObject(formData);
    onSubmit(data);
  };

  // handle image submit
  const {
    uploading,
    // previewUrl,
    // compressedSize,
    uploadedUrl,
    handleImageUpload,
  } = useImageUpload();

  const onFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      handleImageUpload(file, bucketName, defaultValue?.id);
    }
  };

  const handleImageUploadTrigger = () => {
    // Trigger the hidden input
    fileInputRef.current.click();
  };

  const handleSetImageUrl = async (url) => {
    const { data, error } = await supabase
      .from(tableName)
      .upsert({ id: defaultValue.id, studentImage: url })
      .select();
  };

  useEffect(() => {
    if (uploadedUrl) {
      handleSetImageUrl(uploadedUrl);
    }
  }, [uploadedUrl]);

  return (
    <>
      <div className="my-8 space-y-8">
        {/* student image */}
        {imageUploadOptionDisable && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={onFileChange}
            />
            <div
              className="relative w-40 mx-auto"
              onClick={handleImageUploadTrigger}
            >
              <div className="size-40 rounded-full overflow-hidden ring-4 ring-gray-700 mx-auto my-8">
                <img
                  src={
                    defaultValue.studentImage ||
                    uploadedUrl ||
                    "/assets/student-avater.png"
                  }
                  className="size-full bg-cover bg-top"
                  alt="User Image"
                />
                {uploading ? (
                  <div className="absolute inset-0 flex justify-center items-center p-2 bg-gray-900/75 backdrop-blur-sm rounded-full">
                    <Loader className="size-10 animate-spin" />
                  </div>
                ) : (
                  <div className="absolute bottom-0 right-0 p-2 bg-gray-900/75 backdrop-blur-sm rounded-full">
                    <Plus size={24} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* student info */}
        <div>
          <h4 className="text-xl">শিক্ষার্থীর তথ্যঃ</h4>
          <TextInput
            placeholder="শিক্ষার্থীর সম্পূর্ণ নাম"
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
            placeholder="পিতার নাম"
            inputClassName="rounded-lg"
            value={formData.fatherName}
            defaultValue={defaultValue.fatherName}
            onChange={handleChange("fatherName")}
          />
          <TextInput
            placeholder="মাতার নাম"
            inputClassName="rounded-lg"
            value={formData.motherName}
            defaultValue={defaultValue.motherName}
            onChange={handleChange("motherName")}
          />
          <TextInput
            placeholder="ভর্তি হতে ইচ্ছুক শ্রেণী / বিভাগ"
            inputClassName="rounded-lg"
            value={formData.desiredClass}
            defaultValue={defaultValue.desiredClass}
            onChange={handleChange("desiredClass")}
          />
          <TextInput
            placeholder="পূর্ব প্রতিষ্ঠানের নাম"
            inputClassName="rounded-lg"
            value={formData.previousInstitute}
            defaultValue={defaultValue.previousInstitute}
            onChange={handleChange("previousInstitute")}
          />
          <TextInput
            placeholder="পূর্ব প্রতিষ্ঠানের শ্রেণী / বিভাগ"
            inputClassName="rounded-lg"
            value={formData.previousClass}
            defaultValue={defaultValue.previousClass}
            onChange={handleChange("previousClass")}
          />
          <TextInput
            placeholder="জেলা"
            inputClassName="rounded-lg"
            value={formData.district}
            defaultValue={defaultValue.district}
            onChange={handleChange("district")}
          />
          <TextInput
            placeholder="থানা"
            inputClassName="rounded-lg"
            value={formData.thana}
            defaultValue={defaultValue.thana}
            onChange={handleChange("thana")}
          />
          <TextInput
            placeholder="ডাকঘর"
            inputClassName="rounded-lg"
            value={formData.postOffice}
            defaultValue={defaultValue.postOffice}
            onChange={handleChange("postOffice")}
          />
          <TextInput
            placeholder="গ্রাম"
            inputClassName="rounded-lg"
            value={formData.village}
            defaultValue={defaultValue.village}
            onChange={handleChange("village")}
          />
          <TextInput
            placeholder="বর্তমান ঠিকানা"
            inputClassName="rounded-lg"
            value={formData.presentAddress}
            defaultValue={defaultValue.presentAddress}
            onChange={handleChange("presentAddress")}
          />
          <TextInput
            placeholder="রোল"
            inputClassName="rounded-lg"
            value={formData.roll}
            defaultValue={defaultValue.roll}
            onChange={handleChange("roll")}
          />
          <TextInput
            placeholder="ক্লাস কোড"
            inputClassName="rounded-lg"
            value={formData.class_code}
            defaultValue={defaultValue.class_code}
            onChange={handleChange("class_code")}
          />
        </div>

        {/* guardian info */}
        <div>
          <h4 className="text-xl">অভিভাবকের তথ্যঃ</h4>
          <TextInput
            placeholder="পিতার পেশা"
            inputClassName="rounded-lg"
            value={formData.fatherOccupation}
            defaultValue={defaultValue.fatherOccupation}
            onChange={handleChange("fatherOccupation")}
          />
          <TextInput
            placeholder="পিতার মোবাইল নাম্বার"
            inputClassName="rounded-lg font-serif"
            value={formData.fatherPhone}
            defaultValue={defaultValue.fatherPhone}
            onChange={handleChange("fatherPhone")}
          />
          <TextInput
            placeholder="মাতার পেশা"
            inputClassName="rounded-lg"
            value={formData.motherOccupation}
            defaultValue={defaultValue.motherOccupation}
            onChange={handleChange("motherOccupation")}
          />
          <TextInput
            placeholder="মাতার মোবাইল নাম্বার"
            inputClassName="rounded-lg font-serif"
            value={formData.motherPhone}
            defaultValue={defaultValue.motherPhone}
            onChange={handleChange("motherPhone")}
          />
          <TextInput
            placeholder="অন্যান্য অভিভাবক নাম (যদি থাকে)"
            inputClassName="rounded-lg"
            value={formData.otherGuardianName}
            defaultValue={defaultValue.otherGuardianName}
            onChange={handleChange("otherGuardianName")}
          />
          <TextInput
            placeholder="অন্যান্য অভিভাবক সম্পর্ক (যদি থাকে)"
            inputClassName="rounded-lg"
            value={formData.otherGuardianRelation}
            defaultValue={defaultValue.otherGuardianRelation}
            onChange={handleChange("otherGuardianRelation")}
          />
          <TextInput
            placeholder="অন্যান্য অভিভাবক মোবাইল নাম্বার (যদি থাকে)"
            inputClassName="rounded-lg font-serif"
            value={formData.otherGuardianPhone}
            defaultValue={defaultValue.otherGuardianPhone}
            onChange={handleChange("otherGuardianPhone")}
          />
        </div>

        {/* ID card info */}
        <div>
          <h4 className="text-xl">ID কার্ড সংক্রান্ত তথ্যঃ</h4>
          <TextInput
            placeholder="ID কার্ড নম্বর"
            inputClassName="rounded-lg"
            value={formData.idCardNumber}
            defaultValue={defaultValue.idCardNumber}
            onChange={handleChange("idCardNumber")}
          />
          <TextInput
            placeholder="গার্ডয়ান সম্পর্ক"
            inputClassName="rounded-lg"
            value={formData.guardianRelation}
            defaultValue={defaultValue.guardianRelation}
            onChange={handleChange("guardianRelation")}
          />
          <TextInput
            placeholder="গার্ডয়ান নাম"
            inputClassName="rounded-lg"
            value={formData.guardianName}
            defaultValue={defaultValue.guardianName}
            onChange={handleChange("guardianName")}
          />

          <div className="relative w-[2.5in] h-[3.5in] mx-auto my-2.5">
            <div className="size-full rounded-md overflow-hidden ring-4 ring-gray-700 mx-auto">
              <div className="bg-gray-900/75 size-full flex flex-col justify-center items-center gap-y-2.5">
                <span>ID কার্ডের ছবি যুক্ত করুন</span>
                <div className="p-2 bg-gray-700 backdrop-blur-sm rounded-full">
                  <Plus size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={handleSubmit}
          className="p-4 bg-gray-800 w-full rounded-xl"
        >
          ফর্ম সাবমিট করুন
        </button>
      </div>
    </>
  );
};

export default StudentForm;
