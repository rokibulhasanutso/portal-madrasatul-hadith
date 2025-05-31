import { PhoneCall } from "lucide-react";
import React, { useEffect, useState } from "react";

const NumberSelectModal = ({ data }) => {
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    const element = document.getElementById("app-area");
    if (element) {
      element.classList.remove("overflow-auto");
      element.classList.add("overflow-hidden");
    }
  }, []);

  return (
    <div className="fixed inset-0 h-[calc(100svh-68px)] bg-gray-900/90 flex justify-center items-center">
      <div className="w-full max-w-2xs ring-2 ring-gray-700 rounded-md bg-gray-900 min-h-80">
        <div>
          <div
            onClick={() => setSelectedNumber("01812410135")}
            className="m-5 ring-2 ring-green-500 bg-green-500/50 rounded-md p-2"
          >
            <p>পিতা (লালা মিয়া)</p>
            <p>
              মোবাঃ <span className="font-sans">{data}</span>
            </p>
          </div>
          <div className="m-5 ring-2 ring-green-500 bg-green-500/50 rounded-md p-2">
            <p>মাতা (আমেনা বেগম)</p>
            <p>
              মোবাঃ <span className="font-sans">01812410135</span>
            </p>
          </div>

          <div className="m-5 ring-2 ring-green-500 bg-green-500/50 rounded-md p-2">
            <p>অভিভাবক - ভাই (লালা মিয়া)</p>
            <p>
              মোবাঃ <span className="font-sans">01812410135</span>
            </p>
          </div>
        </div>

        <button className="bg-green-500 p-3.5 rounded-full m-5">
          <PhoneCall />
        </button>
      </div>
    </div>
  );
};

export default NumberSelectModal;
