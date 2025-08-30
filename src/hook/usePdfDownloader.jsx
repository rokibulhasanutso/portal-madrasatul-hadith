import { useCallback, useState } from "react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

export const usePdfDownloader = ({ sheetData = {}, elementName }) => {
  const [loading, setLoading] = useState(false);

  const downloadPdf = useCallback(async () => {
    setLoading(true);
    const doc = new jsPDF("p", "mm", "a4");
    const pageElements = document.querySelectorAll(elementName);

    const scale = 3;
    const imageQuality = 0.8;

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

    setLoading(false);
    doc.save(`${sheetData.sheetName || "sheet-download"}.pdf`);
  }, [sheetData, elementName]);

  return { downloadPdf, loading };
};
