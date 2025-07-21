import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import cn from "../utils/cn";

const AdjustSheetMobileScreen = ({ className, children }) => {
  const contentRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        const parentWidth = contentRef.current.parentElement.offsetWidth;
        const sheetWidth = 794; // 210mm ≈ 794px
        const newZoom = parentWidth < sheetWidth ? parentWidth / sheetWidth : 1;
        setZoom(newZoom);
      }
    };

    handleResize();
  }, []);

  return (
    <div className="m-5">
      <div
        ref={contentRef}
        style={{ zoom }}
        className={cn("space-y-5 -ml-0.5", className)}
      >
        {children}
      </div>
    </div>
  );
};

export default AdjustSheetMobileScreen;
