import { useUser } from "@/context/user-info-context";
import { WEB_SOCKET_SERVER } from "@/services/url";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import NotificationSubscribe from "../NotificationSubscribe";

type TMessage = {
  timeStamp: number;
  content: string;
  from: string;
  to: string;
  title: string;
};

export default function ChatWindow() {
  const { userInfo, activeFriend } = useUser();
  console.log("🚀 ~ ChatWindow ~ userInfo:", userInfo);
  const [connected, setConnected] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<TMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handlePost = useCallback(async () => {
    const messageObj = {
      from: userInfo?.userId || "",
      to: activeFriend,
      content: message,
      timeStamp: Date.now(),
      title: userInfo?.username || "",
    };
    socketRef?.current?.emit("chat:private", messageObj);
    setMessages((prev) => {
      return [...prev, messageObj];
    });
    setMessage("");
  }, [message, activeFriend, userInfo]);

  useEffect(() => {
    const refBtn = btnRef?.current;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        refBtn?.click();
      }
    });

    return () => {
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          refBtn?.click();
        }
      });
    };
  }, []);

  const connectSocket = useCallback(() => {
    if (userInfo?.userId) {
      socketRef.current = io(WEB_SOCKET_SERVER, {
        path: "/app-socket",
        query: {
          userId: userInfo.userId,
        },
      });
      socketRef.current?.on("connect", () => {
        setConnected(true);
      });
      socketRef?.current?.on("chat:private", (msg) => {
        setMessages((prev) => [...prev, msg as TMessage]);
      });
    }
  }, [userInfo?.userId]);

  useEffect(() => {
    connectSocket();
  }, [connectSocket]);

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
      setConnected(false);
    };
  }, []);

  return (
    <div className="w-100 border-1 border-amber-200 rounded-2xl p-3">
      {connected && userInfo?.userId && (
        <div className="my-2">
          <NotificationSubscribe userId={userInfo?.userId} />
        </div>
      )}

      <div className="rounded-xl p-2 mt-4 border-amber-200 border-1 w-full relative pb-[120px]">
        <div className="h-[470px] overflow-y-auto pb-[200px] ">
          {messages?.map((msgObj) => {
            return (
              <div
                key={msgObj.timeStamp}
                className={`flex flex-row ${
                  msgObj.from === userInfo?.userId ? "justify-end" : "justify-start"
                } mt-2`}
              >
                <div className="rounded-xl px-2 py-0.5 border-1 border-amber-50">
                  <p>{msgObj.content}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-[calc(100%_-_18px)] absolute bottom-2 block">
          <input
            className="h-12 border-1 rounded-xl p-3 w-full"
            placeholder="type some thing"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            ref={btnRef}
            id="send-button"
            onClick={handlePost}
            className="w-full cursor-pointer h-10 rounded-2xl mt-3 border-1 bordr"
          >
            post
          </button>
        </div>
      </div>
    </div>
  );
}
