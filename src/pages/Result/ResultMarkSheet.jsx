import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResultMarkSheetTemplate from "./ResultMarkSheetTemplate";
import jsPDF from "jspdf";
import Button from "../../components/Button";
import domtoimage from "dom-to-image";
import { Loader, Loader2 } from "lucide-react";
import TextInput from "../../components/TextInput";
import useResultsData from "../../hook/useResultsData";
import useSheetObserver from "../../hook/useSheetObserver";
import useDB from "../../hook/useDB";

const ResultMarkSheet = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idParam = parseInt(searchParams.get("id"));
  const classCodeParam = parseInt(searchParams.get("cc"));

  const rollParams = useMemo(() => {
    const rollParamRaw = searchParams.get("r");
    return rollParamRaw
      ? rollParamRaw
          .split(",")
          .map((r) => parseInt(r))
          .filter((n) => !isNaN(n))
      : [];
  }, [searchParams]);

  console.log(idParam, classCodeParam, rollParams);

  const { data: classData, loading: classDataLoading } = useDB({
    table: "classes",
  });

  const { data, loading: sheetLoading } = useResultsData({
    idParam,
    classCodeParam,
    rollParams,
  });

  // 🔄 classCodeParam থেকে derive করা class
  const selectedClass = classCodeParam ? classCodeParam.toString() : "all";

  const [loading, setLoading] = useState({
    sheetDownload: false,
  });

  const [sheetData, setSheetData] = useState({
    examName: "দ্বিতীয় সাময়িক পরীক্ষা - ২০২৫ইং",
    sheetName: "",
  });

  // ✅ Update sheetName when examName or selectedClass changes
  useEffect(() => {
    setSheetData((prev) => ({
      ...prev,
      sheetName: `${prev.examName} - মার্কশিট - ${
        selectedClass === "all"
          ? "সকল"
          : // : classData[parseInt(selectedClass)]?.classLabel
            ""
      } শ্রেণী`,
    }));
  }, [selectedClass, sheetData.examName, classData]);

  const handleLoading = (loadingName, loadingValue) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [loadingName]: loadingValue,
    }));
  };

  const sheetRefs = useRef([]);
  const currentSheetIndex = useSheetObserver(sheetRefs, data);

  const handleDownloadPdf = async () => {
    handleLoading("sheetDownload", true);
    const doc = new jsPDF("p", "mm", "a4");
    const pageElements = document.querySelectorAll(".page");

    const scale = 3;
    const imageQuality = 0.3;

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
    doc.save(`${sheetData.sheetName || "sheet-download"}.pdf`);
  };

  const handleClassChange = (value) => {
    if (value === "all") {
      navigate("/results/mark-sheets");
    } else {
      navigate(`/results/mark-sheets?cc=${value}`);
    }
  };

  // console.log(classData, selectedClass, classData?.[selectedClass]);

  return (
    <div>
      <div className="border-b border-gray-300 h-18 flex flex-col justify-center">
        <p className="text-center text-3xl font-galada">
          <span>মাদ্‌রাসাতুল হাদিস</span>
          <span className="text-yellow-500 mx-0.5">.</span>
          <span className="text-base text-green-600">Editor</span>
        </p>
      </div>

      <div className="flex flex-row-reverse">
        {/* Sidebar */}
        <div className="border-l border-gray-300">
          <div className="w-lg px-5 py-4">
            <h1 className="font-bold mb-5 text-gray-600 uppercase">
              Sheet Configure Pannel
            </h1>

            <div>
              <TextInput
                inputClassName="bg-white ring-gray-300"
                value={sheetData.examName}
                onChange={(e) =>
                  setSheetData((p) => ({ ...p, examName: e.target.value }))
                }
              />

              <div className="space-x-3.5 my-1.5 mb-5">
                <select
                  name="class_select"
                  id="class_select"
                  className="ring-2 ring-gray-300 rounded-lg p-1.5 text-gray-500"
                  value={selectedClass}
                  onChange={(e) => handleClassChange(e.target.value)}
                >
                  <option value="all">
                    {classDataLoading ? "Loading..." : "Select all classes"}
                  </option>
                  {classData?.map((cls, index) => (
                    <option key={index} value={cls.class_code}>
                      {cls.classLabel}
                    </option>
                  ))}
                </select>

                <Button
                  value={"Student List"}
                  className="text-gray-500 bg-white ring-gray-300 py-1.5 rounded-lg"
                />
              </div>
            </div>

            <div>
              <TextInput
                inputClassName="bg-white ring-gray-300"
                value={sheetData.sheetName}
                onChange={(e) =>
                  setSheetData((p) => ({ ...p, sheetName: e.target.value }))
                }
              />

              <Button
                value={"Sheet Download"}
                className="text-white py-1.5 rounded-lg"
                icon={Loader2}
                iconClassName={`animate-spin size-5 ${
                  loading.sheetDownload ? "" : "hidden"
                }`}
                onClick={handleDownloadPdf}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 h-[calc(100vh-72px)] overflow-auto relative">
          <div className="py-1.5 px-2.5 border border-gray-300 bg-white rounded fixed top-23 left-5">
            Sheet : {currentSheetIndex + 1} / {data?.length}
          </div>

          <div className="mx-auto h-full">
            {sheetLoading ? (
              <div className="h-full flex justify-center items-center">
                <Loader className="animate-spin size-5" />
                <span className="ml-1">Please wait...</span>
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
                      examName={sheetData.examName}
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
