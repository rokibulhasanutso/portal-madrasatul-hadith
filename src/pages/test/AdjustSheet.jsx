import { useEffect, useState } from "react";
import useResultsData from "../../hook/useResultsData";
import ResultMarkSheetTemplate from "../Result/ResultMarkSheetTemplate";

const AdjustSheet = () => {
  const { data, loading } = useResultsData();
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const sheetWidth = 794; // 210mm in pixels (approx)
      const newZoom = screenWidth < sheetWidth ? screenWidth / sheetWidth : 1;
      setZoom(newZoom);
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log([data[0]]);

  return (
    <div style={{ zoom, width: "210mm", margin: "0 auto" }}>
      {[data?.[0]]?.map((item, i) => (
        <div className="*:h-[297mm]" key={i}>
          <ResultMarkSheetTemplate
            examName="Testing adjust sheet"
            data={item}
          />
        </div>
      ))}
    </div>
  );
};

export default AdjustSheet;
