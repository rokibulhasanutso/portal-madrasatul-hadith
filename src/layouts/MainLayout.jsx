import { Menu, QrCode, ScanQrCode } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./../components/Sidebar";
import NetworkStatus from "../components/NetworkStatus";

const MainLayout = () => {
  const mainContentRef = useRef();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = mainContentRef.current?.scrollTop || 0;
      setIsScrolled(scrollTop > 68);
    };

    const currentRef = mainContentRef.current;
    currentRef?.addEventListener("scroll", handleScroll);

    return () => {
      currentRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="bg-app bg-[url(/assets/home-background.jpg)] bg-no-repeat bg-top"
        id="app-area"
      >
        <div className="max-w-screen-sm h-[100svh] mx-auto flex flex-col text-white">
          <header
            className={`flex justify-between items-center p-5 sticky top-0 z-50 transition-all duration-500 ${
              isScrolled ? "backdrop-blur-xl bg-gray-900/75" : ""
            }`}
          >
            <button onClick={() => setIsOpenSidebar(true)}>
              <Menu className="size-7" />
            </button>

            <div>
              <h1 className="font-galada text-2xl -mb-1">মাদ্‌রাসাতুল হাদিস</h1>
            </div>

            <button>
              <QrCode className="size-7" />
            </button>
          </header>

          {/* notwork status */}
          <NetworkStatus />

          <main
            ref={mainContentRef}
            className="flex-1 h-[calc(100vh-68px)] overflow-auto"
          >
            <Outlet />
          </main>

          <footer></footer>
        </div>
      </div>

      {/* other content */}

      <Sidebar onClose={() => setIsOpenSidebar(false)} isOpen={isOpenSidebar} />
    </>
  );
};

export default MainLayout;
