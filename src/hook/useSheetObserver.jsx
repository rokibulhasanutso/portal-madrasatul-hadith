import { useEffect, useState } from "react";

const useSheetObserver = (sheetRefs, data) => {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) setCurrentSheetIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0.5], // 50% visible
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
  }, [data, sheetRefs]);

  return currentSheetIndex;
};

export default useSheetObserver;
