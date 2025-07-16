// components/Ruler.js
import React from "react";

const Ruler = () => {
  const markings = Array.from({ length: 21 }, (_, i) => i); // for 21 cm

  return (
    <div className="flex border-b border-gray-300 bg-white sticky top-0 z-10">
      <div className="w-[2cm] border-r border-gray-300 bg-gray-100"></div> {/* Left margin */}
      <div className="flex-1 flex">
        {markings.map((mark) => (
          <div
            key={mark}
            className="relative text-xs text-gray-500"
            style={{ width: "1cm", height: "20px" }}
          >
            <div className="absolute left-0 top-0 w-full h-full flex justify-center items-start">
              <span>{mark}</span>
            </div>
            <div className="w-px bg-gray-400 h-full absolute right-0 top-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ruler;
