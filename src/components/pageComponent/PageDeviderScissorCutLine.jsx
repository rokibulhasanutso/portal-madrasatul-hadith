import React from "react";

const PageDeviderScissorCutLine = () => {
  return (
    <>
      {/* ✂ CUT LINE WITH SCISSOR */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none">
        <div className="relative flex items-center justify-center">
          {/* Left dashed line */}
          <div className="flex-1 border-t border-dashed border-gray-400 print:border-black"></div>

          {/* Scissor Icon */}
          <div className="px-2 text-gray-500 print:text-black text-sm">✂</div>

          {/* Right dashed line */}
          <div className="flex-1 border-t border-dashed border-gray-400 print:border-black"></div>
        </div>
      </div>
    </>
  );
};

export default PageDeviderScissorCutLine;
