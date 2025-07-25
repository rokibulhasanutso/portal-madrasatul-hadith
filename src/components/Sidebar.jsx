import { ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./../providers/AuthProvider";

const Sidebar = ({ onClose, isOpen }) => {
  const sidebarRef = useRef(null);
  const location = useLocation();

  const navigate = useNavigate();
  const { removeAuth: signOut } = useAuth();

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const saticNavLink = [
    { link: "/", name: "হোম" },
    { link: "/students", name: "শিক্ষার্থী" },
    { link: "/teachers", name: "শিক্ষকমণ্ডলী" },
    { link: "/exams", name: "পরীক্ষা" },
    { link: "/notice", name: "নোটিশ" },
    { link: "/results", name: "পরীক্ষার ফলাফল" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/75 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={sidebarRef}
        className={`h-full w-[300px] bg-gray-900 relative transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="text-gray-300 absolute top-0 right-0 m-2 bg-white/12 rounded-full p-0.5"
        >
          <X className="size-6" />
        </button>

        {/* profile */}
        <div className="text-white p-5 border-b border-gray-600">
          <div className="flex flex-col justify-center items-center gap-6 my-2.5">
            <div className="size-24 rounded-full overflow-hidden ring-4 ring-gray-700">
              <img
                src="/assets/user_avater.png"
                className="size-full"
                alt="User Image"
              />
            </div>
            <div className="font-bangla text-xl text-center">
              <p>জাহাঙ্গীর সরকার</p>
              <p className="text-base">প্রধান শিক্ষক</p>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-4 text-base font-bangla">
                <button
                  onClick={() => navigate("/teachers/profile")}
                  className="text-center ring-2 ring-gray-700 rounded-lg flex items-center py-2 px-4 bg-gray-900 "
                >
                  <span className="block mx-auto">প্রোফাইল</span>
                </button>
                <button
                  onClick={signOut}
                  className="text-center ring-2 ring-gray-700 rounded-lg flex items-center py-2 px-4 bg-gray-900 "
                >
                  <span className="block mx-auto">লগ আউট</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* navigation */}
        <div className="text-white p-5 space-y-3.5 h-[calc(100svh-300px)] overflow-auto">
          {saticNavLink.map((item, index) => (
            <Link
              key={index}
              className="w-full bg-gray-800/75 backdrop-blur-xs rounded-xl px-4 py-3.5 font-bangla leading-none flex justify-between items-center active:bg-gray-700"
              to={item.link}
            >
              <span>{item.name}</span>
              <ChevronRight className="size-5 text-gray-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
