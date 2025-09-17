import { WEB_SOCKET_SERVER } from "@/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import NotificationSubscribe from "../NotificationSubscribe";
import ConnectWallet from "../ConnectWallet";

type TMessage = {
  timeStamp: number;
  content: string;
  from: string;
  to: string;
};

export default function ChatWindow() {
  const [id, setId] = useState("");
  const [to, setTo] = useState("");
  const [connected, setConnected] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<TMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handlePost = useCallback(async () => {
    const messageObj = {
      from: id,
      to: to,
      content: message,
      timeStamp: Date.now(),
    };
    socketRef?.current?.emit("chat:private", messageObj);
    setMessages((prev) => {
      return [...prev, messageObj];
    });
    setMessage("");
  }, [id, message, to]);

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
    socketRef.current = io(WEB_SOCKET_SERVER, {
      path: "/app-socket",
      query: {
        userId: id,
      },
    });
    socketRef.current?.on("connect", () => {
      setConnected(true);
    });
    socketRef?.current?.on("chat:private", (msg) => {
      setMessages((prev) => [...prev, msg as TMessage]);
    });
  }, [id]);

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
      setConnected(false);
    };
  }, []);

  return (
    <div className="w-100 border-1 border-amber-200 rounded-2xl p-3">
      <ConnectWallet />
      {/* <Notification /> */}
      <NotificationSubscribe userId={id} />
      <div className="relative">
        <input
          className="w-full h-12 border-1 rounded-xl p-3"
          placeholder="Enter a ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        {!connected && (
          <button
            onClick={connectSocket}
            className="absolute right-2 top-2 h-8 border-1 border-amber-200 px-2 rounded-[8px] cursor-pointer"
          >
            connect
          </button>
        )}
      </div>

      <input
        className="w-full h-12 border-1 rounded-xl p-3 mt-3"
        placeholder="Enter target user"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <div className="rounded-xl p-2 mt-4 border-amber-200 border-1 w-full relative pb-[120px]">
        <div className="h-[470px] overflow-y-auto pb-[200px] ">
          {messages?.map((msgObj) => {
            return (
              <div
                key={msgObj.timeStamp}
                className={`flex flex-row ${
                  msgObj.from === id ? "justify-end" : "justify-start"
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
