import React, { useState, useEffect } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineMessage(true);

      // 1 সেকেন্ড পর মেসেজটা গায়েব হয়ে যাবে
      setTimeout(() => {
        setShowOnlineMessage(false);
      }, 1000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineMessage(false); // যদি কোনো online মেসেজ দেখাচ্ছে তখন সেটা বন্ধ করে দাও
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div>
      {!isOnline && (
        <div className="bg-rose-700 text-white p-2.5 text-center w-full">
          No internet connection. Please check your network.
        </div>
      )}
      {isOnline && showOnlineMessage && (
        <div className="bg-green-600 text-white p-2.5 text-center w-full">
          You are back online!
        </div>
      )}
    </div>
  );
};

export default NetworkStatus;
