import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import supabase from "../../supabase/config";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResultMarkSheetTemplate from "./ResultMarkSheetTemplate";
import jsPDF from "jspdf";
import Button from "../../components/Button";
import domtoimage from "dom-to-image";
import { Loader, Loader2 } from "lucide-react";
import TextInput from "../../components/TextInput";

const ResultMarkSheet = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idParam = parseInt(searchParams.get("id"));
  const classCodeParam = parseInt(searchParams.get("cc"));

  // ✅ Memoized roll parameters to avoid re-render loops
  const rollParams = useMemo(() => {
    const rollParamRaw = searchParams.get("r");
    return rollParamRaw
      ? rollParamRaw
          .split(",")
          .map((r) => parseInt(r))
          .filter((n) => !isNaN(n))
      : [];
  }, [searchParams]);

  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const sheetRefs = useRef([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState({
    sheet: false,
    sheetDownload: false,
  });
  const [sheetData, setSheetData] = useState({
    examName: "দ্বিতীয় সাময়িক পরীক্ষা - ২০২৫ইং",
  });
  const [classData, setClassData] = useState([]);

  const handleLoading = (loadingName, loadingValue) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [loadingName]: loadingValue,
    }));
  };

  const SUBJECTS_BY_CLASS = useMemo(
    () => ({
      1: [104, 105, 109, 101, 102, 103, 118],
      2: [104, 105, 109, 101, 102, 103, 118],
      3: [104, 105, 107, 119, 101, 102, 103, 106],
      4: [104, 107, 108, 109, 110, 101, 102, 103, 113, 106],
      5: [104, 107, 108, 109, 110, 101, 102, 103, 114],
      6: [115, 116, 117, 101, 102, 103, 111, 112],
      7: [115, 116, 117, 101, 102, 103, 111, 112],
    }),
    []
  );

  const SUBJECTS_INFO = useMemo(
    () => ({
      101: { name: "বাংলা", fullMarks: 100 },
      102: { name: "ইংরেজি", fullMarks: 100 },
      103: { name: "গণিত", fullMarks: 100 },
      104: { name: "আরবি লিখা", fullMarks: 100 },
      105: { name: "হাদিস শরীফ", fullMarks: 100 },
      106: { name: "ইংলিশ গ্রামার", fullMarks: 100 },
      107: { name: "হিফজুল কুরআন ও তাজবীদ", fullMarks: 100 },
      108: { name: "হাদিস শরীফ ও আসমাউল হুসনা", fullMarks: 100 },
      109: { name: "কালিমা ও মাসায়িল", fullMarks: 100 },
      110: { name: "আদইয়ায়ে সালাত ও আদইয়ায়ে মাসনূনাহ", fullMarks: 100 },
      111: { name: "বাংলাদেশ ও বিশ্ব পরিচয়", fullMarks: 100 },
      112: { name: "বিজ্ঞান", fullMarks: 100 },
      113: { name: "পরিবেশ পরিচিতি ও সাধারণ জ্ঞান", fullMarks: 100 },
      114: {
        name: "পরিবেশ পরিচিতি সমাজ ও পরিবেশ পরিচিতি বিজ্ঞান ও সাধারণ জ্ঞান",
        fullMarks: 100,
      },
      115: { name: "কুরআন মাজিদ", fullMarks: 100 },
      116: { name: "আদ্ দুরূসুল আরাবিয়্যাহ্", fullMarks: 100 },
      117: { name: "আকইদ ও ফিকাহ", fullMarks: 100 },
      118: { name: "বাংলা দিয়ে ইংরেজি শিখি", fullMarks: 100 },
      119: { name: "কালিমা ও মাসায়িল ও সাধারণ জ্ঞান", fullMarks: 100 },
    }),
    []
  );

  const getGrade = useCallback((fullMark, number) => {
    const percent = (number / fullMark) * 100;
    if (percent >= 80) return "A+";
    if (percent >= 70) return "A";
    if (percent >= 60) return "A-";
    if (percent >= 50) return "B";
    if (percent >= 40) return "C";
    if (percent >= 33) return "D";
    return "F";
  }, []);

  const getAllResults = useCallback(async () => {
    handleLoading("sheet", true);
    const { data: resultData, error } = await supabase
      .from("resultTest")
      .select(
        `id, created_at,
         students(id, studentName, roll, studentImage, classes(classLabel, class_code)),
         *`
      )
      .order("id", { ascending: true });

    if (error) {
      console.error("Error:", error);
      handleLoading("sheet", false);
      return;
    }

    const studentsWithResults = resultData.map((item) => {
      const { students, ...rest } = item;
      const classCode = students?.classes?.class_code;
      const validSubjects = SUBJECTS_BY_CLASS[classCode] || [];

      let totalMarks = 0;
      let fullMarks = 0;
      let hasFail = false;
      let allAPlus = true;

      const subjectResults = validSubjects.map((subjectId) => {
        const subjectInfo = SUBJECTS_INFO[subjectId] || {};
        const mark = parseFloat(rest[subjectId]) || 0;
        const full = subjectInfo.fullMarks || 100;
        const grade = getGrade(full, mark);

        if (grade === "F") hasFail = true;
        if (grade !== "A+") allAPlus = false;

        totalMarks += mark;
        fullMarks += full;

        return {
          sub_code: subjectId,
          sub_name: subjectInfo.name || `Subject ${subjectId}`,
          obtained_marks: mark,
          full_marks: full,
          grade,
        };
      });

      const totalGrade = hasFail
        ? "F"
        : allAPlus
        ? "A+"
        : getGrade(fullMarks, totalMarks);

      return {
        id: item.id,
        name: students?.studentName || "",
        roll: students?.roll || "",
        class: students?.classes?.classLabel || "",
        class_code: classCode,
        studentImage: students?.studentImage || "",
        total_obtained_marks: totalMarks,
        total_full_marks: subjectResults.reduce(
          (sum, data) => sum + data.full_marks,
          0
        ),
        grade: totalGrade,
        results: subjectResults,
        created_at: item.created_at,
      };
    });

    const groupedByClass = {};
    studentsWithResults.forEach((student) => {
      const code = student.class_code;
      if (!groupedByClass[code]) groupedByClass[code] = [];
      groupedByClass[code].push(student);
    });

    const studentsWithPlacement = Object.values(groupedByClass).flatMap(
      (classGroup) => {
        return [...classGroup]
          .sort((a, b) => b.total_obtained_marks - a.total_obtained_marks)
          .map((student, index) => ({
            ...student,
            placement: index + 1,
          }));
      }
    );

    const filtered = studentsWithPlacement.filter((student) => {
      const matchId = isNaN(idParam) || student.id === idParam;
      const matchRoll =
        rollParams.length === 0 || rollParams.includes(parseInt(student.roll));
      const matchClass =
        isNaN(classCodeParam) || student.class_code === classCodeParam;
      return matchId && matchRoll && matchClass;
    });

    setData(filtered);
    handleLoading("sheet", false);
  }, [
    SUBJECTS_BY_CLASS,
    SUBJECTS_INFO,
    getGrade,
    idParam,
    classCodeParam,
    rollParams,
  ]);

  const getClasses = async () => {
    const { data, error } = await supabase.from("classes").select("*");
    if (error) console.error(error);
    setClassData(data);
  };

  useEffect(() => {
    getAllResults();
    getClasses();
  }, [getAllResults]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"));
            setCurrentSheetIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.5], // 50% visible হলে ধরবে
      }
    );

    sheetRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sheetRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [data]);

  const handleDownloadPdf = async () => {
    handleLoading("sheetDownload", true);

    const doc = new jsPDF("p", "mm", "a4");
    const pageElements = document.querySelectorAll(".page");

    const scale = 3; // কম স্কেল
    const imageQuality = 0.3; // JPEG কোয়ালিটি কমানো

    for (let i = 0; i < pageElements.length; i++) {
      const page = pageElements[i];

      try {
        const dataUrl = await domtoimage.toJpeg(page, {
          quality: imageQuality,
          width: page.offsetWidth * scale,
          height: page.offsetHeight * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${page.offsetWidth}px`,
            height: `${page.offsetHeight}px`,
          },
        });

        const imgProps = doc.getImageProperties(dataUrl);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(
          dataUrl,
          "JPEG",
          0,
          0,
          pdfWidth,
          pdfHeight,
          undefined,
          "FAST"
        );

        if (i !== pageElements.length - 1) {
          doc.addPage();
        }
      } catch (error) {
        console.error("Error capturing page for PDF:", error);
      }
    }

    handleLoading("sheetDownload", false);
    doc.save(`marksheets.pdf`);
  };

  return (
    <div className="">
      <div className="border-b border-gray-300 h-18 flex flex-col justify-center">
        <p className="text-center text-3xl font-galada ">
          <span>মাদ্‌রাসাতুল হাদিস</span>
          <span className="text-yellow-500 mx-0.5">.</span>
          <span className="text-base text-green-600">Editor</span>
        </p>
      </div>
      <div className="flex flex-row-reverse">
        <div className="border-l border-gray-300">
          <div className="w-lg px-5 py-4">
            <h1 className="font-bold mb-5 text-gray-600 uppercase">
              Sheet Configure Pannel
            </h1>
            <div>
              <TextInput
                inputClassName={`bg-white ring-gray-300`}
                value={sheetData.examName}
                onChange={(e) =>
                  setSheetData((p) => ({ ...p, examName: e.target.value }))
                }
              />
              {/* tabs */}
              <div className="space-x-3.5 my-1.5 mb-5">
                {/* <Button
                  value={"Sheet Configure"}
                  className={"text-gray-800 bg-white ring-gray-300 py-1.5 rounded-lg"}
                /> */}

                <select
                  name="class_select"
                  id="class_select"
                  className="ring-2 ring-gray-300 rounded-lg p-1.5 text-gray-500"
                  onChange={(e) =>
                    navigate(`/results/mark-sheets?cc=${e.target.value}`)
                  }
                >
                  <option value={"all"}>Class Select</option>
                  {classData?.map((cls, index) => (
                    <option key={index} value={cls.class_code}>
                      {cls.classLabel}
                    </option>
                  ))}
                </select>

                <Button
                  value={"Student List"}
                  className={
                    "text-gray-500 bg-white ring-gray-300 py-1.5 rounded-lg"
                  }
                />
              </div>
            </div>
            <Button
              value={"Sheet Download"}
              className={"text-white py-1.5 rounded-lg"}
              icon={Loader2}
              iconClassName={`animate-spin size-5 ${
                loading.sheetDownload ? "" : "hidden"
              } `}
              onClick={handleDownloadPdf}
            />
          </div>
        </div>
        <div className="flex-1 bg-gray-100 h-[calc(100vh-72px)] overflow-auto relative">
          <div className="py-1.5 px-2.5 border border-gray-300 bg-white rounded fixed top-23 left-5">
            Sheet : {currentSheetIndex + 1} / {data?.length}
          </div>

          <div className="mx-auto h-full">
            {loading.sheet ? (
              <div className="h-full">
                <p className="h-full flex justify-center items-center gap-1.5">
                  <Loader className="animate-spin size-5" />
                  <span className="ml-1">Please wait...</span>
                </p>
                {/* <p>Sheet is not available</p> */}
              </div>
            ) : (
              <div
                className="my-5 space-y-5 mx-auto"
                style={{ zoom: 1, width: "210mm" }}
              >
                {data?.map((item, index) => (
                  <div
                    key={index}
                    data-index={index}
                    ref={(el) => (sheetRefs.current[index] = el)}
                    className={`shadow transition *:h-[297mm] ${
                      currentSheetIndex === index
                        ? "border-2 border-green-500"
                        : "border border-gray-300"
                    }`}
                  >
                    <ResultMarkSheetTemplate
                      sheetName={"page"}
                      examName={sheetData?.examName}
                      data={item}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultMarkSheet;
