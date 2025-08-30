import React, { useEffect, useState } from "react";
import useDB from "../../hook/useDB";
import { convertToBengaliDigits, enToBnNumber } from "../../utils/functions";

const SheetTemplate = ({ data }) => {
  const relationLable = { 0: "অন্যান্য", 1: "বাবা", 2: "মা" };

  return (
    <div>
      <div className="border-5 border-gray-400 rounded-xl h-full p-8 space-y-9">
        {/* header section */}
        <section className="grid grid-cols-4">
          <div>
            <img
              src="/assets/logo-transparent.jpg"
              alt="logo"
              className="size-20"
            />
          </div>

          <div className="text-center col-span-2">
            <p className="text-3xl font-galada">মাদ্‌রাসাতুল হাদিস</p>
            <p className="">
              কেন্দ্রীয় সনদ পরীক্ষায় অংশ গ্রহণকারী শিক্ষার্থীর তথ্য
            </p>
            <p className="">পরীক্ষার সাল - ২০২৫ইং</p>
          </div>

          <div className="justify-self-end size-22 border-2 border-gray-300 rounded-full text-center p-4 flex justify-center items-center text-xs text-gray-500">
            পরীক্ষায় অনুমদিত সিল মোহর ও স্বাক্ষর
          </div>
        </section>

        <section>
          <p className="my-5 border-b-2 border-gray-400 relative after:absolute after:content-['প্রাতিষ্ঠানিক_তথ্য'] after:top-full after:left-1/2 after:-translate-1/2 after:border-2 after:border-gray-400 after:rounded-full after:py-1 after:px-2.5 after:bg-white" />
          <div>
            <div className="grid grid-cols-2 gap-4">
              <table>
                <tbody>
                  <tr>
                    <td>শিক্ষার্থীর নামঃ</td>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <td>শ্রেণীঃ</td>
                    <td>{data.class}</td>
                  </tr>
                  <tr>
                    <td>রোলঃ</td>
                    <td>{data.roll}</td>
                  </tr>
                  <tr>
                    <td>অভিভাবক মোবাইল নাম্বারঃ</td>
                    <td>
                      {data?.gurdian?.phone} (
                      {relationLable[data?.gurdian?.relation || 0]})
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="justify-self-end">
                <img
                  src={data?.image || "/assets/student-avater.png"}
                  alt="Student Image"
                  className="size-24 object-cover object-top border border-gray-500 rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <p className="my-5 border-b-2 border-gray-400 relative after:absolute after:content-['কেন্দ্রীয়_পরীক্ষার_ফর্ম_পূরণ'] after:top-full after:left-1/2 after:-translate-1/2 after:border-2 after:border-gray-400 after:rounded-full after:py-1 after:px-2.5 after:bg-white" />
          <table className="border-separate border-spacing-y-2.5">
            <tbody>
              <tr>
                <td className="text-nowrap">রোল-নংঃ</td>
                <td>
                  <div className="ml-5 border border-gray-300 h-10 rounded min-w-[210px]" />
                </td>
                <td className="px-5"></td> {/* empty field */}
                <td className="text-nowrap">শিক্ষার্থীর নামঃ</td>
                <td>
                  <div className="ml-5 border border-gray-300 h-10 rounded min-w-[210px]" />
                </td>
              </tr>

              <tr>
                <td className="text-nowrap">পিতার নামঃ</td>
                <td>
                  <div className="ml-5 border border-gray-300 h-10 rounded min-w-[210px]" />
                </td>
                <td className="px-5"></td> {/* empty field */}
                <td className="text-nowrap">মাতার নামঃ</td>
                <td>
                  <div className="ml-5 border border-gray-300 h-10 rounded min-w-[210px]" />
                </td>
              </tr>

              <tr>
                <td className="text-nowrap">জন্ম তারিখঃ</td>
                <td>
                  <div className="ml-5 border border-gray-300 h-10 rounded min-w-[210px]" />
                </td>
                <td className="px-5"></td> {/* empty field */}
                <td className="text-nowrap">অভিভাবক স্বাক্ষরঃ</td>
                <td>
                  <div className="ml-5 border-b border-dashed border-gray-400 h-10 min-w-[210px]" />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

const CenterExaminationStudentListingSheet = () => {
  const class_code = 5;
  const [students, setStudents] = useState([]);

  const { data } = useDB({
    table: "students",
    column:
      "id, studentName, class_code, classes (classLabel), roll, studentImage, fatherPhone, motherPhone",
  });

  useEffect(() => {
    if (data) {
      const filteredStudents = data
        ?.filter((obj) => obj.class_code === class_code)
        .map((i) => ({
          id: i?.id,
          name: i?.studentName,
          class: i?.classes.classLabel,
          roll: enToBnNumber(i?.roll),
          image: i?.studentImage,
          gurdian: {
            relation: (i?.fatherPhone && 1) || (i?.motherPhone && 2) || 0,
            phone: convertToBengaliDigits(i?.fatherPhone || i?.motherPhone),
          },
        }));

      const studentsData = filteredStudents.reduce((acc, _, i, arr) => {
        if (i % 2 === 0) acc.push([arr[i], arr[i + 1]]);
        return acc;
      }, []);

      setStudents(studentsData);
    }
  }, [data]);

  return (
    <div style={{ width: "210mm", margin: "0 auto" }}>
      {students?.map((item, i) => (
        <div className="*:h-[297mm]" key={i}>
          <div className="grid grid-rows-2 font-bangla *:first:border-b *:first:border-dashed *:first:border-gray-300 *:p-5">
            <SheetTemplate data={item[0]} />
            <SheetTemplate data={item[1]} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CenterExaminationStudentListingSheet;
