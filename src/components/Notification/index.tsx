"use client";

import { useCallback, useState } from "react";

export default function Notification() {
  const [currentPermission, setCurrentPermission] = useState<NotificationPermission>("default");

  const askNotificationPermission = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    window.Notification.requestPermission().then((permission) => {
      // set the button to shown or hidden, depending on what the user answers
      setCurrentPermission(permission);
    });
  }, []);

  const showNotification = () => {
    const text = `This is a test notification, you seeing this means that the call was successful`;
    const currentNoti = new window.Notification("Heyyyy!!!!!", {
      body: text,
      icon: "https://cdn.pixabay.com/photo/2014/06/03/19/38/board-361516_640.jpg",
    });
    // setTimeout(() => {
    //   currentNoti.close();
    // }, 1500);
    return currentNoti;
  };
  return (
    <div>
      <button
        className="w-full h-12 border-1 border-amber-300 rounded-xl cursor-pointer mb-2"
        onClick={() => {
          askNotificationPermission();
        }}
        disabled={currentPermission === "granted"}
      >
        {currentPermission === "granted" && "Notification Granted"}
        {currentPermission !== "granted" && "Enable Notification"}
      </button>
      {currentPermission === "granted" && (
        <button
          onClick={showNotification}
          className="w-full h-12 border-1 border-amber-300 rounded-xl cursor-pointer mb-2"
        >
          Test notification API
        </button>
      )}
    </div>
  );
}
