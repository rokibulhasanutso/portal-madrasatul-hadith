import { Menu, QrCode, ScanQrCode } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const mainContentRef = useRef();
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div
      ref={mainContentRef}
      className="bg-app bg-[url(/assets/home-background.jpg)] bg-no-repeat bg-top h-svh overflow-auto"
      id="app-area"
    >
      <div className="max-w-screen-sm min-h-svh mx-auto flex flex-col text-white">
        <header
          className={`flex justify-between items-center p-5 sticky top-0 z-50 transition-all duration-500 ${
            isScrolled ? "backdrop-blur-xl bg-gray-900/75" : ""
          }`}
        >
          <button>
            <Menu className="size-7" />
          </button>

          <div>
            <h1 className="font-galada text-2xl -mb-1">মাদ্‌রাসাতুল হাদিস</h1>
          </div>

          <button>
            <QrCode className="size-7" />
          </button>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer></footer>
      </div>
    </div>
  );
};

export default MainLayout;
