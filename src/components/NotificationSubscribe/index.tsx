"use client";

import { postAuthAPI } from "@/services/fetch-functions";
import { APP_URL } from "@/services/url";
import { urlB64ToUint8Array } from "@/utils";
import { useCallback, useState } from "react";

export default function NotificationSubscribe({ userId }: { userId: string }) {
  const [currentPermission, setCurrentPermission] = useState<NotificationPermission>("default");

  const askNotificationPermission = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!userId) {
      return;
    }
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    try {
      const permission = await window.Notification.requestPermission();
      if (permission === "granted") {
        //add logic of subscribe here
        if ("serviceWorker" in navigator && "PushManager" in window) {
          const reg = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
          });
          if (reg.installing) {
            console.log("Service worker installing");
          } else if (reg.waiting) {
            console.log("Service worker installed");
          } else if (reg.active) {
            console.log("Service worker active");
          }
          const publicVAPIDKey = process.env.NEXT_PUBLIC_VAPID_KEY || "";
          const key = urlB64ToUint8Array(publicVAPIDKey);
          const subscriptionObj = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: key,
          });
          await postAuthAPI(`${APP_URL}/chat/subscribe`, {
            body: JSON.stringify({ subscription: subscriptionObj, userId: userId }),
          });
          console.log("🚀 ~ NotificationSubscribe ~ subscriptionObj:", subscriptionObj);
        }
      }
      if (permission !== "granted") {
        //
      }
      setCurrentPermission(permission);
    } catch {
      setCurrentPermission("default");
    }
  }, [userId]);

  return (
    <div>
      <button
        className="w-full h-12 border-1 border-amber-300 rounded-xl cursor-pointer"
        onClick={() => {
          askNotificationPermission();
        }}
        disabled={currentPermission === "granted"}
      >
        {currentPermission === "granted" && "Notification Granted"}
        {currentPermission !== "granted" && "Allow Notification"}
      </button>
    </div>
  );
}
