import { Calendar, Trash, ChevronDown, ChevronUp } from "lucide-react";
import BackgroundBlurWrapper from "../../components/BackgroundBlurWrapper";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { useEffect, useRef, useState } from "react";
import { enToBnNumber } from "../../utils/functions";
import supabase from "../../supabase/config";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/purple.css";

const AddNewExam = () => {
  const inputDateRef = useRef();
  const [tab, setTab] = useState(0);
  const [examDateList, setExamDateList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [classData, setClassData] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState([]);
  const [dates, setDates] = useState([]);

  // Date input control
  const handleDateClick = () => {
    setEditingIndex(null);
    if (inputDateRef.current?.showPicker) {
      inputDateRef.current.showPicker();
    } else {
      inputDateRef.current.click();
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value.split("-").reverse().join("-");
    if (editingIndex !== null) {
      setExamDateList((prev) =>
        prev.map((item, i) => (i === editingIndex ? selectedDate : item))
      );
      setEditingIndex(null);
    } else {
      setExamDateList((prev) => [...prev, selectedDate]);
    }
    inputDateRef.current.value = "";
  };

  const handleDateEdit = (index) => {
    setEditingIndex(index);
    setTimeout(() => {
      if (inputDateRef.current?.showPicker) {
        inputDateRef.current.showPicker();
      } else {
        inputDateRef.current.click();
      }
    }, 0);
  };

  const handleDateRemove = (e, valueToRemove) => {
    e.stopPropagation();
    setExamDateList((prev) => prev.filter((item) => item !== valueToRemove));
  };

  const toggleCollapse = (index) => {
    setCollapsedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getClassList = async () => {
    const { data, error } = await supabase.from("classes").select("*");
    if (error) {
      console.error(error);
      return;
    }
    setClassData(data);
  };

  useEffect(() => {
    getClassList();
  }, []);

  useEffect(() => {
    // যখন classData লোড হয়, তখন সবকিছু collapsed করে দাও
    if (classData.length) {
      const allIndexes = classData.map((_, index) => index);
      setCollapsedSections(allIndexes);
    }
  }, [classData]);

  return (
    <>
      {/* Hidden Date Input */}
      <input
        type="date"
        ref={inputDateRef}
        onChange={handleDateChange}
        className="sr-only"
      />

      <BackgroundBlurWrapper>
        <h4 className="text-xl text-center my-2.5">নতুন পরীক্ষা তৈরি করণ</h4>

        <div>
          {/* পরীক্ষার নাম ইনপুট */}
          <TextInput label={"পরীক্ষার নামঃ"} />

          {/* Tab Buttons */}
          <div className="flex gap-4 my-5">
            <Button
              value={"তারিখ"}
              icon={Calendar}
              iconClassName={"size-5"}
              className={tab == 0 ? "bg-gray-800" : ""}
              onClick={() => setTab(0)}
            />
            <Button
              value={"শ্রেণী ও বিষয়"}
              icon={Calendar}
              iconClassName={"size-5"}
              className={tab == 1 ? "bg-gray-800" : ""}
              onClick={() => setTab(1)}
            />
          </div>

          {/* Content Based on Tab */}
          <div className="space-y-5">
            {/* Tab 0: পরীক্ষার তারিখ */}
            {tab === 0 && (
              <>
                {examDateList.map((date, index) => (
                  <Button
                    key={index}
                    className={`w-full text-gray-500 flex items-center ${
                      date && "font-sans font-medium text-white"
                    }`}
                    onClick={() => handleDateEdit(index)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="border size-7 rounded-full inline-block text-base text-gray-300 text-center leading-7">
                        {enToBnNumber(index + 1)}
                      </span>
                      <span className="mx-2.5 flex-1">{date}</span>
                      <div onClick={(e) => handleDateRemove(e, date)}>
                        <Trash className="text-red-500" />
                      </div>
                    </div>
                  </Button>
                ))}

                <DatePicker
                  multiple
                  value={dates}
                  onChange={setDates}
                  format="YYYY-MM-DD"
                  calendarPosition="bottom-center"
                  className="purple"
                />

                <Button
                  className="w-full text-gray-500"
                  onClick={handleDateClick}
                >
                  <span className="inline-block text-center w-full">
                    পরীক্ষার তারিখ যুক্ত করুন
                  </span>
                </Button>
              </>
            )}

            {/* Tab 1: শ্রেণী ও বিষয় (Collapsible) */}
            {tab === 1 &&
              classData.map((classItem, classIndex) => {
                const isOpen = !collapsedSections.includes(classIndex);

                return (
                  <div
                    key={classIndex}
                    className="bg-gray-900 border-2 rounded-xl border-gray-700 overflow-hidden transition-all duration-300"
                  >
                    {/* Header with Collapse Toggle */}
                    <div
                      onClick={() => toggleCollapse(classIndex)}
                      className="text-2xl bg-gray-800 p-4 rounded-t-xl cursor-pointer flex justify-between items-center"
                    >
                      <span>{classItem.classLabel}</span>
                      {isOpen ? (
                        <ChevronUp className="text-gray-400" />
                      ) : (
                        <ChevronDown className="text-gray-400" />
                      )}
                    </div>

                    {/* Smooth Collapsible Content */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen
                          ? "max-h-[10000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="space-y-2 my-4 px-4">
                        {examDateList.map((date, dateIndex) => (
                          <div key={dateIndex} className="flex flex-col gap-2">
                            <label
                              htmlFor={`${classIndex}-${dateIndex}`}
                              className="font-sans"
                            >
                              {date}
                            </label>
                            <textarea
                              id={`${classIndex}-${dateIndex}`}
                              className="ring ring-gray-700 rounded p-1.5 bg-gray-950 outline-0"
                            ></textarea>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </BackgroundBlurWrapper>
    </>
  );
};

export default AddNewExam;
