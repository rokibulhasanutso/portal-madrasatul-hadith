import React, { useState } from "react";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

// Dummy Editor (Replace with your real LexicalEditor component)
const LexicalEditor = ({ initialValue, onChange }) => {
  return (
    <textarea
      className="w-full h-full border-none outline-none resize-none"
      defaultValue={initialValue}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

// Dummy Ruler (optional component)
const Ruler = () => <div className="h-8 w-full bg-gray-200 mb-2" />;

const MakeQuestion = () => {
  const [pagePadding, setPagePadding] = useState({ x: 1.5, y: 1.5 });
  const [pageScale, setPageScale] = useState({ size: 100 });
  const [pages, setPages] = useState(Array(1).fill(""));
  const [docTitle, setDocTitle] = useState("Untitled Document");

  const handleContentChange = (content, index) => {
    const updatedPages = [...pages];
    updatedPages[index] = content;
    setPages(updatedPages);
  };

  const addPage = () => {
    setPages((prev) => [...prev, ""]);
  };

  const downloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageElements = document.querySelectorAll(".page");

    for (let i = 0; i < pageElements.length; i++) {
      const page = pageElements[i];

      try {
        const dataUrl = await domtoimage.toPng(page, { quality: 1 });

        const imgProps = doc.getImageProperties(dataUrl);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

        if (i !== pageElements.length - 1) {
          doc.addPage();
        }
      } catch (error) {
        console.error("Error capturing page for PDF:", error);
      }
    }

    doc.save(`${docTitle.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="h-[60px] border-b border-gray-400 flex items-center px-4 justify-between bg-white">
        <input
          value={docTitle}
          onChange={(e) => setDocTitle(e.target.value)}
          className="text-xl font-semibold border-none outline-none bg-transparent"
        />
        <div className="space-x-3">
          <button
            onClick={addPage}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            + Add Page
          </button>
          <button
            onClick={downloadPDF}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            ⬇ Download PDF
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Settings */}
        <div className="border-l border-gray-400 w-64 p-4 space-y-4 bg-white">
          <div>
            <p className="font-semibold mb-2">Page setup</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm">Zoom:</label>
                <input
                  type="number"
                  min={10}
                  max={300}
                  className="w-full border px-2 py-1 rounded"
                  value={pageScale.size}
                  onChange={(e) =>
                    setPageScale((prev) => ({
                      ...prev,
                      size: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm">Padding X (cm):</label>
                <input
                  type="number"
                  className="w-full border px-2 py-1 rounded"
                  value={pagePadding.x}
                  onChange={(e) =>
                    setPagePadding((prev) => ({
                      ...prev,
                      x: parseFloat(e.target.value),
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm">Padding Y (cm):</label>
                <input
                  type="number"
                  className="w-full border px-2 py-1 rounded"
                  value={pagePadding.y}
                  onChange={(e) =>
                    setPagePadding((prev) => ({
                      ...prev,
                      y: parseFloat(e.target.value),
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 overflow-auto bg-gray-100 py-0 px-10">
          <Ruler />

          <div
            className="flex flex-col items-center gap-10 mt-5 mb-10"
            style={{
              zoom: `${parseFloat(pageScale.size)}%`,
            }}
          >
            {pages.map((content, index) => (
              <div
                key={index}
                className="page bg-white border border-gray-300 shadow relative w-[210mm] h-[297mm]"
                style={{
                  padding: `${pagePadding.y}cm ${pagePadding.x}cm`,
                  boxSizing: "border-box",
                }}
              >
                <LexicalEditor
                  initialValue={content}
                  onChange={(value) => handleContentChange(value, index)}
                />
                hello
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeQuestion;
