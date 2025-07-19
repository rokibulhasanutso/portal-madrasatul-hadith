import React, { useEffect, useRef, useState } from "react";
import cn from "../utils/cn";

const AdjustSheetMobileScreen = ({ className, children }) => {
  const contentRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        const parentWidth = contentRef.current.parentElement.offsetWidth;
        const sheetWidth = 794; // 210mm ≈ 794px
        const newZoom = parentWidth < sheetWidth ? parentWidth / sheetWidth : 1;
        setZoom(newZoom);
      }
    };

    handleResize(); // Initial call
    // window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={contentRef}
      style={{ zoom }}
      className={cn("w-[210mm] space-y-5 p-5 bg-gray-100", className)}
    >
      {children}
    </div>
  );
};

export default AdjustSheetMobileScreen;
